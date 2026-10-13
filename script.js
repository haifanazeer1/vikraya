const main = document.getElementById("main");
const navItems = [...document.querySelectorAll(".nav-item")];

let language = "en";

const pages = {
  
onboarding: {
    title: "Entrepreneur profile",
    sub: "Your saved business details, used to personalise your reports.",

    render: () => `
        <div class="section-head">
            <span class="status" id="profile-status">
                LOADING PROFILE...
            </span>
        </div>

        <div class="content panel">
            <div id="profile-error" class="notice" hidden></div>

            <div class="grid2">
                <div>
                    <div class="muted">Full name</div>
                    <h3 id="profile-name">Loading...</h3>
                </div>

                <div>
                    <div class="muted">Village / Block</div>
                    <h3 id="profile-location">Loading...</h3>
                </div>

                <div>
                    <div class="muted">District</div>
                    <h3 id="profile-district">—</h3>
                </div>

                <div>
                    <div class="muted">State</div>
                    <h3 id="profile-state">—</h3>
                </div>

                <div>
                    <div class="muted">Phone</div>
                    <h3 id="profile-phone">—</h3>
                </div>

                <div>
                    <div class="muted">Business name</div>
                    <h3 id="profile-business">—</h3>
                </div>

                <div>
                    <div class="muted">Business idea</div>
                    <h3 id="profile-idea">—</h3>
                </div>

                <div>
                    <div class="muted">Preferred sector</div>
                    <h3 id="profile-sector">—</h3>
                </div>

                <div>
                    <div class="muted">Available margin</div>
                    <h3 id="profile-margin">—</h3>
                </div>

                <div>
                    <div class="muted">Scheme interest</div>
                    <h3 id="profile-scheme">—</h3>
                </div>
            </div>

            <hr style="border:0;border-top:1px solid var(--line);margin:20px 0">

            <button class="btn" data-goto="market">
                Continue to market intelligence →
            </button>
        </div>
    `
},


  
market: {
    title: "Hyper-local market & competitor intelligence",
    sub: "Explore mapped businesses around your registered location.",

    render: () => `
        <div class="content">
            <div class="panel">
                <form id="market-form">
                    <label class="field">
                        Search location
                        <input
                            id="market-location"
                            name="location"
                            placeholder="Village, district, state"
                            required
                        >
                    </label>

                    <div class="grid2">
                        <label class="field">
                            Business category
                            <select id="market-sector" name="business_type" required>
                                <option value="tailoring">Tailoring & garments</option>
                                <option value="grocery">Grocery / retail</option>
                                <option value="pharmacy">Pharmacy</option>
                                <option value="restaurant">Food / restaurant</option>
                                <option value="salon">Salon / beauty</option>
                                <option value="mobile_repair">Mobile repair</option>
                                <option value="all_shops">Other shops / businesses</option>
                            </select>
                        </label>

                        <label class="field">
                            Search radius
                            <select id="market-radius" name="radius_km">
                                <option value="5">5 km</option>
                                <option value="10">10 km</option>
                            </select>
                        </label>
                    </div>

                    <button class="btn" id="market-search-btn" type="submit">
                        Analyse nearby market
                    </button>

                    <p id="market-message" role="status" aria-live="polite"></p>
                </form>
            </div>

            <div id="market-results" hidden>
                <div class="grid2">
                    <div class="stat">
                        <small>MAPPED BUSINESSES FOUND</small>
                        <strong id="market-count">—</strong>
                        <small>Within the selected radius</small>
                    </div>

                    <div class="stat">
                        <small>REPORT STORAGE</small>
                        <strong id="market-saved">—</strong>
                        <small id="market-report-id"></small>
                    </div>
                </div>

                <div class="notice" id="market-summary"></div>

                <div class="panel">
                    <h3>Nearby business map</h3>
                    <div id="market-map"
                         style="height:360px;width:100%;border-radius:6px">
                    </div>
                    <p class="muted">
                        Map data: © OpenStreetMap contributors.
                        Mapped businesses may not represent every competitor.
                    </p>
                </div>

                <div class="panel">
                    <h3>Nearby mapped businesses</h3>
                    <div style="overflow-x:auto">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Business</th>
                                    <th>Category</th>
                                    <th>Distance</th>
                                </tr>
                            </thead>
                            <tbody id="market-business-list"></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    `
},


  feasibility: {
    title: "AI-powered feasibility report",
    sub: "Localized SWOT scaled to a ₹1,80,000 micro-enterprise budget.",

    render: () => `
      <div class="content">
        <div class="swot">
          <div>
            <h3>Strengths</h3>
            <ul>
              <li>Low competitor density in the 5 km catchment</li>
              <li>Existing tailoring skill, no new training cost</li>
            </ul>
          </div>

          <div>
            <h3>Weaknesses</h3>
            <ul>
              <li>Single-buyer dependency on the weekly haat</li>
              <li>No cold storage for fabric during monsoon</li>
            </ul>
          </div>

          <div>
            <h3>Opportunities</h3>
            <ul>
              <li>Underserved niche in ready-stitched blouses</li>
              <li>Nearby college hostel as a steady buyer base</li>
            </ul>
          </div>

          <div>
            <h3>Threats</h3>
            <ul>
              <li>Seasonal demand swings around festivals</li>
              <li>Fabric supply-chain bottleneck in peak season</li>
            </ul>
          </div>
        </div>

        <div class="grid2" style="margin-top: 16px">
          <div class="stat">
            <strong>₹450–520</strong>
            <small>
              optimal price band per garment, based on regional purchasing power
            </small>
          </div>

          <div class="stat">
            <strong>₹6.1L</strong>
            <small>
              estimated annual local market value for this niche
            </small>
          </div>
        </div>

        <button
          class="btn"
          style="margin-top: 18px"
          data-goto="finance"
        >
          Open financial calculator →
        </button>
      </div>
    `
  },

  finance: {
    title: "Smart financial calculator & scheme auto-router",
    sub: "The margin contribution is converted into project cost, then routed to the matching scheme.",

    render: () => `
      <div class="content">
        <div
          class="grid2"
          style="max-width: 360px; margin-bottom: 18px"
        >
          <div
            class="stat"
            style="background: var(--navy); color: white"
          >
            <small style="color: #d8e0eb">
              Margin contribution (10%)
            </small>
            <strong>₹18,000</strong>
          </div>

          <div
            class="stat"
            style="background: #b98721; color: white"
          >
            <small style="color: #fff1c7">
              Total feasible project cost
            </small>
            <strong>₹1,80,000</strong>
          </div>
        </div>

        <div class="grid2">
          <div class="scheme">
            <h3>Micro Finance Scheme</h3>
            <p>
              Project cost limit
              <b>up to ₹1.40 lakh</b>
            </p>
            <p>Interest <b>6.5%</b></p>
            <p>Repayment <b>3 years</b></p>
            <p>Moratorium <b>3 months</b></p>
          </div>

          <div class="scheme selected">
            <span class="status" style="float: right">ROUTED</span>

            <h3>Term Loan Scheme</h3>
            <p>
              Project cost limit
              <b>₹1.40L – ₹50L</b>
            </p>
            <p>Interest <b>8%</b></p>
            <p>Repayment <b>7 years</b></p>
            <p>Moratorium <b>6 months</b></p>
          </div>
        </div>

        <p class="muted" style="line-height: 1.7">
          Project cost of ₹1,80,000 exceeds the ₹1.40 lakh Micro Finance
          ceiling, so the applicant is auto-routed to the Term Loan Scheme
          for a maximum loan of ₹1,62,000.
        </p>

        <button class="btn" data-goto="emi">
          View EMI &amp; moratorium plan →
        </button>
      </div>
    `
  },

  emi: {
    title: "EMI & moratorium planner",
    sub: "Quarterly schedule for the ₹1,62,000 Term Loan, 6-month moratorium applied automatically.",

    render: () => `
      <div class="content">
        <table class="table">
          <thead>
            <tr>
              <th>Quarter</th>
              <th>Principal due</th>
              <th>Interest due</th>
              <th>Payment</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><i>Q1</i></td>
              <td>₹0</td>
              <td>₹0</td>
              <td>₹0</td>
              <td>
                <span class="pill">Moratorium</span>
              </td>
            </tr>

            <tr>
              <td><i>Q2</i></td>
              <td>₹0</td>
              <td>₹0</td>
              <td>₹0</td>
              <td>
                <span class="pill">Moratorium</span>
              </td>
            </tr>

            <tr>
              <td>Q3</td>
              <td>₹5,400</td>
              <td>₹3,240</td>
              <td>₹8,640</td>
              <td>Due</td>
            </tr>

            <tr>
              <td>Q4</td>
              <td>₹5,400</td>
              <td>₹3,132</td>
              <td>₹8,532</td>
              <td>Due</td>
            </tr>

            <tr>
              <td>Q5</td>
              <td>₹5,400</td>
              <td>₹3,024</td>
              <td>₹8,424</td>
              <td>Due</td>
            </tr>
          </tbody>
        </table>

        <div class="grid2" style="margin-top: 16px">
          <div class="stat">
            <strong>₹8,640</strong>
            <small>
              quarterly EMI once repayment begins (Q3)
            </small>
          </div>

          <div class="stat">
            <strong>₹24,000</strong>
            <small>
              working capital needed to cover the moratorium period
            </small>
          </div>
        </div>

        <button
          class="btn"
          style="margin-top: 18px"
          data-goto="advisor"
        >
          Ask the AI advisor →
        </button>
      </div>
    `
  },

  advisor: {
    title: "Multilingual AI business advisor",
    sub: "Same guidance, in whichever language the entrepreneur is comfortable with.",

    render: () => `
      <div class="chat">
        <div class="chat-head">
          <b>🟢 Vikaas advisor</b>
          <span id="chat-language">English</span>
        </div>

        <div class="chat-body" id="chat-body">
          <div class="bubble user" id="initial-question">
            How much loan can I get for my tailoring shop?
          </div>

          <div class="bubble bot" id="initial-answer">
            With your ₹18,000 margin, your project cost works out to
            ₹1,80,000. That routes you to the Term Loan Scheme — a loan
            of ₹1,62,000 at 8% interest, repaid over 7 years with a
            6-month moratorium.
          </div>
        </div>

        <form class="chat-form" id="chat-form">
          <input
            id="question"
            placeholder="Type a question..."
            required
          />
          <button>Send</button>
        </form>
      </div>

      <button
        class="btn"
        style="margin-top: 18px"
        data-goto="business"
      >
        Prepare business case →
      </button>
    `
  },

  business: {
    title: "Finance-ready business case",
    sub: "Every report generated in this session, ready to carry into the SCA branch.",

    render: () => {
      const reports = [
        ["Market Intelligence Report", "2 pages"],
        ["Feasibility Report (with SWOT)", "3 pages"],
        ["Financial Plan & Scheme Recommendation", "1 page"],
        ["EMI & Cash-Flow Plan", "1 page"]
      ];

      const reportRows = reports
        .map(([name, pageCount]) => `
          <div class="report-row">
            <span>✓ &nbsp; ${name}</span>
            <small class="muted">${pageCount}</small>
          </div>
        `)
        .join("");

      return `
        <div class="content">
          <div class="section-head">
            <span></span>
            <span class="status">✓ READY TO EXPORT</span>
          </div>

          <div class="report-list">
            ${reportRows}
          </div>

          <button class="btn" id="export">
            Export as PDF
          </button>

          <p class="muted" id="export-note"></p>
        </div>
      `;
    }
  }
};

