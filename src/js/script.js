// Scroll to top on page load/refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Mark that the site has been visited (used by loader on index.html)
sessionStorage.setItem('siteVisited', 'true');

// Loader Initialization
(function() {
    var loader = document.getElementById('loader');
    if (!loader) return;

    // If skip-loader class was added by inline script, hide immediately
    if (document.documentElement.classList.contains('skip-loader')) {
        loader.style.display = 'none';
        return;
    }

    var startTime = Date.now();
    var minTime = 1500;

    function hideLoader() {
        loader.classList.add('fade-out');
        setTimeout(function() {
            loader.style.display = 'none';
        }, 1500);
    }

    if (document.readyState === 'complete') {
        var elapsed = Date.now() - startTime;
        var remaining = Math.max(0, minTime - elapsed);
        setTimeout(hideLoader, remaining);
    } else {
        window.addEventListener('load', function() {
            var elapsed = Date.now() - startTime;
            var remaining = Math.max(0, minTime - elapsed);
            setTimeout(hideLoader, remaining);
        });
    }
})();

// Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileOverlay = document.getElementById('mobileOverlay');
    const mobileClose = document.getElementById('mobileClose');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');

    // Open mobile menu
    function openMenu() {
        mobileMenu.classList.add('active');
        mobileOverlay.classList.add('active');
        document.body.classList.add('menu-open');
    }

    // Close mobile menu
    function closeMenu() {
        mobileMenu.classList.remove('active');
        mobileOverlay.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    // Event Listeners
    hamburger.addEventListener('click', openMenu);
    mobileClose.addEventListener('click', closeMenu);
    mobileOverlay.addEventListener('click', closeMenu);

    // Close menu when clicking on a nav link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Close menu on window resize if going above mobile breakpoint
    window.addEventListener('resize', function() {
        if (window.innerWidth > 1023 && mobileMenu.classList.contains('active')) {
            closeMenu();
        }
    });

    // Scroll Animations
    var animatedElements = document.querySelectorAll('[data-animate]');
    if (animatedElements.length > 0) {
        var observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(function(el) {
            observer.observe(el);
        });
    }
});
