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
// panier.js - simple client-side cart using localStorage
(function(){
    const KEY = 'royaltime_cart_v1';

    function read(){
        try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; }
    }
    function write(cart){ localStorage.setItem(KEY, JSON.stringify(cart)); updateBadge(); window.dispatchEvent(new CustomEvent('royalcart:updated')); }

    function add(item){
        const cart = read();
        // normalize incoming item
        const qty = Math.max(1, parseInt(item.qty||1, 10));
        // normalize price: remove non-numeric except comma or dot, convert comma to dot
        let raw = String(item.price||'0').replace(/\s+/g,'');
        raw = raw.replace(/€/g,'');
        raw = raw.replace(/,/g,'.');
        const price = Number(parseFloat(raw) || 0);
        const normalized = Object.assign({}, item, { qty: qty, price: price });
        // if same id exists, increment qty
        const idx = cart.findIndex(c=>c.id==normalized.id);
        if(idx>=0){ cart[idx].qty = (Number(cart[idx].qty||0) + Number(normalized.qty)); }
        else { cart.push(normalized); }
        // ensure cart items have correct types
        const safe = cart.map(i=>({ id: i.id, title: i.title, price: Number(i.price)||0, image: i.image||'', qty: Math.max(1, parseInt(i.qty||1,10)) }));
        write(safe);
        // visual feedback
        try{ showToast((normalized.title||'Produit') + ' ajouté au panier'); }catch(e){}
    }

    function remove(index){ const cart = read(); cart.splice(index,1); write(cart); }
    function clear(){ localStorage.removeItem(KEY); updateBadge(); window.dispatchEvent(new CustomEvent('royalcart:updated')); }
    function updateBadge(){
        const cart = read(); const count = cart.reduce((s,i)=>s+Number(i.qty||0),0);
        document.querySelectorAll('.cart-count').forEach(el=>el.textContent = count>0?count:'');
        // create badge if missing on nav
        const cartLinks = document.querySelectorAll('.cart-link');
        cartLinks.forEach(link=>{
            if(!link.querySelector('.cart-count')){
                const span = document.createElement('span'); span.className='cart-count'; span.setAttribute('aria-hidden','true'); link.appendChild(span);
            }
        });
    }

    // expose for panier page
    window.RoyalCart = { read, write, add, remove, clear, updateBadge };

    // auto-bind Add to cart button if present
    document.addEventListener('DOMContentLoaded', ()=>{
        updateBadge();
        const addBtn = document.getElementById('addToCartBtn');
        if(addBtn){
            addBtn.addEventListener('click', function(){
                const id = this.dataset.id || Date.now();
                const title = this.dataset.title || document.title;
                const priceRaw = this.dataset.price || '0';
                const image = this.dataset.image || '';
                add({ id, title, price: priceRaw, image, qty:1 });
                // small feedback
                this.textContent = 'Added ✓';
                setTimeout(()=>{ this.textContent = 'Add to cart'; }, 900);
            });
        }
        // expose click handler for any dynamic add buttons
        document.body.addEventListener('click', function(e){
            const t = e.target.closest('[data-add-to-cart]');
            if(!t) return;
            e.preventDefault();
            const item = {
                id: t.dataset.id||Date.now(),
                title: t.dataset.title||t.dataset.name||'Product',
                price: t.dataset.price||'0',
                image: t.dataset.image||'', qty: parseInt(t.dataset.qty||1,10)
            };
            add(item);
        });
    });

    // Toast UI
    function ensureToastContainer(){
        let c = document.getElementById('rt-toast-container');
        if(!c){ c = document.createElement('div'); c.id = 'rt-toast-container'; c.setAttribute('aria-live','polite'); document.body.appendChild(c); }
        return c;
    }
    function showToast(msg, timeout=2200){
        const container = ensureToastContainer();
        const t = document.createElement('div'); t.className = 'rt-toast'; t.textContent = msg;
        container.appendChild(t);
        requestAnimationFrame(()=> t.classList.add('visible'));
        setTimeout(()=>{ t.classList.remove('visible'); setTimeout(()=> t.remove(), 300); }, timeout);
    }

    // Render logic for panier page
    function money(n){ return Number(n||0).toLocaleString('fr-DZ', {minimumFractionDigits:0, maximumFractionDigits:0}) + ' DA'; }
    function renderCart(){
        const elList = document.getElementById('cartList'); if(!elList) return;
        const cart = read(); elList.innerHTML='';
        if(!cart || cart.length===0){ 
            elList.innerHTML='<p class="empty">Votre panier est vide.</p>'; 
            const s = document.getElementById('subTotal'); const tx = document.getElementById('taxes'); const tot = document.getElementById('total');
            if(s) s.textContent = money(0); if(tx) tx.textContent = money(0); if(tot) tot.textContent = money(0);
            return; 
        }
        cart.forEach((item,i)=>{
            const node = document.createElement('div'); node.className='cart-item';
            node.innerHTML = `<div class="media"><img src="${item.image||'../image/logo.png'}" alt="${item.title}"></div>
                <div class="meta"><h4>${item.title}</h4><div class="price">${money(item.price)}</div>
                <div class="qty">Quantité: <input type="number" min="1" value="${item.qty||1}" data-index="${i}" class="qty-input"></div>
                <button class="remove" data-index="${i}">Retirer</button></div>`;
            elList.appendChild(node);
        });
        const subtotal = cart.reduce((s,it)=>s + (Number(it.price||0) * (it.qty||1)),0);
        const taxRate = Number(document.querySelector('.cart-summary')?.dataset?.taxRate) || 0;
        const taxes = +(subtotal * taxRate).toFixed(2);
        const total = +(subtotal + taxes).toFixed(2);
        const sEl = document.getElementById('subTotal'); const txEl = document.getElementById('taxes'); const totEl = document.getElementById('total');
        if(sEl) sEl.textContent = money(subtotal); if(txEl) txEl.textContent = money(taxes); if(totEl) totEl.textContent = money(total);
    }

    // Bind render on page load and on cart updates
    document.addEventListener('DOMContentLoaded', function(){
        renderCart();
        const elList = document.getElementById('cartList');
        if(document.getElementById('year')) document.getElementById('year').textContent = new Date().getFullYear();
        const clearBtn = document.getElementById('clearCart'); if(clearBtn) clearBtn.addEventListener('click', function(){ clear(); renderCart(); });
        if(elList){
            elList.addEventListener('click', function(e){ if(e.target.classList.contains('remove')){ const i = Number(e.target.dataset.index); remove(i); renderCart(); } });
            elList.addEventListener('change', function(e){ if(e.target.classList.contains('qty-input')){ const idx = Number(e.target.dataset.index); const cart = read(); cart[idx].qty = Math.max(1, parseInt(e.target.value||1,10)); write(cart); renderCart(); } });
        }
    });
    window.addEventListener('royalcart:updated', renderCart);

})();