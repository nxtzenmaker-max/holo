/**
 * Chhath Puja Sacred Recipes Engine
 * Features dynamic ingredient scaling (Family 5x, Clan 15x, Community Prasad 50x),
 * step-by-step satvik instructions, and traditional culinary secrets.
 */

const CHHATH_RECIPES = [
  {
    id: "thekua",
    title: "Traditional Bihari Khasta Thekua",
    hindiTitle: "पारंपरिक खस्ता ठेकुआ (छठी मईया का महाप्रसाद)",
    category: "Mahaprasad",
    prepTime: "25 mins",
    cookTime: "35 mins",
    servingsBase: 15,
    difficulty: "Medium",
    image: "assets/images/chhath_thekua_supa.jpg",
    description: "The most sacred and revered prasad of Chhath Puja. Crispy on the outside, crumbly and aromatic within, embossed with traditional wooden leaf moulds and fried in pure desi ghee.",
    secretTip: "The secret to melt-in-mouth thekua is the 'Moyen' (ghee ratio). When you rub ghee into the flour and squeeze it in your palm, it should hold form without crumbling before adding syrup.",
    ingredientsBase: [
      { name: "Coarse Whole Wheat Flour (Atta)", amount: 500, unit: "g" },
      { name: "Pure Desi Cow Ghee (for moyen)", amount: 120, unit: "ml" },
      { name: "Organic Sugarcane Jaggery (Gur)", amount: 250, unit: "g" },
      { name: "Water (to dissolve jaggery)", amount: 150, unit: "ml" },
      { name: "Green Cardamom (Elaichi), freshly crushed", amount: 1.5, unit: "tsp" },
      { name: "Fennel Seeds (Saunf), lightly bruised", amount: 1.5, unit: "tbsp" },
      { name: "Dry Coconut (Gari), thinly sliced slivers", amount: 45, unit: "g" },
      { name: "Desi Cow Ghee (for deep frying)", amount: 500, unit: "ml" }
    ],
    steps: [
      "Dissolve crushed jaggery (Gur) in warm water over low flame. Do not boil into string consistency; just melt and strain through a fine muslin cloth to remove impurities. Let it cool to lukewarm.",
      "In a large clean brass or clay parat (mixing platter), combine coarse wheat flour, crushed green cardamom, fennel seeds, and thinly sliced dry coconut.",
      "Pour 120ml melted warm cow ghee (Moyen) over the flour. Rub thoroughly between your palms for 4-5 minutes until the flour resembles coarse sand and holds a lump when clutched.",
      "Gradually sprinkle the lukewarm jaggery syrup into the flour in small batches. Knead tightly into a firm, stiff, crumbly dough. IMPORTANT: Do not make a soft dough like rotis; it should barely hold together.",
      "Pinch small lemon-sized portions of dough and roll into smooth oblong or round balls between your palms.",
      "Lightly grease the wooden Chhath mould (Saancha) with ghee. Press each ball firmly onto the carved pattern (leaf or sunburst design) with the base of your palm.",
      "Heat pure desi ghee in a heavy brass or iron kadai over medium flame. Once hot, lower the flame to medium-low.",
      "Gently slide 4-5 thekuas into the ghee. Fry patiently on low-medium heat without disturbing for 2 minutes, then flip gently with a slotted brass skimmer.",
      "Fry until both sides achieve a radiant reddish golden-brown hue. Lift out and place on a clean cotton cloth or bamboo supa. They will crisp up exquisitely as they cool."
    ]
  },
  {
    id: "rasiya",
    title: "Kharna Sacred Rasiya (Gur Ki Kheer)",
    hindiTitle: "खरना रसिया (गुड़ की पावन खीर)",
    category: "Kharna Prasad",
    prepTime: "15 mins",
    cookTime: "40 mins",
    servingsBase: 15,
    difficulty: "Easy to Medium",
    image: "assets/images/chhath_nahay_khay.jpg",
    description: "The divine jaggery rice pudding prepared in an earthen handi on a clay chulha on the evening of Kharna. It is offered to Chhathi Maiya before the 36-hour waterless fast begins.",
    secretTip: "Never add jaggery directly into vigorously boiling milk. Always cook the rice completely in milk first, turn off the flame, allow the kheer to rest for 3 minutes, and then stir in melted warm jaggery syrup to prevent milk curdling.",
    ingredientsBase: [
      { name: "Aromatic Short-Grain Arwa Rice (Gobindobhog)", amount: 150, unit: "g" },
      { name: "Full-Cream Pure Cow Milk", amount: 1500, unit: "ml" },
      { name: "Organic Sugarcane Jaggery (Bheli Gur)", amount: 220, unit: "g" },
      { name: "Green Cardamom Pods, cracked", amount: 6, unit: "pods" },
      { name: "Chironji (Charoli nuts)", amount: 2, unit: "tbsp" },
      { name: "Pure Cow Ghee (to coat rice)", amount: 1, unit: "tbsp" }
    ],
    steps: [
      "Wash the Arwa rice gently in pure Gangajal or filtered water. Drain and toss with 1 tbsp melted cow ghee. Let it air-dry for 10 minutes.",
      "In a traditional heavy earthen pot (Mitti ki Handi) or brass vessel, bring 1.5 liters of full-cream cow milk to a gentle boil.",
      "Add the ghee-coated rice to the simmering milk. Stir frequently with a wooden laddle to prevent the rice grains from sticking to the base.",
      "Cook on gentle low heat for 25-30 minutes until the milk thickens into a rich, creamy consistency and the rice grains become velvety and thoroughly tender.",
      "In a small separate pan, dissolve the crushed jaggery in 60ml warm water over low flame until liquid. Strain to ensure satvik purity.",
      "Add cracked cardamom and chironji to the bubbling kheer. Simmer for 2 more minutes.",
      "Remove the kheer pot from heat. Allow it to cool slightly for 3 minutes so it is warm but no longer boiling. Slowly pour in the strained jaggery syrup while stirring continuously until it turns into a radiant caramel-gold color.",
      "Offer on fresh plantain (banana) leaves alongside hot ghee rotis to Chhathi Maiya and Lord Surya."
    ]
  },
  {
    id: "kaddu-bhat",
    title: "Nahay Khay Kaddu-Bhat & Chana Dal",
    hindiTitle: "नहाय-खाय कद्दू-भात एवं चना दाल",
    category: "Day 1 Cleansing",
    prepTime: "20 mins",
    cookTime: "30 mins",
    servingsBase: 15,
    difficulty: "Easy",
    image: "assets/images/chhath_hero.jpg",
    description: "The sacred Day 1 meal that cleanses the digestive tract and spirit. Bottle gourd cooked in pure ghee with rock salt, served with fragrant steamed rice and slow-simmered Chana dal.",
    secretTip: "Authentic Nahay Khay cuisine strictly avoids onion, garlic, table salt, and mustard oil. Use only rock salt (Sendha Namak), pure cow ghee, and tender freshly plucked green bottle gourd.",
    ingredientsBase: [
      { name: "Fresh Tender Bottle Gourd (Kaddu / Lauki), diced", amount: 1000, unit: "g" },
      { name: "Bengal Gram Dal (Chana Dal), rinsed", amount: 300, unit: "g" },
      { name: "Fragrant Arwa Rice", amount: 450, unit: "g" },
      { name: "Pure Cow Desi Ghee", amount: 80, unit: "ml" },
      { name: "Cumin Seeds (Jeera)", amount: 2, unit: "tsp" },
      { name: "Fresh Ginger, grated fine", amount: 2, unit: "tbsp" },
      { name: "Green Chilies, slit lengthwise", amount: 4, unit: "nos" },
      { name: "Pure Rock Salt (Sendha Namak)", amount: 2.5, unit: "tsp" },
      { name: "Fresh Coriander leaves, chopped", amount: 4, unit: "tbsp" }
    ],
    steps: [
      "Prepare Chana Dal: Rinse dal and boil in a brass or clay handi with water, a pinch of turmeric, grated ginger, and Sendha Namak until soft yet retaining its shape.",
      "Temper Dal: In a small brass ladle, heat 2 tbsp cow ghee, add cumin seeds and slit green chilies until they crackle, and pour into the cooked dal.",
      "Prepare Kaddu Sabzi: Heat 3 tbsp ghee in a wide pan. Add cumin seeds and green chilies. Add diced bottle gourd and sprinkle rock salt.",
      "Cover and cook on medium-low flame. The fresh gourd releases its natural sweet water; let it cook in its own juices until tender and melt-in-mouth without adding water.",
      "Cook Rice: Steam fragrant Arwa rice with pure water until light, fluffy, and aromatic.",
      "Serve the holy trinity: Steamed Arwa rice heaped on a brass plate, surrounded by golden Chana dal and sweet satvik Kaddu sabzi, garnished with fresh coriander."
    ]
  },
  {
    id: "kasar",
    title: "Sacred Kasar Ladoo (Rice Flour & Ghee)",
    hindiTitle: "पवित्र कसार के लड्डू (सूप का पारंपरिक भोग)",
    category: "Supa Prasad",
    prepTime: "20 mins",
    cookTime: "15 mins",
    servingsBase: 15,
    difficulty: "Easy",
    image: "assets/images/chhath_thekua_supa.jpg",
    description: "Hand-rolled golden spheres of coarsely ground sun-dried rice flour, desi cow ghee, fennel seeds, and raw sugar. Placed inside every bamboo supa alongside thekua for the Arghya.",
    secretTip: "Lightly dry-roast the rice flour over very low heat until a mild nutty fragrance arises, but do not brown it. Roll the ladoos while the ghee is pleasantly warm.",
    ingredientsBase: [
      { name: "Coarse Rice Flour (Pounded Arwa Chawal)", amount: 400, unit: "g" },
      { name: "Raw Sugar Powder / Shakkar (Bhoora)", amount: 220, unit: "g" },
      { name: "Melted Desi Cow Ghee", amount: 140, unit: "ml" },
      { name: "Fennel Seeds (Saunf), coarsely crushed", amount: 1, unit: "tbsp" },
      { name: "Green Cardamom Powder", amount: 1, unit: "tsp" }
    ],
    steps: [
      "Sift the coarse rice flour into a dry heavy-bottomed kadai. Toast gently on low flame for 6-8 minutes until warm and nutty.",
      "Transfer warm roasted flour to a broad parat. Let it cool slightly until comfortable to touch.",
      "Mix in powdered raw sugar (Bhoora/Shakkar), crushed fennel seeds, and green cardamom powder evenly.",
      "Pour melted warm cow ghee gradually into the mixture. Rub with both hands to distribute the ghee uniformly.",
      "Take small portions into your fist and press tightly between fingers and palms to form smooth, round golf-ball sized laddoos.",
      "Arrange them reverently on the sacred bamboo supa atop fresh green banana leaves."
    ]
  }
];

