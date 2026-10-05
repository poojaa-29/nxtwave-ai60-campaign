# NxtWave Campaign: "Build Your First AI Project in 60 Minutes"

> **Recruitment / Growth Challenge Prototype**  
> **Goal:** Get 500 final-year engineering students to register for a FREE online hands-on AI workshop.  
> **Budget:** ₹2,000 | **Acquisition Model:** High-intent college distribution + viral peer referral gamification (K-factor > 0.4).

---

## 🚀 Live Demo & Quick Launch

### 1. Instant 1-Click Launch (Windows)
Double-click `start.bat` in this folder, or run:
```bash
# If using Python:
python -m http.server 3000

# If using Node:
npx serve -l 3000 .

# Or simply double-click index.html to view directly in any browser!
```
Open **[http://localhost:3000](http://localhost:3000)**.

---

## ⏱️ 3-Minute Interview Walkthrough Guide

Use this exact narrative during your interview / assessment:

### Minute 1: The Core Value Proposition & "60-Minute Hook"
- **The Pain Point:** Final-year engineering students face acute campus placement anxiety. Recruiters reject generic e-commerce or library management academic projects.
- **The Hook:** *"Build Your First AI Project in 60 Minutes"* offers an instant, high-urgency win.
- **The Workshop Deliverable:** A real, functioning **AI Resume Screener & Recruiter Q&A Agent** deployed live with a shareable URL and clean GitHub repo link. Zero prior AI/GPU setup required.

### Minute 2: The Viral Referral Gamification Engine
- **Frictionless Registration:** Name, Email, WhatsApp Phone, College, Branch, Grad Year (`2025`).
- **Instant Referral Hub:** Upon registration, each student immediately receives a unique referral code (`NXT-NAME-XXX`) and shareable link.
- **5 Gamification Tiers:**
  1. **1 Referral** → **AI Starter** (*Curated AI Project Source Code Pack*)
  2. **3 Referrals** → **AI Builder** (*Verified Priority Certificate & Digital Badge*)
  3. **5 Referrals** → **AI Explorer** (*VIP 30-min Q&A with Senior AI Architect*)
  4. **10 Referrals** → **AI Accelerator** (*AI Resume & Portfolio Audit Template*)
  5. **20 Referrals** → **AI Champion** (*1-on-1 Mentorship + NxtWave Exclusive Tech Swag Pack*)
- **Interactive Live Demo:** Click the **"+1 Referral"** or **"+3 Referrals"** simulation buttons on the Student Referral Hub to watch the progress bar animate, badges unlock, and rank climb on the live leaderboard in real time!

### Minute 3: Distribution, College Outreach & ₹2,000 Budget Unit Economics
- **College Outreach Tracker:** 50 targeted WhatsApp/Telegram groups across 12+ top engineering colleges (JNTU-H, CBIT, VNR VJIET, Vasavi, SRM, VIT, etc.) reaching an estimated 10,000 students.
- **Dynamic 500-Registration Funnel:**
  - Reach: 10,000 students
  - Visitors (20% CTR): 2,000
  - Direct Registrations (17.5%): 350
  - Students Sharing (40%): 140
  - Viral Referrals (1.08 avg): 151
  - **Total Projected Registrations = 501**
- **Editable Assumptions:** Move sliders for community count, conversion rate, and referral participation to show sensitivity analysis.
- **Budget & CAC:** Total budget is **₹2,000**.
  $$\text{CAC} = \frac{₹2,000}{500} = ₹4.00 \text{ per student}$$
  *(Compared to ₹150–₹300 CAC in traditional EdTech paid ads).*

---

## 🛠️ Complete Feature Matrix

| Module | Features Included |
| :--- | :--- |
| **1. Landing Page** | Hero, Value proposition, "What You'll Build" interactive sandbox preview, Who should attend, 60-min minute-by-minute timeline, FAQs accordion, Alumni testimonials, Final urgency CTA. |
| **2. Registration System** | Full form with validation (Name, Email, 10-digit WhatsApp phone, College dropdown, Branch, Grad Year, Optional referral code), Quick Demo Autofill button, Confetti celebration modal. |
| **3. Referral Dashboard** | Student details, Unique code & link, Copy link button, Share on WhatsApp button, Copy WhatsApp message template, Live demo referral simulator buttons (`+1`, `+3`). |
| **4. Referral Gamification** | 5 Tiers (AI Starter, AI Builder, AI Explorer, AI Accelerator, AI Champion) with progress bar and unlockable perks. |
| **5. Leaderboard** | Top 10 rankings table, Clear `DEMO DATA` badge, Current student highlighted with "YOU" tag and sticky position card, Total referrals count. |
| **6. Admin / Campaign Dashboard** | Target (500), Current, Remaining, Progress %, Direct vs Referral split, Active referrers, Avg referrals/student, Cost per registration. 4 responsive Chart.js visualizations. |
| **7. 500 Funnel & Assumptions** | Visual step-down funnel flow (Reach → Visitors → Direct Regs → Sharing → Viral Referrals → 500 Total). 6 editable sliders with real-time recalculation. |
| **8. 7-Day Campaign Plan** | Day 1 to Day 7 sprint playbook with targets, channels, tactics, deliverables, and status tags. |
| **9. College Outreach Tracker** | Interactive table of 12 colleges, community types, student pools, inline status dropdowns, editable actual numbers, and "Add Target College" modal. |
| **10. Budget Calculator** | ₹2,000 budget breakdown (Promotion ₹800, Content ₹500, Testing ₹400, Contingency ₹300), dynamic CAC calculator, comparison with industry paid ad benchmarks. |
| **11. Demo Mode & Controls** | Sticky Top Demo Banner, "Reset Demo Data" button, "3-Min Pitch Tour" interactive modal, `localStorage` persistence. |

---

## 📁 Project Structure

```
nxtwave-ai60-campaign/
├── index.html          # Main HTML structure with Tailwind CSS, Lucide icons, Chart.js
├── css/
│   └── styles.css      # Custom dark tech theme, glassmorphism, animations, glow effects
├── js/
│   ├── data.js         # Static seed data (assumptions, colleges, timeline, leaderboard, FAQs)
│   ├── store.js        # Reactive state store with localStorage persistence & math calculations
│   └── app.js          # View controllers, routing, form validation, charts, and event handlers
├── start.bat           # Windows 1-click launch script
├── package.json        # NPM run scripts
└── README.md           # Documentation & interview guide
```

---

*Note: All data in this prototype is simulated for growth evaluation and interview demonstration.*
