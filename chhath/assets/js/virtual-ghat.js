/**
 * Virtual Ganga Ghat Experience - Interactive Canvas
 * Simulates the holy river Ganges at twilight/dawn with fluid water ripples,
 * glowing floating earthen diyas (deepaks), marigold petals, and community prayers.
 */

class VirtualGhat {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = 0;
    this.height = 0;
    this.diyas = [];
    this.petals = [];
    this.waterTime = 0;
    this.hoveredDiya = null;
    this.activeTimeOfDay = 'dusk'; // 'dawn', 'noon', 'dusk', 'night'
    this.isArghyaPouring = false;
    this.arghyaParticles = [];
    this.arghyaProgress = 0;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Pre-populate authentic community diyas
    const sampleDiyas = [
      { name: "Sunita & Arvind Singh", city: "Patna Ghat", wish: "छठी मईया सबके घर-परिवार में सुख, शांति और समृद्धि दें।", type: "marigold" },
      { name: "Rohit K. Pandey", city: "Varanasi", wish: "Pranam to Bhagwan Surya. May darkness turn to divine light.", type: "rose" },
      { name: "Meera & Family", city: "New Jersey, USA", wish: "Miles away from home, but the heart is always at the Ganga Ghat.", type: "marigold" },
      { name: "Rajeshwar Jha", city: "Darbhanga", wish: "For my daughter's education and parents' long health.", type: "marigold" },
      { name: "Pooja Chaudhary", city: "Bengaluru", wish: "Gratitude for health, peace, and sacred traditions alive in our hearts.", type: "rose" },
      { name: "Alok Mishra", city: "London, UK", wish: "Carrying the warmth of our ancestors' prayers across oceans.", type: "marigold" }
    ];

    sampleDiyas.forEach((d, idx) => {
      this.diyas.push(this.createDiyaObject(
        (0.15 + (idx * 0.14) + Math.random() * 0.05) * this.width,
        (0.45 + (idx % 3) * 0.15 + Math.random() * 0.08) * this.height,
        d.name,
        d.city,
        d.wish,
        d.type
      ));
    });

    // Populate marigold petals floating on the river
    for (let i = 0; i < 25; i++) {
      this.petals.push({
        x: Math.random() * this.width,
        y: (0.35 + Math.random() * 0.6) * this.height,
        radius: 3 + Math.random() * 4,
        speedX: 0.15 + Math.random() * 0.25,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: Math.random() > 0.3 ? '#f59e0b' : '#ef4444' // marigold orange or rose crimson
      });
    }

    // Canvas interactivity
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('click', (e) => this.handleClick(e));
    this.canvas.addEventListener('touchstart', (e) => this.handleTouch(e), { passive: true });

