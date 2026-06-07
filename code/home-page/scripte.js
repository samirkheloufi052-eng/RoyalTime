document.addEventListener('DOMContentLoaded', function(){

	/* =============================================
	   1. COLLECTION CAROUSEL
	   ============================================= */
	const wrap = document.querySelector('.collection-wrap');
	const grid = document.querySelector('.collection-grid');
	const cards = document.querySelectorAll('.card');
	const prev = document.querySelector('.carousel-btn.prev');
	const next = document.querySelector('.carousel-btn.next');

	let index = 0;

	if(wrap && grid && cards.length > 0){
		const maxIndex = cards.length - 1;

		function showIndex(i){
			const cardWidth = cards[0].getBoundingClientRect().width + 16;
			grid.style.transform = `translateX(-${i * cardWidth}px)`;
		}
		function clamp(v){ return Math.max(0, Math.min(v, maxIndex)); }

		prev && prev.addEventListener('click', ()=>{ index = clamp(index-1); showIndex(index); });
		next && next.addEventListener('click', ()=>{ index = clamp(index+1); showIndex(index); });

		let startX = 0, currentX = 0, isDown = false;
		grid.addEventListener('touchstart', e=>{ startX = e.touches[0].clientX; isDown=true; });
		grid.addEventListener('touchmove',  e=>{ if(!isDown) return; currentX = e.touches[0].clientX; });
		grid.addEventListener('touchend',   ()=>{
			if(!isDown) return; isDown=false;
			const dx = startX - currentX;
			if(Math.abs(dx) > 40){ index = clamp(index + (dx>0?1:-1)); showIndex(index); }
			startX = currentX = 0;
		});

		function updateControls(){
			const isSmall = window.matchMedia('(max-width:768px)').matches;
			if(prev) prev.style.display = isSmall ? 'block' : 'none';
			if(next) next.style.display = isSmall ? 'block' : 'none';
			if(!isSmall){ grid.style.transform = ''; index = 0; }
		}
		updateControls();
		window.addEventListener('resize', ()=>{ index = clamp(index); grid.style.transform = ''; updateControls(); });
	}


	/* =============================================
	   2. BEST SELLERS CAROUSEL
	   ============================================= */
	const bestGrid  = document.querySelector('.best-grid');
	const bestCards = document.querySelectorAll('.best-card');
	const prevBest  = document.querySelector('.best-prev');
	const nextBest  = document.querySelector('.best-next');

	if(bestGrid && bestCards.length > 0){
		let idx = 0;
		const maxIdx = bestCards.length - 1;

		function showBest(i){
			const cardW = bestCards[0].getBoundingClientRect().width + 16;
			bestGrid.style.transform = `translateX(-${i * cardW}px)`;
		}
		function clampBest(v){ return Math.max(0, Math.min(v, maxIdx)); }

		prevBest && prevBest.addEventListener('click', ()=>{ idx = clampBest(idx-1); showBest(idx); });
		nextBest && nextBest.addEventListener('click', ()=>{ idx = clampBest(idx+1); showBest(idx); });

		let sX=0, cX=0, down=false;
		bestGrid.addEventListener('touchstart', e=>{ sX = e.touches[0].clientX; down=true; });
		bestGrid.addEventListener('touchmove',  e=>{ if(!down) return; cX = e.touches[0].clientX; });
		bestGrid.addEventListener('touchend',   ()=>{ if(!down) return; down=false; const dx=sX-cX; if(Math.abs(dx)>40){ idx=clampBest(idx+(dx>0?1:-1)); showBest(idx); } sX=cX=0; });

		function updateBestControls(){
			const isSmall = window.matchMedia('(max-width:600px)').matches;
			if(prevBest) prevBest.style.display = isSmall ? 'block' : 'none';
			if(nextBest) nextBest.style.display = isSmall ? 'block' : 'none';
			if(!isSmall){ bestGrid.style.transform = ''; idx = 0; }
		}
		updateBestControls();
		window.addEventListener('resize', updateBestControls);
	}


	/* =============================================
	   3. TESTIMONIALS CAROUSEL
	   ============================================= */
	const testGrid  = document.querySelector('.test-grid');
	const testCards = document.querySelectorAll('.test-card');
	const testPrev  = document.querySelector('.test-prev');
	const testNext  = document.querySelector('.test-next');

	if(testGrid && testCards.length > 0){
		let tIdx = 0;
		const tMax = testCards.length - 1;

		function showTest(i){
			const w = testCards[0].getBoundingClientRect().width + 16;
			testGrid.style.transform = `translateX(-${i * w}px)`;
		}
		function clampTest(v){ return Math.max(0, Math.min(v, tMax)); }

		testPrev && testPrev.addEventListener('click', ()=>{ tIdx=clampTest(tIdx-1); showTest(tIdx); });
		testNext && testNext.addEventListener('click', ()=>{ tIdx=clampTest(tIdx+1); showTest(tIdx); });

		let tStartX=0, tCurrX=0, tDown=false;
		testGrid.addEventListener('touchstart', e=>{ tStartX=e.touches[0].clientX; tDown=true; });
		testGrid.addEventListener('touchmove',  e=>{ if(!tDown) return; tCurrX=e.touches[0].clientX; });
		testGrid.addEventListener('touchend',   ()=>{ if(!tDown) return; tDown=false; const dx=tStartX-tCurrX; if(Math.abs(dx)>40){ tIdx=clampTest(tIdx+(dx>0?1:-1)); showTest(tIdx); } tStartX=tCurrX=0; });

		function updateTestControls(){
			const small = window.matchMedia('(max-width:600px)').matches;
			if(testPrev) testPrev.style.display = small ? 'block' : 'none';
			if(testNext) testNext.style.display = small ? 'block' : 'none';
			if(!small){ testGrid.style.transform = ''; tIdx = 0; }
		}
		updateTestControls();
		window.addEventListener('resize', updateTestControls);
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


	/* =============================================
	   5. TOUCH OVERLAY (tap-to-reveal on cards)
	   ============================================= */
	document.addEventListener('touchstart', function(e){
		const card = e.target.closest('.card, .best-card');
		if(!card){
			document.querySelectorAll('.card.touch-active, .best-card.touch-active').forEach(c=>c.classList.remove('touch-active'));
			return;
		}
		if(!card.classList.contains('touch-active')){
			document.querySelectorAll('.card.touch-active, .best-card.touch-active').forEach(c=>c.classList.remove('touch-active'));
			card.classList.add('touch-active');
			e.preventDefault();
		}
	}, {passive: false});


	/* =============================================
	   6. COLLECTION CARDS → FICHE PAGE
	   ============================================= */
	const ficheCards = document.querySelectorAll('.collection-grid .card');
	ficheCards.forEach(card => {
		card.style.cursor = 'pointer';
		card.addEventListener('click', (e)=>{
			// If the card is already wrapped in a link (generated by products.js), don't override it
			if (card.closest('a')) return;
			const title  = card.dataset.title  || card.querySelector('h4')?.textContent || 'Product';
			const price  = card.dataset.price  || '';
			const images = card.dataset.images || card.querySelector('img')?.getAttribute('src') || '';
			const params = new URLSearchParams();
			params.set('title', title);
			if(price)  params.set('price', price);
			if(images) params.set('images', images);
			location.href = '../fiche/fiche.html?' + params.toString();
		});
		card.addEventListener('keydown', e=>{ if(e.key==='Enter'||e.key===' ') card.click(); });
	});


	/* =============================================
	   7. REVEAL ON SCROLL
	   ============================================= */
	if('IntersectionObserver' in window){
		const selectors = [
			'.heropage h1', '.heropage h3', '.description', '.cta',
			'.collection-header', '.card', '.best-card', '.test-card',
			'.feature', '.story-text', '.story-media img', '.collection-grid', '.best-grid'
		];
		const elems = document.querySelectorAll(selectors.join(','));

		elems.forEach(el => {
			if(!el.classList.contains('reveal')) el.classList.add('reveal');
			if(!el.dataset.animate){
				if(el.classList.contains('card') || el.classList.contains('best-card')) el.dataset.animate = 'fade-up';
				else if(el.classList.contains('feature'))    el.dataset.animate = 'slide-right';
				else if(el.closest('.heropage') || el.classList.contains('story-text')) el.dataset.animate = 'zoom-in';
				else el.dataset.animate = 'fade-up';
			}
		});

		const io = new IntersectionObserver((entries, obs) => {
			entries.forEach(entry => {
				if(!entry.isIntersecting) return;
				const el = entry.target;
				let delay = 0;
				try{
					const siblings = Array.from(el.parentNode ? el.parentNode.querySelectorAll(':scope > *') : []);
					delay = Math.max(0, siblings.indexOf(el)) * 70;
				}catch(e){ delay = 0; }
				el.style.transitionDelay = (el.dataset.delay || delay) + 'ms';
				el.classList.remove('hidden');
				el.classList.add('visible');
				obs.unobserve(el);
			});
		}, { root: null, rootMargin: '0px 0px -8% 0px', threshold: 0.12 });

		elems.forEach(el => {
			const rect = el.getBoundingClientRect();
			const offscreen = rect.bottom < 0 || rect.top > (window.innerHeight || document.documentElement.clientHeight);
			if(offscreen){ el.classList.add('hidden'); io.observe(el); }
			else { el.classList.add('visible'); }
		});
	}

}); // fin DOMContentLoaded