/**
 * NxtWave "Build Your First AI Project in 60 Minutes" Campaign
 * Main Application Logic & View Controllers
 */

(function () {
  const store = window.campaignStore;
  let chartInstances = {};

  // DOM Elements cache
  let dom = {};

  function initApp() {
    cacheDom();
    setupRouting();
    setupGlobalListeners();
    checkUrlQueryParams();
    renderAll();
    
    // Subscribe store updates to re-render
    store.subscribe((state) => {
      renderAll(state);
    });

    console.log("NxtWave AI 60 Campaign App initialized.");
  }

  function cacheDom() {
    dom = {
      // Navbar & Navigation
      navLinks: document.querySelectorAll(".nav-link"),
      roleButtons: document.querySelectorAll("[data-role]"),
      mobileMenuBtn: document.getElementById("mobile-menu-btn"),
      mobileMenu: document.getElementById("mobile-menu"),
      views: document.querySelectorAll(".view-section"),
      
      // Global Badges
      demoResetBtn: document.getElementById("reset-demo-btn"),
      pitchTourBtn: document.getElementById("pitch-tour-btn"),
      tourModal: document.getElementById("tour-modal"),
      closeTourBtn: document.getElementById("close-tour-btn"),
      
      // Toast container
      toastContainer: document.getElementById("toast-container"),
      
      // Dynamic header counters
      topRegCounter: document.getElementById("header-current-regs"),
      topTargetCounter: document.getElementById("header-target-regs"),
      topRemainingCounter: document.getElementById("header-remaining-regs")
    };
  }

  function setupRouting() {
    function handleHashChange() {
      const hash = window.location.hash.replace("#", "") || "home";
      const validTabs = ["home", "register", "referral", "leaderboard", "campaign", "funnel", "plan", "outreach", "budget"];
      const activeTab = validTabs.includes(hash) ? hash : "home";
      
      store.setActiveTab(activeTab);
      updateActiveTabUI(activeTab);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    window.addEventListener("hashchange", handleHashChange);
    // Initial route
    handleHashChange();
  }

  function updateActiveTabUI(activeTab) {
    // Hide all view sections
    document.querySelectorAll(".view-section").forEach(sec => {
      sec.classList.add("hidden");
    });

    // Show active section
    const activeSection = document.getElementById(`view-${activeTab}`);
    if (activeSection) {
      activeSection.classList.remove("hidden");
    }

    // Update active navbar styling
    document.querySelectorAll(".nav-link").forEach(link => {
      const target = link.getAttribute("data-tab");
      if (target === activeTab) {
        link.classList.add("text-blue-400", "border-b-2", "border-blue-500", "font-semibold");
        link.classList.remove("text-slate-400");
      } else {
        link.classList.remove("text-blue-400", "border-b-2", "border-blue-500", "font-semibold");
        link.classList.add("text-slate-400");
      }
    });

    // If campaign view is activated, trigger chart resize/update
    if (activeTab === "campaign") {
      setTimeout(renderCharts, 100);
    }
  }

  function checkUrlQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get("ref");
    if (refCode) {
      // Auto switch to register tab and prefill
      store.setActiveTab("register");
      window.location.hash = "register";
      setTimeout(() => {
        const refInput = document.getElementById("reg-referral-code");
        if (refInput) {
          refInput.value = refCode;
          showToast(`Referral code ${refCode} applied!`, "info");
        }
      }, 200);
    }
  }

  function setupGlobalListeners() {
    // Mobile menu toggle
    if (dom.mobileMenuBtn && dom.mobileMenu) {
      dom.mobileMenuBtn.addEventListener("click", () => {
        dom.mobileMenu.classList.toggle("hidden");
      });
    }

    // Nav click handlers
    document.querySelectorAll("[data-nav]").forEach(el => {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        const tab = el.getAttribute("data-nav");
        window.location.hash = tab;
        if (dom.mobileMenu && !dom.mobileMenu.classList.contains("hidden")) {
          dom.mobileMenu.classList.add("hidden");
        }
      });
    });

    // Role switcher
    dom.roleButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const role = btn.getAttribute("data-role");
        store.setActiveRole(role);
        dom.roleButtons.forEach(b => {
          if (b === btn) {
            b.classList.add("bg-blue-600", "text-white");
            b.classList.remove("text-slate-400", "hover:text-white");
          } else {
            b.classList.remove("bg-blue-600", "text-white");
            b.classList.add("text-slate-400", "hover:text-white");
          }
        });
        if (role === "admin" && (window.location.hash === "#home" || window.location.hash === "#register" || window.location.hash === "#referral" || !window.location.hash)) {
          window.location.hash = "campaign";
        } else if (role === "student" && (window.location.hash === "#campaign" || window.location.hash === "#funnel" || window.location.hash === "#plan" || window.location.hash === "#outreach" || window.location.hash === "#budget")) {
          window.location.hash = "home";
        }
        showToast(`Switched view to ${role === "student" ? "Student Experience" : "Growth Lead / Admin"}`, "info");
      });
    });

    // Reset Demo Data button
    if (dom.demoResetBtn) {
      dom.demoResetBtn.addEventListener("click", () => {
        if (confirm("Reset all campaign data to default demo state?")) {
          store.resetDemoData();
          showToast("Demo data successfully reset to baseline!", "success");
        }
      });
    }

    // Pitch Tour Modal
    if (dom.pitchTourBtn && dom.tourModal) {
      dom.pitchTourBtn.addEventListener("click", () => {
        dom.tourModal.classList.remove("hidden");
      });
    }
    if (dom.closeTourBtn && dom.tourModal) {
      dom.closeTourBtn.addEventListener("click", () => {
        dom.tourModal.classList.add("hidden");
      });
    }
  }

  // Master Render Method
  function renderAll(state) {
    const s = state || store.getState();
    renderTopHeaderStats(s);
    renderLandingPage(s);
    renderRegistrationForm(s);
    renderReferralDashboard(s);
    renderLeaderboard(s);
    renderCampaignDashboard(s);
    renderFunnelAndAssumptions(s);
    renderCampaignPlan(s);
    renderCollegeOutreach(s);
    renderBudgetCalculator(s);
    
    // If active tab is campaign, update charts
    if (s.activeTab === "campaign") {
      setTimeout(renderCharts, 50);
    }

    // Re-init lucide icons if available
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  // 1. Top Header Stats
  function renderTopHeaderStats(s) {
    const target = s.stats.targetRegistrations;
    const current = s.stats.currentRegistrations;
    const remaining = Math.max(0, target - current);
    
    if (dom.topRegCounter) dom.topRegCounter.innerText = current;
    if (dom.topTargetCounter) dom.topTargetCounter.innerText = target;
    if (dom.topRemainingCounter) dom.topRemainingCounter.innerText = remaining;
  }

  // 2. Landing Page
  function renderLandingPage(s) {
    // Render 60-Minute Timeline
    const timelineContainer = document.getElementById("timeline-list");
    if (timelineContainer && timelineContainer.children.length === 0) {
      timelineContainer.innerHTML = s.timeline.map((item, idx) => `
        <div class="relative pl-8 pb-8 border-l border-slate-800 last:border-l-0 last:pb-0">
          <div class="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-blue-600 border-4 border-slate-900 flex items-center justify-center">
          </div>
          <div class="bg-slate-900/60 p-5 rounded-xl border border-slate-800/80 hover:border-blue-500/40 transition">
            <div class="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20">
                ${item.time} (${item.duration})
              </span>
              <span class="text-xs text-slate-400 flex items-center gap-1">
                <i data-lucide="check-circle" class="w-3.5 h-3.5 text-emerald-400"></i> ${item.deliverable}
              </span>
            </div>
            <h4 class="text-base font-bold text-white mb-1.5">${item.title}</h4>
            <p class="text-sm text-slate-400 leading-relaxed">${item.description}</p>
          </div>
        </div>
      `).join("");
    }

    // Render FAQs Accordion
    const faqContainer = document.getElementById("faq-list");
    if (faqContainer && faqContainer.children.length === 0) {
      faqContainer.innerHTML = s.faqs.map((faq, idx) => `
        <div class="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/50">
          <button class="w-full p-5 text-left font-semibold text-slate-200 flex justify-between items-center hover:bg-slate-800/50 transition faq-toggle-btn" data-faq="${idx}">
            <span class="flex items-center gap-3">
              <i data-lucide="help-circle" class="w-5 h-5 text-blue-400 shrink-0"></i>
              ${faq.question}
            </span>
            <i data-lucide="chevron-down" class="w-5 h-5 text-slate-400 transform transition faq-arrow-${idx}"></i>
          </button>
          <div class="p-5 pt-0 text-sm text-slate-400 leading-relaxed hidden faq-content-${idx}">
            ${faq.answer}
          </div>
        </div>
      `).join("");

      // FAQ click toggle handlers
      document.querySelectorAll(".faq-toggle-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const idx = btn.getAttribute("data-faq");
          const content = document.querySelector(`.faq-content-${idx}`);
          const arrow = document.querySelector(`.faq-arrow-${idx}`);
          if (content) {
            content.classList.toggle("hidden");
            if (arrow) arrow.classList.toggle("rotate-180");
          }
        });
      });
    }

    // Render Testimonials
    const testContainer = document.getElementById("testimonials-grid");
    if (testContainer && testContainer.children.length === 0) {
      testContainer.innerHTML = s.testimonials.map(t => `
        <div class="bg-slate-900/70 p-6 rounded-2xl border border-slate-800 hover:border-slate-700 transition">
          <div class="flex items-center gap-1 text-amber-400 mb-3 text-sm">
            ${'<i data-lucide="star" class="w-4 h-4 fill-amber-400"></i>'.repeat(t.rating)}
          </div>
          <p class="text-sm text-slate-300 italic mb-4 leading-relaxed">"${t.comment}"</p>
          <div class="flex items-center gap-3 border-t border-slate-800/60 pt-3">
            <div class="w-9 h-9 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-bold text-xs">
              ${t.name.split(' ').map(n=>n[0]).join('')}
            </div>
            <div>
              <div class="text-sm font-bold text-white">${t.name}</div>
              <div class="text-xs text-slate-400">${t.college} • <span class="text-emerald-400">${t.role}</span></div>
            </div>
          </div>
        </div>
      `).join("");
    }

    // Interactive Demo Simulator for the Project Showcase ("Smart Resume Screener")
    const testAiBtn = document.getElementById("demo-test-ai-btn");
    const aiOutputBox = document.getElementById("demo-ai-output");
    if (testAiBtn && aiOutputBox) {
      testAiBtn.onclick = () => {
        aiOutputBox.classList.remove("hidden");
        aiOutputBox.innerHTML = `
          <div class="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
            <i data-lucide="sparkles" class="w-4 h-4 animate-spin"></i> Analyzing Resume against Job Description (OpenAI API)...
          </div>
          <div class="bg-slate-950 p-3.5 rounded-lg border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
            <div class="flex justify-between items-center pb-2 border-b border-slate-800">
              <span class="text-white font-bold">Role: Associate AI Engineer</span>
              <span class="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">Match Score: 88%</span>
            </div>
            <p><span class="text-blue-400">Matched Skills:</span> Python, REST APIs, Git, Basic Machine Learning</p>
            <p><span class="text-amber-400">Recommended Missing Skills:</span> Vector DBs (Chroma/Pinecone), LangChain Chains</p>
            <p class="text-slate-400 pt-1 border-t border-slate-800/80"><span class="text-cyan-400">Generated Interview Question:</span> "Can you explain the difference between zero-shot and few-shot prompt structuring in your AI Screener app?"</p>
          </div>
        `;
        if (window.lucide) window.lucide.createIcons();
      };
    }
  }

  // 3. Registration Form & Validation
  function renderRegistrationForm(s) {
    const form = document.getElementById("workshop-registration-form");
    const quickFillBtn = document.getElementById("quick-fill-reg-btn");

    if (quickFillBtn) {
      quickFillBtn.onclick = (e) => {
        e.preventDefault();
        const demoNames = ["Siddharth Rao", "Divya Krishnan", "Mohit Chawla", "Tarun Reddy", "Bhavya Sri"];
        const colleges = [
          "JNTU Hyderabad (College of Engineering)",
          "Chaitanya Bharathi Institute of Tech (CBIT)",
          "VNR Vignana Jyothi Institute (VNR VJIET)",
          "Vasavi College of Engineering",
          "Osmania University (UCEOU)"
        ];
        const branches = ["Computer Science & Engineering", "Information Technology", "Electronics & Communication", "AI & Data Science"];
        const randomName = demoNames[Math.floor(Math.random() * demoNames.length)];
        const cleanSlug = randomName.toLowerCase().replace(/[^a-z]/g, "");

        document.getElementById("reg-name").value = randomName;
        document.getElementById("reg-email").value = `${cleanSlug}.engg@gmail.com`;
        document.getElementById("reg-phone").value = `98${Math.floor(10000000 + Math.random() * 90000000)}`;
        document.getElementById("reg-college").value = colleges[Math.floor(Math.random() * colleges.length)];
        document.getElementById("reg-branch").value = branches[Math.floor(Math.random() * branches.length)];
        document.getElementById("reg-year").value = "2025";
        showToast("Quick Demo credentials populated!", "info");
      };
    }

    if (form && !form.dataset.initialized) {
      form.dataset.initialized = "true";
      form.addEventListener("submit", (e) => {
        e.preventDefault();

        const name = document.getElementById("reg-name").value.trim();
        const email = document.getElementById("reg-email").value.trim();
        const phone = document.getElementById("reg-phone").value.trim();
        const college = document.getElementById("reg-college").value.trim();
        const branch = document.getElementById("reg-branch").value.trim();
        const gradYear = document.getElementById("reg-year").value;
        const referredBy = document.getElementById("reg-referral-code").value.trim();

        // Validation
        if (!name || name.length < 2) {
          showToast("Please enter your full name.", "warning");
          return;
        }
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          showToast("Please enter a valid engineering email address.", "warning");
          return;
        }
        if (!phone || !/^\+?[0-9]{10,12}$/.test(phone.replace(/[\s-]/g, ""))) {
          showToast("Please enter a valid 10-digit WhatsApp phone number.", "warning");
          return;
        }
        if (!college) {
          showToast("Please specify your college or university.", "warning");
          return;
        }
        if (!branch) {
          showToast("Please select your engineering branch.", "warning");
          return;
        }

        // Register student
        const student = store.registerStudent({
          name,
          email,
          phone,
          college,
          branch,
          gradYear,
          referredBy
        });

        // Trigger celebratory confetti
        triggerConfetti();

        // Show Success Modal
        showSuccessModal(student);
      });
    }
  }

  function showSuccessModal(student) {
    const modal = document.getElementById("success-modal");
    if (!modal) return;

    document.getElementById("success-student-name").innerText = student.name;
    document.getElementById("success-ref-code").innerText = student.referralCode;
    const refLink = store.getReferralLink(student.referralCode);
    document.getElementById("success-ref-link").innerText = refLink;

    modal.classList.remove("hidden");

    // Modal buttons
    document.getElementById("modal-go-dashboard-btn").onclick = () => {
      modal.classList.add("hidden");
      window.location.hash = "referral";
    };

    document.getElementById("modal-copy-link-btn").onclick = () => {
      copyToClipboard(refLink, "Referral link copied!");
    };
  }

  // 4. Student Referral Dashboard
  function renderReferralDashboard(s) {
    const student = s.currentStudent;
    if (!student) {
      // Show empty state prompt
      document.getElementById("referral-empty-state")?.classList.remove("hidden");
      document.getElementById("referral-content")?.classList.add("hidden");
      return;
    }

    document.getElementById("referral-empty-state")?.classList.add("hidden");
    document.getElementById("referral-content")?.classList.remove("hidden");

    // Populate student details
    document.getElementById("ref-student-name").innerText = student.name;
    document.getElementById("ref-student-college").innerText = `${student.college} • ${student.branch} ('${student.gradYear})`;
    document.getElementById("ref-unique-code").innerText = student.referralCode;
    
    const referralLink = store.getReferralLink(student.referralCode);
    document.getElementById("ref-unique-link").innerText = referralLink;
    document.getElementById("ref-total-count").innerText = student.referralsCount;

    // Rank
    const rank = store.getCurrentStudentRank();
    document.getElementById("ref-current-rank").innerText = rank ? `#${rank}` : "Unranked";

    // Milestone calculation
    const milestoneInfo = store.getCurrentStudentMilestone(student.referralsCount);
    
    // Update progress bar
    const progressBar = document.getElementById("milestone-progress-bar");
    if (progressBar) {
      progressBar.style.width = `${milestoneInfo.progressPercent}%`;
    }
    document.getElementById("milestone-percent-text").innerText = `${milestoneInfo.progressPercent}%`;

    // Milestone badges status
    const currentBadgeEl = document.getElementById("ref-current-milestone-badge");
    if (currentBadgeEl) {
      currentBadgeEl.innerText = milestoneInfo.current ? milestoneInfo.current.name : "Registered (0 Referrals)";
    }
    
    const nextBadgeEl = document.getElementById("ref-next-milestone-text");
    if (nextBadgeEl) {
      if (milestoneInfo.next) {
        nextBadgeEl.innerText = `Refer ${milestoneInfo.neededForNext} more friend${milestoneInfo.neededForNext > 1 ? "s" : ""} to unlock "${milestoneInfo.next.name}" (${milestoneInfo.next.badge})`;
      } else {
        nextBadgeEl.innerText = "🎉 Maximum milestone reached! You are an AI Champion!";
      }
    }

    // Render milestone grid
    const milestoneGrid = document.getElementById("milestones-grid");
    if (milestoneGrid) {
      milestoneGrid.innerHTML = s.milestones.map((m) => {
        const isUnlocked = student.referralsCount >= m.referralsRequired;
        const isCurrent = milestoneInfo.current && milestoneInfo.current.level === m.level;
        return `
          <div class="p-4 rounded-xl border transition ${
            isUnlocked
              ? "bg-emerald-950/20 border-emerald-500/40 text-emerald-200"
              : isCurrent
              ? "bg-blue-950/30 border-blue-500 text-blue-200 glow-blue"
              : "bg-slate-900/40 border-slate-800 text-slate-400"
          }">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs font-bold uppercase tracking-wider ${isUnlocked ? 'text-emerald-400' : 'text-slate-400'}">
                ${m.referralsRequired} ${m.referralsRequired === 1 ? 'Referral' : 'Referrals'}
              </span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${
                isUnlocked 
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' 
                  : 'bg-slate-800 text-slate-400'
              }">
                ${isUnlocked ? 'Unlocked ✓' : 'Locked 🔒'}
              </span>
            </div>
            <div class="text-base font-bold text-white mb-1 flex items-center gap-1.5">
              ${m.badge} - ${m.name}
            </div>
            <p class="text-xs text-slate-300 leading-normal">${m.perk}</p>
          </div>
        `;
      }).join("");
    }

    // WhatsApp Message Template
    const whatsappMessage = `I just registered for a FREE workshop — Build Your First AI Project in 60 Minutes 🚀\n\nIf you're a final-year engineering student and want to build an AI project, register here:\n\n${referralLink}`;
    const encodedWaMessage = encodeURIComponent(whatsappMessage);

    // Share & Copy Buttons
    const copyLinkBtn = document.getElementById("copy-ref-link-btn");
    if (copyLinkBtn) {
      copyLinkBtn.onclick = () => copyToClipboard(referralLink, "Referral link copied to clipboard!");
    }

    const shareWaBtn = document.getElementById("share-whatsapp-btn");
    if (shareWaBtn) {
      shareWaBtn.onclick = () => {
        window.open(`https://api.whatsapp.com/send?text=${encodedWaMessage}`, "_blank");
      };
    }

    const copyWaBtn = document.getElementById("copy-whatsapp-msg-btn");
    if (copyWaBtn) {
      copyWaBtn.onclick = () => copyToClipboard(whatsappMessage, "WhatsApp invite message copied to clipboard!");
    }

    // SIMULATION BUTTONS (+1 / +3 referrals) for live interview testing
    const simOneBtn = document.getElementById("sim-add-one-ref-btn");
    if (simOneBtn) {
      simOneBtn.onclick = () => {
        store.simulateCurrentStudentReferral(1);
        triggerConfetti();
        showToast("Simulated 1 new friend registration via your link! 🎉", "success");
      };
    }

    const simThreeBtn = document.getElementById("sim-add-three-ref-btn");
    if (simThreeBtn) {
      simThreeBtn.onclick = () => {
        store.simulateCurrentStudentReferral(3);
        triggerConfetti();
        showToast("Simulated 3 batchmates joined! Milestone progress boosted! 🚀", "success");
      };
    }
  }

  // 5. Leaderboard
  function renderLeaderboard(s) {
    const list = s.leaderboard || [];
    const tableBody = document.getElementById("leaderboard-body");
    const totalReferralsEl = document.getElementById("leaderboard-total-referrals");

    const totalReferrals = list.reduce((acc, curr) => acc + (curr.referrals || 0), 0);
    if (totalReferralsEl) totalReferralsEl.innerText = totalReferrals;

    if (tableBody) {
      tableBody.innerHTML = list.slice(0, 15).map((student, idx) => {
        const isCurrent = s.currentStudent && (student.code === s.currentStudent.referralCode || student.name === s.currentStudent.name);
        const rankMedal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${student.rank}`;
        
        return `
          <tr class="${isCurrent ? 'bg-blue-900/30 border-l-4 border-blue-500 font-semibold' : ''}">
            <td class="text-center font-bold text-sm">
              <span class="${idx < 3 ? 'text-lg' : 'text-slate-400'}">${rankMedal}</span>
            </td>
            <td>
              <div class="flex items-center gap-2">
                <span class="text-white">${student.name}</span>
                ${isCurrent ? '<span class="text-[10px] bg-blue-500 text-white px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">YOU</span>' : ''}
              </div>
              <div class="text-xs text-slate-400 font-mono">${student.code}</div>
            </td>
            <td>
              <div class="text-xs text-slate-300">${student.college}</div>
              <div class="text-[11px] text-slate-500">${student.branch || 'Engineering'}</div>
            </td>
            <td class="text-center font-bold text-base text-cyan-400">
              ${student.referrals}
            </td>
            <td>
              <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
                ${student.badge || student.milestone}
              </span>
            </td>
          </tr>
        `;
      }).join("");
    }

    // Highlight user's sticky position card if registered
    const userSticky = document.getElementById("leaderboard-user-sticky");
    if (userSticky && s.currentStudent) {
      const rank = store.getCurrentStudentRank();
      userSticky.classList.remove("hidden");
      document.getElementById("user-sticky-rank").innerText = rank ? `#${rank}` : "--";
      document.getElementById("user-sticky-name").innerText = s.currentStudent.name;
      document.getElementById("user-sticky-referrals").innerText = s.currentStudent.referralsCount;
      document.getElementById("user-sticky-badge").innerText = s.currentStudent.referralsCount >= 1 ? "Active Referrer" : "Awaiting First Referral";
    }
  }

  // 6. Admin / Campaign Dashboard & Charts
  function renderCampaignDashboard(s) {
    const stats = s.stats;
    const target = stats.targetRegistrations;
    const current = stats.currentRegistrations;
    const progress = Math.min(100, ((current / target) * 100)).toFixed(1);
    const remaining = Math.max(0, target - current);

    document.getElementById("dash-target").innerText = target;
    document.getElementById("dash-current").innerText = current;
    document.getElementById("dash-remaining").innerText = remaining;
    document.getElementById("dash-progress-percent").innerText = `${progress}%`;
    document.getElementById("dash-progress-bar").style.width = `${progress}%`;

    document.getElementById("dash-direct-regs").innerText = stats.directRegistrations;
    document.getElementById("dash-referral-regs").innerText = stats.referralRegistrations;
    document.getElementById("dash-active-referrers").innerText = stats.activeReferrers;
    document.getElementById("dash-avg-referrals").innerText = stats.averageReferrals;
    document.getElementById("dash-cost-per-reg").innerText = `₹${stats.costPerRegistration}`;
  }

  function renderCharts() {
    const s = store.getState();
    if (!window.Chart) return;

    // Chart default styling for tech aesthetic
    Chart.defaults.color = "#94A3B8";
    Chart.defaults.font.family = "'Plus Jakarta Sans', sans-serif";

    // 1. 7-Day Registrations Chart (Line + Bar)
    const ctx7Day = document.getElementById("chart-7day-registrations")?.getContext("2d");
    if (ctx7Day) {
      if (chartInstances.dailyRegs) chartInstances.dailyRegs.destroy();
      
      const labels = s.historicalDaily.map(d => d.day);
      const directData = s.historicalDaily.map(d => d.direct);
      const refData = s.historicalDaily.map(d => d.referral);
      const cumulativeData = s.historicalDaily.map(d => d.cumulative);
      const targetLine = s.historicalDaily.map(d => d.target);

      chartInstances.dailyRegs = new Chart(ctx7Day, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              type: "line",
              label: "Cumulative Registrations",
              data: cumulativeData,
              borderColor: "#38BDF8",
              backgroundColor: "rgba(56, 189, 248, 0.1)",
              borderWidth: 3,
              tension: 0.35,
              fill: true,
              yAxisID: "y1"
            },
            {
              type: "line",
              label: "Target Pace (500)",
              data: targetLine,
              borderColor: "#F59E0B",
              borderDash: [5, 5],
              borderWidth: 2,
              pointRadius: 0,
              yAxisID: "y1"
            },
            {
              type: "bar",
              label: "Daily Direct",
              data: directData,
              backgroundColor: "#2563EB",
              borderRadius: 4,
              stack: "daily",
              yAxisID: "y"
            },
            {
              type: "bar",
              label: "Daily Referral",
              data: refData,
              backgroundColor: "#10B981",
              borderRadius: 4,
              stack: "daily",
              yAxisID: "y"
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top", labels: { boxWidth: 12, padding: 15 } }
          },
          scales: {
            x: { grid: { color: "#1E293B" } },
            y: {
              grid: { color: "#1E293B" },
              title: { display: true, text: "Daily Registrations" }
            },
            y1: {
              position: "right",
              grid: { drawOnChartArea: false },
              title: { display: true, text: "Cumulative Total" },
              max: 550
            }
          }
        }
      });
    }

    // 2. Direct vs Referral Donut
    const ctxShare = document.getElementById("chart-direct-vs-referral")?.getContext("2d");
    if (ctxShare) {
      if (chartInstances.share) chartInstances.share.destroy();

      const direct = s.stats.directRegistrations;
      const referral = s.stats.referralRegistrations;

      chartInstances.share = new Chart(ctxShare, {
        type: "doughnut",
        data: {
          labels: ["Direct Outreach", "Peer Referrals"],
          datasets: [{
            data: [direct, referral],
            backgroundColor: ["#3B82F6", "#10B981"],
            borderColor: "#0F172A",
            borderWidth: 3
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { padding: 20 } }
          },
          cutout: "70%"
        }
      });
    }

    // 3. Registrations by College (Horizontal Bar)
    const ctxColleges = document.getElementById("chart-colleges")?.getContext("2d");
    if (ctxColleges) {
      if (chartInstances.colleges) chartInstances.colleges.destroy();

      const topColleges = [...s.collegesOutreach]
        .sort((a, b) => b.actualRegistrations - a.actualRegistrations)
        .slice(0, 6);

      chartInstances.colleges = new Chart(ctxColleges, {
        type: "bar",
        data: {
          labels: topColleges.map(c => c.college.split(" (")[0].slice(0, 18)),
          datasets: [
            {
              label: "Actual Registrations",
              data: topColleges.map(c => c.actualRegistrations),
              backgroundColor: "#06B6D4",
              borderRadius: 6
            },
            {
              label: "Expected Target",
              data: topColleges.map(c => c.expectedRegistrations),
              backgroundColor: "#334155",
              borderRadius: 6
            }
          ]
        },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "top" }
          },
          scales: {
            x: { grid: { color: "#1E293B" } },
            y: { grid: { display: false } }
          }
        }
      });
    }

    // 4. Referral Tiers Chart
    const ctxTiers = document.getElementById("chart-tiers")?.getContext("2d");
    if (ctxTiers) {
      if (chartInstances.tiers) chartInstances.tiers.destroy();

      const counts = { "AI Starter (1)": 0, "AI Builder (3)": 0, "AI Explorer (5)": 0, "AI Accelerator (10)": 0, "AI Champion (20)": 0 };
      s.leaderboard.forEach(item => {
        if (item.referrals >= 20) counts["AI Champion (20)"]++;
        else if (item.referrals >= 10) counts["AI Accelerator (10)"]++;
        else if (item.referrals >= 5) counts["AI Explorer (5)"]++;
        else if (item.referrals >= 3) counts["AI Builder (3)"]++;
        else if (item.referrals >= 1) counts["AI Starter (1)"]++;
      });

      chartInstances.tiers = new Chart(ctxTiers, {
        type: "bar",
        data: {
          labels: Object.keys(counts),
          datasets: [{
            label: "Students in Tier",
            data: Object.values(counts),
            backgroundColor: ["#10B981", "#3B82F6", "#6366F1", "#8B5CF6", "#F59E0B"],
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            x: { grid: { display: false } },
            y: { grid: { color: "#1E293B" }, beginAtZero: true }
          }
        }
      });
    }
  }

  // 7. Visual 500-Registration Funnel & Editable Assumptions
  function renderFunnelAndAssumptions(s) {
    const a = s.assumptions;
    const calc = store.recalculateFunnelAndProjections();

    // Populate assumption input controls
    setInputValue("input-assump-communities", a.communitiesCount);
    setInputValue("input-assump-size", a.avgCommunitySize);
    setInputValue("input-assump-ctr", a.clickThroughRate);
    setInputValue("input-assump-conversion", a.conversionRate);
    setInputValue("input-assump-sharing", a.referralParticipationRate);
    setInputValue("input-assump-referrals-avg", a.avgReferralsPerStudent);

    // Sync display values
    setTextValue("val-assump-communities", a.communitiesCount);
    setTextValue("val-assump-size", a.avgCommunitySize);
    setTextValue("val-assump-ctr", `${a.clickThroughRate}%`);
    setTextValue("val-assump-conversion", `${a.conversionRate}%`);
    setTextValue("val-assump-sharing", `${a.referralParticipationRate}%`);
    setTextValue("val-assump-referrals-avg", a.avgReferralsPerStudent);

    // Populate Funnel Numbers
    setTextValue("funnel-reach", calc.totalReach.toLocaleString());
    setTextValue("funnel-visitors", calc.visitors.toLocaleString());
    setTextValue("funnel-direct", calc.directRegistrations.toLocaleString());
    setTextValue("funnel-sharing", calc.sharingStudents.toLocaleString());
    setTextValue("funnel-referrals", calc.referralRegistrations.toLocaleString());
    setTextValue("funnel-total", calc.totalProjected.toLocaleString());
    setTextValue("funnel-k-factor", calc.viralKFactor);

    // Goal indicator
    const goalStatusEl = document.getElementById("funnel-goal-status");
    if (goalStatusEl) {
      if (calc.totalProjected >= 500) {
        goalStatusEl.innerHTML = `<span class="text-emerald-400 font-bold flex items-center gap-1.5"><i data-lucide="check-circle" class="w-4 h-4"></i> Goal Met (${calc.totalProjected}/500)</span>`;
      } else {
        goalStatusEl.innerHTML = `<span class="text-amber-400 font-bold flex items-center gap-1.5"><i data-lucide="alert-circle" class="w-4 h-4"></i> Deficit of ${500 - calc.totalProjected} (${calc.totalProjected}/500)</span>`;
      }
    }

    // Bind event listeners for assumption sliders
    setupAssumptionListeners();
  }

  function setupAssumptionListeners() {
    const bindSlider = (id, key, isFloat = false) => {
      const el = document.getElementById(id);
      if (!el || el.dataset.bound) return;
      el.dataset.bound = "true";
      el.addEventListener("input", (e) => {
        const val = isFloat ? parseFloat(e.target.value) : parseInt(e.target.value, 10);
        store.updateAssumptions({ [key]: val });
      });
    };

    bindSlider("input-assump-communities", "communitiesCount");
    bindSlider("input-assump-size", "avgCommunitySize");
    bindSlider("input-assump-ctr", "clickThroughRate", true);
    bindSlider("input-assump-conversion", "conversionRate", true);
    bindSlider("input-assump-sharing", "referralParticipationRate", true);
    bindSlider("input-assump-referrals-avg", "avgReferralsPerStudent", true);

    const resetAssumpBtn = document.getElementById("reset-assumptions-btn");
    if (resetAssumpBtn && !resetAssumpBtn.dataset.bound) {
      resetAssumpBtn.dataset.bound = "true";
      resetAssumpBtn.addEventListener("click", () => {
        store.updateAssumptions(window.NXT_INITIAL_DATA.assumptions);
        showToast("Assumptions reset to initial model!", "info");
      });
    }
  }

  // 8. 7-Day Campaign Plan
  function renderCampaignPlan(s) {
    const container = document.getElementById("campaign-plan-timeline");
    if (!container || container.children.length > 0) return;

    container.innerHTML = s.campaignPlan.map((day, idx) => {
      const isCompleted = day.status === "Completed";
      const isActive = day.status === "Active";

      return `
        <div class="p-6 rounded-2xl border ${
          isActive 
            ? 'bg-blue-950/20 border-blue-500/60 glow-blue' 
            : isCompleted 
            ? 'bg-slate-900/60 border-emerald-500/30' 
            : 'bg-slate-900/40 border-slate-800'
        } transition">
          <div class="flex flex-wrap items-center justify-between gap-2 mb-3">
            <div class="flex items-center gap-2.5">
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded ${
                isActive ? 'bg-blue-500 text-white' : isCompleted ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-800 text-slate-400'
              }">
                ${day.day}
              </span>
              <h3 class="text-lg font-bold text-white">${day.title}</h3>
            </div>
            <div class="flex items-center gap-3">
              <span class="text-xs text-slate-400">Target: <strong class="text-cyan-400">+${day.targetDailyRegs}</strong> (Total: ${day.targetCumulative})</span>
              <span class="text-xs font-semibold px-2 py-0.5 rounded-full ${
                isActive ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30 animate-pulse' :
                isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                'bg-slate-800 text-slate-400'
              }">
                ${day.status}
              </span>
            </div>
          </div>

          <div class="text-xs text-blue-400 font-semibold mb-3 flex items-center gap-1.5">
            <i data-lucide="radio" class="w-3.5 h-3.5"></i> Primary Channels: <span class="text-slate-300 font-normal">${day.channels}</span>
          </div>

          <div class="space-y-1.5 mb-4">
            ${day.tactics.map(t => `
              <div class="text-xs text-slate-300 flex items-start gap-2">
                <i data-lucide="arrow-right" class="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5"></i>
                <span>${t}</span>
              </div>
            `).join("")}
          </div>

          <div class="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs">
            <span class="text-slate-400">Key Deliverable:</span>
            <span class="font-medium text-emerald-300">${day.deliverable}</span>
          </div>
        </div>
      `;
    }).join("");
  }

  // 9. College Outreach Tracker
  function renderCollegeOutreach(s) {
    const list = s.collegesOutreach || [];
    const tableBody = document.getElementById("outreach-table-body");
    
    // Summary Cards
    const totalColleges = list.length;
    const totalReach = list.reduce((a, c) => a + (c.estimatedStudents || 0), 0);
    const totalExpected = list.reduce((a, c) => a + (c.expectedRegistrations || 0), 0);
    const totalActual = list.reduce((a, c) => a + (c.actualRegistrations || 0), 0);

    setTextValue("outreach-total-colleges", totalColleges);
    setTextValue("outreach-total-reach", totalReach.toLocaleString());
    setTextValue("outreach-total-expected", totalExpected);
    setTextValue("outreach-total-actual", totalActual);

    if (tableBody) {
      tableBody.innerHTML = list.map(c => `
        <tr>
          <td>
            <div class="font-semibold text-white">${c.college}</div>
            <div class="text-xs text-blue-400">${c.communityType}</div>
          </td>
          <td class="text-center font-mono text-slate-300">
            ${c.estimatedStudents}
          </td>
          <td>
            <select class="bg-slate-900 border border-slate-700 text-xs rounded px-2.5 py-1 text-slate-200 outreach-status-select" data-id="${c.id}">
              ${["Not contacted", "Contacted", "Interested", "Shared", "Active", "Completed"].map(st => `
                <option value="${st}" ${c.status === st ? 'selected' : ''}>${st}</option>
              `).join("")}
            </select>
          </td>
          <td class="text-center font-mono text-slate-400">${c.expectedRegistrations}</td>
          <td class="text-center">
            <input type="number" min="0" value="${c.actualRegistrations}" class="w-16 bg-slate-900 border border-slate-700 text-xs text-center rounded px-1 py-1 font-mono text-emerald-400 outreach-actual-input" data-id="${c.id}">
          </td>
          <td class="text-xs text-slate-300">
            <span class="flex items-center gap-1.5">
              <i data-lucide="user-check" class="w-3.5 h-3.5 text-blue-400"></i> ${c.ambassador}
            </span>
          </td>
        </tr>
      `).join("");

      // Status change handlers
      document.querySelectorAll(".outreach-status-select").forEach(sel => {
        sel.addEventListener("change", (e) => {
          const colId = sel.getAttribute("data-id");
          store.updateCollegeStatus(colId, e.target.value);
          showToast(`Status updated for college.`, "info");
        });
      });

      // Actual numbers change handlers
      document.querySelectorAll(".outreach-actual-input").forEach(inp => {
        inp.addEventListener("change", (e) => {
          const colId = inp.getAttribute("data-id");
          store.updateCollegeStatus(colId, undefined, e.target.value);
          showToast(`Registrations count updated.`, "info");
        });
      });
    }

    // Add College Modal logic
    setupAddCollegeModal();
  }

  function setupAddCollegeModal() {
    const addBtn = document.getElementById("open-add-college-modal-btn");
    const modal = document.getElementById("add-college-modal");
    const closeBtn = document.getElementById("close-add-college-modal-btn");
    const form = document.getElementById("add-college-form");

    if (addBtn && modal) {
      addBtn.onclick = () => modal.classList.remove("hidden");
    }
    if (closeBtn && modal) {
      closeBtn.onclick = () => modal.classList.add("hidden");
    }
    if (form && !form.dataset.bound) {
      form.dataset.bound = "true";
      form.onsubmit = (e) => {
        e.preventDefault();
        const college = document.getElementById("modal-col-name").value.trim();
        const communityType = document.getElementById("modal-col-comm").value.trim();
        const estimatedStudents = document.getElementById("modal-col-est").value;
        const ambassador = document.getElementById("modal-col-amb").value.trim();
        const expected = document.getElementById("modal-col-exp").value;

        if (!college) return;
        store.addCollegeOutreach({
          college,
          communityType,
          estimatedStudents,
          ambassador,
          expectedRegistrations: expected,
          actualRegistrations: 0,
          status: "Contacted"
        });

        modal.classList.add("hidden");
        form.reset();
        showToast(`Target college "${college}" added!`, "success");
      };
    }
  }

  // 10. Budget Calculator
  function renderBudgetCalculator(s) {
    const b = s.budget;
    const totalRegs = s.stats.currentRegistrations;
    const costPerReg = totalRegs > 0 ? (b.totalBudget / totalRegs).toFixed(2) : "0.00";

    setInputValue("budget-input-promo", b.communityPromotion);
    setInputValue("budget-input-content", b.contentCreative);
    setInputValue("budget-input-testing", b.testingTools);
    setInputValue("budget-input-contingency", b.contingency);

    setTextValue("budget-total-display", `₹${b.totalBudget.toLocaleString()}`);
    setTextValue("budget-regs-display", totalRegs);
    setTextValue("budget-cpr-display", `₹${costPerReg}`);

    // Validate budget vs ₹2,000 baseline
    const varianceEl = document.getElementById("budget-variance-indicator");
    if (varianceEl) {
      if (b.totalBudget === 2000) {
        varianceEl.innerHTML = `<span class="text-emerald-400 font-semibold flex items-center gap-1"><i data-lucide="check" class="w-4 h-4"></i> Exactly ₹2,000 (Target Budget Met)</span>`;
      } else if (b.totalBudget < 2000) {
        varianceEl.innerHTML = `<span class="text-blue-400 font-semibold flex items-center gap-1"><i data-lucide="arrow-down" class="w-4 h-4"></i> Under budget by ₹${2000 - b.totalBudget}</span>`;
      } else {
        varianceEl.innerHTML = `<span class="text-amber-400 font-semibold flex items-center gap-1"><i data-lucide="alert-triangle" class="w-4 h-4"></i> Over target budget by ₹${b.totalBudget - 2000}</span>`;
      }
    }

    setupBudgetListeners();
  }

  function setupBudgetListeners() {
    const bindBudgetField = (id, field) => {
      const el = document.getElementById(id);
      if (!el || el.dataset.bound) return;
      el.dataset.bound = "true";
      el.addEventListener("input", (e) => {
        store.updateBudget(field, e.target.value);
      });
    };

    bindBudgetField("budget-input-promo", "communityPromotion");
    bindBudgetField("budget-input-content", "contentCreative");
    bindBudgetField("budget-input-testing", "testingTools");
    bindBudgetField("budget-input-contingency", "contingency");

    const resetBudgetBtn = document.getElementById("reset-budget-btn");
    if (resetBudgetBtn && !resetBudgetBtn.dataset.bound) {
      resetBudgetBtn.dataset.bound = "true";
      resetBudgetBtn.onclick = () => {
        store.updateBudget("communityPromotion", 800);
        store.updateBudget("contentCreative", 500);
        store.updateBudget("testingTools", 400);
        store.updateBudget("contingency", 300);
        showToast("Budget reset to ₹2,000 allocation!", "info");
      };
    }
  }

  // Utility Helpers
  function setInputValue(id, val) {
    const el = document.getElementById(id);
    if (el && document.activeElement !== el) {
      el.value = val;
    }
  }

  function setTextValue(id, text) {
    const el = document.getElementById(id);
    if (el) el.innerText = text;
  }

  function copyToClipboard(text, successMessage) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(successMessage || "Copied to clipboard!", "success");
      }).catch(() => fallbackCopy(text, successMessage));
    } else {
      fallbackCopy(text, successMessage);
    }
  }

  function fallbackCopy(text, successMessage) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showToast(successMessage || "Copied to clipboard!", "success");
    } catch (err) {
      showToast("Unable to copy automatically.", "warning");
    }
    document.body.removeChild(textarea);
  }

  function showToast(message, type = "info") {
    if (!dom.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    
    let iconName = "info";
    if (type === "success") iconName = "check-circle";
    if (type === "warning") iconName = "alert-circle";

    toast.innerHTML = `
      <i data-lucide="${iconName}" class="w-5 h-5 shrink-0"></i>
      <span class="flex-1">${message}</span>
    `;
    dom.toastContainer.appendChild(toast);
    
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateX(100%)";
      toast.style.transition = "all 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }

  function triggerConfetti() {
    if (window.confetti) {
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }

  // Bootstrap when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }
})();
