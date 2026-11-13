/**
 * Chhath Puja Community Interactions Engine
 * Features:
 * - Community Wishes & Prarthana Board with LocalStorage persistence & Namaste blessings
 * - Global Ghat Finder & Community Meetups Directory with live search
 * - Sacred Folk Geet Player with synchronized bilingual lyrics
 * - Vrati Preparation & Packing Checklist with progress tracking
 */

const INITIAL_COMMUNITY_WISHES = [
  {
    id: "wish-1",
    author: "Shashi & Kanti Devi",
    location: "Digha Ghat, Patna",
    category: "family",
    message: "छठी मईया की असीम कृपा से हमारे परिवार में 42 वर्षों से यह अखंड व्रत चल रहा है। माँ सब पर अपनी करुणा और आरोग्यता बनाए रखें।",
    likes: 84,
    date: "13 Nov 2026, 08:30 AM"
  },
  {
    id: "wish-2",
    author: "Anurag Sharma",
    location: "Edison, New Jersey, USA",
    category: "diaspora",
    message: "Even 8,000 miles away from our village in Saran, when the aroma of ghee-fried Thekua fills our home, the distance melts away. Chhath brings Bihar to the world. Jai Chhathi Maiya!",
    likes: 62,
    date: "13 Nov 2026, 07:15 AM"
  },
  {
    id: "wish-3",
    author: "Dr. Vidya Shankar",
    location: "Assi Ghat, Varanasi",
    category: "gratitude",
    message: "सूर्याय नमः। हे प्रत्यक्ष देवता सूर्य! आपकी किरणों से यह सृष्टि जीवित है। समस्त मानवता के कल्याण और पर्यावरण की रक्षा की प्रार्थना है।",
    likes: 51,
    date: "12 Nov 2026, 06:40 PM"
  },
  {
    id: "wish-4",
    author: "Sneha & Saurabh Pandey",
    location: "Bengaluru (Sankey Tank)",
    category: "family",
    message: "Celebrating our first Chhath after marriage. Stepping into the cool waters while holding the sacred bamboo supa filled our hearts with immense reverence.",
    likes: 47,
    date: "12 Nov 2026, 04:20 PM"
  },
  {
    id: "wish-5",
    author: "Manoj Kumar Jha",
    location: "Madhubani, Mithila",
    category: "nostalgia",
    message: "शारदा सिन्हा जी के स्वर में 'कांच ही बांस के बहंगिया' जब सुबह 4 बजे बजता है, तो रोम-रोम में भक्ति की लहर दौड़ जाती है। हमारी संस्कृति ही हमारी पहचान है।",
    likes: 95,
    date: "11 Nov 2026, 09:10 PM"
  },
  {
    id: "wish-6",
    author: "Rituja Sen",
    location: "Babu Ghat, Kolkata",
    category: "gratitude",
    message: "Standing at the edge of the Hooghly as thousands light their diyas together under twilight. No distinctions of caste, wealth, or stature—just pure universal devotion.",
    likes: 38,
    date: "11 Nov 2026, 05:45 PM"
  }
];

