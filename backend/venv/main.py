
import math
import os
import re
import time
from typing import Literal

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

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
OVERPASS_URL = "https://overpass-api.de/api/interpreter"

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

    try:
        async with httpx.AsyncClient(timeout=45) as client:
            response = await client.post(
                OVERPASS_URL,
                data={"data": query},
                headers={"User-Agent": USER_AGENT},
            )
            response.raise_for_status()
            payload = response.json()

    except (httpx.HTTPError, ValueError) as exc:
        raise HTTPException(
            status_code=502,
            detail=(
                "OpenStreetMap data is temporarily unavailable. "
                "Please try again later."
            ),
        ) from exc

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