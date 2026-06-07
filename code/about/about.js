(function(){
			var y = new Date().getFullYear();
			var el = document.getElementById('year');
			if(el) el.textContent = y;
		})();
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