const COMMUNITY_GHATS = [
  {
    id: "ghat-1",
    name: "Collectorate Ghat & Digha Ghat",
    city: "Patna",
    state: "Bihar",
    region: "bihar",
    waterbody: "Sacred River Ganges",
    features: ["Dedicated changing enclosures", "Safe barricading in deep water", "LED illumination & sound system", "Medical aid camp", "Daura carrying assistance"],
    contact: "Patna District Chhath Seva Samiti",
    timing: "Sandhya Arghya: 17:01 | Usha Arghya: 06:06"
  },
  {
    id: "ghat-2",
    name: "Assi Ghat & Dashashwamedh Ghat",
    city: "Varanasi",
    state: "Uttar Pradesh",
    region: "up",
    waterbody: "Maa Ganga",
    features: ["Grand evening Ganga Aarti synergy", "Clean paved stone steps", "Boats on patrol for safety", "Free Gangajal distribution"],
    contact: "Kashi Seva Parishad",
    timing: "Sandhya Arghya: 17:07 | Usha Arghya: 06:12"
  },
  {
    id: "ghat-3",
    name: "Kalindi Kunj & ITO Yamuna Ghat",
    city: "New Delhi",
    state: "Delhi",
    region: "up",
    waterbody: "River Yamuna & Clean Artificial Ghats",
    features: ["Fresh aerated clean water reservoirs", "Extensive police protection & parking", "Stage for devotional folk concerts", "Free milk for Arghya"],
    contact: "Delhi Chhath Puja Samiti",
    timing: "Sandhya Arghya: 17:28 | Usha Arghya: 06:44"
  },
  {
    id: "ghat-4",
    name: "Juhu Beach Chhath Sangam",
    city: "Mumbai",
    state: "Maharashtra",
    region: "west",
    waterbody: "Arabian Sea Shoreline",
    features: ["Over 200,000 devotees gathering", "Life guards on active coastal duty", "Clean water showers for Paran", "Traditional Bhojpuri music troupes"],
    contact: "Bhojpuri Ekta Manch, Mumbai",
    timing: "Sandhya Arghya: 17:59 | Usha Arghya: 06:46"
  },
  {
    id: "ghat-5",
    name: "Subarnarekha Riverfront (Bada Talab)",
    city: "Ranchi & Jamshedpur",
    state: "Jharkhand",
    region: "bihar",
    waterbody: "Subarnarekha River",
    features: ["Ecological cleaning drive", "Bamboo walkways & carpets", "Special facilities for elderly Vratis", "First aid & ambulance standby"],
    contact: "Chhath Seva Trust Jharkhand",
    timing: "Sandhya Arghya: 17:04 | Usha Arghya: 06:03"
  },
  {
    id: "ghat-6",
    name: "Edison Lake Papaianni Chhath",
    city: "Edison, New Jersey",
    state: "NJ",
    region: "diaspora",
    waterbody: "Papaianni Lake Park",
    features: ["Heated tents for cold November morning", "Community Prasad distribution hub", "Traditional bamboo Dauras & Supas provided", "Live streaming for global relatives"],
    contact: "Bihar Jharkhand Association of North America (BJANA)",
    timing: "Sandhya Arghya: 16:41 | Usha Arghya: 06:46 (EST)"
  },
  {
    id: "ghat-7",
    name: "San Francisco Bay Area Chhath Meetup",
    city: "San Jose / Fremont",
    state: "California",
    region: "diaspora",
    waterbody: "Central Park Lake, Fremont",
    features: ["Solar blessing ceremony", "Homemade Thekua exchange", "Chhath Geet choir", "Community breakfast during Paran"],
    contact: "Bay Area Maithil & Bhojpuri Cultural Circle",
    timing: "Sandhya Arghya: 17:01 | Usha Arghya: 06:48 (PST)"
  }
];