async function loadOnboardingProfile() {
    const status = document.getElementById("profile-status");
    const errorBox = document.getElementById("profile-error");

    const setText = (id, value) => {
        const element = document.getElementById(id);

        if (element) {
            element.textContent =
                value === null || value === undefined || value === ""
                    ? "Not provided"
                    : String(value);
        }
    };

    try {
        if (typeof window.getVikaasProfile !== "function") {
            throw new Error(
                "Profile loader is unavailable. Please refresh the page."
            );
        }

        const profile = await window.getVikaasProfile();

        if (!profile) {
            throw new Error(
                "No profile was found for this account. Please check your profiles table."
            );
        }

        setText("profile-name", profile.full_name);
        setText("profile-location", profile.village);
        setText("profile-district", profile.district);
        setText("profile-state", profile.state);
        setText("profile-phone", profile.phone);
        setText("profile-business", profile.business_name);
        setText("profile-idea", profile.business_idea);

        const sectorNames = {
            tailoring: "Tailoring & garments",
            grocery: "Grocery / retail",
            pharmacy: "Pharmacy",
            restaurant: "Food / restaurant",
            salon: "Salon / beauty",
            mobile_repair: "Mobile repair",
            all_shops: "Other retail business"
        };

        setText(
            "profile-sector",
            sectorNames[profile.preferred_sector] ||
                profile.preferred_sector
        );

        const margin = profile.available_margin;

        setText(
            "profile-margin",
            margin === null || margin === undefined
                ? null
                : Number(margin).toLocaleString("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2
                })
        );

        const schemeNames = {
            government_margin_money: "Government margin-money scheme",
            subsidized_loan: "Subsidized business loan",
            working_capital: "Working capital assistance",
            not_sure: "Help me choose a scheme"
        };

        setText(
            "profile-scheme",
            schemeNames[profile.scheme_interest] ||
                profile.scheme_interest
        );

        status.textContent = "✓ PROFILE LOADED";
        status.style.color = "#527c68";

        // Keep the profile available for the market page integration.
        window.vikaasProfile = profile;

    } catch (error) {
        console.error("Unable to load profile:", error);

        status.textContent = "PROFILE NOT LOADED";
        errorBox.textContent = error.message ||
            "Could not load your profile. Please try again.";
        errorBox.hidden = false;
    }
}

