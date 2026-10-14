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
  title: "AI-powered business feasibility report",
  sub: "Generated from your entrepreneur profile and latest local market intelligence.",
  render: () => `
    <div class="content">
      <div class="panel">
        <h2>Generate your feasibility report</h2>
        <p>
          Gemini will analyse your business idea, available margin,
          mapped competitors and local market data.
        </p>
        <p class="muted">
          Run Market Intelligence first so this report uses your latest search.
        </p>
        <button class="btn" id="generate-feasibility-btn">
          Generate AI feasibility report
        </button>
        <p id="feasibility-status" role="status" aria-live="polite"></p>
      </div>

      <div id="feasibility-results" class="content"></div>

      <button class="btn" style="margin-top: 18px" data-goto="finance">
        Continue to financial planning →
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
  sub: "Calculate quarterly repayments and estimate working capital during the moratorium.",
  render: () => `
    <div class="content">

      <div class="panel">
        <h2>Loan details</h2>

        <div class="grid2">
          <div>
            <label for="emi-loan">Loan amount (₹)</label>
            <input id="emi-loan" type="number" min="1"
              value="162000" />
          </div>

          <div>
            <label for="emi-rate">Annual interest rate (%)</label>
            <input id="emi-rate" type="number" min="0"
              max="100" step="0.1" value="8" />
          </div>

          <div>
            <label for="emi-tenure">Repayment tenure (years)</label>
            <input id="emi-tenure" type="number" min="1"
              max="30" value="7" />
          </div>

          <div>
            <label for="emi-moratorium">Moratorium (months)</label>
            <input id="emi-moratorium" type="number" min="0"
              max="60" value="6" />
          </div>

          <div>
            <label for="emi-expenses">Monthly business expenses (₹)</label>
            <input id="emi-expenses" type="number" min="0"
              value="4000" />
          </div>
        </div>

        <p class="muted">
          Illustrative estimate. Actual repayment depends on the
          lender's terms and treatment of interest during moratorium.
        </p>

        <button class="btn" id="calculate-emi">
          Calculate repayment plan
        </button>
        <p id="emi-error" role="status"></p>
      </div>

      <div id="emi-results" class="content"></div>

      <button class="btn" style="margin-top:18px"
        data-goto="advisor">
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
        window.lastMarketReport = report;

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
  
const calculateEmiButton = document.getElementById("calculate-emi");

if (calculateEmiButton) {
  calculateEmiButton.addEventListener("click", () => {
    console.log("EMI button found:", calculateEmiButton);
    const loan = Number(document.getElementById("emi-loan").value);
    const annualRate = Number(document.getElementById("emi-rate").value);
    const tenureYears = Number(document.getElementById("emi-tenure").value);
    const moratoriumMonths = Number(
      document.getElementById("emi-moratorium").value
    );
    const monthlyExpenses = Number(
      document.getElementById("emi-expenses").value
    );

    const error = document.getElementById("emi-error");
    const results = document.getElementById("emi-results");

    error.textContent = "";
    results.replaceChildren();

    if (
      !Number.isFinite(loan) || loan <= 0 ||
      !Number.isFinite(annualRate) || annualRate < 0 || annualRate > 100 ||
      !Number.isInteger(tenureYears) || tenureYears < 1 || tenureYears > 30 ||
      !Number.isInteger(moratoriumMonths) ||
      moratoriumMonths < 0 || moratoriumMonths > 60 ||
      !Number.isFinite(monthlyExpenses) || monthlyExpenses < 0
    ) {
      error.textContent = "Please enter valid loan details.";
      return;
    }

    const fmt = (value) =>
      "₹" + Math.round(value).toLocaleString("en-IN");

    const monthlyRate = annualRate / 1200;
    const totalMonths = tenureYears * 12;

    // Illustrative assumption: interest is not capitalized
    // during the moratorium; repayments start afterwards.
    const repaymentMonths = totalMonths - moratoriumMonths;

    if (repaymentMonths <= 0) {
      error.textContent =
        "The moratorium must be shorter than the repayment tenure.";
      return;
    }

    let monthlyPayment;

    if (monthlyRate === 0) {
      monthlyPayment = loan / repaymentMonths;
    } else {
      const power = Math.pow(1 + monthlyRate, repaymentMonths);
      monthlyPayment =
        loan * monthlyRate * power / (power - 1);
    }

    const quarterlyPayment = monthlyPayment * 3;
    const quarterlyPrincipal = loan / Math.ceil(repaymentMonths / 3);
    const quarterlyRows = [];
    let balance = loan;
    let totalInterest = 0;

    const totalQuarters = Math.ceil(totalMonths / 3);

    for (let q = 1; q <= totalQuarters; q++) {
      const startMonth = (q - 1) * 3;
      const monthsInQuarter = Math.min(3, totalMonths - startMonth);
      let principalDue = 0;
      let interestDue = 0;

      for (let m = 0; m < monthsInQuarter; m++) {
        const monthNumber = startMonth + m + 1;

        if (monthNumber <= moratoriumMonths) {
          continue;
        }

        const interest = balance * monthlyRate;
        const principal = Math.min(
          balance,
          Math.max(0, monthlyPayment - interest)
        );

        interestDue += interest;
        principalDue += principal;
        balance -= principal;
      }

      totalInterest += interestDue;

      const isMoratorium = startMonth + monthsInQuarter <= moratoriumMonths;
      const payment = principalDue + interestDue;

      quarterlyRows.push(`
        <tr>
          <td>Q${q}</td>
          <td>${fmt(principalDue)}</td>
          <td>${fmt(interestDue)}</td>
          <td>${fmt(payment)}</td>
          <td>${isMoratorium ? "Moratorium" : "Repayment"}</td>
        </tr>
      `);
    }

    const workingCapital = monthlyExpenses * moratoriumMonths;

    results.innerHTML = `
      <div class="grid2">
        <div class="stat">
          <strong>${fmt(monthlyPayment)}</strong>
          <small>Estimated monthly repayment after moratorium</small>
        </div>
        <div class="stat">
          <strong>${fmt(quarterlyPayment)}</strong>
          <small>Approximate quarterly payment for 3 full repayment months</small>
        </div>
        <div class="stat">
          <strong>${fmt(totalInterest)}</strong>
          <small>Estimated total interest over repayment</small>
        </div>
        <div class="stat">
          <strong>${fmt(workingCapital)}</strong>
          <small>Working capital for the moratorium period</small>
        </div>
      </div>

      <div class="panel" style="margin-top:16px">
        <h2>Quarterly repayment schedule</h2>
        <div style="overflow-x:auto">
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
            <tbody>${quarterlyRows.join("")}</tbody>
          </table>
        </div>
        <p class="muted">
          Estimates assume equal monthly instalments after the
          moratorium and no interest capitalization during it.
          Actual lender schedules may differ.
        </p>
      </div>
    `;
  });
}

