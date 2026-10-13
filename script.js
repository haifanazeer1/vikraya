const main = document.getElementById("main");
const navItems = [...document.querySelectorAll(".nav-item")];

let language = "en";

const pages = {
  onboarding: {
    title: "Entrepreneur profile",
    sub: "Details shared by the applicant, used to scope every report that follows.",

    render: () => `
      <div class="section-head">
        <span class="status">✓ PROFILE CREATED</span>
      </div>

      <div class="content panel">
        <div class="grid2">
          <div>
            <div class="muted">Name</div>
            <h3>Lakshmi Devi</h3>
          </div>

          <div>
            <div class="muted">Village / block</div>
            <h3>Chintapally, Nalgonda dt., Telangana</h3>
          </div>

          <div>
            <div class="muted">Business idea</div>
            <h3>Ready-made blouses &amp; garment alterations</h3>
          </div>

          <div>
            <div class="muted">Preferred sector</div>
            <h3>Tailoring &amp; garments</h3>
          </div>

          <div>
            <div class="muted">Available margin (10%)</div>
            <h3>₹18,000</h3>
          </div>

          <div>
            <div class="muted">Scheme interest</div>
            <h3>Government margin-money scheme</h3>
          </div>
        </div>

        <hr style="border: 0; border-top: 1px solid var(--line); margin: 20px 0" />

        <button class="btn" data-goto="market">
          Continue to market intelligence →
        </button>
      </div>
    `
  },

  market: {
    title: "Hyper-local market & competitor intelligence",
    sub: "Estimated for a 5–10 km radius around Chintapally before a rupee is committed.",

    render: () => `
      <div class="grid2 content">
        <div class="map-placeholder">
          <div class="map-circle"></div>

          <i class="pin" style="left: 49%; top: 48%"></i>
          <i class="pin green" style="left: 60%; top: 38%"></i>
          <i class="pin" style="left: 34%; top: 41%"></i>
          <i class="pin green" style="left: 39%; top: 62%"></i>
          <i class="pin" style="left: 66%; top: 64%"></i>

          <div class="map-legend">
            🔴 Your business &nbsp; 🔴 Competitor &nbsp; 🟢 Opportunity
          </div>
        </div>

        <div class="panel">
          <div class="stat">
            <small>IMMEDIATE CONSUMER BASE</small>
            <strong>~2,400</strong>
            <small>households within the 5 km catchment</small>
          </div>

          <div class="stat">
            <small>COMPETITOR DENSITY</small>
            <strong>3</strong>
            <small>tailoring units within 5 km — low saturation</small>
          </div>

          <div class="stat">
            <small>WEEKLY HOUSEHOLD SPEND</small>
            <strong>₹340</strong>
            <small>average spend on garment services nearby</small>
          </div>

          <div class="notice">
            <b>UNDERSERVED NICHE</b><br />
            Ready-stitched blouses + quick alterations
          </div>

          <small>
            Primary channels: Weekly haat · 6 local kirana counters
          </small>
        </div>
      </div>

      <div class="grid2 content" style="margin-top: 12px">
        <div class="stat">
          <strong>3 / 5km</strong>
          <small>
            competitor density, considered low for the local population
          </small>
        </div>

        <div class="stat">
          <strong>LOW</strong>
          <small>
            market saturation — favourable entry conditions detected
          </small>
        </div>
      </div>

      <button
        class="btn"
        style="margin-top: 18px"
        data-goto="feasibility"
      >
        Generate feasibility report →
      </button>
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