const MARKET_API_BASE = "http://127.0.0.1:8000";

const marketCategoryLabels = {
    tailoring: "Tailoring & garments",
    grocery: "Grocery / retail",
    pharmacy: "Pharmacy",
    restaurant: "Food / restaurant",
    salon: "Salon / beauty",
    mobile_repair: "Mobile repair",
    all_shops: "Other shops / businesses"
};

let marketMap = null;
let marketMapLayer = null;

function fillMarketForm(profile) {
    const locationInput = document.getElementById("market-location");
    const sectorInput = document.getElementById("market-sector");

    if (!locationInput || !sectorInput || !profile) return;

    const locationParts = [
        profile.village,
        profile.district,
        profile.state,
        "India"
    ].filter(value => value && String(value).trim());

    locationInput.value = locationParts.join(", ");

    const sector = profile.preferred_sector;
    const supportedSectors = [
        "tailoring",
        "grocery",
        "pharmacy",
        "restaurant",
        "salon",
        "mobile_repair",
        "all_shops"
    ];

    if (supportedSectors.includes(sector)) {
        sectorInput.value = sector;
    } else {
        sectorInput.value = "all_shops";
    }
}

function showMarketMap(report) {
    const mapElement = document.getElementById("market-map");

    if (!mapElement || typeof L === "undefined") {
        throw new Error(
            "Map library did not load. Check your internet connection and Leaflet scripts."
        );
    }

    const lat = report.center.latitude;
    const lon = report.center.longitude;

    // Re-create the map when the Market page is opened again.
    if (marketMap) {
        marketMap.remove();
        marketMap = null;
    }

    marketMap = L.map(mapElement).setView([lat, lon], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19
    }).addTo(marketMap);

    marketMapLayer = L.layerGroup().addTo(marketMap);

    L.marker([lat, lon])
        .bindPopup("Search location")
        .addTo(marketMapLayer);

    L.circle([lat, lon], {
        radius: report.radius_km * 1000,
        color: "#dca52f",
        fillOpacity: 0.08
    }).addTo(marketMapLayer);

    (report.businesses || []).forEach(business => {
        if (
            typeof business.latitude !== "number" ||
            typeof business.longitude !== "number"
        ) return;

        const marker = L.marker([
            business.latitude,
            business.longitude
        ]);

        const popup = document.createElement("div");
        const name = document.createElement("strong");
        name.textContent = business.name || "Unnamed mapped business";

        const category = document.createElement("div");
        category.textContent = business.category || "Other";

        const distance = document.createElement("div");
        distance.textContent =
            `${business.distance_km} km from search location`;

        popup.append(name, category, distance);
        marker.bindPopup(popup);
        marker.addTo(marketMapLayer);
    });

    setTimeout(() => marketMap.invalidateSize(), 100);
}

