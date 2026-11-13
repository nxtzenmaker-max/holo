/**
 * Chhath Puja Schedule & Vedic Arghya Muhurat Calculator
 * Astronomical calculations, global ghat timings, live countdown, and calendar integration.
 */

const CHHATH_SCHEDULE_DATA = {
  year: 2026,
  days: [
    {
      dayNumber: 1,
      name: "Nahay Khay",
      hindiName: "नहाय-खाय",
      dateStr: "Friday, 13 November 2026",
      isoDate: "2026-11-13",
      tagline: "Holy Dip, Cleansing & Satvik Kaddu-Bhat",
      desc: "The sacred journey begins with a holy bath in the river or Gangajal. Devotees cleanse their homes and prepare a pure satvik meal of Kaddu-Bhat (bottle gourd & rice) and Chana Dal in brass or clay pots over mango wood fire.",
      mantra: "ॐ सूर्याय नमः । शरीरमाद्यं खलु धर्मसाधनम्",
      rituals: [
        "Holy bath in river or Gangajal at home",
        "Deep purification of prayer room & kitchen",
        "Preparation of Kaddu-Bhat & Chana Dal using rock salt (Sendha Namak)",
        "Vrati partakes in the meal first, followed by family as prasad"
      ]
    },
    {
      dayNumber: 2,
      name: "Kharna / Lohanda",
      hindiName: "खरना / लोहंडा",
      dateStr: "Saturday, 14 November 2026",
      isoDate: "2026-11-14",
      tagline: "Day-long Nirjala Fast & Sacred Rasiya Offering",
      desc: "Devotees observe a strict waterless fast throughout the day. At twilight, after sunset, fresh Rasiya (jaggery kheer) and ghee rotis are prepared on a new earthen stove. After offering to Chhathi Maiya and Surya, the fast is broken, initiating the 36-hour unbroken Nirjala vrat.",
      mantra: "ॐ ह्रीं ह्रीं सूर्याय सहस्रकिरणाय ऐं वांछित फलम् देहि देहि स्वाहा",
      rituals: [
        "Strict waterless fast from dawn to dusk",
        "Evening preparation of Rasiya with Arwa rice, milk & organic Gur",
        "Offering of Rasiya, rotis & bananas on fresh banana leaves",
        "Distribution of Kharna prasad to relatives and neighbors",
        "Commencement of the 36-hour waterless fast (Nirjala Vrat)"
      ]
    },
    {
      dayNumber: 3,
      name: "Sandhya Arghya",
      hindiName: "संध्या अर्घ्य (पहला अर्घ्य)",
      dateStr: "Sunday, 15 November 2026",
      isoDate: "2026-11-15",
      tagline: "Evening Offering to the Setting Sun (Astachalagami Surya)",
      desc: "The entire household prepares the sacred Thekua and Kasar. Carrying bamboo Dauras and decorated Supas on foot to the river ghat, devotees stand waist-deep in the water to offer Arghya to the setting Sun with raw milk, Gangajal, and glowing diyas.",
      mantra: "ॐ आदित्याय विद्महे प्रभाकराय धीमहि तन्नः सूर्यः प्रचोदयात्",
      rituals: [
        "Morning preparation of sacred Thekua using pure cow ghee & wheat",
        "Packing the bamboo Daura and Supa with sacred fruits & prasad",
        "Procession to the river bank singing traditional folk geet",
        "Standing waist-deep in water at sunset",
        "Offering the first Arghya (Sandhya Arghya) with milk, water, and diya"
      ]
    },
    {
      dayNumber: 4,
      name: "Usha Arghya & Paran",
      hindiName: "उषा अर्घ्य एवं पारण (दूसरा अर्घ्य)",
      dateStr: "Monday, 16 November 2026",
      isoDate: "2026-11-16",
      tagline: "Dawn Offering to the Rising Sun & Fast Breaking",
      desc: "Devotees gather at the ghat before dawn (Bhorva) under starlight. As the crimson rays of the rising Sun appear, the second Arghya is offered. Devotees take blessings from Vratis, apply auspicious orange vermilion, and break the 36-hour fast with ginger and prasad.",
      mantra: "ॐ सूर्य देव महाभाग त्रैलोक्य तिमिरापह। गृहाणार्घ्यं मया दत्तं प्रसीद परमेश्वर॥",
      rituals: [
        "Pre-dawn assembly at the ghat (4:00 AM Bhorva)",
        "Awaiting the golden Arunodaya (first rays of dawn)",
        "Offering Usha Arghya with Vedic chants and gratitude",
        "Touching the feet of Vratis and applying long orange vermilion",
        "Breaking the 36-hour fast (Paran) with raw ginger, jaggery & sharbat"
      ]
    }
  ],
  cities: [
    { id: "patna", name: "Patna (Ganga Ghats)", state: "Bihar", country: "India", sunset: "17:01", sunrise: "06:06", lat: 25.5941, lon: 85.1376 },
    { id: "varanasi", name: "Varanasi (Assi / Dashashwamedh)", state: "Uttar Pradesh", country: "India", sunset: "17:07", sunrise: "06:12", lat: 25.3176, lon: 82.9739 },
    { id: "gaya", name: "Gaya (Falgu River)", state: "Bihar", country: "India", sunset: "17:03", sunrise: "06:08", lat: 24.7914, lon: 85.0002 },
    { id: "ranchi", name: "Ranchi (Subarnarekha River)", state: "Jharkhand", country: "India", sunset: "17:04", sunrise: "06:03", lat: 23.3441, lon: 85.3096 },
    { id: "delhi", name: "Delhi-NCR (Yamuna Ghats / ITO)", state: "Delhi", country: "India", sunset: "17:28", sunrise: "06:44", lat: 28.7041, lon: 77.1025 },
    { id: "kolkata", name: "Kolkata (Babu Ghat / Hooghly)", state: "West Bengal", country: "India", sunset: "16:53", sunrise: "05:49", lat: 22.5726, lon: 88.3639 },
    { id: "mumbai", name: "Mumbai (Juhu Beach / Girgaon)", state: "Maharashtra", country: "India", sunset: "17:59", sunrise: "06:46", lat: 19.0760, lon: 72.8777 },
    { id: "lucknow", name: "Lucknow (Gomti Riverfront)", state: "Uttar Pradesh", country: "India", sunset: "17:17", sunrise: "06:26", lat: 26.8467, lon: 80.9462 },
    { id: "bengaluru", name: "Bengaluru (Sankey / Ulsoor Lake)", state: "Karnataka", country: "India", sunset: "17:51", sunrise: "06:16", lat: 12.9716, lon: 77.5946 },
    { id: "janakpur", name: "Janakpur Dham (Ganga Sagar)", state: "Madhesh", country: "Nepal", sunset: "17:03", sunrise: "06:08", lat: 26.7288, lon: 85.9244 },
    { id: "kathmandu", name: "Kathmandu (Bagmati River)", state: "Bagmati", country: "Nepal", sunset: "17:08", sunrise: "06:18", lat: 27.7172, lon: 85.3240 },
    { id: "newyork", name: "New York / New Jersey (Edison)", state: "NJ/NY", country: "USA", sunset: "16:41", sunrise: "06:46", lat: 40.5187, lon: -74.4121 },
    { id: "bayarea", name: "San Francisco / Silicon Valley", state: "CA", country: "USA", sunset: "17:01", sunrise: "06:48", lat: 37.7749, lon: -122.4194 },
    { id: "london", name: "London (Thames / Southall)", state: "England", country: "UK", sunset: "16:15", sunrise: "07:18", lat: 51.5074, lon: -0.1278 },
    { id: "toronto", name: "Toronto (Lake Ontario)", state: "Ontario", country: "Canada", sunset: "16:56", sunrise: "07:11", lat: 43.6532, lon: -79.3832 },
    { id: "dubai", name: "Dubai (Creek / Al Mamzar)", state: "Dubai", country: "UAE", sunset: "17:34", sunrise: "06:37", lat: 25.2048, lon: 55.2708 }
  ]
};

