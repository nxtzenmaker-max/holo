/**
 * Chhath Puja Sacred Soundscape Engine
 * Powered by Web Audio API for 100% reliable, zero-latency, offline-capable spiritual atmosphere.
 * Features:
 * - Sacred River Ganges Flow Generator (Brownian/Pink filtered noise with gentle ripples)
 * - Authentic Bronze Temple Bell (Ghanta) Physical Modeling
 * - Meditative Tanpura Drone in Sa-Pa tuning
 * - Sacred Shankh (Conch Shell) Resonance
 * - Traditional Folk Melody Synthesizer (Bansuri / Harmonium inspired tones)
 */

class SacredSoundscape {
  constructor() {
    this.ctx = null;
    this.isMuted = true;
    this.ambientRunning = false;
    this.tanpuraRunning = false;
    this.currentTrack = null;
    this.masterGain = null;
    this.riverGain = null;
    this.tanpuraGain = null;
    this.ambientNodes = [];
    this.tanpuraNodes = [];
    this.melodyTimeout = null;
    this.isPlayingMelody = false;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    this.ctx = new AudioContext();

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // River Ambience Gain
    this.riverGain = this.ctx.createGain();
    this.riverGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.riverGain.connect(this.masterGain);

    // Tanpura Gain
    this.tanpuraGain = this.ctx.createGain();
    this.tanpuraGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
    this.tanpuraGain.connect(this.masterGain);
  }

  resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // --- 1. SACRED RIVER GANGES WATER ENGINE ---
  startRiverFlow() {
    this.init();
    this.resume();
    if (this.ambientRunning) return;

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(2, bufferSize, this.ctx.sampleRate);
    
    // Generate organic pink/brown noise
    for (let channel = 0; channel < 2; channel++) {
      const output = noiseBuffer.getChannelData(channel);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    // Filters to shape water timbre
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(450, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(60, this.ctx.currentTime);

    // LFO for wave modulation
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.2, this.ctx.currentTime); // gentle tide swell
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(150, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);

    whiteNoise.connect(highpass);
    highpass.connect(lowpass);
    lowpass.connect(this.riverGain);

    whiteNoise.start();
    lfo.start();

    // Smooth fade in
    this.riverGain.gain.linearRampToValueAtTime(0.35, this.ctx.currentTime + 2.5);

    this.ambientNodes = [whiteNoise, lfo, lowpass, highpass];
    this.ambientRunning = true;
  }

  stopRiverFlow() {
    if (!this.ambientRunning || !this.ctx) return;
    this.riverGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1);
    setTimeout(() => {
      this.ambientNodes.forEach(node => {
        try { node.stop(); } catch(e) {}
        try { node.disconnect(); } catch(e) {}
      });
      this.ambientNodes = [];
      this.ambientRunning = false;
    }, 1100);
  }

