/**
 * Cloud Synchronization & Modern Cloud Sharing Engine
 * Features:
 * - Real-time Network & Cloud Sync Status (Online / Offline-safe detection)
 * - Native Web Share API integration (WhatsApp, Socials, Cloud Messenger)
 * - 1-Click Google Calendar Cloud Sync for 4-Day Rituals
 * - Standalone Cloud Backup & Restore (Zero Node/Server connection required)
 * - Aesthetic Chhath Digital Greeting E-Card Generator (HTML5 Canvas + Cloud Share)
 */

class ChhathCloudManager {
  constructor() {
    this.isOnline = navigator.onLine;
    this.init();
  }

  init() {
    this.initNetworkListeners();
    this.updateCloudStatusUI();
    this.registerServiceWorker();
    this.initCardGeneratorEvents();
  }

  // --- 1. NETWORK & CLOUD CONNECTIVITY STATUS ---
  initNetworkListeners() {
    window.addEventListener('online', () => {
      this.isOnline = true;
      this.updateCloudStatusUI();
      this.showToast("☁️ Back online! Cloud connection restored.", "success");
    });

    window.addEventListener('offline', () => {
      this.isOnline = false;
      this.updateCloudStatusUI();
      this.showToast("📱 Operating in offline-safe mode. All data saved locally.", "info");
    });
  }

  updateCloudStatusUI() {
    const badges = document.querySelectorAll('.cloud-status-pill');
    badges.forEach(badge => {
      if (this.isOnline) {
        badge.className = 'cloud-status-pill online';
        badge.innerHTML = `
          <span class="status-pulse-dot online"></span>
          <span class="status-text">Cloud Sync: Active</span>
        `;
        badge.setAttribute('title', 'All prayers & checklists seamlessly saved & cloud-ready');
      } else {
        badge.className = 'cloud-status-pill offline';
        badge.innerHTML = `
          <span class="status-pulse-dot offline"></span>
          <span class="status-text">Offline Safe</span>
        `;
        badge.setAttribute('title', 'Operating in local offline cache mode. No connection errors.');
      }
    });
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator && (window.location.protocol === 'https:' || window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
      navigator.serviceWorker.register('./sw.js').then((reg) => {
        console.log('Chhath Puja PWA Service Worker active:', reg.scope);
      }).catch((err) => {
        console.log('ServiceWorker not registered:', err);
      });
    }
  }