const feasibilityButton = document.getElementById(
  "generate-feasibility-btn"
);

if (feasibilityButton) {
  feasibilityButton.addEventListener("click", async () => {
    const status = document.getElementById("feasibility-status");
    const results = document.getElementById("feasibility-results");

    const profile = window.vikaasProfile;
    const marketReport = window.lastMarketReport;

    if (!profile) {
      status.textContent =
        "Your saved profile is not loaded. Reopen Onboarding and try again.";
      return;
    }

    if (!marketReport) {
      status.textContent =
        "Please run Market Intelligence successfully before generating this report.";
      return;
    }

    feasibilityButton.disabled = true;
    status.textContent = "Gemini is analysing your business and market data...";
    results.replaceChildren();

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/feasibility-report",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            profile,
            market_report: marketReport
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || "Unable to generate the feasibility report."
        );
      }

      const report = data.report;

      const sections = [
        ["Strengths", report.strengths],
        ["Weaknesses", report.weaknesses],
        ["Opportunities", report.opportunities],
        ["Threats", report.threats],
        ["Customer validation steps", report.customer_validation_steps],
        ["Operational requirements", report.operational_requirements],
        ["Financial assumptions", report.financial_assumptions],
        ["Key risks", report.key_risks],
        ["Recommended next steps", report.next_steps],
        ["Data limitations", report.data_limitations]
      ];

      const listHtml = (items) => {
        if (!Array.isArray(items) || items.length === 0) {
          return "<p>Not available.</p>";
        }

        return `<ul>${items.map(item =>
          `<li>${escapeHtml(String(item))}</li>`
        ).join("")}</ul>`;
      };

      results.innerHTML = `
        <div class="panel">
          <div class="section-head">
            <h2>Feasibility assessment</h2>
            <span class="status">${escapeHtml(
              String(report.feasibility_status || "Needs validation")
            )}</span>
          </div>

          <h3>Executive summary</h3>
          <p>${escapeHtml(String(report.executive_summary || ""))}</p>

          <h3>Assessment rationale</h3>
          <p>${escapeHtml(String(report.status_reason || ""))}</p>

          <h3>Competitor analysis</h3>
          <p>${escapeHtml(String(report.competitor_analysis || ""))}</p>

          ${sections.map(([title, items]) => `
            <section>
              <h3>${escapeHtml(title)}</h3>
              ${listHtml(items)}
            </section>
          `).join("")}

          <p class="muted">
            Generated using ${escapeHtml(String(data.model || "Gemini"))}.
            Market coverage may be incomplete; validate assumptions locally.
          </p>

          <button class="btn" id="print-feasibility-btn">
            Print / Save report as PDF
          </button>
        </div>
      `;

      document.getElementById("print-feasibility-btn")
        .addEventListener("click", () => window.print());

      status.textContent = "Feasibility report generated successfully.";
    } catch (error) {
      console.error("Feasibility generation failed:", error);
      status.textContent = error.message ||
        "Something went wrong. Check the backend terminal.";
    } finally {
      feasibilityButton.disabled = false;
    }
  });
}

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