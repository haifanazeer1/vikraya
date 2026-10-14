
import math
import os
import re
import time
from typing import Literal
import asyncio
import json
import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


from google import genai
load_dotenv()

app = FastAPI(title="Vikraya Market Intelligence API")

# Allows your local HTML frontend to call FastAPI.
# No cookies or browser credentials are used.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

NOMINATIM_URL = "https://nominatim.openstreetmap.org/search"

OVERPASS_URLS = [
    "https://overpass-api.de/api/interpreter",
    "https://overpass.kumi.systems/api/interpreter",
]


USER_AGENT = "VikrayaSIHPrototype/1.0 (local development)"

# Use only known, fixed tag filters in Overpass queries.
# OSM tagging is not complete or consistent in every locality.
CATEGORY_FILTERS = {
    "tailoring": [
        ('shop', 'tailor'),
        ('craft', 'tailor'),
        ('shop', 'clothes'),
        ('shop', 'fabric'),
    ],
    "grocery": [
        ('shop', 'supermarket'),
        ('shop', 'convenience'),
        ('shop', 'greengrocer'),
        ('shop', 'general'),
    ],
    "pharmacy": [
        ('amenity', 'pharmacy'),
    ],
    "restaurant": [
        ('amenity', 'restaurant'),
        ('amenity', 'fast_food'),
        ('amenity', 'cafe'),
    ],
    "salon": [
        ('shop', 'hairdresser'),
        ('shop', 'beauty'),
    ],
    "mobile_repair": [
        ('shop', 'mobile_phone'),
        ('shop', 'electronics'),
        ('craft', 'electronics_repair'),
    ],
    "all_shops": [
        ('shop', '*'),
        ('craft', '*'),
        ('amenity', 'marketplace'),
    ],
}

BusinessType = Literal[
    "tailoring",
    "grocery",
    "pharmacy",
    "restaurant",
    "salon",
    "mobile_repair",
    "all_shops",
]


class MarketRequest(BaseModel):
    location: str = Field(min_length=3, max_length=200)
    business_type: BusinessType
    radius_km: Literal[5, 10] = 5


# Simple in-memory cache to avoid repeating geocoding requests.
geocode_cache = {}
last_geocode_request = 0.0


class FeasibilityRequest(BaseModel):
    profile: dict
    market_report: dict


def generate_feasibility_with_gemini(profile: dict, market: dict):
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise RuntimeError("GEMINI_API_KEY is missing from backend/.env")

    model_name = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")
    client = genai.Client(
    api_key=api_key,
    http_options={
        "timeout": 300000
    }
    )

    # Pass only relevant profile fields and market facts.
    safe_profile = {
        "business_name": profile.get("business_name"),
        "business_idea": profile.get("business_idea"),
        "preferred_sector": profile.get("preferred_sector"),
        "village": profile.get("village"),
        "district": profile.get("district"),
        "state": profile.get("state"),
        "available_margin": profile.get("available_margin"),
    }

    safe_market = {
        "location": market.get("location"),
        "business_type": market.get("business_type"),
        "radius_km": market.get("radius_km"),
        "competitor_count": market.get("competitor_count"),
        "businesses": [
            {
                "name": item.get("name"),
                "category": item.get("category"),
                "distance_km": item.get("distance_km"),
            }
            for item in market.get("businesses", [])[:50]
            if isinstance(item, dict)
        ],
        "summary": market.get("summary"),
        "source": market.get("source"),
        "official_msme_statistics": market.get(
        "official_msme_statistics"
),
    }

    prompt = f"""
You are a careful small-business feasibility analyst for Indian
micro-enterprises. Analyse the supplied profile and local market data.

PROFILE:
{json.dumps(safe_profile, ensure_ascii=False)}

MARKET DATA:
{json.dumps(safe_market, ensure_ascii=False)}

Return one JSON object with exactly these keys:
- executive_summary: string
- feasibility_status: string, one of "Promising", "Needs validation",
  or "High risk"
- status_reason: string
- strengths: array of strings
- weaknesses: array of strings
- opportunities: array of strings
- threats: array of strings
- competitor_analysis: string
- customer_validation_steps: array of strings
- operational_requirements: array of strings
- financial_assumptions: array of strings
- key_risks: array of strings
- next_steps: array of strings
- data_limitations: array of strings

Rules:
1. Use the supplied facts; do not invent population, customer demand,
   prices, revenue, profit, market size, or competitor names.
2. OpenStreetMap features are mapped businesses, not a guaranteed
   complete list of actual competitors.
3. Clearly label any inference as an inference and any missing data
   as unknown. If demand or financial data is missing, recommend how
   to collect it rather than making up numbers.
4. Consider the business idea, sector, location and available margin.
5. Do not guarantee business success, loan approval, or scheme eligibility.
6. Keep the report practical, clear, and useful for a first-time
   entrepreneur in India.
7. If official_msme_statistics is available, include the figures
   in the report and identify them as official state-level MSME
   registration statistics. Include the reporting date and source.
   These figures describe registered enterprises, not customer
   demand or the number of direct competitors.
8. If MSME statistics are missing, state that they are unavailable.
   Never invent or infer registration figures.
9. Return valid JSON only, with no Markdown fences.
"""
    
    interaction = client.interactions.create(
        model=model_name,
        input=prompt,
        generation_config={
            "temperature": 0.2,
        },
    )

    response_text = interaction.output_text

    if not response_text:
        raise ValueError("Gemini returned an empty response.")

    return json.loads(response_text)

    

    