  // --- 2. SACRED BRONZE TEMPLE BELL (GHANTA) ---
  ringBell(frequency = 1046.5) { // C6 bell
    this.init();
    this.resume();

    const now = this.ctx.currentTime;
    // Harmonic ratios of traditional bronze bells
    const harmonics = [
      { ratio: 1.0, gain: 0.8, decay: 3.5 },
      { ratio: 1.5, gain: 0.5, decay: 2.8 },
      { ratio: 2.0, gain: 0.4, decay: 2.2 },
      { ratio: 2.76, gain: 0.25, decay: 1.6 },
      { ratio: 3.0, gain: 0.2, decay: 1.4 },
      { ratio: 4.07, gain: 0.15, decay: 1.0 },
      { ratio: 5.43, gain: 0.08, decay: 0.8 }
    ];

    harmonics.forEach(h => {
      const osc = this.ctx.createOscillator();
      const gainNode = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(frequency * h.ratio, now);

      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(h.gain * 0.25, now + 0.005);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + h.decay);

      osc.connect(gainNode);
      gainNode.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + h.decay);
    });
  }

  // --- 3. SACRED SHANKH (CONCH SHELL) ---
  blowShankh() {
    this.init();
    this.resume();

    const now = this.ctx.currentTime;
    const fundamental = 220; // A3

    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'sawtooth';
    osc2.type = 'triangle';

    // Pitch sweep mimicking human breath into conch
    osc1.frequency.setValueAtTime(fundamental * 0.85, now);
    osc1.frequency.exponentialRampToValueAtTime(fundamental, now + 0.6);
    osc1.frequency.exponentialRampToValueAtTime(fundamental * 1.05, now + 2.5);
    osc1.frequency.linearRampToValueAtTime(fundamental * 0.95, now + 3.8);

    osc2.frequency.setValueAtTime(fundamental * 1.7, now);
    osc2.frequency.exponentialRampToValueAtTime(fundamental * 2, now + 0.6);

    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(440, now);
    filter.Q.setValueAtTime(3.0, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.8);
    gain.gain.setValueAtTime(0.3, now + 2.5);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 4.2);
    osc2.stop(now + 4.2);
  }

  // --- 4. SACRED TANPURA DRONE ---
  startTanpura() {
    this.init();
    this.resume();
    if (this.tanpuraRunning) return;

    // C# tuning (138.59 Hz)
    const baseFreq = 138.59;
    const strings = [
      { freq: baseFreq * 1.5, detune: -2 }, // Pa
      { freq: baseFreq * 2, detune: 3 },   // Sa (high)
      { freq: baseFreq * 2, detune: -3 },  // Sa (high)
      { freq: baseFreq, detune: 1 }         // Kharaj Sa (low)
    ];

    const oscNodes = [];

    strings.forEach((s) => {
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(s.freq, this.ctx.currentTime);
      osc.detune.setValueAtTime(s.detune, this.ctx.currentTime);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.tanpuraGain);

      osc.start();
      oscNodes.push(osc);
    });

    this.tanpuraGain.gain.linearRampToValueAtTime(0.25, this.ctx.currentTime + 3);
    this.tanpuraNodes = oscNodes;
    this.tanpuraRunning = true;
  }

  stopTanpura() {
    if (!this.tanpuraRunning || !this.ctx) return;
    this.tanpuraGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);
    setTimeout(() => {
      this.tanpuraNodes.forEach(node => {
        try { node.stop(); } catch(e) {}
        try { node.disconnect(); } catch(e) {}
      });
      this.tanpuraNodes = [];
      this.tanpuraRunning = false;
    }, 1600);
  }

  // --- 5. BANSURI / FOLK MELODY GENERATOR ---
  playFolkTune(melodyName = 'kelwa') {
    this.init();
    this.resume();
    this.stopFolkTune();

    // Raga Bhupali / Desh inspired sacred melodic phrases
    // Notes: Sa(C4=261.63), Re(D4=293.66), Ga(E4=329.63), Pa(G4=392.00), Dha(A4=440.00), Sa'(C5=523.25)
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, G5: 783.99, REST: 0
    };

    const melodies = {
      kelwa: [
        // "Kelwa Ke Paat Par Ugelan Suraj Mal" motif
        { note: N.G4, dur: 0.6 }, { note: N.G4, dur: 0.4 }, { note: N.A4, dur: 0.6 },
        { note: N.G4, dur: 0.8 }, { note: N.E4, dur: 0.5 }, { note: N.D4, dur: 0.6 },
        { note: N.E4, dur: 0.6 }, { note: N.G4, dur: 1.0 }, { note: N.REST, dur: 0.3 },
        { note: N.A4, dur: 0.6 }, { note: N.C5, dur: 0.8 }, { note: N.A4, dur: 0.5 },
        { note: N.G4, dur: 0.9 }, { note: N.E4, dur: 0.5 }, { note: N.D4, dur: 0.6 },
        { note: N.C4, dur: 1.4 }, { note: N.REST, dur: 0.6 }
      ],
      bahangi: [
        // "Kanch Hi Baas Ke Bahangiya" motif
        { note: N.C4, dur: 0.5 }, { note: N.D4, dur: 0.5 }, { note: N.E4, dur: 0.7 },
        { note: N.G4, dur: 0.9 }, { note: N.E4, dur: 0.5 }, { note: N.D4, dur: 0.6 },
        { note: N.E4, dur: 0.8 }, { note: N.G4, dur: 0.6 }, { note: N.A4, dur: 1.1 },
        { note: N.REST, dur: 0.4 },
        { note: N.C5, dur: 0.7 }, { note: N.A4, dur: 0.5 }, { note: N.G4, dur: 0.8 },
        { note: N.E4, dur: 0.6 }, { note: N.D4, dur: 0.7 }, { note: N.C4, dur: 1.5 }
      ],
      dinanath: [
        // "Ho Deenanath" morning prayer motif
        { note: N.E4, dur: 0.8 }, { note: N.G4, dur: 0.8 }, { note: N.A4, dur: 1.0 },
        { note: N.C5, dur: 1.2 }, { note: N.D5, dur: 0.6 }, { note: N.C5, dur: 0.8 },
        { note: N.A4, dur: 0.8 }, { note: N.G4, dur: 1.4 }, { note: N.REST, dur: 0.5 },
        { note: N.G4, dur: 0.6 }, { note: N.A4, dur: 0.6 }, { note: N.E4, dur: 0.8 },
        { note: N.D4, dur: 0.8 }, { note: N.C4, dur: 1.8 }
      ]
    };

    const notes = melodies[melodyName] || melodies.kelwa;
    this.isPlayingMelody = true;

    let step = 0;
    const playNext = () => {
      if (!this.isPlayingMelody) return;
      const cur = notes[step % notes.length];
      step++;

      if (cur.note > 0) {
        this.playFluteNote(cur.note, cur.dur);
      }

      this.melodyTimeout = setTimeout(playNext, cur.dur * 1000);
    };

    playNext();
  }

  playFluteNote(freq, duration) {
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const vibrato = this.ctx.createOscillator();
    const vibratoGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    // Bamboo flute has gentle sine/triangle warmth with subtle breathiness
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Warm vibrato
    vibrato.frequency.setValueAtTime(5.2, now);
    vibratoGain.gain.setValueAtTime(2.5, now);
    vibrato.connect(osc.frequency);
    vibrato.start(now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 3, now);

    // Soft attack & flute breath release
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.12);
    gain.gain.setValueAtTime(0.18, now + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + duration + 0.05);
    vibrato.stop(now + duration + 0.05);
  }

  stopFolkTune() {
    this.isPlayingMelody = false;
    if (this.melodyTimeout) {
      clearTimeout(this.melodyTimeout);
      this.melodyTimeout = null;
    }
  }

  toggleMasterSoundscape(enable = null) {
    const shouldEnable = enable !== null ? enable : !this.ambientRunning;
    if (shouldEnable) {
      this.startRiverFlow();
      this.startTanpura();
      return true;
    } else {
      this.stopRiverFlow();
      this.stopTanpura();
      this.stopFolkTune();
      return false;
    }
  }
}

// Global singleton instance
window.sacredAudio = new SacredSoundscape();
