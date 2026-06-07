// =============================================================
// ROYALTIME — main.js
// Script global chargé sur TOUTES les pages
// Gère : session auth dans la navbar + badges panier/wishlist
// =============================================================

(function () {

  // ── Clés localStorage ─────────────────────────────────────
  const AUTH_KEY     = "royaltime_auth";
  const CART_KEY     = "royaltime_cart_v1";
  const WISH_KEY     = "royaltime_wishlist_v1";

  // =============================================================
  // SESSION AUTH
  // =============================================================

  function getSession() {
    try { return JSON.parse(localStorage.getItem(AUTH_KEY)) || null; }
    catch (e) { return null; }
  }

  function logout() {
    localStorage.removeItem(AUTH_KEY);
    // Rediriger vers la page de connexion
    const base = getBasePath();
    window.location.href = base + "content/logout.html";
  }

  // Expose logout() globalement (utilisé en onclick dans certains HTMLs)
  window.logout = logout;

  // =============================================================
  // MISE À JOUR DE LA NAVBAR
  // =============================================================

  function updateNavbar() {
    const session = getSession();

    // ── Navbar style "style.css" (contact, wishlist, index…) ─
    const loginLinks  = document.querySelectorAll(".login-link");
    const logoutLinks = document.querySelectorAll(".logout-link");
    const userGreets  = document.querySelectorAll(".user-greet");

    if (session && session.connecte) {
      // Masquer "Connexion", montrer "Déconnexion"
      loginLinks.forEach(el  => el.style.display = "none");
      logoutLinks.forEach(el => el.style.display = "");

      // Afficher le prénom si l'élément existe
      const prenom = session.nom ? session.nom.split(" ")[0] : "";
      userGreets.forEach(el => {
        el.textContent = "Bonjour, " + prenom;
        el.style.display = "";
      });
    } else {
      // Non connecté
      loginLinks.forEach(el  => el.style.display = "");
      logoutLinks.forEach(el => el.style.display = "none");
      userGreets.forEach(el  => el.style.display = "none");
    }
  }

  // =============================================================
  // BADGES PANIER & WISHLIST
  // =============================================================

  function updateBadges() {
    // Panier
    try {
      const cart  = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      const count = cart.reduce((s, i) => s + (i.qty || 1), 0);
      document.querySelectorAll(".cart-count").forEach(el => {
        el.textContent = count > 0 ? count : "";
      });
      // Créer le badge s'il n'existe pas encore
      document.querySelectorAll(".cart-link").forEach(link => {
        if (!link.querySelector(".cart-count")) {
          const span = document.createElement("span");
          span.className = "cart-count";
          span.setAttribute("aria-hidden", "true");
          span.style.cssText = "position:absolute;top:-8px;right:-8px;background:#C9A84A;color:#051026;font-weight:700;padding:3px 7px;border-radius:999px;font-size:0.75rem;pointer-events:none;";
          link.style.position = "relative";
          link.appendChild(span);
          if (count > 0) span.textContent = count;
        }
      });
    } catch (e) {}

    // Wishlist
    try {
      const wish  = JSON.parse(localStorage.getItem(WISH_KEY)) || [];
      const wCount = wish.length;
      document.querySelectorAll(".wish-badge").forEach(el => {
        el.textContent = wCount > 0 ? wCount : "";
      });
    } catch (e) {}
  }

  // =============================================================
  // PROTECTION DE PAGE (réservée aux connectés)
  // =============================================================

  /**
   * Appelle cette fonction sur les pages qui nécessitent
   * d'être connecté (ex: wishlist, commande).
   * Si non connecté → redirige vers login.html
   */
  function requireAuth() {
    const session = getSession();
    if (!session || !session.connecte) {
      const base = getBasePath();
      window.location.href = base + "content/login.html";
    }
  }

  window.requireAuth = requireAuth;

  // =============================================================
  // UTILITAIRE : chemin de base relatif
  // =============================================================

  function getBasePath() {
    // Retourne "" si on est à la racine, "../" si dans un sous-dossier
    const path = window.location.pathname;
    const depth = (path.match(/\//g) || []).length - 1;
    return depth > 1 ? "../" : "";
  }

  // =============================================================
  // FORMULAIRE CONTACT — validation + soumission simulée
  // =============================================================

  function initContactForm() {
    const form = document.getElementById("formArea");
    if (!form) return;

    window.submitContactForm = function () {
      let valid = true;

      // Prénom
      const prenom = document.getElementById("prenom");
      const prenomErr = prenom && prenom.nextElementSibling;
      if (prenom) {
        const ok = /^[a-zA-ZÀ-ÿ]{2,}$/.test(prenom.value.trim());
        prenom.classList.toggle("error", !ok);
        if (prenomErr) prenomErr.style.display = ok ? "none" : "";
        if (!ok) valid = false;
      }

      // Nom
      const nom = document.getElementById("nom");
      const nomErr = nom && nom.nextElementSibling;
      if (nom) {
        const ok = /^[a-zA-ZÀ-ÿ]{2,}$/.test(nom.value.trim());
        nom.classList.toggle("error", !ok);
        if (nomErr) nomErr.style.display = ok ? "none" : "";
        if (!ok) valid = false;
      }

      // Email
      const email = document.getElementById("email");
      const emailErr = email && email.nextElementSibling;
      if (email) {
        const ok = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(email.value.trim());
        email.classList.toggle("error", !ok);
        if (emailErr) emailErr.style.display = ok ? "none" : "";
        if (!ok) valid = false;
      }

      // Message
      const msg = document.getElementById("message");
      const msgErr = msg && msg.nextElementSibling;
      if (msg) {
        const ok = msg.value.trim().length >= 10;
        msg.classList.toggle("error", !ok);
        if (msgErr) msgErr.style.display = ok ? "none" : "";
        if (!ok) valid = false;
      }

      // RGPD
      const rgpd = document.getElementById("rgpd");
      if (rgpd && !rgpd.checked) {
        alert("Veuillez accepter la politique de confidentialité.");
        valid = false;
      }

      if (!valid) return;

      // Succès
      document.getElementById("formArea").style.display = "none";
      const success = document.getElementById("successMsg");
      if (success) success.classList.add("visible");
    };

    window.resetContactForm = function () {
      document.getElementById("formArea").style.display = "";
      const success = document.getElementById("successMsg");
      if (success) success.classList.remove("visible");
    };
  }

  // =============================================================
  // ÉTOILES DE NOTATION (contact.html)
  // =============================================================

  function initStarRating() {
    const stars = document.querySelectorAll(".star-rate");
    if (!stars.length) return;
    stars.forEach((star, i) => {
      star.addEventListener("mouseover", () => {
        stars.forEach((s, j) => s.classList.toggle("active", j <= i));
      });
      star.addEventListener("click", () => {
        star.dataset.selected = "true";
        stars.forEach((s, j) => {
          s.classList.toggle("active", j <= i);
          s.dataset.selected = j <= i ? "true" : "";
        });
      });
    });
    const row = document.getElementById("ratingRow");
    if (row) {
      row.addEventListener("mouseleave", () => {
        const selected = Array.from(stars).findLastIndex(s => s.dataset.selected === "true");
        stars.forEach((s, j) => s.classList.toggle("active", j <= selected));
      });
    }
  }

  // =============================================================
  // INIT
  // =============================================================

  document.addEventListener("DOMContentLoaded", function () {
    updateNavbar();
    updateBadges();
    initContactForm();
    initStarRating();
  });

  // Rafraîchir les badges quand localStorage change (onglet différent)
  window.addEventListener("storage", function (e) {
    if (e.key === CART_KEY || e.key === WISH_KEY || e.key === AUTH_KEY) {
      updateNavbar();
      updateBadges();
    }
  });

})();
