// Simple client-side validation and formatting for payment form
(() => {
	const f = document.getElementById('paymentForm');
	if (!f) return;

	const qs = id => document.getElementById(id);
	const cardNumber = qs('cardNumber');
	const cardName = qs('cardName');
	const expiry = qs('expiry');
	const cvv = qs('cvv');
	const success = qs('success');

	const displayNumber = qs('displayNumber');
	const displayName = qs('displayName');
	const displayExpiry = qs('displayExpiry');

	function luhnCheck(num){
		const s = num.replace(/\s+/g,'');
		if (!/^[0-9]{12,19}$/.test(s)) return false;
		let sum = 0, alt = false;
		for (let i = s.length - 1; i >= 0; i--){
			let n = parseInt(s[i],10);
			if (alt){ n *= 2; if (n>9) n -= 9 }
			sum += n; alt = !alt;
		}
		return sum % 10 === 0;
	}

	function formatCard(v){
		return v.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim();
	}

	cardNumber.addEventListener('input', e => {
		const val = formatCard(e.target.value);
		e.target.value = val;
		displayNumber.textContent = val || '•••• •••• •••• ••••';
	});

	cardName.addEventListener('input', e => displayName.textContent = e.target.value.toUpperCase() || 'NOM SUR LA CARTE');
	expiry.addEventListener('input', e => {
		let v = e.target.value.replace(/[^0-9]/g,'');
		if (v.length >= 3) v = v.slice(0,2) + '/' + v.slice(2,4);
		e.target.value = v;
		displayExpiry.textContent = v || 'MM/AA';
	});

	function showError(id,msg){
		const el = qs(id);
		if (!el) return;
		el.textContent = msg || '';
		return !msg;
	}

	function validEmail(v){
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
	}

	function validExpiry(v){
		if (!/^[0-9]{2}\/[0-9]{2}$/.test(v)) return false;
		const [m, y] = v.split('/').map(n => parseInt(n,10));
		if (m < 1 || m > 12) return false;
		const now = new Date();
		const fullY = 2000 + y;
		const exp = new Date(fullY, m);
		return exp > now;
	}

	f.addEventListener('submit', e => {
		e.preventDefault();
		let ok = true;

		ok = showError('errName', cardName.value.trim() ? '' : 'Veuillez saisir le nom') && ok;

		const num = cardNumber.value.replace(/\s+/g,'');
		ok = showError('errNumber', luhnCheck(num) ? '' : 'Numéro invalide') && ok;

		ok = showError('errExpiry', validExpiry(expiry.value) ? '' : 'Date invalide') && ok;

		ok = showError('errCvv', /^[0-9]{3,4}$/.test(cvv.value) ? '' : 'CVV invalide') && ok;

		ok = showError('errEmail', validEmail(qs('email').value) ? '' : 'Email invalide') && ok;

		if (!ok) return;

		// Simulate success
		f.hidden = true;
		success.hidden = false;
	});

	qs('btnCancel').addEventListener('click', ()=>{f.reset(); displayNumber.textContent='•••• •••• •••• ••••'; displayName.textContent='NOM SUR LA CARTE'; displayExpiry.textContent='MM/AA';});

})();

// Update displayed amount from cart totals
(function(){
	function money(n){ return '€' + Number(n||0).toLocaleString('fr-FR', {minimumFractionDigits:2, maximumFractionDigits:2}); }
	function computeAndRender(){
		try{
			const raw = localStorage.getItem('royaltime_cart_v1');
			const cart = raw ? JSON.parse(raw) : [];
			const subtotal = (cart || []).reduce((s,i)=>{
				// robust price parsing
				let price = Number(i.price);
				if (!isFinite(price)){
					const cleaned = String(i.price||'').replace(/[^0-9,\.\-]/g,'').replace(',', '.');
					price = Number(parseFloat(cleaned) || 0);
				}
				const qty = Number(i.qty||1) || 1;
				const line = (isFinite(price) ? price : 0) * qty;
				return s + line;
			}, 0);
			const taxRate = (function(){
				const el = document.querySelector('.summary');
				if(el && el.dataset && el.dataset.taxRate) return Number(el.dataset.taxRate)||0.2;
				return 0.2;
			})();
			const taxes = +(subtotal * taxRate).toFixed(2);
			const total = +(subtotal + taxes).toFixed(2);
			const amtEl = document.getElementById('amountTotal') || document.querySelector('.summary .amount');
			const payBtn = document.getElementById('payBtn') || document.querySelector('#paymentForm .btn-primary');
			// debug logs removed for production
			if(amtEl) amtEl.textContent = money(total);
			if(payBtn) payBtn.textContent = 'Payer ' + money(total);
			// debug panel (visible on page)
			// debug panel removed to avoid exposing raw cart data on the page
			// if total is zero but cart has items, surface a warning
			if(total === 0 && Array.isArray(cart) && cart.length>0){
				console.warn('paiment: total is 0 but cart contains items, inspect cart content above');
			}
		}catch(e){ console.warn('Impossible de lire le panier pour calculer le montant', e); }
	}
	document.addEventListener('DOMContentLoaded', computeAndRender);
	window.addEventListener('royalcart:updated', computeAndRender);
})();

// Shim: expose minimal RoyalCart API on payment page if the main `panier.js` isn't loaded
if(!window.RoyalCart){
	(function(){
		const KEY = 'royaltime_cart_v1';
		function read(){ try{ return JSON.parse(localStorage.getItem(KEY)) || []; }catch(e){ return []; } }
		function write(cart){ localStorage.setItem(KEY, JSON.stringify(cart)); window.dispatchEvent(new CustomEvent('royalcart:updated')); }
		function add(item){
			const cart = read();
			const qty = Math.max(1, parseInt(item.qty||1,10));
			let raw = String(item.price||'0').replace(/\s+/g,'').replace(/€/g,'').replace(/,/g,'.');
			const price = Number(parseFloat(raw) || 0);
			const idx = cart.findIndex(c=>c.id==item.id);
			if(idx>=0) cart[idx].qty = (Number(cart[idx].qty||0) + qty);
			else cart.push({ id: item.id, title: item.title, price: price, image: item.image||'', qty: qty });
			write(cart);
		}
		function remove(i){ const c = read(); c.splice(i,1); write(c); }
		function clear(){ localStorage.removeItem(KEY); window.dispatchEvent(new CustomEvent('royalcart:updated')); }
		function updateBadge(){ /* no-op on payment page */ }
		window.RoyalCart = { read, write, add, remove, clear, updateBadge };
	})();
}