def haversine_km(lat1, lon1, lat2, lon2):
    """Calculate straight-line distance between two coordinates."""
    earth_radius_km = 6371.0

    lat1, lon1, lat2, lon2 = map(
        math.radians,
        [lat1, lon1, lat2, lon2],
    )

    delta_lat = lat2 - lat1
    delta_lon = lon2 - lon1

    value = (
        math.sin(delta_lat / 2) ** 2
        + math.cos(lat1)
        * math.cos(lat2)
        * math.sin(delta_lon / 2) ** 2
    )

    return 2 * earth_radius_km * math.asin(
        math.sqrt(min(1.0, value))
    )


async def geocode_location(location: str):
    """Resolve a user-entered place into coordinates."""
    global last_geocode_request

    cache_key = location.strip().casefold()

    if cache_key in geocode_cache:
        return geocode_cache[cache_key]

    # Respect the public Nominatim service's request limit.
    wait_seconds = 1.05 - (time.monotonic() - last_geocode_request)

    if wait_seconds > 0:
        await __import__("asyncio").sleep(wait_seconds)

    try:
        async with httpx.AsyncClient(timeout=20) as client:
            response = await client.get(
                NOMINATIM_URL,
                params={
                    "q": location,
                    "format": "jsonv2",
                    "limit": 1,
                    "countrycodes": "in",
                },
                headers={"User-Agent": USER_AGENT},
            )

            last_geocode_request = time.monotonic()
            response.raise_for_status()
            results = response.json()

    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,
            detail="Location lookup failed. Please try again later.",
        ) from exc

    if not results:
        raise HTTPException(
            status_code=404,
            detail="Location not found. Include the village, district and state.",
        )

    result = {
        "latitude": float(results[0]["lat"]),
        "longitude": float(results[0]["lon"]),
        "display_name": results[0]["display_name"],
    }

    geocode_cache[cache_key] = result
    return result


def make_overpass_query(lat, lon, radius_m, business_type):
    """Build a query from predefined tags, not user-supplied query text."""
    filters = CATEGORY_FILTERS[business_type]
    selectors = []

    for key, value in filters:
        if value == "*":
            selectors.append(
                f'nwr(around:{radius_m},{lat},{lon})["{key}"];'
            )
        else:
            selectors.append(
                f'nwr(around:{radius_m},{lat},{lon})'
                f'["{key}"="{value}"];'
            )

    return (
        "[out:json][timeout:30];\n"
        "(\n"
        + "\n".join(selectors)
        + "\n);\n"
        "out center tags;"
    )


async def fetch_nearby_businesses(
    lat,
    lon,
    radius_km,
    business_type,
):
    """Retrieve mapped OSM features and calculate their distances."""
    query = make_overpass_query(
        lat,
        lon,
        radius_km * 1000,
        business_type,
    )

    
    payload = None

    for endpoint in OVERPASS_URLS:
        try:
            async with httpx.AsyncClient(timeout=60) as client:
                response = await client.post(
                    endpoint,
                    data={"data": query},
                    headers={"User-Agent": USER_AGENT},
                )
                response.raise_for_status()
                payload = response.json()
                break

        except (httpx.HTTPError, ValueError) as exc:
            print(
                f"Overpass endpoint failed "
                f"({endpoint}): {type(exc).__name__}: {exc}"
            )
            continue

    if payload is None:
        raise HTTPException(
            status_code=502,
            detail=(
                "All OpenStreetMap business-search servers are "
                "temporarily unavailable. Please retry shortly."
            ),
        )

    businesses = []
    seen = set()

    for element in payload.get("elements", []):
        element_id = f'{element.get("type")}:{element.get("id")}'

        if element_id in seen:
            continue

        seen.add(element_id)

        tags = element.get("tags", {})

        # Nodes have their own coordinates; ways and relations
        # commonly have a representative center in this response.
        center = element.get("center", {})
        business_lat = element.get("lat", center.get("lat"))
        business_lon = element.get("lon", center.get("lon"))

        if business_lat is None or business_lon is None:
            continue

        business_lat = float(business_lat)
        business_lon = float(business_lon)

        distance = haversine_km(
            lat,
            lon,
            business_lat,
            business_lon,
        )

        if distance > radius_km:
            continue

        category_tags = [
            f"{key}={tags[key]}"
            for key in ("shop", "craft", "amenity")
            if key in tags
        ]

        businesses.append({
            "osm_id": element_id,
            "name": tags.get("name", "Unnamed mapped business"),
            "category": ", ".join(category_tags) or "Other",
            "latitude": business_lat,
            "longitude": business_lon,
            "distance_km": round(distance, 2),
        })

    businesses.sort(key=lambda business: business["distance_km"])
    return businesses


