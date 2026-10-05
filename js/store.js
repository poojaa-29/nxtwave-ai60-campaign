/**
 * NxtWave AI 60 Campaign - Reactive State Store
 * Handles local storage persistence, calculations, referrals, and live updates.
 */

(function () {
  const STORAGE_KEY = "nxtwave_campaign_state_v2";

  class CampaignStore {
    constructor() {
      this.listeners = [];
      this.state = this.loadState();
    }

    // Default Seed State
    getDefaultState() {
      const initial = window.NXT_INITIAL_DATA;
      
      // Compute initial metrics
      const directRegs = 285;
      const referralRegs = 153;
      const totalRegs = directRegs + referralRegs; // 438 currently, targeting 500
      
      // Default Demo Student for seamless interview preview
      const defaultStudent = {
        id: "demo-user-1",
        name: "Arun Kumar",
        email: "arun.kumar.engg@gmail.com",
        phone: "+91 98490 12345",
        college: "JNTU Hyderabad (College of Engineering)",
        branch: "Computer Science & Engineering",
        gradYear: "2025",
        referralCode: "NXT-ARUN-742",
        referredBy: null,
        referralsCount: 2, // 1 away from AI Builder
        registeredAt: new Date(Date.now() - 36 * 3600 * 1000).toISOString()
      };

      return {
        campaign: { ...initial.campaign },
        assumptions: { ...initial.assumptions },
        budget: { ...initial.budget },
        milestones: JSON.parse(JSON.stringify(initial.milestones)),
        timeline: JSON.parse(JSON.stringify(initial.timeline)),
        projectShowcase: JSON.parse(JSON.stringify(initial.projectShowcase)),
        campaignPlan: JSON.parse(JSON.stringify(initial.campaignPlan)),
        collegesOutreach: JSON.parse(JSON.stringify(initial.collegesOutreach)),
        leaderboard: JSON.parse(JSON.stringify(initial.leaderboard)),
        faqs: JSON.parse(JSON.stringify(initial.faqs)),
        testimonials: JSON.parse(JSON.stringify(initial.testimonials)),
        historicalDaily: JSON.parse(JSON.stringify(initial.historicalDailyRegistrations)),
        
        // Dynamic Live State
        stats: {
          targetRegistrations: 500,
          currentRegistrations: totalRegs,
          directRegistrations: directRegs,
          referralRegistrations: referralRegs,
          activeReferrers: 86,
          averageReferrals: 1.78,
          costPerRegistration: (initial.budget.totalBudget / totalRegs).toFixed(2),
        },
        currentStudent: defaultStudent,
        registeredStudents: [defaultStudent],
        activeRole: "student", // 'student' or 'admin'
        activeTab: "home"      // 'home', 'register', 'referral', 'leaderboard', 'campaign', 'funnel', 'plan', 'outreach', 'budget'
      };
    }

    loadState() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          return parsed;
        }
      } catch (err) {
        console.warn("Failed to load state from localStorage, using defaults", err);
      }
      return this.getDefaultState();
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
      } catch (err) {
        console.error("Failed to save state to localStorage", err);
      }
      this.notifyListeners();
    }

    getState() {
      return this.state;
    }

    subscribe(listener) {
      this.listeners.push(listener);
      return () => {
        this.listeners = this.listeners.filter(l => l !== listener);
      };
    }

    notifyListeners() {
      this.listeners.forEach(fn => {
        try {
          fn(this.state);
        } catch (e) {
          console.error("Listener error:", e);
        }
      });
    }

    // Role & Navigation Setter
    setActiveRole(role) {
      this.state.activeRole = role;
      this.saveState();
    }

    setActiveTab(tab) {
      this.state.activeTab = tab;
      this.saveState();
    }

    // Generate Clean Referral Code
    generateReferralCode(name) {
      const cleanName = (name || "STUDENT")
        .trim()
        .split(" ")[0]
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase()
        .slice(0, 5) || "NXT";
      const randomDigits = Math.floor(100 + Math.random() * 900);
      return `NXT-${cleanName}-${randomDigits}`;
    }

    getReferralLink(code) {
      const base = window.location.origin + window.location.pathname;
      return `${base}?ref=${code}`;
    }

    // Student Registration
    registerStudent(formData) {
      const code = this.generateReferralCode(formData.name);
      const newStudent = {
        id: "student-" + Date.now(),
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        college: formData.college.trim(),
        branch: formData.branch.trim(),
        gradYear: formData.gradYear,
        referralCode: code,
        referredBy: (formData.referredBy || "").trim().toUpperCase() || null,
        referralsCount: 0,
        registeredAt: new Date().toISOString()
      };

      // Add to registered list & set active
      this.state.registeredStudents.push(newStudent);
      this.state.currentStudent = newStudent;

      // Update counters
      if (newStudent.referredBy) {
        this.state.stats.referralRegistrations += 1;
        // Credit the referrer if exists in leaderboard or students
        this.creditReferrer(newStudent.referredBy);
      } else {
        this.state.stats.directRegistrations += 1;
      }
      this.state.stats.currentRegistrations = this.state.stats.directRegistrations + this.state.stats.referralRegistrations;
      this.recalculateStats();

      // Add student to leaderboard with 0 referrals
      this.updateLeaderboardWithStudent(newStudent);

      // Save & notify
      this.saveState();
      return newStudent;
    }

    creditReferrer(refCode) {
      // Find in current student
      if (this.state.currentStudent && this.state.currentStudent.referralCode === refCode) {
        this.state.currentStudent.referralsCount += 1;
      }
      // Find in leaderboard
      const lbEntry = this.state.leaderboard.find(item => item.code === refCode);
      if (lbEntry) {
        lbEntry.referrals += 1;
        this.updateMilestoneBadge(lbEntry);
      }
    }

    // Interactive Demo Simulation: Add referrals to current student live!
    simulateCurrentStudentReferral(count = 1) {
      if (!this.state.currentStudent) return;
      this.state.currentStudent.referralsCount += count;
      this.state.stats.referralRegistrations += count;
      this.state.stats.currentRegistrations += count;
      
      this.updateLeaderboardWithStudent(this.state.currentStudent);
      this.recalculateStats();
      this.saveState();
    }

    updateMilestoneBadge(item) {
      const count = item.referrals || item.referralsCount || 0;
      if (count >= 20) {
        item.milestone = "AI Champion";
        item.badge = "🏆 Champion";
      } else if (count >= 10) {
        item.milestone = "AI Accelerator";
        item.badge = "🔥 Accelerator";
      } else if (count >= 5) {
        item.milestone = "AI Explorer";
        item.badge = "🚀 Explorer";
      } else if (count >= 3) {
        item.milestone = "AI Builder";
        item.badge = "⚡ Builder";
      } else if (count >= 1) {
        item.milestone = "AI Starter";
        item.badge = "🌱 Starter";
      } else {
        item.milestone = "Unranked";
        item.badge = "Member";
      }
    }

    updateLeaderboardWithStudent(student) {
      let existingIndex = this.state.leaderboard.findIndex(item => item.code === student.referralCode || item.name === student.name);
      
      const entry = {
        name: student.name,
        college: student.college,
        branch: student.branch,
        referrals: student.referralsCount,
        code: student.referralCode,
        isCurrentUser: true
      };
      this.updateMilestoneBadge(entry);

      if (existingIndex >= 0) {
        this.state.leaderboard[existingIndex] = { ...this.state.leaderboard[existingIndex], ...entry };
      } else {
        this.state.leaderboard.push(entry);
      }

      // Sort descending by referrals
      this.state.leaderboard.sort((a, b) => b.referrals - a.referrals);
      // Re-assign ranks
      this.state.leaderboard.forEach((item, idx) => {
        item.rank = idx + 1;
      });
    }

    getCurrentStudentMilestone(referrals) {
      const milestones = this.state.milestones;
      let currentMilestone = null;
      let nextMilestone = milestones[0];

      for (let i = 0; i < milestones.length; i++) {
        if (referrals >= milestones[i].referralsRequired) {
          currentMilestone = milestones[i];
          nextMilestone = milestones[i + 1] || null;
        } else {
          if (!nextMilestone || nextMilestone.referralsRequired <= milestones[i].referralsRequired) {
            nextMilestone = milestones[i];
          }
          break;
        }
      }

      // Calculate progress percentage to next milestone
      let progressPercent = 0;
      let neededForNext = 0;

      if (!currentMilestone) {
        // Between 0 and 1
        progressPercent = (referrals / 1) * 100;
        neededForNext = 1 - referrals;
      } else if (nextMilestone) {
        const prevReq = currentMilestone.referralsRequired;
        const nextReq = nextMilestone.referralsRequired;
        progressPercent = Math.min(100, Math.round(((referrals - prevReq) / (nextReq - prevReq)) * 100));
        neededForNext = nextReq - referrals;
      } else {
        // Maxed out AI Champion
        progressPercent = 100;
        neededForNext = 0;
      }

      return {
        current: currentMilestone,
        next: nextMilestone,
        progressPercent: Math.max(0, Math.min(100, progressPercent)),
        neededForNext
      };
    }

    getCurrentStudentRank() {
      if (!this.state.currentStudent) return null;
      const found = this.state.leaderboard.find(item => item.code === this.state.currentStudent.referralCode || item.name === this.state.currentStudent.name);
      if (found) return found.rank;
      return this.state.leaderboard.length + 1;
    }

    // Editable Assumptions & Funnel Calculations
    updateAssumptions(newAssumptions) {
      this.state.assumptions = { ...this.state.assumptions, ...newAssumptions };
      this.recalculateFunnelAndProjections();
      this.saveState();
    }

    recalculateFunnelAndProjections() {
      const a = this.state.assumptions;
      const totalReach = Math.round(a.communitiesCount * a.avgCommunitySize);
      const visitors = Math.round(totalReach * (a.clickThroughRate / 100));
      const directRegistrations = Math.round(visitors * (a.conversionRate / 100));
      const sharingStudents = Math.round(directRegistrations * (a.referralParticipationRate / 100));
      const referralRegistrations = Math.round(sharingStudents * a.avgReferralsPerStudent);
      const totalProjected = directRegistrations + referralRegistrations;
      const viralKFactor = ((a.referralParticipationRate / 100) * a.avgReferralsPerStudent).toFixed(2);

      return {
        totalReach,
        visitors,
        directRegistrations,
        sharingStudents,
        referralRegistrations,
        totalProjected,
        viralKFactor
      };
    }

    // Editable Budget
    updateBudget(field, value) {
      const numVal = Math.max(0, parseFloat(value) || 0);
      this.state.budget[field] = numVal;
      
      // Recompute total budget
      this.state.budget.totalBudget = 
        this.state.budget.communityPromotion +
        this.state.budget.contentCreative +
        this.state.budget.testingTools +
        this.state.budget.contingency;

      this.recalculateStats();
      this.saveState();
    }

    // Update College Outreach
    updateCollegeStatus(collegeId, status, actual) {
      const college = this.state.collegesOutreach.find(c => c.id === collegeId);
      if (college) {
        if (status !== undefined) college.status = status;
        if (actual !== undefined) college.actualRegistrations = parseInt(actual, 10) || 0;
        this.saveState();
      }
    }

    addCollegeOutreach(collegeData) {
      const newEntry = {
        id: "col-" + Date.now(),
        college: collegeData.college,
        communityType: collegeData.communityType || "WhatsApp Group",
        estimatedStudents: parseInt(collegeData.estimatedStudents, 10) || 200,
        status: collegeData.status || "Contacted",
        expectedRegistrations: parseInt(collegeData.expectedRegistrations, 10) || 30,
        actualRegistrations: parseInt(collegeData.actualRegistrations, 10) || 0,
        ambassador: collegeData.ambassador || "Student Lead"
      };
      this.state.collegesOutreach.unshift(newEntry);
      this.saveState();
    }

    recalculateStats() {
      const total = this.state.stats.currentRegistrations;
      const budget = this.state.budget.totalBudget;
      this.state.stats.costPerRegistration = total > 0 ? (budget / total).toFixed(2) : "0.00";
      
      const sharingCount = Math.max(1, this.state.leaderboard.filter(l => l.referrals > 0).length);
      this.state.stats.activeReferrers = sharingCount;
      const totalReferralsInLb = this.state.leaderboard.reduce((acc, curr) => acc + curr.referrals, 0);
      this.state.stats.averageReferrals = (totalReferralsInLb / sharingCount).toFixed(2);
    }

    // Reset Demo Data
    resetDemoData() {
      localStorage.removeItem(STORAGE_KEY);
      this.state = this.getDefaultState();
      this.saveState();
    }
  }

  window.campaignStore = new CampaignStore();
})();
