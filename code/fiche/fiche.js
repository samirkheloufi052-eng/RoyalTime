// =============================================================
// ROYALTIME — fiche.js
// Placé dans : /fiche/fiche.js
// Dépend de  : /javascripte/products.js (chargé avant dans fiche.html)
// =============================================================

(function () {

  // ── Lire l'id dans l'URL (?id=h001) ──────────────────────
  function getIdFromUrl() {
    return new URLSearchParams(window.location.search).get("id");
  }

  // ── Formater le prix ──────────────────────────────────────
  function fmt(price, currency) {
    return Number(price).toLocaleString("fr-DZ") + " " + (currency || "DA");
  }

  // ── Construire un chemin vers un autre dossier depuis /fiche/
  // fiche/ est à 1 niveau → prefix = "../"
  function to(path) {
    return "../" + path;
  }

  // ── Rendre la fiche ───────────────────────────────────────
  function renderFiche(p) {
    document.title = p.title + " — RoyalTime";

    // Breadcrumb
    const bc = document.getElementById("fiche-breadcrumb");
    if (bc) {
      const cat = p.category.charAt(0).toUpperCase() + p.category.slice(1);
      bc.innerHTML =
        `<a href="${to("home-page/index.html")}">Accueil</a> › ` +
        `<a href="${to("Categorie/categorie2.html")}#${p.category}">${cat}</a> › ` +
        `<span>${p.title}</span>`;
    }

    // Image
    const img = document.getElementById("fiche-img");
    if (img) { img.src = p.image; img.alt = p.title; }

    // Badge
    const badge = document.getElementById("fiche-badge");
    if (badge) {
      badge.textContent = p.badge || "";
      badge.style.display = p.badge ? "inline-block" : "none";
    }

    // Titre
    const title = document.getElementById("fiche-title");
    if (title) title.textContent = p.title;

    // Prix
    const price = document.getElementById("fiche-price");
    if (price) price.textContent = fmt(p.price, p.currency);

    // Description
    const desc = document.getElementById("fiche-description");
    if (desc) desc.textContent = p.description;

    // Features
    const featList = document.getElementById("fiche-features");
    if (featList && p.features) {
      featList.innerHTML = p.features.map(f => `<li>${f}</li>`).join("");
    }

    // Specs
    const specsBody = document.getElementById("fiche-specs");
    if (specsBody && p.specs) {
      const labels = { material:"Matériau", movement:"Mouvement", strap:"Bracelet", diameter:"Diamètre", water:"Étanchéité" };
      specsBody.innerHTML = Object.entries(p.specs)
        .map(([k,v]) => `<tr><th>${labels[k]||k}</th><td>${v}</td></tr>`)
        .join("");
    }

    // Bouton panier
    const addBtn = document.getElementById("addToCartBtn");
    if (addBtn) {
      addBtn.dataset.id    = p.id;
      addBtn.dataset.title = p.title;
      addBtn.dataset.price = p.price;
      addBtn.dataset.image = p.image;
      addBtn.dataset.qty   = 1;
    }

    // Produits similaires (même catégorie, autre id)
    const simGrid = document.getElementById("fiche-similar");
    if (simGrid) {
      const similar = ROYALTIME_PRODUCTS
        .filter(q => q.category === p.category && q.id !== p.id)
        .slice(0, 4);

      if (!similar.length) {
        const sec = document.getElementById("fiche-similar-section");
        if (sec) sec.style.display = "none";
      } else {
        simGrid.innerHTML = similar.map(q => `
          <a class="similar-card" href="fiche.html?id=${q.id}">
            <img src="${q.image}" alt="${q.title}" loading="lazy">
            <h4>${q.title}</h4>
            <span class="similar-price">${fmt(q.price, q.currency)}</span>
          </a>`).join("");
      }
    }
  }

  // ── Page not found ────────────────────────────────────────
  function renderNotFound() {
    document.title = "Produit introuvable — RoyalTime";
    const main = document.getElementById("fiche-main");
    if (main) {
      main.innerHTML = `
        <div style="text-align:center;padding:5rem 1rem">
          <h2 style="font-family:'Playfair Display',serif;font-size:2rem;margin-bottom:1rem">Produit introuvable</h2>
          <p style="color:#6b7280;margin-bottom:2rem">Ce produit n'existe pas ou a été retiré du catalogue.</p>
          <a href="${to("Categorie/categorie2.html")}"
             style="background:linear-gradient(white, #fcf0f0);color:#051026;padding:.8rem 1.5rem;border-radius:10px;font-weight:700;text-decoration:none">
            Voir toutes les montres
          </a>
        </div>`;
    }
  }

  // ── Init ──────────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", function () {
    const id = getIdFromUrl();

    if (!id || typeof ROYALTIME_PRODUCTS === "undefined") {
      renderNotFound(); return;
    }

    const product = ROYALTIME_PRODUCTS.find(p => p.id === id);
    if (!product) { renderNotFound(); return; }

    renderFiche(product);

    // Liaison avec RoyalCart (panier.js)
    const addBtn = document.getElementById("addToCartBtn");
    if (addBtn) {
      addBtn.addEventListener("click", function () {
        if (typeof window.RoyalCart !== "undefined") {
          window.RoyalCart.add({
            id: product.id, title: product.title,
            price: product.price, image: product.image, qty: 1
          });
        }
        const orig = addBtn.textContent;
        addBtn.textContent = "Ajouté ✓";
        setTimeout(() => { addBtn.textContent = orig; }, 900);
      });
    }
  });

})();