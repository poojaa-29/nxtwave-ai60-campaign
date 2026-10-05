/**
 * Simulated NxtWave Campaign Initial Data & Configurations
 * Campaign: "Build Your First AI Project in 60 Minutes"
 * Goal: 500 Final-Year Engineering Registrations
 * Note: Clearly labeled as DEMO DATA / ASSUMPTIONS for prototype evaluation.
 */

window.NXT_INITIAL_DATA = {
  // Campaign Metadata
  campaign: {
    title: "Build Your First AI Project in 60 Minutes",
    tagline: "Free Hands-on Online Workshop for Final-Year Engineering Students",
    targetRegistrations: 500,
    workshopDate: "Saturday, 6:00 PM - 7:00 PM IST",
    platform: "Live Interactive Cloud Lab + Zoom Webinar",
    totalSeats: 500,
    demoMode: true,
  },

  // Editable Assumptions for the 500-Registration Model
  assumptions: {
    communitiesCount: 50,           // Number of engineering WhatsApp/Telegram/Discord groups
    avgCommunitySize: 200,          // Average final-year students per group
    clickThroughRate: 20.0,         // % who click the link (Visitors = 50 * 200 * 20% = 2,000 visitors)
    conversionRate: 17.5,           // % of visitors who register directly (Direct = 350)
    referralParticipationRate: 40.0,// % of registered students who share referral link (140 students)
    avgReferralsPerStudent: 1.08,   // Average successful referrals per sharing student (140 * 1.08 ≈ 151)
    // Direct (350) + Referral (150) = 500 Total Target
  },

  // Editable Budget Allocation (Total = ₹2,000)
  budget: {
    totalBudget: 2000,
    communityPromotion: 800,  // Micro-incentives & campus ambassador perks
    contentCreative: 500,     // Poster templates, short video reels, copy assets
    testingTools: 400,        // WhatsApp broadcast API testing, domain, analytics
    contingency: 300,         // Buffer for last 48-hour push
  },

  // Referral Milestones Gamification
  milestones: [
    {
      level: 1,
      name: "AI Starter",
      referralsRequired: 1,
      badge: "🌱 Starter",
      perk: "Curated AI Project Source Code Pack (Starter Boilerplate & API setup)",
      color: "emerald"
    },
    {
      level: 2,
      name: "AI Builder",
      referralsRequired: 3,
      badge: "⚡ Builder",
      perk: "Verified Priority Certificate with Digital Credential & GitHub Badge",
      color: "blue"
    },
    {
      level: 3,
      name: "AI Explorer",
      referralsRequired: 5,
      badge: "🚀 Explorer",
      perk: "Exclusive VIP 30-min Post-Workshop Q&A with Senior AI Architect",
      color: "indigo"
    },
    {
      level: 4,
      name: "AI Accelerator",
      referralsRequired: 10,
      badge: "🔥 Accelerator",
      perk: "AI Resume & Portfolio Audit Template (Placement-Ready Format)",
      color: "purple"
    },
    {
      level: 5,
      name: "AI Champion",
      referralsRequired: 20,
      badge: "🏆 Champion",
      perk: "1-on-1 AI Career Mentorship Session + NxtWave Exclusive Tech Swag Pack",
      color: "amber"
    }
  ],

  // 60-Minute Workshop Timeline Breakdown
  timeline: [
    {
      time: "00:00 - 00:10",
      duration: "10 Mins",
      title: "De-mystifying GenAI & LLM Architecture",
      description: "Quick mental model of how GPT-4, Claude & Open LLMs work. Setting up your free API keys in zero-config cloud IDE without needing a high-end GPU.",
      deliverable: "Cloud sandbox live & API connectivity verified"
    },
    {
      time: "00:10 - 00:25",
      duration: "15 Mins",
      title: "Prompt Engineering & Few-Shot Reasoning",
      description: "Hands-on crafting of system prompts, chain-of-thought instructions, structured JSON outputs, and handling edge cases for production AI apps.",
      deliverable: "Functional AI reasoning engine script"
    },
    {
      time: "00:25 - 00:45",
      duration: "20 Mins",
      title: "Building the AI Project: 'Smart Resume & Interview Screener'",
      description: "Coding the core application: upload any tech job description and resume, generate instant ATS match score, identify missing skills, and generate custom interview practice questions.",
      deliverable: "Fully working interactive AI Web Application"
    },
    {
      time: "00:45 - 00:55",
      duration: "10 Mins",
      title: "1-Click Cloud Deployment to Live Web URL",
      description: "Deploying your application live to the web using Streamlit/Vercel. Adding custom domain and pushing clean code to your personal GitHub repository.",
      deliverable: "Live public URL + GitHub repo link ready for resume"
    },
    {
      time: "00:55 - 01:00",
      duration: "5 Mins",
      title: "Campus Placement Pitch & Next Steps",
      description: "How to explain this AI project to technical interviewers, answer architecture questions confidently, and claim your verified NxtWave workshop certificate.",
      deliverable: "Interview pitch template + verified certificate download"
    }
  ],

  // What Students Will Build (Project Showcase)
  projectShowcase: {
    title: "AI Smart Resume Screener & Technical Interview Coach",
    description: "A production-ready full-stack AI web app that parses resumes against tech job descriptions, calculates fitment scores, and generates bespoke technical interview question banks using modern LLMs.",
    techStack: ["Python", "OpenAI / Claude API", "LangChain", "Streamlit UI", "GitHub & Cloud Hosting"],
    whyItMattersForPlacements: "74% of tech interviewers now test practical AI fluency. Having a deployed, working AI application puts final-year students ahead of 90% of candidates who only have generic CRUD projects."
  },

  // 7-Day Campaign Plan Playbook
  campaignPlan: [
    {
      day: "Day 1",
      title: "Recruit & Onboard 25 Campus Ambassadors",
      targetDailyRegs: 40,
      targetCumulative: 40,
      channels: "LinkedIn, Final-year Placement Reps, Tech Club Leads",
      tactics: [
        "Reach out to tech leads across 20 target engineering colleges",
        "Offer exclusive Ambassador Certificate + priority mentor access",
        "Distribute custom referral kits (WhatsApp banners, caption templates, tracking links)",
        "Host 20-minute ambassador sync explaining the 60-min value proposition"
      ],
      deliverable: "25 committed ambassadors across 15 tier-1/tier-2 colleges",
      status: "Completed"
    },
    {
      day: "Day 2",
      title: "College WhatsApp & Community Distribution Blitz",
      targetDailyRegs: 75,
      targetCumulative: 115,
      channels: "Official & Unofficial College WhatsApp Groups, Telegram, Discord",
      tactics: [
        "Ambassadors post high-converting copy in branch-specific groups (CSE, IT, ECE)",
        "Focus on final-year pain point: 'Still have only a basic library management system on your resume?'",
        "Pin registration link with urgency ('500 Cloud Lab Seats Capped')",
        "Track initial click-throughs from each college code"
      ],
      deliverable: "50+ college communities actively reached with initial 115+ registrations",
      status: "Completed"
    },
    {
      day: "Day 3",
      title: "Referral Engine Launch & Gamification Push",
      targetDailyRegs: 90,
      targetCumulative: 205,
      channels: "Post-registration WhatsApp confirmation & Automated SMS nudge",
      tactics: [
        "Trigger instant welcome screen highlighting the 1-referral 'AI Starter Code Pack'",
        "Launch live leaderboard: 'Top 3 referrers get direct resume review from senior AI engineers'",
        "Prompt students to share with project team members & hostel study groups",
        "Gamification milestone alerts sent via WhatsApp"
      ],
      deliverable: "Viral K-factor increases to 0.65; referral registrations jump",
      status: "Completed"
    },
    {
      day: "Day 4",
      title: "Social Proof & Milestone Hype Campaign",
      targetDailyRegs: 85,
      targetCumulative: 290,
      channels: "Instagram Stories, LinkedIn Posts, WhatsApp Status updates",
      tactics: [
        "Broadcast milestone: 'Over 250 final-year engineers already registered!'",
        "Share 30-second teaser video of the working AI Resume Screener project",
        "Ambassadors post proof of registration on their WhatsApp statuses",
        "Feature top 5 colleges on the live leaderboard"
      ],
      deliverable: "High viral word-of-mouth momentum and cross-college peer competition",
      status: "Active"
    },
    {
      day: "Day 5",
      title: "Re-Engage Unconverted Leads & Placement Rep Push",
      targetDailyRegs: 75,
      targetCumulative: 365,
      channels: "Email follow-ups, Placement Coordinator notices, WhatsApp reminders",
      tactics: [
        "Send reminder to incomplete registration clicks with FAQ addressing 'No AI knowledge required'",
        "Partner with Department Placement Coordinators to endorse the workshop",
        "Emphasize the free verified NxtWave workshop certificate for campus placement resumes",
        "Second referral nudge to students who have 0 or 1 referral to hit AI Builder"
      ],
      deliverable: "Recapture 40+ dormant leads and push total past 360",
      status: "Upcoming"
    },
    {
      day: "Day 6",
      title: "Last 48-Hour Urgency & Seat Cap Countdown",
      targetDailyRegs: 70,
      targetCumulative: 435,
      channels: "WhatsApp broadcast, Countdown banner, Ambassador urgency blitz",
      tactics: [
        "Display live countdown: 'Only 65 Cloud Lab seats remaining!'",
        "Host 10-minute live AMA on Instagram/Discord with the workshop trainer",
        "Final referral sprint: 'Refer 2 friends before midnight to lock your VIP Q&A ticket'",
        "Direct outreach to students from lagging colleges"
      ],
      deliverable: "Urgency surge pushing campaign to ~87% of 500 target",
      status: "Upcoming"
    },
    {
      day: "Day 7",
      title: "Final Registration Sprint & Workshop Onboarding",
      targetDailyRegs: 65,
      targetCumulative: 500,
      channels: "SMS alerts, WhatsApp reminder broadcast, Calendar invites",
      tactics: [
        "Morning blast: 'Workshop starts today at 6:00 PM IST — Final 30 seats opened'",
        "Send calendar invite (.ics) and 1-click cloud workspace prep instructions",
        "Close registrations precisely at 500 students to maintain cloud lab capacity",
        "Publish final Hall of Fame Leaderboard recognizing top 10 student ambassadors"
      ],
      deliverable: "500 verified final-year registrations achieved within ₹2,000 budget!",
      status: "Upcoming"
    }
  ],

  // College Outreach Tracker Initial Demo Data (12 Representative Colleges)
  collegesOutreach: [
    {
      id: "col-1",
      college: "JNTU Hyderabad (College of Engineering)",
      communityType: "WhatsApp Group & Tech Club",
      estimatedStudents: 320,
      status: "Active",
      expectedRegistrations: 65,
      actualRegistrations: 68,
      ambassador: "Sai Teja V."
    },
    {
      id: "col-2",
      college: "Chaitanya Bharathi Institute of Tech (CBIT)",
      communityType: "Placement WhatsApp & Discord",
      estimatedStudents: 280,
      status: "Active",
      expectedRegistrations: 55,
      actualRegistrations: 52,
      ambassador: "Ananya Reddy"
    },
    {
      id: "col-3",
      college: "VNR Vignana Jyothi Institute (VNR VJIET)",
      communityType: "Official Telegram Channel",
      estimatedStudents: 260,
      status: "Active",
      expectedRegistrations: 50,
      actualRegistrations: 46,
      ambassador: "Karthik Sharma"
    },
    {
      id: "col-4",
      college: "Vasavi College of Engineering",
      communityType: "CSE Final Year WhatsApp",
      estimatedStudents: 220,
      status: "Shared",
      expectedRegistrations: 40,
      actualRegistrations: 38,
      ambassador: "Sneha Patel"
    },
    {
      id: "col-5",
      college: "Osmania University (UCEOU)",
      communityType: "Campus WhatsApp & Placement Cell",
      estimatedStudents: 240,
      status: "Active",
      expectedRegistrations: 45,
      actualRegistrations: 41,
      ambassador: "Rahul Verma"
    },
    {
      id: "col-6",
      college: "Gokaraju Rangaraju Inst of Tech (GRIET)",
      communityType: "AI/ML Club WhatsApp",
      estimatedStudents: 200,
      status: "Shared",
      expectedRegistrations: 35,
      actualRegistrations: 33,
      ambassador: "Pooja Deshmukh"
    },
    {
      id: "col-7",
      college: "SRM Institute of Science and Tech",
      communityType: "Telegram Final Year Tech Hub",
      estimatedStudents: 350,
      status: "Interested",
      expectedRegistrations: 50,
      actualRegistrations: 31,
      ambassador: "Aditya Nair"
    },
    {
      id: "col-8",
      college: "VIT Vellore (AP/TN Network)",
      communityType: "Discord Coding Society",
      estimatedStudents: 300,
      status: "Shared",
      expectedRegistrations: 45,
      actualRegistrations: 29,
      ambassador: "Rhea Sundaram"
    },
    {
      id: "col-9",
      college: "Vardhaman College of Engineering",
      communityType: "Class Representative Network",
      estimatedStudents: 180,
      status: "Contacted",
      expectedRegistrations: 30,
      actualRegistrations: 18,
      ambassador: "Manoj Kumar"
    },
    {
      id: "col-10",
      college: "Anurag University",
      communityType: "WhatsApp Placement Group",
      estimatedStudents: 190,
      status: "Shared",
      expectedRegistrations: 30,
      actualRegistrations: 20,
      ambassador: "Deepika Rao"
    },
    {
      id: "col-11",
      college: "CVR College of Engineering",
      communityType: "Tech Fest Alumni & Student Group",
      estimatedStudents: 210,
      status: "Interested",
      expectedRegistrations: 30,
      actualRegistrations: 14,
      ambassador: "Vikram Goud"
    },
    {
      id: "col-12",
      college: "Mahatma Gandhi Inst of Tech (MGIT)",
      communityType: "ECE & CSE Study Groups",
      estimatedStudents: 170,
      status: "Contacted",
      expectedRegistrations: 25,
      actualRegistrations: 8,
      ambassador: "Harini M."
    }
  ],

  // Initial Simulated Leaderboard Data (Top 10 Fictional Demo Students)
  leaderboard: [
    {
      rank: 1,
      name: "Rohit K. Nambiar",
      college: "JNTU Hyderabad",
      branch: "CSE",
      referrals: 22,
      milestone: "AI Champion",
      badge: "🏆 Champion",
      code: "NXT-ROHIT-701"
    },
    {
      rank: 2,
      name: "Pooja Deshmukh",
      college: "GRIET Hyderabad",
      branch: "IT",
      referrals: 18,
      milestone: "AI Accelerator",
      badge: "🔥 Accelerator",
      code: "NXT-POOJA-812"
    },
    {
      rank: 3,
      name: "Karthik Sharma",
      college: "VNR VJIET",
      branch: "CSE",
      referrals: 15,
      milestone: "AI Accelerator",
      badge: "🔥 Accelerator",
      code: "NXT-KART-503"
    },
    {
      rank: 4,
      name: "Sneha Patel",
      college: "Vasavi College of Engg",
      branch: "ECE",
      referrals: 12,
      milestone: "AI Accelerator",
      badge: "🔥 Accelerator",
      code: "NXT-SNEHA-394"
    },
    {
      rank: 5,
      name: "Ananya Reddy",
      college: "CBIT Hyderabad",
      branch: "CSE (AI/ML)",
      referrals: 11,
      milestone: "AI Accelerator",
      badge: "🔥 Accelerator",
      code: "NXT-ANAN-205"
    },
    {
      rank: 6,
      name: "Aditya Nair",
      college: "SRM IST",
      branch: "CSE",
      referrals: 8,
      milestone: "AI Explorer",
      badge: "🚀 Explorer",
      code: "NXT-ADIT-616"
    },
    {
      rank: 7,
      name: "Sai Teja V.",
      college: "JNTU Hyderabad",
      branch: "IT",
      referrals: 7,
      milestone: "AI Explorer",
      badge: "🚀 Explorer",
      code: "NXT-SAIT-927"
    },
    {
      rank: 8,
      name: "Deepika Rao",
      college: "Anurag University",
      branch: "CSE",
      referrals: 6,
      milestone: "AI Explorer",
      badge: "🚀 Explorer",
      code: "NXT-DEEP-438"
    },
    {
      rank: 9,
      name: "Rahul Verma",
      college: "Osmania University",
      branch: "ECE",
      referrals: 5,
      milestone: "AI Explorer",
      badge: "🚀 Explorer",
      code: "NXT-RAHU-149"
    },
    {
      rank: 10,
      name: "Rhea Sundaram",
      college: "VIT Vellore",
      branch: "CSE",
      referrals: 4,
      milestone: "AI Builder",
      badge: "⚡ Builder",
      code: "NXT-RHEA-750"
    }
  ],

  // Frequently Asked Questions
  faqs: [
    {
      question: "Is this workshop truly 100% free?",
      answer: "Yes, completely free. There are zero hidden fees, no credit card required, and no subscription traps. This initiative is designed by NxtWave to empower final-year engineering students with hands-on AI project skills ahead of campus hiring season."
    },
    {
      question: "Do I need prior AI or Python experience to follow along?",
      answer: "Basic programming concepts (like variables and functions in any language) are helpful, but zero prior AI, machine learning, or deep math experience is required. We supply pre-configured cloud templates and walk you through every single step in real time."
    },
    {
      question: "Do I need a high-end laptop with an expensive GPU?",
      answer: "No. Everything runs inside a browser-based, zero-setup cloud development environment. A standard laptop or desktop with an internet connection is all you need."
    },
    {
      question: "Can non-CSE/IT students (ECE, EEE, Mechanical, Civil) attend?",
      answer: "Absolutely! More than 35% of our workshop attendees come from core engineering branches who want to transition into tech and AI roles. The workshop is tailored specifically for all final-year engineering graduates."
    },
    {
      question: "Will I get a verified certificate upon completion?",
      answer: "Yes. Every student who completes the hands-on project and submits their live project URL receives an industry-recognized NxtWave Workshop Certificate with a unique verification link for their LinkedIn profile and resume."
    },
    {
      question: "How does the referral program and leaderboard work?",
      answer: "Once you register, you receive a unique referral link. When your batchmates register using your link, your referral count increases. You unlock tiered perks (Starter Code Pack, Priority Certificate, VIP Q&A, and 1-on-1 Mentorship) as you hit milestones."
    }
  ],

  // Realistic Alumni & Student Testimonials (Simulated Social Proof)
  testimonials: [
    {
      name: "Vikas Marlapati",
      college: "JNTUH '25",
      role: "Placed at Cognizant",
      comment: "In my campus interview, the panel spent 15 minutes discussing the AI Resume Screener project I built in this 60-min session. It gave me a huge edge over peers who only showed standard college academic projects.",
      rating: 5
    },
    {
      name: "Harshitha G.",
      college: "CBIT '25",
      role: "AI Intern at Tech Mahindra",
      comment: "Most online tutorials waste 3 hours setting up environments. Here, we were deploying working LLM API code inside 20 minutes. The referral code pack was super helpful too!",
      rating: 5
    },
    {
      name: "Aman Tandon",
      college: "SRM IST '25",
      role: "Placed at TCS Digital",
      comment: "I'm from ECE and was scared of AI coding. The step-by-step breakdown made it effortless. Within 60 minutes, my app was live on the internet with a public link!",
      rating: 5
    }
  ],

  // 7-Day Simulated Historical Registration Data for Charts
  historicalDailyRegistrations: [
    { day: "Day 1", date: "Sep 29", direct: 28, referral: 12, cumulative: 40, target: 40 },
    { day: "Day 2", date: "Sep 30", direct: 50, referral: 25, cumulative: 115, target: 115 },
    { day: "Day 3", date: "Oct 01", direct: 52, referral: 38, cumulative: 205, target: 205 },
    { day: "Day 4", date: "Oct 02", direct: 48, referral: 37, cumulative: 290, target: 290 },
    { day: "Day 5", date: "Oct 03", direct: 42, referral: 33, cumulative: 365, target: 365 },
    { day: "Day 6", date: "Oct 04", direct: 38, referral: 32, cumulative: 435, target: 435 },
    { day: "Day 7", date: "Oct 05 (Today)", direct: 35, referral: 30, cumulative: 500, target: 500 }
  ]
};
