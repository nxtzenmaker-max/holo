/**
 * Main Application Orchestrator for Chhath Puja Website
 * Coordinates themes, ambient audio, modals, interactive supa explorer,
 * and seamless micro-interactions.
 */

// Sacred Supa Items Data for the Interactive Explorer
const SUPA_ITEMS_DATA = {
  thekua: {
    title: "Khasta Thekua (ठेकुआ)",
    symbolism: "Gratitude for the golden harvest & solar warmth",
    desc: "Made from fresh whole wheat, cow ghee, and sugarcane jaggery pressed on wooden saancha moulds. It symbolizes the sweetness of devotion and uncompromised perseverance."
  },
  ganna: {
    title: "Whole Sugarcane with Leaves (ईख / गन्ना)",
    symbolism: "Resilience, vitality, and family protection",
    desc: "Standing as a protective canopy around the Kosi and offerings at the ghat. Sugarcane represents the cycle of sweet reward after patient cultivation."
  },
  dabh: {
    title: "Dabh Nimbu / Pomelo (गागल / डाभ नींबू)",
    symbolism: "Immunity, sattvic purification, and seasonal balance",
    desc: "A massive citrus fruit with thick rind and cleansing pulp. Its bitter-sweet nature represents enduring trials with spiritual calm during seasonal transitions."
  },
  nariyal: {
    title: "Sacred Coconut (श्रीफल / गारी)",
    symbolism: "Divine surrender and ego transcendence",
    desc: "The hard outer husk represents the human ego, while the sweet white core and pure inner water signify unblemished inner truth offered to the Sun."
  },
  haldi_adrak: {
    title: "Raw Turmeric & Ginger with Green Foliage (हल्दी-अदरक)",
    symbolism: "Ayurvedic healing, fertility, and auspicious health",
    desc: "Plucked whole with roots and green leaves attached, representing living earth vitality, natural detoxification, and prevention of winter ailments."
  },
  diya: {
    title: "Earthen Clay Diya (माटी का दीया)",
    symbolism: "The spark of Atman (inner soul) & solar illumination",
    desc: "Molded from holy river silt and fueled with pure cow ghee. Nestled amidst fruits, it brings light to the twilight river waters."
  },
  kasar: {
    title: "Sacred Kasar (कसार के लड्डू)",
    symbolism: "Simplicity, earthiness, and family cohesion",
    desc: "Pounded sun-dried rice flour hand-rolled with ghee, jaggery, and fennel seeds. Reminding devotees that the simplest earth elements hold supreme holiness."
  },
  sindoor: {
    title: "Orange Vermilion (मांग का सिंदूर)",
    symbolism: "Long life, marital devotion, and solar blessing",
    desc: "Applied in an unbroken line from the tip of the nose to the hairline. It traces the central Sushumna nadi, invoking health, honor, and longevity."
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Virtual Ghat Canvas
  if (typeof window.initVirtualGhat === 'function') {
    window.initVirtualGhat('ganga-canvas');
  }

  // 2. Atmosphere / Day Mode Switcher
  const themeBtns = document.querySelectorAll('.theme-btn');
  themeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const timeOfDay = e.currentTarget.dataset.time;
      themeBtns.forEach(b => b.classList.toggle('active', b.dataset.time === timeOfDay));
      document.body.setAttribute('data-theme', timeOfDay);

      if (window.virtualGhatInstance) {
        window.virtualGhatInstance.setTimeOfDay(timeOfDay);
      }
    });
  });

  // 3. Sacred Ambient Soundscape Master Toggle
  const soundToggleBtn = document.getElementById('soundscape-master-toggle');
  const soundIcon = document.getElementById('soundscape-icon');
  const soundWave = document.getElementById('soundscape-wave');

  if (soundToggleBtn && window.sacredAudio) {
    soundToggleBtn.addEventListener('click', () => {
      const isNowActive = window.sacredAudio.toggleMasterSoundscape();
      if (isNowActive) {
        soundToggleBtn.classList.add('active');
        if (soundIcon) soundIcon.textContent = '🔊';
        if (soundWave) soundWave.classList.add('playing');
        soundToggleBtn.setAttribute('title', 'Mute Sacred River Ambience');
      } else {
        soundToggleBtn.classList.remove('active');
        if (soundIcon) soundIcon.textContent = '🔈';
        if (soundWave) soundWave.classList.remove('playing');
        soundToggleBtn.setAttribute('title', 'Listen to Sacred River Ambience');
      }
    });
  }

  // 4. Offer Arghya Action Button
  const arghyaBtn = document.getElementById('offer-arghya-action-btn');
  if (arghyaBtn) {
    arghyaBtn.addEventListener('click', () => {
      if (window.virtualGhatInstance) {
        window.virtualGhatInstance.triggerArghyaOffering();
      }
      // Visual feedback on button
      arghyaBtn.classList.add('blessed');
      setTimeout(() => arghyaBtn.classList.remove('blessed'), 2500);
    });
  }

  // 5. "Light a Diya" Modal Controls
  const openDiyaModalBtn = document.getElementById('open-diya-modal-btn');
  const closeDiyaModalBtn = document.getElementById('close-diya-modal-btn');
  const diyaModal = document.getElementById('light-diya-modal');
  const diyaForm = document.getElementById('float-diya-form');

  if (openDiyaModalBtn && diyaModal) {
    openDiyaModalBtn.addEventListener('click', () => {
      diyaModal.classList.add('active');
    });
  }

  if (closeDiyaModalBtn && diyaModal) {
    closeDiyaModalBtn.addEventListener('click', () => {
      diyaModal.classList.remove('active');
    });
  }

  if (diyaForm) {
    diyaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('diya-user-name').value.trim();
      const city = document.getElementById('diya-user-city').value.trim();
      const wish = document.getElementById('diya-user-wish').value.trim();
      const type = document.querySelector('input[name="diya-petal-type"]:checked')?.value || 'marigold';

      if (window.virtualGhatInstance) {
        window.virtualGhatInstance.addDiya(name, city, wish, type);
      }

      // Close modal
      if (diyaModal) diyaModal.classList.remove('active');
      diyaForm.reset();

      // Scroll smoothly to the river canvas
      const canvasSec = document.getElementById('virtual-ghat-section');
      if (canvasSec) {
        canvasSec.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Detail Diya modal close
  const detailModal = document.getElementById('diya-detail-modal');
  const closeDetailBtn = document.getElementById('close-detail-modal-btn');
  if (closeDetailBtn && detailModal) {
    closeDetailBtn.addEventListener('click', () => {
      detailModal.classList.remove('active');
    });
  }

  // 6. Interactive Bamboo Supa Explorer
  const supaHotspots = document.querySelectorAll('.supa-hotspot');
  const supaTouchChips = document.querySelectorAll('.supa-touch-chip');
  const supaTitle = document.getElementById('supa-info-title');
  const supaSymbol = document.getElementById('supa-info-symbol');
  const supaDesc = document.getElementById('supa-info-desc');

  window.selectSupaItem = function(itemKey) {
    supaHotspots.forEach(s => s.classList.toggle('active', s.dataset.item === itemKey));
    document.querySelectorAll('.supa-touch-chip').forEach(c => c.classList.toggle('active', c.dataset.item === itemKey));
    document.querySelectorAll('.supa-quick-btn').forEach(b => b.classList.toggle('active', b.dataset.item === itemKey));

    const data = SUPA_ITEMS_DATA[itemKey];
    if (data && supaTitle && supaSymbol && supaDesc) {
      supaTitle.textContent = data.title;
      supaSymbol.textContent = `Sacred Essence: ${data.symbolism}`;
      supaDesc.textContent = data.desc;

      if (window.sacredAudio) {
        window.sacredAudio.ringBell(1046.5);
      }
    }
  };

  supaHotspots.forEach(spot => {
    spot.addEventListener('click', (e) => {
      const itemKey = e.currentTarget.dataset.item;
      window.selectSupaItem(itemKey);
    });
  });

  document.querySelectorAll('.supa-touch-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      const itemKey = e.currentTarget.dataset.item;
      window.selectSupaItem(itemKey);
    });
  });

  // 7. Register Ghat Modal Controls
  const openGhatModalBtn = document.getElementById('open-register-ghat-modal-btn');
  const closeGhatModalBtn = document.getElementById('close-register-ghat-modal-btn');
  const registerGhatModal = document.getElementById('register-ghat-modal');
  const registerGhatForm = document.getElementById('register-ghat-form');

  if (openGhatModalBtn && registerGhatModal) {
    openGhatModalBtn.addEventListener('click', () => {
      registerGhatModal.classList.add('active');
    });
  }

  if (closeGhatModalBtn && registerGhatModal) {
    closeGhatModalBtn.addEventListener('click', () => {
      registerGhatModal.classList.remove('active');
    });
  }

  if (registerGhatForm) {
    registerGhatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const gName = document.getElementById('new-ghat-name').value.trim();
      const gCity = document.getElementById('new-ghat-city').value.trim();
      const gWater = document.getElementById('new-ghat-water').value.trim();
      const gOrg = document.getElementById('new-ghat-org').value.trim();

      if (!gName || !gCity) return;

      COMMUNITY_GHATS.unshift({
        id: 'ghat-' + Date.now(),
        name: gName,
        city: gCity,
        state: "Community Enclave",
        region: "all",
        waterbody: gWater || "Community River / Reservoir",
        features: ["Community registered meetup", "Devotee support volunteers", "Prasad sharing circle"],
        contact: gOrg || "Local Devotee Circle",
        timing: "Consult local sunrise/sunset in Muhurat section"
      });

      if (window.communityManager) {
        window.communityManager.renderGhats(COMMUNITY_GHATS);
      }

      if (registerGhatModal) registerGhatModal.classList.remove('active');
      registerGhatForm.reset();
      alert("🙏 Thank you! Your community ghat has been added to the directory.");
    });
  }

  // 8. Mobile Navigation Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-toggle');
  const mainNav = document.getElementById('primary-navigation');
  if (mobileMenuBtn && mainNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mainNav.classList.toggle('nav-open');
      mobileMenuBtn.textContent = mainNav.classList.contains('nav-open') ? '✕' : '☰';
    });

    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('nav-open');
        if (mobileMenuBtn) mobileMenuBtn.textContent = '☰';
      });
    });
  }

  // 9. Close modals on backdrop click or Escape key
  window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-backdrop')) {
      e.target.classList.remove('active');
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));
    }
  });
});
