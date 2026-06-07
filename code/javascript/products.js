// =============================================================
// ROYALTIME — products.js
// Placé dans : /javascripte/products.js
// =============================================================

const ROYALTIME_PRODUCTS = [
  {
    id: "h001",
    title: "Guess Homme Chrono",
    category: "homme",
    price: 22000,
    currency: "DA",
    image: "../image/pic_homme1.png",
    description: "Montre chronographe pour homme, boîtier acier, bracelet cuir.",
    specs: { material: "Acier inoxydable", movement: "Quartz", strap: "Cuir", diameter: "44mm", water: "50m" },
    features: ["Chronographe", "Bracelet cuir", "Verre minéral"],
    badge: "Populaire"
  },
  {
    id: "h002",
    title: "Michael Kors Homme",
    category: "homme",
    price: 28000,
    currency: "DA",
    image: "../image/pic_homme2.png",
    description: "Élégance urbaine signée Michael Kors, cadran noir et index dorés.",
    specs: { material: "Acier doré", movement: "Quartz", strap: "Acier", diameter: "43mm", water: "100m" },
    features: ["Design urbain", "Index dorés", "Bracelet acier"],
    badge: "Nouveau"
  },
  {
    id: "f001",
    title: "Guess Femme",
    category: "femme",
    price: 22000,
    currency: "DA",
    image: "../image/pic_femme1.png",
    description: "Montre femme raffinée, cadran nacre et bracelet doré.",
    specs: { material: "Acier doré", movement: "Quartz", strap: "Acier", diameter: "36mm", water: "30m" },
    features: ["Cadran nacre", "Strass", "Boîtier doré"],
    badge: ""
  },
  {
    id: "f002",
    title: "Aureva Femme",
    category: "femme",
    price: 15000,
    currency: "DA",
    image: "../image/pic_femme2.png",
    description: "Montre féminine élégante, design minimaliste et bracelet mesh.",
    specs: { material: "Acier rosé", movement: "Quartz", strap: "Mesh", diameter: "34mm", water: "30m" },
    features: ["Design minimaliste", "Bracelet mesh", "Boîtier rosé"],
    badge: "Coup de cœur"
  },
  {
    id: "c001",
    title: "Garmin Classique",
    category: "classique",
    price: 30000,
    currency: "DA",
    image: "../image/pic_classique1.png",
    description: "Montre classique Garmin, sobre et intemporelle.",
    specs: { material: "Acier", movement: "Automatique", strap: "Cuir", diameter: "40mm", water: "50m" },
    features: ["Automatique", "Bracelet cuir", "Verre saphir"],
    badge: ""
  },
  {
    id: "c002",
    title: "Time Watch Classique",
    category: "classique",
    price: 25000,
    currency: "DA",
    image: "../image/pic_classique2.png",
    description: "Élégance classique avec cadran blanc et aiguilles dorées.",
    specs: { material: "Acier inoxydable", movement: "Quartz", strap: "Cuir brun", diameter: "38mm", water: "30m" },
    features: ["Cadran blanc", "Aiguilles dorées", "Design intemporel"],
    badge: ""
  },
  {
    id: "s001",
    title: "Montrelis Sport",
    category: "sport",
    price: 30000,
    currency: "DA",
    image: "../image/pic_sport1.jpg",
    description: "Montre sport robuste, résistante aux chocs et à l'eau.",
    specs: { material: "Titane", movement: "Quartz", strap: "Caoutchouc", diameter: "46mm", water: "200m" },
    features: ["Résistante aux chocs", "Étanche 200m", "Bracelet caoutchouc"],
    badge: "Best-seller"
  },
  {
    id: "s002",
    title: "NeoWatch Sport",
    category: "sport",
    price: 30000,
    currency: "DA",
    image: "../image/pic_sport2.jpg",
    description: "Montre sport high-tech avec affichage numérique.",
    specs: { material: "Aluminium", movement: "Numérique", strap: "Silicone", diameter: "45mm", water: "100m" },
    features: ["Affichage numérique", "Chronomètre", "Alarme"],
    badge: ""
  },
  {
    id: "d001",
    title: "Timeless Co Daily",
    category: "daily",
    price: 40000,
    currency: "DA",
    image: "../image/pic_daily1.png",
    description: "La montre du quotidien parfaite, polyvalente et élégante.",
    specs: { material: "Acier inoxydable", movement: "Automatique", strap: "Cuir", diameter: "40mm", water: "50m" },
    features: ["Polyvalente", "Automatique", "Design sobre"],
    badge: "Coup de cœur"
  },
  {
    id: "d002",
    title: "Atlas Watch Daily",
    category: "daily",
    price: 30000,
    currency: "DA",
    image: "../image/pic_daily2.png",
    description: "Montre quotidienne Atlas, robuste et stylée.",
    specs: { material: "Acier", movement: "Quartz", strap: "Nylon", diameter: "42mm", water: "100m" },
    features: ["Bracelet nylon", "Légère", "Résistante"],
    badge: ""
  },
  {
    id: "m001",
    title: "Montrelis Mécanique",
    category: "mecanique",
    price: 22000,
    currency: "DA",
    image: "../image/pic_mecanique1.png",
    description: "Montre mécanique artisanale, mouvement visible.",
    specs: { material: "Acier poli", movement: "Mécanique manuel", strap: "Cuir", diameter: "40mm", water: "30m" },
    features: ["Fond transparent", "Manuel", "Finition artisanale"],
    badge: "Artisanal"
  },
  {
    id: "m002",
    title: "Classic Time Mécanique",
    category: "mecanique",
    price: 30000,
    currency: "DA",
    image: "../image/mecanique.png",
    description: "Montre mécanique de prestige, réserve de marche 72h.",
    specs: { material: "Or rose 18K", movement: "Automatique", strap: "Cuir alligator", diameter: "42mm", water: "50m" },
    features: ["Réserve 72h", "Or rose", "Cuir alligator"],
    badge: "Prestige"
  }
];