async function runMarketSearch(event) {
    event.preventDefault();

    const form = document.getElementById("market-form");
    const button = document.getElementById("market-search-btn");
    const message = document.getElementById("market-message");
    const results = document.getElementById("market-results");

    const location = form.elements.location.value.trim();
    const businessType = form.elements.business_type.value;
    const radius = Number(form.elements.radius_km.value);

    button.disabled = true;
    button.textContent = "Analysing market...";
    message.textContent = "Looking up the location and nearby mapped businesses...";
    results.hidden = true;

    try {
        const response = await fetch(
            `${MARKET_API_BASE}/api/market-intelligence`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    location,
                    business_type: businessType,
                    radius_km: radius
                })
            }
        );

        const report = await response.json();

        if (!response.ok) {
            throw new Error(
                typeof report.detail === "string"
                    ? report.detail
                    : "Market analysis failed. Please try again."
            );
        }

        document.getElementById("market-count").textContent =
            report.competitor_count;

        document.getElementById("market-saved").textContent =
            report.saved ? "Saved" : "Not saved";

        document.getElementById("market-report-id").textContent =
            report.report_id
                ? `Report ID: ${report.report_id}`
                : "No report ID returned";

        document.getElementById("market-summary").textContent =
            `${report.summary} Location: ${report.location}`;

        const tbody = document.getElementById("market-business-list");
        tbody.replaceChildren();

        (report.businesses || []).forEach(business => {
            const tr = document.createElement("tr");

            [
                business.name || "Unnamed mapped business",
                business.category || "Other",
                `${business.distance_km} km`
            ].forEach(value => {
                const td = document.createElement("td");
                td.textContent = value;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });

        results.hidden = false;
        showMarketMap(report);

        message.textContent = "Market analysis completed.";
    } catch (error) {
        console.error("Market analysis failed:", error);
        message.textContent =
            `${error.message} Check that the FastAPI server is running.`;
    } finally {
        button.disabled = false;
        button.textContent = "Analyse nearby market";
    }
}