const CHHATH_FOLK_GEET = [
  {
    id: "kelwa",
    title: "Kelwa Ke Paat Par Ugelan Suraj Mal",
    hindiTitle: "केलवा के पात पर उगेलन सूरजमल",
    melodyKey: "kelwa",
    raga: "Raga Bhupali / Desh",
    context: "The iconic, soul-stirring prayer sung as the sun rises over banana groves and devotees wait with water offerings in the river.",
    lyricsHi: [
      "केलवा के पात पर उगेलन सूरजमल झुके-झुके,",
      "हे करा ना अरघ के बेर, हे करेलिन छठ बरतिया हो दीनदयाल।",
      "हाथे सुथनी, नेबुआ, नारियल, गागल, गांजर,",
      "दउरा सजवलिन हे छठी मईया, दर्शन दीहीं दीनदयाल।"
    ],
    lyricsEn: [
      "Kelwa ke paat par ugelan Surajmal jhuke jhuke,",
      "Hey kara na aragh ke ber, hey karelin Chhath baratiya ho deendayal.",
      "Haathe suthni, nebua, nariyal, gaagal, gaanjar,",
      "Daura sajavlin hey Chhathi Maiya, darshan deeheen deendayal."
    ],
    meaning: "Upon the green banana leaf, the radiant Sun rises with gentle grace. O Lord of the Humble, do not delay the hour of Arghya; the devoted Vrati stands waiting in the stream with hands laden with sugarcane, coconut, and lemon, praying for your divine darshan."
  },
  {
    id: "bahangi",
    title: "Kanch Hi Baas Ke Bahangiya",
    hindiTitle: "कांच ही बांस के बहंगिया, बहंगी लचकत जाए",
    melodyKey: "bahangi",
    raga: "Traditional Bhojpuri Folk",
    context: "Immortalized by the legendary Padma Shri Sharda Sinha. Tells the tender journey of a brother carrying the tender bamboo pole laden with prasad baskets to the ghat for his mother and sister.",
    lyricsHi: [
      "कांच ही बांस के बहंगिया, बहंगी लचकत जाए,",
      "हो बहंगी लचकत जाए...",
      "बात जे पूछेले बटोहिया, बहंगी केकरा के जाए?",
      "तू त आन्हर हउवे रे बटोहिया, बहंगी छठी माई के जाए।"
    ],
    lyricsEn: [
      "Kaanch hi baas ke bahangiya, bahangi lachakat jaaye,",
      "Ho bahangi lachakat jaaye...",
      "Baat je poochhele batohiya, bahangi kekra ke jaaye?",
      "Too ta aanhar hauwe re batohiya, bahangi Chhathi Maayi ke jaaye."
    ],
    meaning: "Made of fresh raw green bamboo, the sacred balance pole sways gently with every step. When a passing traveler asks whose offering this is, the carrier replies with gentle wonder: Are you blind, dear traveler? This sacred offering is destined for Chhathi Maiya!"
  },
  {
    id: "dinanath",
    title: "Ho Deenanath, Uthela Ghanghor Ghata",
    hindiTitle: "हो दीनानाथ, जल बिच ठाढ़ि सेविका",
    melodyKey: "dinanath",
    raga: "Morning Raga Bhairav",
    context: "The deeply reverent hymn sung by women standing in freezing water before the crack of dawn, pleading with the Sun to rise and dispel worldly darkness.",
    lyricsHi: [
      "जल बिच ठाढ़ि सेविका, कर जोरे विनती करेलिन,",
      "हो दीनानाथ! पूरब दिशा से उगीं हे दीनानाथ!",
      "माटी के कलसा, घीव के दियरा सजल बाटे,",
      "सुनीं हमरो अरजिया, हे सुरुज भगवान!"
    ],
    lyricsEn: [
      "Jal bich thaadhi sevika, kar jore vinati karelin,",
      "Ho Deenanath! Poorab disha se ugeen hey Deenanath!",
      "Maati ke kalasa, gheev ke diyara sajal baate,",
      "Suneen hamro arajia, hey Suruj Bhagwaan!"
    ],
    meaning: "Standing waist-deep in the cold water, your humble devotee stands with folded palms. O protector of the poor! Rise from the eastern horizon! With clay kalash and ghee diyas aglow, please hear our humble prayer, O Surya Bhagwan!"
  }
];

const VRAT_CHECKLIST_ITEMS = [
  { id: "c1", category: "bamboo", text: "Hand-woven Bamboo Supa (2 fresh pieces)", checked: true },
  { id: "c2", category: "bamboo", text: "Large Bamboo Daura (covered prasad basket)", checked: true },
  { id: "c3", category: "cooking", text: "Organic Sugarcane Jaggery (Bheli Gur) & Pure Cow Ghee", checked: true },
  { id: "c4", category: "cooking", text: "Coarse Wheat Flour & Sendha Namak (Rock Salt)", checked: true },
  { id: "c5", category: "cooking", text: "Fresh green Bottle Gourd (Kaddu) & Chana Dal for Nahay Khay", checked: true },
  { id: "c6", category: "puja", text: "Clay Diyas (31 or 51 pieces) & pure cotton wicks", checked: false },
  { id: "c7", category: "puja", text: "Fresh Sugarcane stalks with green leaves attached (4 stalks)", checked: false },
  { id: "c8", category: "puja", text: "Cluster of Bananas (Kele ke ghaur) & Coconut with water", checked: false },
  { id: "c9", category: "puja", text: "Dabh Nimbu (Giant Pomelo) & Sweet Potato (Shakarkand)", checked: false },
  { id: "c10", category: "puja", text: "Fresh Ginger & Turmeric plants with green leaves", checked: false },
  { id: "c11", category: "shringar", text: "Sacred Orange Vermilion (Sendur) & Alta", checked: false },
  { id: "c12", category: "arghya", text: "Brass Lota (Kalash), Gangajal & Fresh Cow Milk for Arghya", checked: false },
  { id: "c13", category: "stove", text: "New earthen stove (Mitti ka Chulha) & Dry Mango Firewood", checked: false }
];