// =============================================================
// UTILITAIRES
// =============================================================

function getProducts(category) {
  if (!category || category === "all") return ROYALTIME_PRODUCTS;
  return ROYALTIME_PRODUCTS.filter(p => p.category === category);
}

function getProductById(id) {
  return ROYALTIME_PRODUCTS.find(p => p.id === id) || null;
}

function searchProducts(query) {
  if (!query) return ROYALTIME_PRODUCTS;
  const q = query.toLowerCase().trim();
  return ROYALTIME_PRODUCTS.filter(p =>
    p.title.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    p.description.toLowerCase().includes(q)
  );
}

function formatPrice(price, currency) {
  return Number(price).toLocaleString("fr-DZ") + " " + (currency || "DA");
}

// =============================================================
// buildFicheUrl — fonctionne depuis n'importe quelle page
// Calcule le bon chemin relatif vers /fiche/fiche.html
// =============================================================
function buildFicheUrl(p) {
  // pathname ex: /home-page/index.html  → parts = ["home-page","index.html"]
  // On remonte d'autant de niveaux que de dossiers, puis on va dans /fiche/
  const parts = window.location.pathname.replace(/^\//, "").split("/").filter(Boolean);
  const levelsUp = Math.max(0, parts.length - 1); // nb de dossiers au-dessus du fichier
  const prefix = levelsUp > 0 ? "../".repeat(levelsUp) : "";
  return prefix + "fiche/fiche.html?id=" + encodeURIComponent(p.id);
}

// =============================================================
// RENDU — Grille catégories (Categorie/categorie2.html)
// =============================================================
function renderCategoryGrid(categoryId) {
  const section = document.getElementById(categoryId);
  if (!section) return;
  const grid = section.querySelector(".montres-grid");
  if (!grid) return;

  grid.innerHTML = "";
  getProducts(categoryId).forEach(p => {
    const a = document.createElement("a");
    a.href = buildFicheUrl(p);
    a.style.cssText = "text-decoration:none;color:inherit;display:block";
      a.innerHTML = `
        <div class="montre" style="position:relative;">
          <div class="montre-media" style="position:relative;display:block">
            <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='/image/logo.png'; console.warn('Image failed:', '${p.image}');">
            <div class="hotspot" data-id="${p.id}" data-price="${p.price}" data-title="${p.title}">
              <div class="hotspot-inner">
                <div class="hotspot-price">${formatPrice(p.price, p.currency)}</div>
                <button class="hotspot-add btn-small" data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.image}">Ajouter</button>
              </div>
            </div>
          </div>
          <h3>${p.title}</h3>
          <p class="price">${formatPrice(p.price, p.currency)}</p>
          ${p.badge ? `<span class="badge">${p.badge}</span>` : ""}
        </div>`;
    grid.appendChild(a);
  });
}

// =============================================================
// RENDU — Barre de recherche
// =============================================================
function renderSearchResults(query) {
  const container = document.getElementById("resultats");
  if (!container) return;
  const results = searchProducts(query);
  container.innerHTML = "";
  if (!results.length) {
    container.innerHTML = `<p style="text-align:center;color:#888;grid-column:1/-1">Aucun résultat pour « ${query} ».</p>`;
    return;
  }
  results.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
      card.innerHTML = `
        <img src="${p.image}" alt="${p.title}" onerror="this.onerror=null; this.src='/image/logo.png'; console.warn('Image failed:', '${p.image}');">
      <h3>${p.title}</h3>
      <p>${p.category.charAt(0).toUpperCase() + p.category.slice(1)}</p>
      <span class="price">${formatPrice(p.price, p.currency)}</span>
      <a class="btn" href="${buildFicheUrl(p)}">Voir la montre</a>`;
    container.appendChild(card);
  });
}