class ChhathRecipesManager {
  constructor() {
    this.currentScale = 15; // default 15 servings
    this.activeRecipeId = "thekua";
    this.init();
  }

  init() {
    this.renderRecipeList();
    this.displayRecipe(this.activeRecipeId);
    this.bindEvents();
  }

  bindEvents() {
    const scaleBtns = document.querySelectorAll('.scale-btn');
    scaleBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        scaleBtns.forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        this.currentScale = parseInt(e.target.dataset.scale, 10);
        this.displayRecipe(this.activeRecipeId);
      });
    });
  }

  renderRecipeList() {
    const listContainer = document.getElementById('recipes-nav-tabs');
    if (!listContainer) return;

    listContainer.innerHTML = CHHATH_RECIPES.map(r => `
      <button class="recipe-tab-btn ${r.id === this.activeRecipeId ? 'active' : ''}" 
              data-recipe-id="${r.id}" 
              onclick="window.recipesManager.switchRecipe('${r.id}')">
        <span class="tab-hi">${r.hindiTitle.split(' ')[1] || r.hindiTitle}</span>
        <span class="tab-en">${r.title}</span>
      </button>
    `).join('');
  }

  switchRecipe(id) {
    this.activeRecipeId = id;
    this.renderRecipeList();
    this.displayRecipe(id);
  }

  displayRecipe(id) {
    const recipe = CHHATH_RECIPES.find(r => r.id === id);
    if (!recipe) return;

    const ratio = this.currentScale / recipe.servingsBase;

    // Elements
    const titleEl = document.getElementById('recipe-display-title');
    const hindiEl = document.getElementById('recipe-display-hindi');
    const descEl = document.getElementById('recipe-display-desc');
    const prepEl = document.getElementById('recipe-display-prep');
    const cookEl = document.getElementById('recipe-display-cook');
    const servEl = document.getElementById('recipe-display-servings');
    const tipEl = document.getElementById('recipe-display-tip');
    const imgEl = document.getElementById('recipe-display-img');
    const ingrList = document.getElementById('recipe-ingredients-list');
    const stepsList = document.getElementById('recipe-steps-list');

    if (titleEl) titleEl.textContent = recipe.title;
    if (hindiEl) hindiEl.textContent = recipe.hindiTitle;
    if (descEl) descEl.textContent = recipe.description;
    if (prepEl) prepEl.textContent = recipe.prepTime;
    if (cookEl) cookEl.textContent = recipe.cookTime;
    if (servEl) servEl.textContent = `${this.currentScale} Devotees`;
    if (tipEl) tipEl.textContent = recipe.secretTip;
    if (imgEl) imgEl.src = recipe.image;

    if (ingrList) {
      ingrList.innerHTML = recipe.ingredientsBase.map(ing => {
        let scaledAmount = (ing.amount * ratio);
        // Clean formatting
        if (scaledAmount % 1 !== 0) {
          scaledAmount = scaledAmount.toFixed(1).replace(/\.0$/, '');
        }
        return `
          <li class="ing-item">
            <span class="ing-check">☐</span>
            <span class="ing-name">${ing.name}</span>
            <span class="ing-qty">${scaledAmount} ${ing.unit}</span>
          </li>
        `;
      }).join('');

      // Add click to check
      ingrList.querySelectorAll('.ing-item').forEach(item => {
        item.addEventListener('click', () => {
          item.classList.toggle('checked');
          const checkSpan = item.querySelector('.ing-check');
          checkSpan.textContent = item.classList.contains('checked') ? '☑' : '☐';
        });
      });
    }

    if (stepsList) {
      stepsList.innerHTML = recipe.steps.map((st, idx) => `
        <div class="step-card">
          <div class="step-num">Step ${idx + 1}</div>
          <p class="step-text">${st}</p>
        </div>
      `).join('');
    }
  }

  printRecipe() {
    window.print();
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.recipesManager = new ChhathRecipesManager();
});
