// barrejs.js — RoyalTime Search Page

const searchInput     = document.getElementById('searchInput');
const resultContainer = document.getElementById('resultats');

function clearResults() {
  if (resultContainer) resultContainer.innerHTML = '';
}

function showResults(products) {
  if (!resultContainer) return;

  if (!products || products.length === 0) {
    resultContainer.innerHTML = `
      <div class="empty-state">
        <p>Aucune montre trouvée</p>
      </div>`;
    return;
  }

  resultContainer.innerHTML = products.map(p => `
    <div class="card">
      <div class="card-figure">
        ${p.image ? `<img src="${p.image}" alt="${p.title}" loading="lazy">` : ''}
      </div>
      <div class="card-body">
        <h3 class="card-title">${p.title}</h3>
        ${p.brand  ? `<p  class="card-sub">${p.brand}</p>` : ''}
        ${p.description ? `<p class="card-desc">${p.description}</p>` : ''}
        <div class="card-row">
          <span class="price">${p.price ?? ''}</span>
          <button class="add-btn" onclick="addToCart && addToCart(${p.id})">+ Panier</button>
        </div>
      </div>
    </div>
  `).join('');
}

if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const q = e.target.value.trim();
    if (!q) { clearResults(); return; }

    if (typeof window.searchProducts === 'function') {
      showResults(window.searchProducts(q));
    } else if (typeof window.renderSearchResults === 'function') {
      window.renderSearchResults(q, '#resultats');
    } else if (Array.isArray(window.ROYALTIME_PRODUCTS)) {
      const results = window.ROYALTIME_PRODUCTS.filter(p =>
        (p.title + ' ' + (p.description || '') + ' ' + (p.brand || ''))
          .toLowerCase().includes(q.toLowerCase())
      );
      showResults(results);
    }
  });
}
// Mobile burger menu toggle (standalone listener so it's always registered)
document.addEventListener('DOMContentLoaded', function(){
    const burger = document.querySelector('.burger');
    const mobileMenu = document.getElementById('mobileMenu');
    if(!burger || !mobileMenu) return;

    function openMenu(){
        mobileMenu.classList.add('open');
        mobileMenu.setAttribute('aria-hidden','false');
        burger.setAttribute('aria-expanded','true');
        document.body.style.overflow = 'hidden';
    }
    function closeMenu(){
        mobileMenu.classList.remove('open');
        mobileMenu.setAttribute('aria-hidden','true');
        burger.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
    }

    burger.addEventListener('click', function(e){
        const expanded = burger.getAttribute('aria-expanded') === 'true';
        if(expanded) closeMenu(); else openMenu();
    });

    // close on outside click
    document.addEventListener('click', function(e){
        if(!mobileMenu.classList.contains('open')) return;
        if(e.target.closest('.mobile-menu') || e.target.closest('.burger')) return;
        closeMenu();
    });

    // close on Esc
    document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });

    // ensure menu closes on resize to desktop
    window.addEventListener('resize', function(){ if(window.matchMedia('(min-width:881px)').matches) closeMenu(); });
    // mobile close button
    const mobileClose = mobileMenu.querySelector('.mobile-close');
    if(mobileClose){
        mobileClose.addEventListener('click', function(e){
            e.stopPropagation();
            closeMenu();
        });
        mobileClose.addEventListener('keydown', function(e){ if(e.key === 'Enter' || e.key === ' ') closeMenu(); });
    }
});