// Render the selected page and attach its event listeners.
function renderPage(key) {
  const page = pages[key] || pages.onboarding;

  navItems.forEach((item) => {
    item.classList.toggle(
      "active",
      item.dataset.page === key
    );
  });

  main.innerHTML = `
    <h1 class="page-title">${page.title}</h1>
    <p class="subtitle">${page.sub}</p>
    ${page.render()}
  `;
  // Fetch real profile data whenever Onboarding is opened.
if (key === "onboarding") {
    loadOnboardingProfile();
}

if (key === "market") {
    const marketForm = document.getElementById("market-form");

    marketForm.addEventListener("submit", runMarketSearch);

    (async () => {
        const message = document.getElementById("market-message");

        try {
            const profile =
                window.vikaasProfile ||
                await window.getVikaasProfile();

            if (!profile) {
                throw new Error("No saved profile was found.");
            }

            window.vikaasProfile = profile;
            fillMarketForm(profile);

        } catch (error) {
            console.error("Could not pre-fill market form:", error);
            message.textContent =
                "Your saved profile could not be loaded. You can still enter a location manually.";
        }
    })();
}


  // Handle navigation buttons inside each page.
  main.querySelectorAll("[data-goto]").forEach((button) => {
    button.addEventListener("click", () => {
      renderPage(button.dataset.goto);
    });
  });

  // Handle AI advisor chat submissions.
  const chatForm = document.getElementById("chat-form");

  if (chatForm) {
    chatForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const input = document.getElementById("question");
      const chatBody = document.getElementById("chat-body");
      const question = input.value.trim();

      if (!question) {
        return;
      }

      chatBody.insertAdjacentHTML(
        "beforeend",
        `
          <div class="bubble user">
            ${escapeHtml(question)}
          </div>

          <div class="bubble bot">
            ${escapeHtml(answer(question))}
          </div>
        `
      );

      input.value = "";
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  }

  // Handle business case printing.
  const exportButton = document.getElementById("export");

  if (exportButton) {
    exportButton.addEventListener("click", () => {
      document.getElementById("export-note").textContent =
        'Your business case is ready to print. Choose "Save as PDF" in the print dialog.';

      window.print();
    });
  }
}

// Escape user input before inserting it into HTML.
function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return entities[character];
  });
}

// Generate a sample response for the AI advisor.
function answer(question) {
    if (/loan|amount|margin/i.test(question)) {
        return "Based on the sample profile, your estimated project cost is ₹1,80,000 and the potential loan amount is ₹1,62,000. Please confirm eligibility and terms with the relevant scheme office.";
    }

    if (/interest|rate/i.test(question)) {
        return "The sample Term Loan Scheme shown here uses an illustrative interest rate of 8%. Please verify the current rate with the lending institution.";
    }

    if (/emi|repay|payment/i.test(question)) {
        return "The sample planner shows a 6-month moratorium, followed by quarterly payments. Keep working capital available during the moratorium period.";
    }

    return "I can help you explore the sample market report, project feasibility, scheme recommendation and repayment plan. For an actual loan, please verify details with the relevant authority.";
}
// Handle sidebar navigation
navItems.forEach((item) => {
    item.addEventListener("click", () => {
        const pageName = item.dataset.page;

        if (pages[pageName]) {
            renderPage(pageName);
        } else {
            console.error("Page not found:", pageName);
        }
    });
});

// Display the initial page when the website loads
renderPage("onboarding");