// =============================================================
// RENDU — Homepage (collection-grid et best-grid)
// =============================================================
function createProductCardElement(p) {
  const a = document.createElement("a");
  a.href = buildFicheUrl(p);
  a.className = "card-link";
  a.style.textDecoration = "none";

  const card = document.createElement("article");
  card.className = "card product-card";
    card.innerHTML = `
      <div class="card-media" style="position:relative">
        <img src="${p.image}" alt="${p.title}" loading="lazy" onerror="this.onerror=null; this.src='/image/logo.png'; console.warn('Image failed:', '${p.image}');">
        <div class="hotspot" data-id="${p.id}" data-price="${p.price}" data-title="${p.title}">
          <div class="hotspot-inner">
            <div class="hotspot-price">${formatPrice(p.price, p.currency)}</div>
            <button class="hotspot-add btn-small" data-id="${p.id}" data-title="${p.title}" data-price="${p.price}" data-image="${p.image}">Ajouter</button>
          </div>
        </div>
      </div>
    <div class="card-body">
      <h4>${p.title}</h4>
      <p>${p.description || ""}</p>
      <div class="meta"><span class="price">${formatPrice(p.price, p.currency)}</span></div>
    </div>`;
  a.appendChild(card);
  return a;
}

function renderProductsInto(container, products) {
  if (!container) return;
  container.innerHTML = "";
  products.forEach(p => container.appendChild(createProductCardElement(p)));
}

function renderHomeSections() {
  const collectionGrid = document.querySelector(".collection-grid");
  if (collectionGrid) renderProductsInto(collectionGrid, getProducts().slice(0, 6));

  const bestGrid = document.querySelector(".best-grid");
  if (bestGrid) {
    const best     = ROYALTIME_PRODUCTS.filter(p => p.badge && p.badge.toLowerCase().includes("best"));
    const featured = ROYALTIME_PRODUCTS.filter(p => p.badge && p.badge.trim() && !best.includes(p));
    let items = best.concat(featured).slice(0, 4);
    if (items.length < 4) {
      items = items.concat(getProducts().filter(p => !items.includes(p)).slice(0, 4 - items.length));
    }
    renderProductsInto(bestGrid, items);
  }
}

// =============================================================
// AUTO-INIT
// =============================================================
document.addEventListener("DOMContentLoaded", function () {
  // Barre de recherche
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    renderSearchResults("");
    searchInput.addEventListener("input",   () => renderSearchResults(searchInput.value.trim()));
    searchInput.addEventListener("keydown", e => { if (e.key === "Enter") renderSearchResults(searchInput.value.trim()); });
  }

  // Grilles catégories
  ["homme","femme","classique","sport","daily","mecanique"].forEach(renderCategoryGrid);

  // Homepage
  renderHomeSections();
  // Inject hotspot styles once
  (function injectHotspotStyles(){
    const css = `
    .hotspot{position:absolute;left:0;right:0;bottom:8px;display:flex;justify-content:center;pointer-events:auto}
    .hotspot-inner{background:rgba(0,0,0,0.6);color:#fff;padding:6px 8px;border-radius:8px;display:flex;gap:8px;align-items:center;backdrop-filter:blur(4px)}
    .hotspot-price{font-weight:700;font-size:0.95rem}
    .hotspot-add{background:#D4B872;border:none;padding:6px 8px;border-radius:6px;cursor:pointer;font-weight:700;color:#051026}
    .btn-small{font-size:.9rem}
    /* show hotspot on hover for pointer devices */
    .card-media:hover .hotspot, .montre-media:hover .hotspot{opacity:1;transform:none}
    .hotspot{opacity:0;transform:translateY(8px);transition:opacity .18s ease, transform .18s ease}
    /* mobile: toggle visible when parent has hotspot-open */
    .hotspot-open .hotspot{opacity:1;transform:none}
    `;
    const s = document.createElement('style'); s.textContent = css; document.head.appendChild(s);
  })();

  // Hotspot event delegation: add to cart and toggle on mobile
  document.body.addEventListener('click', function(e){
    const add = e.target.closest('.hotspot-add');
    if(add){
      e.preventDefault(); e.stopPropagation();
      const id = add.dataset.id; const title = add.dataset.title; const price = add.dataset.price; const image = add.dataset.image;
      if(window.RoyalCart && typeof window.RoyalCart.add === 'function'){
        window.RoyalCart.add({ id, title, price, image, qty:1 });
        // small visual feedback
        add.textContent = 'Ajouté ✓'; setTimeout(()=> add.textContent = 'Ajouter', 900);
      } else {
        console.warn('RoyalCart API not available');
      }
      return;
    }
    const hs = e.target.closest('.hotspot');
    if(hs){
      // toggle hotspot-open on closest card or link
      const card = hs.closest('.card') || hs.closest('.montre') || hs.closest('a');
      if(card) card.classList.toggle('hotspot-open');
      e.preventDefault(); e.stopPropagation();
    }
  });
});