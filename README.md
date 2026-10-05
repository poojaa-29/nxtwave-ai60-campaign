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
"# nxtwave-ai60-campaign" 