class ChhathCommunityManager {
  constructor() {
    this.wishes = this.loadWishes();
    this.currentWishCategory = 'all';
    this.activeChecklistCategory = 'all';
    this.activeGeetIndex = 0;
    this.checklist = this.loadChecklist();
    this.init();
  }

  init() {
    this.renderWishes();
    this.renderGhats(COMMUNITY_GHATS);
    this.renderGeetPlayer();
    this.renderChecklist();
    this.bindEvents();
  }

  loadWishes() {
    try {
      const stored = localStorage.getItem('chhath_wishes_board');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch(e) {}
    return INITIAL_COMMUNITY_WISHES;
  }

  saveWishes() {
    try {
      localStorage.setItem('chhath_wishes_board', JSON.stringify(this.wishes));
    } catch(e) {}
  }

  loadChecklist() {
    try {
      const stored = localStorage.getItem('chhath_vrat_checklist');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch(e) {}
    return VRAT_CHECKLIST_ITEMS;
  }

  saveChecklist() {
    try {
      localStorage.setItem('chhath_vrat_checklist', JSON.stringify(this.checklist));
    } catch(e) {}
  }

  bindEvents() {
    // Wish Filter Buttons
    const catBtns = document.querySelectorAll('.wish-cat-btn');
    catBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        catBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentWishCategory = e.target.dataset.cat;
        this.renderWishes();
      });
    });

    // Wish Submission Form
    const wishForm = document.getElementById('community-wish-form');
    if (wishForm) {
      wishForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('wish-input-name').value.trim();
        const loc = document.getElementById('wish-input-city').value.trim();
        const cat = document.getElementById('wish-input-category').value;
        const msg = document.getElementById('wish-input-message').value.trim();

        if (!name || !msg) return;

        const newWish = {
          id: 'wish-' + Date.now(),
          author: name,
          location: loc || "Devotee",
          category: cat || "family",
          message: msg,
          likes: 1,
          date: "Just now"
        };

        this.wishes.unshift(newWish);
        this.saveWishes();
        this.renderWishes();

        wishForm.reset();
        const feedback = document.getElementById('wish-form-feedback');
        if (feedback) {
          feedback.textContent = "🙏 Your sacred prayer has been posted on the wall. Jai Chhathi Maiya!";
          feedback.style.display = "block";
          setTimeout(() => { feedback.style.display = "none"; }, 4000);
        }

        // Also light a diya in the virtual river for them!
        if (window.virtualGhatInstance) {
          window.virtualGhatInstance.addDiya(name, loc, msg, 'marigold');
        }
      });
    }

    // Ghat Search & Filter
    const ghatSearch = document.getElementById('ghat-search-input');
    const ghatRegion = document.getElementById('ghat-region-select');

    const filterGhats = () => {
      const q = (ghatSearch ? ghatSearch.value.toLowerCase() : '');
      const reg = (ghatRegion ? ghatRegion.value : 'all');

      const filtered = COMMUNITY_GHATS.filter(g => {
        const matchesQuery = g.name.toLowerCase().includes(q) || 
                             g.city.toLowerCase().includes(q) || 
                             g.waterbody.toLowerCase().includes(q);
        const matchesRegion = (reg === 'all' || g.region === reg);
        return matchesQuery && matchesRegion;
      });
      this.renderGhats(filtered);
    };

    if (ghatSearch) ghatSearch.addEventListener('input', filterGhats);
    if (ghatRegion) ghatRegion.addEventListener('change', filterGhats);
  }

  renderWishes() {
    const container = document.getElementById('wishes-cards-container');
    if (!container) return;

    const filtered = this.currentWishCategory === 'all' 
      ? this.wishes 
      : this.wishes.filter(w => w.category === this.currentWishCategory);

    container.innerHTML = filtered.map(w => `
      <div class="wish-card" data-id="${w.id}">
        <div class="wish-card-header">
          <div class="wish-avatar">🪔</div>
          <div class="wish-meta">
            <h4 class="wish-author">${this.escapeHTML(w.author)}</h4>
            <span class="wish-location">📍 ${this.escapeHTML(w.location)}</span>
          </div>
          <span class="wish-date">${w.date}</span>
        </div>
        <p class="wish-message">“${this.escapeHTML(w.message)}”</p>
        <div class="wish-card-footer">
          <button class="wish-like-btn" onclick="window.communityManager.likeWish('${w.id}')">
            <span class="namaste-icon">🙏</span>
            <span class="pranam-label">प्रणाम / Blessings</span>
            <span class="like-counter" id="like-count-${w.id}">${w.likes}</span>
          </button>
          <button class="wish-share-btn" onclick="window.cloudSyncManager ? window.cloudSyncManager.shareFestivalWish({ title: 'Prayer by ${this.escapeHTML(w.author)}', text: '“${this.escapeHTML(w.message)}” — ${this.escapeHTML(w.author)}, ${this.escapeHTML(w.location)} | Chhath Mahaparv' }) : null" title="Share via Cloud / WhatsApp">
            <span>📲</span>
            <span>Share</span>
          </button>
        </div>
      </div>
    `).join('');
  }

  likeWish(id) {
    const wish = this.wishes.find(w => w.id === id);
    if (wish) {
      wish.likes++;
      this.saveWishes();
      const el = document.getElementById(`like-count-${id}`);
      if (el) el.textContent = wish.likes;

      // Bell sound chime
      if (window.sacredAudio) {
        window.sacredAudio.ringBell(1174.66); // D6 note
      }
    }
  }

  renderGhats(ghatsList) {
    const container = document.getElementById('ghats-directory-grid');
    if (!container) return;

    if (ghatsList.length === 0) {
      container.innerHTML = `
        <div class="no-ghats-msg">
          <p>No ghats found matching your query. You can register your local ghat below!</p>
        </div>
      `;
      return;
    }

    container.innerHTML = ghatsList.map(g => `
      <div class="ghat-card">
        <div class="ghat-card-top">
          <span class="ghat-waterbody">🌊 ${g.waterbody}</span>
          <span class="ghat-city-tag">${g.city}, ${g.state}</span>
        </div>
        <h3 class="ghat-name">${g.name}</h3>
        <p class="ghat-timing">⏳ ${g.timing}</p>
        <div class="ghat-features">
          <strong>Ghat Seva & Facilities:</strong>
          <ul>
            ${g.features.map(f => `<li>✓ ${f}</li>`).join('')}
          </ul>
        </div>
        <div class="ghat-footer">
          <span class="ghat-seva-info">🤝 Org: ${g.contact}</span>
          <button class="ghat-dir-btn" onclick="window.communityManager.openGhatDirections('${g.name}', '${g.city}')">
            🗺️ Directions
          </button>
        </div>
      </div>
    `).join('');
  }

  openGhatDirections(name, city) {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(name + ' ' + city)}`;
    window.open(url, '_blank');
  }

  // --- FOLK GEET PLAYER ---
  renderGeetPlayer() {
    const tabsContainer = document.getElementById('geet-track-tabs');
    if (!tabsContainer) return;

    tabsContainer.innerHTML = CHHATH_FOLK_GEET.map((song, idx) => `
      <button class="geet-tab-btn ${idx === this.activeGeetIndex ? 'active' : ''}" 
              onclick="window.communityManager.selectGeet(${idx})">
        <span class="geet-tab-hi">${song.hindiTitle}</span>
        <span class="geet-tab-en">${song.title}</span>
      </button>
    `).join('');

    this.displayActiveGeet();
  }

  selectGeet(idx) {
    this.activeGeetIndex = idx;
    this.renderGeetPlayer();
    this.displayActiveGeet();

    // Start playing synthetic melody
    const song = CHHATH_FOLK_GEET[idx];
    if (window.sacredAudio) {
      window.sacredAudio.playFolkTune(song.melodyKey);
      const playBtn = document.getElementById('geet-play-toggle-btn');
      if (playBtn) playBtn.innerHTML = '⏸ Pause Flute Melody';
    }
  }

  displayActiveGeet() {
    const song = CHHATH_FOLK_GEET[this.activeGeetIndex];
    if (!song) return;

    const titleEl = document.getElementById('active-geet-title');
    const hindiTitleEl = document.getElementById('active-geet-hindi');
    const contextEl = document.getElementById('active-geet-context');
    const ragaEl = document.getElementById('active-geet-raga');
    const lyricsHiEl = document.getElementById('geet-lyrics-hindi');
    const lyricsEnEl = document.getElementById('geet-lyrics-english');
    const meaningEl = document.getElementById('geet-meaning-text');

    if (titleEl) titleEl.textContent = song.title;
    if (hindiTitleEl) hindiTitleEl.textContent = song.hindiTitle;
    if (contextEl) contextEl.textContent = song.context;
    if (ragaEl) ragaEl.textContent = `Traditional Raga / Scale: ${song.raga}`;

    if (lyricsHiEl) {
      lyricsHiEl.innerHTML = song.lyricsHi.map(l => `<p class="lyric-line">${l}</p>`).join('');
    }
    if (lyricsEnEl) {
      lyricsEnEl.innerHTML = song.lyricsEn.map(l => `<p class="lyric-line-en">${l}</p>`).join('');
    }
    if (meaningEl) {
      meaningEl.textContent = song.meaning;
    }
  }

  toggleGeetPlay() {
    if (!window.sacredAudio) return;
    const playBtn = document.getElementById('geet-play-toggle-btn');
    if (window.sacredAudio.isPlayingMelody) {
      window.sacredAudio.stopFolkTune();
      if (playBtn) playBtn.innerHTML = '▶ Play Flute Melody';
    } else {
      const song = CHHATH_FOLK_GEET[this.activeGeetIndex];
      window.sacredAudio.playFolkTune(song.melodyKey);
      if (playBtn) playBtn.innerHTML = '⏸ Pause Flute Melody';
    }
  }

  // --- CHECKLIST & PACKING MANAGER ---
  setChecklistCategory(cat) {
    this.activeChecklistCategory = cat;
    document.querySelectorAll('.chk-filter-pill').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.chkCat === cat);
    });
    this.renderChecklist();
  }

  renderChecklist() {
    const container = document.getElementById('checklist-items-container');
    const progressEl = document.getElementById('checklist-progress-fill');
    const percentEl = document.getElementById('checklist-percent-text');

    if (!container) return;

    const total = this.checklist.length;
    const completed = this.checklist.filter(c => c.checked).length;
    const pct = Math.round((completed / total) * 100);

    if (progressEl) progressEl.style.width = `${pct}%`;
    if (percentEl) {
      if (pct === 100) {
        percentEl.innerHTML = `🌟 100% Sampoorna (All ${total} Items Prepared!)`;
      } else {
        percentEl.textContent = `${pct}% Ready (${completed}/${total} Items Prepared)`;
      }
    }

    const itemsToDisplay = this.activeChecklistCategory === 'all'
      ? this.checklist
      : this.checklist.filter(c => c.category === this.activeChecklistCategory);

    if (itemsToDisplay.length === 0) {
      container.innerHTML = `<div class="empty-chk-msg">No items in this category.</div>`;
      return;
    }

    container.innerHTML = itemsToDisplay.map(item => `
      <div class="check-row ${item.checked ? 'completed' : ''}" onclick="window.communityManager.toggleChecklistItem('${item.id}')">
        <span class="custom-chk">${item.checked ? '✓' : ''}</span>
        <span class="chk-label">${item.text}</span>
      </div>
    `).join('');
  }

  toggleChecklistItem(id) {
    const found = this.checklist.find(c => c.id === id);
    if (found) {
      found.checked = !found.checked;
      this.saveChecklist();
      this.renderChecklist();
      if (found.checked && window.sacredAudio) {
        window.sacredAudio.ringBell(1318.5); // high chime
      }
    }
  }

  resetChecklist() {
    this.checklist.forEach(c => c.checked = false);
    this.saveChecklist();
    this.renderChecklist();
  }

  escapeHTML(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.communityManager = new ChhathCommunityManager();
});