    this.animate();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.width = this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.height = this.canvas.height = (rect.height || 420) * (window.devicePixelRatio || 1);
    this.ctx.scale(window.devicePixelRatio || 1, window.devicePixelRatio || 1);
    this.displayWidth = rect.width;
    this.displayHeight = rect.height || 420;
  }

  createDiyaObject(x, y, name, city, wish, type = 'marigold') {
    return {
      x: x,
      y: y,
      baseY: y,
      speedX: 0.25 + Math.random() * 0.2,
      bobOffset: Math.random() * Math.PI * 2,
      name: name,
      city: city,
      wish: wish,
      type: type,
      flameSize: 1.0,
      flicker: 0,
      created: Date.now()
    };
  }

  addDiya(name, city, wish, type) {
    // Add near bottom-center or left
    const newDiya = this.createDiyaObject(
      (0.2 + Math.random() * 0.3) * this.displayWidth,
      (0.65 + Math.random() * 0.15) * this.displayHeight,
      name || "Devotee",
      city || "Ganga Ghat",
      wish || "ॐ सूर्याय नमः । जय छठी मईया",
      type || "marigold"
    );
    this.diyas.push(newDiya);

    // Trigger ring bell sound if audio is enabled
    if (window.sacredAudio) {
      window.sacredAudio.ringBell(1046.5);
    }
    return newDiya;
  }

  triggerArghyaOffering() {
    this.isArghyaPouring = true;
    this.arghyaProgress = 0;
    this.arghyaParticles = [];

    // Sound effect
    if (window.sacredAudio) {
      window.sacredAudio.blowShankh();
      window.sacredAudio.ringBell(880);
    }

    // Generate flowing milk and water streams with golden solar rays
    const sourceX = this.displayWidth * 0.5;
    const sourceY = this.displayHeight * 0.18;

    for (let i = 0; i < 90; i++) {
      this.arghyaParticles.push({
        x: sourceX + (Math.random() - 0.5) * 12,
        y: sourceY + Math.random() * 8,
        vx: (Math.random() - 0.5) * 1.2,
        vy: 2.2 + Math.random() * 3.5,
        type: Math.random() > 0.4 ? 'milk' : (Math.random() > 0.5 ? 'water' : 'petal'),
        life: 1.0,
        decay: 0.012 + Math.random() * 0.01
      });
    }
  }

  setTimeOfDay(time) {
    this.activeTimeOfDay = time;
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;

    let found = null;
    for (let d of this.diyas) {
      const dist = Math.hypot(d.x - mx, d.y - my);
      if (dist < 28) {
        found = d;
        break;
      }
    }
    this.hoveredDiya = found;
    this.canvas.style.cursor = found ? 'pointer' : 'default';
  }

  handleClick(e) {
    if (this.hoveredDiya) {
      this.showDiyaModal(this.hoveredDiya);
    }
  }

  handleTouch(e) {
    if (!e.touches || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = this.canvas.getBoundingClientRect();
    const mx = touch.clientX - rect.left;
    const my = touch.clientY - rect.top;

    let found = null;
    for (let d of this.diyas) {
      const dist = Math.hypot(d.x - mx, d.y - my);
      if (dist < 36) {
        found = d;
        break;
      }
    }
    if (found) {
      this.showDiyaModal(found);
    }
  }

  showDiyaModal(diya) {
    const modal = document.getElementById('diya-detail-modal');
    if (!modal) return;
    document.getElementById('modal-diya-name').textContent = diya.name;
    document.getElementById('modal-diya-location').textContent = diya.city;
    document.getElementById('modal-diya-prayer').textContent = `“${diya.wish}”`;
    modal.classList.add('active');
  }

  animate() {
    this.waterTime += 0.025;
    this.ctx.clearRect(0, 0, this.displayWidth, this.displayHeight);

    // 1. Draw River & Sky Gradient
    this.drawAtmosphere();

    // 2. Draw Gentle River Water Waves & Light Reflections
    this.drawWaterWaves();

    // 3. Draw Floating Petals
    this.drawPetals();

    // 4. Draw Floating Diyas
    this.drawDiyas();

    // 5. Draw Arghya Pouring Animation if active
    if (this.isArghyaPouring) {
      this.drawArghyaStream();
    }

    requestAnimationFrame(() => this.animate());
  }

  drawAtmosphere() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    let skyGrad = ctx.createLinearGradient(0, 0, 0, h);
    if (this.activeTimeOfDay === 'dawn') {
      // Bhorva (Dawn) - mystical crimson, rose, and amber
      skyGrad.addColorStop(0, '#1e1b4b');
      skyGrad.addColorStop(0.3, '#831843');
      skyGrad.addColorStop(0.5, '#ea580c');
      skyGrad.addColorStop(0.65, '#f59e0b');
      skyGrad.addColorStop(1, '#0f172a');
    } else if (this.activeTimeOfDay === 'dusk') {
      // Sanjha (Sunset Arghya) - radiant deep saffron, terracotta, vermilion
      skyGrad.addColorStop(0, '#1c1917');
      skyGrad.addColorStop(0.25, '#991b1b');
      skyGrad.addColorStop(0.45, '#c2410c');
      skyGrad.addColorStop(0.62, '#d97706');
      skyGrad.addColorStop(1, '#0c1a2e');
    } else if (this.activeTimeOfDay === 'night') {
      // Midnight sacred river
      skyGrad.addColorStop(0, '#030712');
      skyGrad.addColorStop(0.4, '#0f172a');
      skyGrad.addColorStop(0.65, '#1e1b4b');
      skyGrad.addColorStop(1, '#020617');
    } else {
      // Radiant golden day
      skyGrad.addColorStop(0, '#fef3c7');
      skyGrad.addColorStop(0.3, '#fde68a');
      skyGrad.addColorStop(0.55, '#f59e0b');
      skyGrad.addColorStop(1, '#1e293b');
    }

    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, w, h);

    // Glowing Sun/Aura on Horizon
    const sunY = h * 0.42;
    const sunX = w * 0.5;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, w * 0.35);
    sunGrad.addColorStop(0, 'rgba(254, 240, 138, 0.95)');
    sunGrad.addColorStop(0.2, 'rgba(245, 158, 11, 0.6)');
    sunGrad.addColorStop(0.5, 'rgba(225, 29, 72, 0.2)');
    sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, w * 0.35, 0, Math.PI * 2);
    ctx.fill();

    // Soft distant ghat silhouette
    ctx.fillStyle = 'rgba(20, 15, 25, 0.4)';
    ctx.beginPath();
    ctx.moveTo(0, h * 0.44);
    ctx.lineTo(w * 0.25, h * 0.42);
    ctx.lineTo(w * 0.35, h * 0.45);
    ctx.lineTo(w * 0.65, h * 0.43);
    ctx.lineTo(w, h * 0.44);
    ctx.lineTo(w, h * 0.48);
    ctx.lineTo(0, h * 0.48);
    ctx.closePath();
    ctx.fill();
  }

  drawWaterWaves() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;
    const riverStart = h * 0.44;

    // Layered sine wave ripples for holy flowing Ganges
    for (let layer = 0; layer < 4; layer++) {
      const yBase = riverStart + (layer * ((h - riverStart) / 4));
      ctx.beginPath();
      ctx.moveTo(0, yBase);

      const freq = 0.008 + layer * 0.003;
      const amp = 3 + layer * 2.5;
      const speed = this.waterTime * (0.8 + layer * 0.4);

      for (let x = 0; x <= w; x += 15) {
        const yOffset = Math.sin(x * freq + speed) * amp + Math.cos(x * 0.015 - speed * 0.5) * (amp * 0.5);
        ctx.lineTo(x, yBase + yOffset);
      }
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.closePath();

      const alpha = 0.12 + layer * 0.08;
      ctx.fillStyle = layer % 2 === 0 
        ? `rgba(234, 88, 12, ${alpha * 0.5})` 
        : `rgba(251, 191, 36, ${alpha * 0.4})`;
      ctx.fill();

      // Golden light path reflection on the river
      const reflectGrad = ctx.createRadialGradient(w * 0.5, yBase, 5, w * 0.5, yBase, w * 0.25);
      reflectGrad.addColorStop(0, `rgba(254, 240, 138, ${0.25 - layer * 0.04})`);
      reflectGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = reflectGrad;
      ctx.fillRect(w * 0.25, yBase - 10, w * 0.5, 30);
    }
  }

  drawPetals() {
    const ctx = this.ctx;
    const w = this.displayWidth;

    this.petals.forEach(p => {
      p.x += p.speedX;
      p.angle += p.angularSpeed;
      if (p.x > w + 20) p.x = -15;

      ctx.save();
      ctx.translate(p.x, p.y + Math.sin(this.waterTime + p.x * 0.02) * 2.5);
      ctx.rotate(p.angle);

      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, p.radius * 1.5, p.radius, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  drawDiyas() {
    const ctx = this.ctx;
    const w = this.displayWidth;

    this.diyas.forEach(d => {
      // Drift with river flow
      d.x += d.speedX;
      if (d.x > w + 45) {
        d.x = -40;
        d.baseY = (0.46 + Math.random() * 0.45) * this.displayHeight;
      }

      // Gentle vertical bobbing with wave
      d.y = d.baseY + Math.sin(this.waterTime * 1.8 + d.bobOffset) * 4;
      d.flicker = Math.sin(this.waterTime * 8 + d.x) * 0.15 + (Math.random() - 0.5) * 0.08;

      const isHovered = this.hoveredDiya === d;

      // Outer Golden Aura / Water Glow
      const glowGrad = ctx.createRadialGradient(d.x, d.y + 4, 2, d.x, d.y + 4, 38);
      glowGrad.addColorStop(0, 'rgba(251, 191, 36, 0.7)');
      glowGrad.addColorStop(0.4, 'rgba(245, 158, 11, 0.25)');
      glowGrad.addColorStop(1, 'rgba(245, 158, 11, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(d.x, d.y + 4, 38, 0, Math.PI * 2);
      ctx.fill();

      // Diya Clay Saucer (Terracotta boat)
      ctx.save();
      ctx.translate(d.x, d.y);

      // Flower ring around diya (Marigold petals)
      const petalCount = 8;
      for (let p = 0; p < petalCount; p++) {
        const pAngle = (p / petalCount) * Math.PI * 2;
        const px = Math.cos(pAngle) * 13;
        const py = Math.sin(pAngle) * 7 + 4;
        ctx.fillStyle = d.type === 'rose' ? '#e11d48' : '#f59e0b';
        ctx.beginPath();
        ctx.ellipse(px, py, 4.5, 3.5, pAngle, 0, Math.PI * 2);
        ctx.fill();
      }

      // Earthen Clay Diya Base
      ctx.fillStyle = '#7c2d12'; // terracotta
      ctx.beginPath();
      ctx.ellipse(0, 5, 12, 6, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#b45309'; // inner lip
      ctx.beginPath();
      ctx.ellipse(0, 3, 9, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Golden Ghee pool
      ctx.fillStyle = '#fef08a';
      ctx.beginPath();
      ctx.ellipse(0, 2, 6, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Living Flame (Flickering teardrop)
      const flameH = (14 + d.flicker * 6) * (isHovered ? 1.25 : 1.0);
      const flameW = 4.5 + d.flicker * 1.5;

      const flameGrad = ctx.createLinearGradient(0, 0, 0, -flameH);
      flameGrad.addColorStop(0, '#ffffff'); // pure white core
      flameGrad.addColorStop(0.3, '#fef08a'); // golden yellow
      flameGrad.addColorStop(0.7, '#f97316'); // saffron orange
      flameGrad.addColorStop(1, 'rgba(239, 68, 68, 0)'); // crimson tip fade

      ctx.fillStyle = flameGrad;
      ctx.beginPath();
      ctx.moveTo(-flameW, 0);
      ctx.quadraticCurveTo(-flameW * 1.3, -flameH * 0.6, 0, -flameH);
      ctx.quadraticCurveTo(flameW * 1.3, -flameH * 0.6, flameW, 0);
      ctx.closePath();
      ctx.fill();

      // Hover indicator ring
      if (isHovered) {
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([3, 3]);
        ctx.beginPath();
        ctx.arc(0, 2, 22, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      ctx.restore();

      // Tooltip label above hovered diya
      if (isHovered) {
        this.drawDiyaTooltip(d);
      }
    });
  }

  drawDiyaTooltip(d) {
    const ctx = this.ctx;
    ctx.save();
    ctx.font = '600 12px "Plus Jakarta Sans", sans-serif';
    const text = `${d.name} (${d.city})`;
    const textWidth = ctx.measureText(text).width;
    const pad = 10;
    const boxW = textWidth + pad * 2;
    const boxH = 26;
    const boxX = Math.max(10, Math.min(this.displayWidth - boxW - 10, d.x - boxW / 2));
    const boxY = d.y - 38;

    // Bubble background
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxW, boxH, 6);
    ctx.fill();
    ctx.stroke();

    // Text
    ctx.fillStyle = '#fef3c7';
    ctx.fillText(text, boxX + pad, boxY + 17);
    ctx.restore();
  }

  drawArghyaStream() {
    const ctx = this.ctx;
    const w = this.displayWidth;
    const h = this.displayHeight;

    this.arghyaProgress += 0.015;

    // Glowing holy water & raw milk stream falling from top center
    const kalashX = w * 0.5;
    const kalashY = h * 0.16;

    // Draw Brass Kalash silhouette
    ctx.save();
    ctx.fillStyle = '#eab308';
    ctx.beginPath();
    ctx.arc(kalashX, kalashY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(kalashX - 9, kalashY - 14, 18, 5);
    ctx.restore();

    // Update and draw particles
    let activeParticles = 0;
    this.arghyaParticles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.12; // gravity
      p.life -= p.decay;

      if (p.life > 0) {
        activeParticles++;
        ctx.beginPath();
        if (p.type === 'milk') {
          ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.85})`;
          ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        } else if (p.type === 'petal') {
          ctx.fillStyle = `rgba(239, 68, 68, ${p.life * 0.9})`;
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(254, 240, 138, ${p.life * 0.75})`;
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        }
        ctx.fill();

        // Water splash ripple at river surface
        if (p.y > h * 0.46 && p.y < h * 0.52) {
          ctx.strokeStyle = `rgba(254, 240, 138, ${p.life * 0.5})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, 8 * (1 - p.life), 3 * (1 - p.life), 0, 0, Math.PI * 2);
          ctx.stroke();
        }
      }
    });

    // Surya blessing text overlay during arghya
    ctx.save();
    ctx.font = '700 18px "Cinzel", "Rozha One", serif';
    ctx.fillStyle = `rgba(254, 243, 199, ${Math.min(1, Math.sin(this.arghyaProgress * Math.PI))})`;
    ctx.textAlign = 'center';
    ctx.fillText('॥ ॐ घृणिः सूर्याय नमः ॥', w * 0.5, h * 0.10);
    ctx.restore();

    if (activeParticles === 0 || this.arghyaProgress >= 1.0) {
      this.isArghyaPouring = false;
    }
  }
}

// Global initialization helper
window.initVirtualGhat = function(canvasId = 'ganga-canvas') {
  window.virtualGhatInstance = new VirtualGhat(canvasId);
  return window.virtualGhatInstance;
};