  // --- 2. NATIVE CLOUD WEB SHARE API ---
  async shareFestivalWish(customData = {}) {
    const title = customData.title || "छठी मईया • Chhath Puja Mahaparv";
    const text = customData.text || "May Bhagwan Surya & Chhathi Maiya illuminate your life with health, purity & boundless joy. Explore 4-day rituals, calculate exact Arghya Muhurat & float your sacred Diya:";
    const url = customData.url || window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url });
        this.showToast("🙏 Thank you for spreading sacred blessings!", "success");
      } catch (err) {
        if (err.name !== 'AbortError') {
          this.fallbackShare(text, url);
        }
      }
    } else {
      this.fallbackShare(text, url);
    }
  }

  fallbackShare(text, url) {
    const shareModal = document.getElementById('cloud-share-modal');
    if (shareModal) {
      const shareUrlInput = document.getElementById('share-modal-url');
      if (shareUrlInput) shareUrlInput.value = url;
      shareModal.classList.add('active');
    } else {
      // Direct WhatsApp share fallback
      const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + '\n' + url)}`;
      window.open(waUrl, '_blank');
    }
  }

  copyShareUrl() {
    const shareUrlInput = document.getElementById('share-modal-url');
    const url = shareUrlInput ? shareUrlInput.value : window.location.href;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast("📋 Sacred link copied to clipboard!", "success");
      });
    } else {
      const tempInput = document.createElement('input');
      tempInput.value = url;
      document.body.appendChild(tempInput);
      tempInput.select();
      document.execCommand('copy');
      document.body.removeChild(tempInput);
      this.showToast("📋 Sacred link copied to clipboard!", "success");
    }
  }

  // --- 3. 1-CLICK GOOGLE CLOUD CALENDAR SYNC ---
  addToGoogleCalendar(dayNum) {
    const city = window.chhathScheduler?.selectedCity || { name: "Patna", sunset: "17:01", sunrise: "06:06" };
    
    let eventName, details, startDateTime, endDateTime;

    if (dayNum === 1) {
      eventName = "Chhath Puja: Nahay Khay (नहाय-खाय)";
      details = "Holy bath, purification, and preparation of Satvik Kaddu-Bhat prasad in pure cow ghee. \\n\\nMantra: ॐ सूर्याय नमः । शरीरमाद्यं खलु धर्मसाधनम्";
      startDateTime = "20261113T060000";
      endDateTime = "20261113T140000";
    } else if (dayNum === 2) {
      eventName = "Chhath Puja: Kharna / Lohanda (खरना)";
      details = "Strict day-long Nirjala fast. Twilight offering of sacred Rasiya (Gur kheer) and ghee rotis on banana leaves, commencing 36-hour fast.";
      startDateTime = "20261114T060000";
      endDateTime = "20261114T200000";
    } else if (dayNum === 3) {
      eventName = `Chhath Puja: Sandhya Arghya (पहला अर्घ्य) - ${city.name}`;
      details = `Evening Arghya to the setting Sun at ${city.sunset}. Standing waist-deep in water with bamboo supa, fresh thekua, and raw milk.\\n\\nExact Sunset: ${city.sunset}`;
      startDateTime = "20261115T150000";
      endDateTime = "20261115T183000";
    } else {
      eventName = `Chhath Puja: Usha Arghya & Paran (दूसरा अर्घ्य) - ${city.name}`;
      details = `Pre-dawn assembly at ${city.sunrise}. Offering Arghya to rising Sun, orange vermilion blessings, and breaking 36-hr fast (Paran).\\n\\nExact Sunrise: ${city.sunrise}`;
      startDateTime = "20261116T043000";
      endDateTime = "20261116T080000";
    }

    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(eventName)}&dates=${startDateTime}/${endDateTime}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(city.name + " Ghats")}`;
    window.open(gCalUrl, '_blank');
  }

  // --- 4. CLOUD BACKUP & RESTORE (Zero Server / Frictionless) ---
  exportBackup() {
    const backupData = {
      app: "ChhathPujaMahaparv",
      version: "2.0",
      timestamp: new Date().toISOString(),
      wishes: JSON.parse(localStorage.getItem('chhath_wishes_board') || '[]'),
      checklist: JSON.parse(localStorage.getItem('chhath_vrat_checklist') || '[]'),
      selectedCity: window.chhathScheduler?.selectedCity?.id || "patna"
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Chhath_Puja_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    this.showToast("☁️ Backup downloaded! Safe & cloud-ready.", "success");
  }

  importBackup(fileInput) {
    const file = fileInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.app !== "ChhathPujaMahaparv") {
          throw new Error("Invalid backup format");
        }

        if (Array.isArray(data.wishes)) {
          localStorage.setItem('chhath_wishes_board', JSON.stringify(data.wishes));
          if (window.communityManager) window.communityManager.wishes = data.wishes;
        }

        if (Array.isArray(data.checklist)) {
          localStorage.setItem('chhath_vrat_checklist', JSON.stringify(data.checklist));
          if (window.communityManager) window.communityManager.checklist = data.checklist;
        }

        if (window.communityManager) {
          window.communityManager.renderWishes();
          window.communityManager.renderChecklist();
        }

        this.showToast("✨ Data restored successfully!", "success");
      } catch (err) {
        alert("Failed to restore backup: " + err.message);
      }
    };
    reader.readAsText(file);
  }

  // --- 5. AESTHETIC DIGITAL GREETING E-CARD GENERATOR ---
  initCardGeneratorEvents() {
    const cardModal = document.getElementById('card-generator-modal');
    const openCardBtn = document.getElementById('open-card-gen-btn');
    const closeCardBtn = document.getElementById('close-card-modal-btn');
    const form = document.getElementById('card-gen-form');

    if (openCardBtn && cardModal) {
      openCardBtn.addEventListener('click', () => {
        cardModal.classList.add('active');
        this.renderCardPreview();
      });
    }

    if (closeCardBtn && cardModal) {
      closeCardBtn.addEventListener('click', () => {
        cardModal.classList.remove('active');
      });
    }

    if (form) {
      form.addEventListener('input', () => this.renderCardPreview());
    }
  }

  renderCardPreview() {
    const canvas = document.getElementById('ecard-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Canvas Dimensions (Aesthetic 4:5 Mobile Ratio: 800 x 1000)
    canvas.width = 800;
    canvas.height = 1000;

    const name = document.getElementById('card-input-name')?.value.trim() || "The Sharma Family";
    const city = document.getElementById('card-input-city')?.value.trim() || "Patna, Bihar";
    const quote = document.getElementById('card-input-quote')?.value || "May the radiant rays of Lord Surya and the divine blessings of Chhathi Maiya fill your home with purity, eternal health, and joyous prosperity.";
    const bgTheme = document.querySelector('input[name="card-bg-theme"]:checked')?.value || "sunset";

    // 1. Background Gradient
    let bgGrad = ctx.createLinearGradient(0, 0, 0, 1000);
    if (bgTheme === "sunrise") {
      bgGrad.addColorStop(0, "#1e1b4b");
      bgGrad.addColorStop(0.35, "#831843");
      bgGrad.addColorStop(0.65, "#ea580c");
      bgGrad.addColorStop(0.85, "#f59e0b");
      bgGrad.addColorStop(1, "#0f172a");
    } else if (bgTheme === "night") {
      bgGrad.addColorStop(0, "#030712");
      bgGrad.addColorStop(0.4, "#0f172a");
      bgGrad.addColorStop(0.75, "#1c1917");
      bgGrad.addColorStop(1, "#030712");
    } else { // Sunset
      bgGrad.addColorStop(0, "#1c1917");
      bgGrad.addColorStop(0.3, "#991b1b");
      bgGrad.addColorStop(0.55, "#c2410c");
      bgGrad.addColorStop(0.8, "#d97706");
      bgGrad.addColorStop(1, "#0c1a2e");
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 800, 1000);

    // 2. Ornate Border
    ctx.strokeStyle = "rgba(254, 240, 138, 0.4)";
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 740, 940);
    
    ctx.strokeStyle = "rgba(245, 158, 11, 0.75)";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 720, 920);

    // Corner Vedic Floral accents
    const corners = [[40, 40], [760, 40], [40, 960], [760, 960]];
    corners.forEach(([cx, cy]) => {
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
    });

    // 3. Glowing Radiant Sun
    const sunGrad = ctx.createRadialGradient(400, 240, 15, 400, 240, 260);
    sunGrad.addColorStop(0, "rgba(254, 240, 138, 1)");
    sunGrad.addColorStop(0.2, "rgba(245, 158, 11, 0.7)");
    sunGrad.addColorStop(0.5, "rgba(234, 88, 12, 0.3)");
    sunGrad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(400, 240, 260, 0, Math.PI * 2);
    ctx.fill();

    // Sacred Om and Sun Icon
    ctx.font = "bold 64px 'Rozha One', 'Cinzel', serif";
    ctx.fillStyle = "#ffffff";
    ctx.textAlign = "center";
    ctx.fillText("☀️", 400, 240);

    // 4. Shloka Top
    ctx.font = "italic 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#fef08a";
    ctx.fillText("॥ ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणाय नमः ॥", 400, 100);

    // 5. Main Title
    ctx.font = "bold 52px 'Rozha One', 'Cinzel', serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0, 0, 0, 0.6)";
    ctx.shadowBlur = 12;
    ctx.fillText("शुभ छठ पूजा", 400, 360);

    ctx.font = "600 24px 'Cinzel', serif";
    ctx.fillStyle = "#fef08a";
    ctx.letterSpacing = "4px";
    ctx.fillText("CHHATH MAHAPARV", 400, 400);
    ctx.shadowBlur = 0;

    // Divider Line
    ctx.strokeStyle = "rgba(254, 240, 138, 0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 425);
    ctx.lineTo(550, 425);
    ctx.stroke();

    ctx.font = "24px serif";
    ctx.fillStyle = "#f59e0b";
    ctx.fillText("🪔", 400, 432);

    // 6. Sacred Quote Body Text (Wrapped)
    ctx.font = "300 22px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#f8fafc";
    this.wrapText(ctx, `“${quote}”`, 400, 490, 620, 34);

    // 7. Water Ripples & Floating Diyas Graphic
    ctx.fillStyle = "rgba(12, 26, 46, 0.7)";
    ctx.fillRect(40, 720, 720, 240);

    // Diya illustration
    ctx.font = "48px serif";
    ctx.fillText("🪔", 400, 770);

    // 8. Sender Family & City
    ctx.font = "bold 26px 'Rozha One', 'Cinzel', serif";
    ctx.fillStyle = "#fef08a";
    ctx.fillText(`With Devotion: ${name}`, 400, 835);

    ctx.font = "500 18px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(`📍 ${city} • Kartik Shukla Shashthi`, 400, 875);

    ctx.font = "italic 15px 'Plus Jakarta Sans', sans-serif";
    ctx.fillStyle = "rgba(254, 240, 138, 0.65)";
    ctx.fillText("॥ जय छठी मईया • सदा सहाय ॥", 400, 920);
  }

  wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  downloadCardImage() {
    const canvas = document.getElementById('ecard-canvas');
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `Chhath_Puja_Blessing_Card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    this.showToast("🖼️ Sacred Greeting Card downloaded!", "success");
  }

  async shareCardImage() {
    const canvas = document.getElementById('ecard-canvas');
    if (!canvas) return;

    if (navigator.canShare && canvas.toBlob) {
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'Chhath_Puja_Greetings.png', { type: 'image/png' });
        if (navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              title: "शुभ छठ पूजा • Chhath Puja Greetings",
              text: "Sending warm blessings from our family on the holy festival of Chhath Puja. Jai Chhathi Maiya!"
            });
            this.showToast("🙏 Greeting card shared successfully!", "success");
            return;
          } catch (e) {
            if (e.name !== 'AbortError') this.downloadCardImage();
          }
        } else {
          this.downloadCardImage();
        }
      });
    } else {
      this.downloadCardImage();
    }
  }

  // --- TOAST NOTIFICATION UTILITY ---
  showToast(message, type = "info") {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast-item toast-${type}`;
    toast.innerHTML = `
      <span class="toast-icon">${type === 'success' ? '✨' : 'ℹ️'}</span>
      <span class="toast-msg">${message}</span>
    `;
    container.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('visible');
    }, 10);

    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 400);
    }, 3500);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.cloudSyncManager = new ChhathCloudManager();
});