class ChhathScheduler {
  constructor() {
    this.selectedCity = CHHATH_SCHEDULE_DATA.cities[0]; // Patna default
    this.countdownInterval = null;
    this.init();
  }

  init() {
    this.renderTimeline();
    this.renderCitySelector();
    this.updateCityMuhurat(this.selectedCity);
    this.startCountdown();
  }

  renderTimeline() {
    const container = document.getElementById('rituals-timeline-cards');
    if (!container) return;

    // Detect if today matches any day
    const todayStr = "2026-11-13"; // Current system simulated date

    container.innerHTML = CHHATH_SCHEDULE_DATA.days.map((d) => {
      const isToday = d.isoDate === todayStr;
      return `
        <div class="ritual-day-card ${isToday ? 'is-today' : ''}" data-day="${d.dayNumber}">
          <div class="day-badge-header">
            <span class="day-num">Day 0${d.dayNumber}</span>
            ${isToday ? '<span class="today-pulse">● TODAY’S RITUAL</span>' : ''}
          </div>
          <h3 class="day-title">${d.hindiName}</h3>
          <h4 class="day-subtitle">${d.name}</h4>
          <p class="day-date">📅 ${d.dateStr}</p>
          <p class="day-tagline">${d.tagline}</p>
          <p class="day-desc">${d.desc}</p>
          <div class="day-shloka">${d.mantra}</div>
          <div class="day-rituals-list">
            <strong>Key Observances:</strong>
            <ul>
              ${d.rituals.map(r => `<li>${r}</li>`).join('')}
            </ul>
          </div>
          <div class="card-cal-actions">
            <button class="cal-btn-gcal" onclick="window.cloudSyncManager ? window.cloudSyncManager.addToGoogleCalendar(${d.dayNumber}) : window.chhathScheduler.exportToCalendar(${d.dayNumber})" title="Sync to Google Calendar in Cloud">
              📅 Google Calendar
            </button>
            <button class="cal-btn" onclick="window.chhathScheduler.exportToCalendar(${d.dayNumber})" title="Download .ics Calendar File">
              🔔 .ics File
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  renderCitySelector() {
    const select = document.getElementById('city-select-dropdown');
    if (!select) return;

    select.innerHTML = CHHATH_SCHEDULE_DATA.cities.map(c => `
      <option value="${c.id}">${c.name} - ${c.country}</option>
    `).join('');

    select.addEventListener('change', (e) => {
      const found = CHHATH_SCHEDULE_DATA.cities.find(c => c.id === e.target.value);
      if (found) {
        this.selectedCity = found;
        this.updateCityMuhurat(found);
      }
    });
  }

  updateCityMuhurat(city) {
    const cityNameEl = document.getElementById('muhurat-city-name');
    const sunsetEl = document.getElementById('muhurat-sunset-time');
    const sunriseEl = document.getElementById('muhurat-sunrise-time');
    const brahmaEl = document.getElementById('muhurat-brahma-time');

    if (cityNameEl) cityNameEl.textContent = `${city.name}, ${city.state}`;
    if (sunsetEl) sunsetEl.textContent = `${city.sunset} (15 Nov)`;
    if (sunriseEl) sunriseEl.textContent = `${city.sunrise} (16 Nov)`;

    // Calculate approximate Brahma Muhurat (approx 1 hr 36 mins before sunrise)
    if (brahmaEl) {
      const [sh, sm] = city.sunrise.split(':').map(Number);
      let bmTotalMinutes = (sh * 60 + sm) - 96;
      if (bmTotalMinutes < 0) bmTotalMinutes += 1440;
      const bmh = Math.floor(bmTotalMinutes / 60);
      const bmm = bmTotalMinutes % 60;
      const formattedBrahma = `${String(bmh).padStart(2, '0')}:${String(bmm).padStart(2, '0')} AM`;
      brahmaEl.textContent = formattedBrahma;
    }
  }

  detectUserLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser. Please select a nearby city from the list.");
      return;
    }

    const btn = document.getElementById('detect-location-btn');
    if (btn) btn.innerHTML = "📍 Detecting Solar Horizon...";

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const calculated = this.calculateSolarTimings(latitude, longitude, new Date(2026, 10, 15));
        const userCity = {
          id: "custom",
          name: "Your Local Horizon",
          state: `Lat ${latitude.toFixed(2)}°, Lon ${longitude.toFixed(2)}°`,
          country: "Detected Location",
          sunset: calculated.sunsetStr,
          sunrise: calculated.sunriseStr,
          lat: latitude,
          lon: longitude
        };
        this.selectedCity = userCity;
        this.updateCityMuhurat(userCity);
        if (btn) btn.innerHTML = "✅ Local Muhurat Found";
      },
      (err) => {
        if (btn) btn.innerHTML = "📍 Use My Location";
        alert("Could not detect location. Please select your nearest city from the dropdown list.");
      }
    );
  }

  calculateSolarTimings(lat, lon, date) {
    // Standard astronomical solar noon approximation
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    const rad = Math.PI / 180;
    const declination = -23.45 * Math.cos(rad * (360 / 365) * (dayOfYear + 10));
    
    // Hour angle at horizon (-0.83 degrees for refraction)
    const cosH = (Math.sin(-0.83 * rad) - Math.sin(lat * rad) * Math.sin(declination * rad)) / 
                 (Math.cos(lat * rad) * Math.cos(declination * rad));
    
    let H = 6; // default 6 hours
    if (cosH >= -1 && cosH <= 1) {
      H = Math.acos(cosH) / rad / 15;
    }

    const timeZoneOffset = -date.getTimezoneOffset() / 60;
    const solarNoon = 12 + (timeZoneOffset - (lon / 15));

    const sunriseDec = solarNoon - H;
    const sunsetDec = solarNoon + H;

    const formatTime = (dec) => {
      const h = Math.floor(dec);
      const m = Math.floor((dec - h) * 60);
      return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
    };

    return {
      sunriseStr: formatTime(sunriseDec),
      sunsetStr: formatTime(sunsetDec)
    };
  }

  startCountdown() {
    // Target: Sandhya Arghya at sunset on Nov 15, 2026 (17:00 IST)
    const targetTime = new Date("2026-11-15T17:01:00+05:30").getTime();

    const updateTimer = () => {
      // Simulated current date is Nov 13, 2026 04:01 UTC
      const now = Date.now();
      const diff = targetTime - now;

      const daysEl = document.getElementById('count-days');
      const hoursEl = document.getElementById('count-hours');
      const minsEl = document.getElementById('count-mins');
      const secsEl = document.getElementById('count-secs');

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
        if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');
      } else {
        const titleEl = document.getElementById('countdown-title-text');
        if (titleEl) titleEl.textContent = "॥ पावन छठ पूजा का महापर्व प्रारंभ ॥";
      }
    };

    updateTimer();
    this.countdownInterval = setInterval(updateTimer, 1000);
  }

  exportToCalendar(dayNum) {
    const day = CHHATH_SCHEDULE_DATA.days.find(d => d.dayNumber === dayNum);
    if (!day) return;

    let startTime, endTime;
    if (dayNum === 1) {
      startTime = "20261113T060000";
      endTime = "20261113T140000";
    } else if (dayNum === 2) {
      startTime = "20261114T060000";
      endTime = "20261114T200000";
    } else if (dayNum === 3) {
      startTime = "20261115T150000";
      endTime = "20261115T183000";
    } else {
      startTime = "20261116T043000";
      endTime = "20261116T080000";
    }

    const icsContent = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Chhath Puja Mahaparv//Sacred Festival//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `SUMMARY:Chhath Puja - ${day.name} (${day.hindiName})`,
      `DESCRIPTION:${day.desc.replace(/,/g, '\\,')} \\n\\nMantra: ${day.mantra}`,
      `DTSTART:${startTime}`,
      `DTEND:${endTime}`,
      "LOCATION:Sacred River Ghat / Community Pond",
      "STATUS:CONFIRMED",
      "BEGIN:VALARM",
      "TRIGGER:-PT60M",
      "ACTION:DISPLAY",
      `DESCRIPTION:Reminder: Chhath Puja ${day.name} begins shortly!`,
      "END:VALARM",
      "END:VEVENT",
      "END:VCALENDAR"
    ].join("\r\n");

    const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Chhath_Puja_Day_${dayNum}_${day.name.replace(/\s+/g, '_')}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.chhathScheduler = new ChhathScheduler();
});
