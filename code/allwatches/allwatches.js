

	// /* =============================================
	//    4. BURGER / MOBILE MENU
	//    ============================================= */
	// const burger     = document.querySelector('.burger');
	// const mobileMenu = document.getElementById('mobileMenu');

	// if(burger && mobileMenu){
	// 	function openMenu(){
	// 		mobileMenu.classList.add('open');
	// 		mobileMenu.setAttribute('aria-hidden','false');
	// 		burger.setAttribute('aria-expanded','true');
	// 		document.body.style.overflow = 'hidden';
	// 	}
	// 	function closeMenu(){
	// 		mobileMenu.classList.remove('open');
	// 		mobileMenu.setAttribute('aria-hidden','true');
	// 		burger.setAttribute('aria-expanded','false');
	// 		document.body.style.overflow = '';
	// 	}

	// 	burger.addEventListener('click', function(){
	// 		burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
	// 	});

	// 	document.addEventListener('click', function(e){
	// 		if(!mobileMenu.classList.contains('open')) return;
	// 		if(e.target.closest('.mobile-menu') || e.target.closest('.burger')) return;
	// 		closeMenu();
	// 	});

	// 	document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
	// 	window.addEventListener('resize',    function(){ if(window.matchMedia('(min-width:881px)').matches) closeMenu(); });

	// 	const mobileClose = mobileMenu.querySelector('.mobile-close');
	// 	if(mobileClose){
	// 		mobileClose.addEventListener('click',   function(e){ e.stopPropagation(); closeMenu(); });
	// 		mobileClose.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') closeMenu(); });
	// 	}
	// }

    document.addEventListener('DOMContentLoaded', function(){
  const grid = document.getElementById('all-grid');
  if(!grid) return;
  // Ensure products.js loaded
  if(typeof getProducts !== 'function' || typeof renderProductsInto !== 'function'){
    console.error('products.js functions not available.');
    return;
  }
  // Render all products
  renderProductsInto(grid, getProducts('all'));

  // Enhance cards: wrap anchors for full-card click
  grid.querySelectorAll('.card-link').forEach(a=>{
    a.classList.remove('card-link');
    a.querySelectorAll('img').forEach(img=> img.loading = 'lazy');
  });
});
const burger     = document.querySelector('.burger');
	const mobileMenu = document.getElementById('mobileMenu');

	if(burger && mobileMenu){
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

		burger.addEventListener('click', function(){
			burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
		});

		document.addEventListener('click', function(e){
			if(!mobileMenu.classList.contains('open')) return;
			if(e.target.closest('.mobile-menu') || e.target.closest('.burger')) return;
			closeMenu();
		});

		document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
		window.addEventListener('resize',    function(){ if(window.matchMedia('(min-width:881px)').matches) closeMenu(); });

		const mobileClose = mobileMenu.querySelector('.mobile-close');
		if(mobileClose){
			mobileClose.addEventListener('click',   function(e){ e.stopPropagation(); closeMenu(); });
			mobileClose.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') closeMenu(); });
		}
	}
    
	// /* =============================================
	//    4. BURGER / MOBILE MENU
	//    ============================================= */
	// const burger     = document.querySelector('.burger');
	// const mobileMenu = document.getElementById('mobileMenu');

	// if(burger && mobileMenu){
	// 	function openMenu(){
	// 		mobileMenu.classList.add('open');
	// 		mobileMenu.setAttribute('aria-hidden','false');
	// 		burger.setAttribute('aria-expanded','true');
	// 		document.body.style.overflow = 'hidden';
	// 	}
	// 	function closeMenu(){
	// 		mobileMenu.classList.remove('open');
	// 		mobileMenu.setAttribute('aria-hidden','true');
	// 		burger.setAttribute('aria-expanded','false');
	// 		document.body.style.overflow = '';
	// 	}

	// 	burger.addEventListener('click', function(){
	// 		burger.getAttribute('aria-expanded') === 'true' ? closeMenu() : openMenu();
	// 	});

	// 	document.addEventListener('click', function(e){
	// 		if(!mobileMenu.classList.contains('open')) return;
	// 		if(e.target.closest('.mobile-menu') || e.target.closest('.burger')) return;
	// 		closeMenu();
	// 	});

	// 	document.addEventListener('keydown', function(e){ if(e.key === 'Escape') closeMenu(); });
	// 	window.addEventListener('resize',    function(){ if(window.matchMedia('(min-width:881px)').matches) closeMenu(); });

	// 	const mobileClose = mobileMenu.querySelector('.mobile-close');
	// 	if(mobileClose){
	// 		mobileClose.addEventListener('click',   function(e){ e.stopPropagation(); closeMenu(); });
	// 		mobileClose.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' ') closeMenu(); });
	// 	}
	// }



