// =============================================================
// ROYALTIME — Wishlist (localStorage)
// Utilisé par : wishlist.html (affichage) + toutes les pages
//               qui ont un bouton "ajouter à la wishlist"
// =============================================================

(function () {

  const KEY = "royaltime_wishlist_v1";

  // ── CRUD ──────────────────────────────────────────────────

  function readWishlist() {
    try { return JSON.parse(localStorage.getItem(KEY)) || []; }
    catch (e) { return []; }
  }

  function saveWishlist(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
    updateWishBadge();
  }

  function addToWishlist(item) {
    const list = readWishlist();
    const exists = list.find(i => i.id === item.id);
    if (exists) return false; // déjà présent
    list.push(item);
    saveWishlist(list);
    return true;
  }

  function removeFromWishlist(id) {
    const list = readWishlist().filter(i => i.id !== id);
    saveWishlist(list);
  }

  function clearWishlist() {
    localStorage.removeItem(KEY);
    updateWishBadge();
  }

  function isInWishlist(id) {
    return readWishlist().some(i => i.id === id);
  }

  // ── Badge cœur dans la navbar ──────────────────────────────

  function updateWishBadge() {
    const count = readWishlist().length;
    document.querySelectorAll(".wish-badge").forEach(el => {
      el.textContent = count > 0 ? count : "";
    });
  }

  // ── Expose l'API globale ───────────────────────────────────

  window.RoyalWishlist = {
    read: readWishlist,
    add: addToWishlist,
    remove: removeFromWishlist,
    clear: clearWishlist,
    has: isInWishlist,
    updateBadge: updateWishBadge
  };

  // =============================================================
  // PAGE WISHLIST (wishlist.html)
  // =============================================================

  function formatPrice(price) {
    return Number(price || 0).toLocaleString("fr-DZ") + " DA";
  }

  function renderWishlist() {
    const grid      = document.getElementById("wishGrid");
    const emptyEl   = document.getElementById("emptyState");
    const countEl   = document.getElementById("itemCount");
    const totalEl   = document.getElementById("totalPrice");
    const summaryEl = document.getElementById("summaryBar");

    if (!grid) return; // pas sur la page wishlist

    const list = readWishlist();

    // Compteur
    if (countEl) {
      countEl.textContent = list.length + " article" + (list.length > 1 ? "s" : "");
    }

    // État vide
    if (emptyEl) {
      if (list.length === 0) {
        emptyEl.classList.add("visible");
        if (summaryEl) summaryEl.style.display = "none";
        grid.innerHTML = "";
        return;
      } else {
        emptyEl.classList.remove("visible");
        if (summaryEl) summaryEl.style.display = "";
      }
    }

    // Total
    const total = list.reduce((s, i) => s + Number(i.price || 0), 0);
    if (totalEl) totalEl.textContent = formatPrice(total);

    // Grille
    grid.innerHTML = "";
    list.forEach(item => {
      const card = document.createElement("article");
      card.className = "wish-card";
      card.innerHTML = `
        <div class="wish-img-box">
          <img src="${item.image || ""}" alt="${item.title}" loading="lazy">
          <button class="btn-remove" data-id="${item.id}" title="Retirer">✕</button>
        </div>
        <div class="wish-info">
          <div class="wish-category">${(item.category || "montre").toUpperCase()}</div>
          <div class="wish-name">${item.title}</div>
          <div class="wish-price">${formatPrice(item.price)}</div>
          <button class="btn-add-cart"
            data-add-to-cart
            data-id="${item.id}"
            data-title="${item.title}"
            data-price="${item.price}"
            data-image="${item.image || ""}">
            Ajouter au panier
          </button>
        </div>
      `;
      grid.appendChild(card);
    });

    // ── Supprimer un article ───────────────────────────────
    grid.querySelectorAll(".btn-remove").forEach(btn => {
      btn.addEventListener("click", function () {
        removeFromWishlist(this.dataset.id);
        renderWishlist();
      });
    });
  }

  // Bouton "Tout supprimer"
  function bindClearAll() {
    const btn = document.querySelector(".btn-clear");
    if (btn) {
      btn.addEventListener("click", function () {
        if (confirm("Supprimer tous les articles de la wishlist ?")) {
          clearWishlist();
          renderWishlist();
        }
      });
    }
    // Exposer clearAll() pour le onclick inline du HTML
    window.clearAll = function () {
      if (confirm("Supprimer tous les articles de la wishlist ?")) {
        clearWishlist();
        renderWishlist();
      }
    };
  }

  // Bouton "Tout ajouter au panier"
  function bindAddAll() {
    window.addAllToCart = function () {
      const list = readWishlist();
      if (!list.length) return;
      if (!window.RoyalCart) {
        alert("Panier non chargé. Assurez-vous que panier.js est inclus.");
        return;
      }
      list.forEach(item => window.RoyalCart.add(item));
      alert(list.length + " montre(s) ajoutée(s) au panier !");
    };
  }

  // =============================================================
  // BOUTON ♡ SUR LES CARTES PRODUITS (toutes les pages)
  // =============================================================

  function bindWishlistButtons() {
    document.body.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-wishlist]");
      if (!btn) return;
      e.preventDefault();

      const item = {
        id:       btn.dataset.id       || String(Date.now()),
        title:    btn.dataset.title    || btn.dataset.name || "Montre",
        price:    Number((btn.dataset.price || "0").replace(/[^\d]/g, "")),
        image:    btn.dataset.image    || "",
        category: btn.dataset.category || "montre"
      };

      if (isInWishlist(item.id)) {
        removeFromWishlist(item.id);
        btn.textContent = "♡";
        btn.classList.remove("active");
      } else {
        addToWishlist(item);
        btn.textContent = "♥";
        btn.classList.add("active");
      }
    });
  }

  // =============================================================
  // INIT
  // =============================================================

  document.addEventListener("DOMContentLoaded", function () {
    updateWishBadge();
    bindWishlistButtons();

    // Si on est sur la page wishlist
    if (document.getElementById("wishGrid")) {
      renderWishlist();
      bindClearAll();
      bindAddAll();
    }
  });

})();