def save_report(report):
    """Persist a report when Supabase credentials are configured."""
    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        return None

    try:
        from supabase import create_client

        supabase = create_client(supabase_url, supabase_key)

        result = (
            supabase.table("market_reports")
            .insert({
                "location": report["location"],
                "business_type": report["business_type"],
                "radius_km": report["radius_km"],
                "center_lat": report["center"]["latitude"],
                "center_lon": report["center"]["longitude"],
                "competitor_count": report["competitor_count"],
                "businesses": report["businesses"],
                "summary": report["summary"],
            })
            .execute()
        )

        if result.data:
            return str(result.data[0]["id"])

    except Exception as exc:
        # Do not expose database credentials or internal errors.
        # Log the exception server-side when adding production logging.
        print(f"Supabase save error: {exc}")
        raise HTTPException(
            status_code=500,
            detail="The report was generated, but saving it failed.",
        )

    return None


@app.get("/api/health")
def health_check():
    return {"status": "ok"}


@app.get("/api/msme-statistics")
def get_msme_statistics(state: str):
    """Retrieve official state-wise MSME statistics from Supabase."""

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key:
        raise HTTPException(
            status_code=500,
            detail="Supabase configuration is missing."
        )

    try:
        from supabase import create_client

        supabase = create_client(supabase_url, supabase_key)

        result = (
            supabase.table("msme_state_stats")
            .select(
                "state, micro_enterprises, small_enterprises, "
                "medium_enterprises, total_enterprises, "
                "reporting_date, source"
            )
            .ilike("state", state.strip())
            .limit(1)
            .execute()
        )

        if not result.data:
            raise HTTPException(
                status_code=404,
                detail=f"No MSME statistics found for {state}."
            )

        return {
            "status": "success",
            "data": result.data[0]
        }

    except HTTPException:
        raise
    except Exception as exc:
        print(f"MSME statistics lookup failed: {exc}")
        raise HTTPException(
            status_code=500,
            detail="Unable to retrieve MSME statistics."
        )


@app.post("/api/market-intelligence")
async def market_intelligence(request: MarketRequest):
    center = await geocode_location(request.location)

    businesses = await fetch_nearby_businesses(
        center["latitude"],
        center["longitude"],
        request.radius_km,
        request.business_type,
    )

    count = len(businesses)

    if count == 0:
        summary = (
            "No matching businesses were found in the available "
            "OpenStreetMap data for this search. This does not prove "
            "that the area has no competitors."
        )
    else:
        summary = (
            f"Found {count} mapped business feature(s) matching "
            f"the {request.business_type.replace('_', ' ')} search "
            f"within {request.radius_km} km. Map coverage may be incomplete."
        )

    report = {
        "location": center["display_name"],
        "business_type": request.business_type,
        "radius_km": request.radius_km,
        "center": {
            "latitude": center["latitude"],
            "longitude": center["longitude"],
        },
        "competitor_count": count,
        "businesses": businesses,
        "summary": summary,
        "source": "© OpenStreetMap contributors",
    }

    report_id = save_report(report)

    report["saved"] = report_id is not None
    report["report_id"] = report_id

    return report

def get_msme_statistics_for_state(state: str):
    """Fetch state-level MSME statistics from Supabase."""

    supabase_url = os.getenv("SUPABASE_URL")
    supabase_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

    if not supabase_url or not supabase_key or not state:
        return None

    try:
        from supabase import create_client

        supabase = create_client(supabase_url, supabase_key)

        result = (
            supabase.table("msme_state_stats")
            .select("*")
            .ilike("state", state.strip())
            .limit(1)
            .execute()
        )

        return result.data[0] if result.data else None

    except Exception as exc:
        print(f"MSME lookup error: {exc}")
        return None


@app.post("/api/feasibility-report")
async def create_feasibility_report(request: FeasibilityRequest):
    if not request.profile or not request.market_report:
        raise HTTPException(
            status_code=400,
            detail="Profile and market report are required.",
        )

    if not request.market_report.get("location"):
        raise HTTPException(
            status_code=400,
            detail="The market report must include a location.",
        )

    try:
        state = request.profile.get("state", "")

        msme_data = await asyncio.to_thread(
            get_msme_statistics_for_state,
            state
        )

        market_report = dict(request.market_report)
        market_report["official_msme_statistics"] = msme_data
        report = await asyncio.to_thread(
            generate_feasibility_with_gemini,
            request.profile,
            market_report,
        )
        return {
            "status": "success",
            "model": os.getenv("GEMINI_MODEL", "gemini-2.5-flash"),
            "report": report,
        }

    except json.JSONDecodeError as exc:
        print(f"Gemini JSON parsing failed: {exc}")
        raise HTTPException(
            status_code=502,
            detail="The AI returned an invalid report. Please retry.",
        ) from exc

    except Exception as exc:
        print(f"Feasibility generation failed: {type(exc).__name__}: {exc}")
        raise HTTPException(
            status_code=502,
            detail=(
                "The feasibility report could not be generated. "
                "Check the backend terminal and Gemini API configuration."
            ),
        ) from exc
