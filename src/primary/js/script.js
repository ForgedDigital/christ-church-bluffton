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

// Active Nav Highlighting
(function() {
    var currentPage = window.location.pathname.split('/').pop() || 'index.html';
    if (currentPage === '') currentPage = 'index.html';
    // Strip clean URL (no .html)
    var cleanPage = currentPage.replace('.html', '');
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(function(link) {
        var href = link.getAttribute('href') || '';
        if (href === currentPage || href === cleanPage || href === cleanPage + '.html') {
            link.classList.add('active');
        }
    });
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

    // Events: Auto-sort, hide past, feature next
    (function() {
        var template = document.getElementById('events-data');
        if (!template) return;

        var nextList = document.getElementById('next-event-list');
        var upcomingList = document.getElementById('upcoming-events-list');
        var nextSection = document.getElementById('next-event-section');
        var upcomingSection = document.getElementById('upcoming-events-section');

        var cards = Array.from(template.content.querySelectorAll('.event-card'));
        var today = new Date();
        today.setHours(0, 0, 0, 0);

        // Filter out past events and sort by date (soonest first)
        var futureCards = cards.filter(function(card) {
            var dateStr = card.getAttribute('data-event-date');
            var eventDate = new Date(dateStr + 'T23:59:59');
            return eventDate >= today;
        }).sort(function(a, b) {
            return new Date(a.getAttribute('data-event-date')) - new Date(b.getAttribute('data-event-date'));
        });

        if (futureCards.length === 0) {
            // No upcoming events
            if (nextSection) nextSection.style.display = 'none';
            if (upcomingSection) {
                upcomingList.innerHTML = '<p class="lead" style="text-align:center;">No upcoming events at this time. Check back soon!</p>';
            }
            return;
        }

        // First event goes to "Next Event" as featured
        var featured = futureCards[0].cloneNode(true);
        featured.classList.add('event-featured');
        featured.setAttribute('data-animate', 'fade-up');
        nextList.appendChild(featured);

        // Rest go to "Upcoming Events"
        if (futureCards.length > 1) {
            for (var i = 1; i < futureCards.length; i++) {
                var card = futureCards[i].cloneNode(true);
                card.setAttribute('data-animate', 'fade-up');
                upcomingList.appendChild(card);
            }
        } else {
            // Only one event, hide upcoming section
            if (upcomingSection) upcomingSection.style.display = 'none';
        }
    })();

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

    // Back to Top Button
    (function() {
        var btn = document.getElementById('backToTop');
        if (!btn) return;

        window.addEventListener('scroll', function() {
            if (window.scrollY > 400) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        });

        btn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    })();

    // Prayer Request FAB
    (function() {
        var fab = document.getElementById('prayerFab');
        var popup = document.getElementById('prayerPopup');
        var overlay = document.getElementById('prayerOverlay');
        var closeBtn = document.getElementById('prayerClose');
        var form = document.getElementById('prayerForm');
        var formBody = document.getElementById('prayerFormBody');
        var success = document.getElementById('prayerSuccess');

        if (!fab || !popup) return;

        function openPrayer() {
            popup.classList.add('active');
            overlay.classList.add('active');
            fab.classList.add('hidden');
        }

        function closePrayer() {
            popup.classList.remove('active');
            overlay.classList.remove('active');
            fab.classList.remove('hidden');
            // Reset form after closing
            setTimeout(function() {
                formBody.style.display = '';
                success.classList.remove('active');
                form.reset();
            }, 300);
        }

        fab.addEventListener('click', openPrayer);
        closeBtn.addEventListener('click', closePrayer);
        overlay.addEventListener('click', closePrayer);

        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && popup.classList.contains('active')) {
                closePrayer();
            }
        });

        // Handle prayer form submit → Breeze API
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var submitBtn = form.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.textContent = 'Submitting...';

            var data = {
                name: (form.querySelector('[name="name"]').value || '').trim(),
                prayer: (form.querySelector('[name="prayer"]').value || '').trim()
            };

            fetch('/api/prayer', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function() {
                // Always show success (pastoral UX)
                formBody.style.display = 'none';
                success.classList.add('active');
                setTimeout(closePrayer, 2500);
            })
            .catch(function() {
                // Still show success even on network error
                formBody.style.display = 'none';
                success.classList.add('active');
                setTimeout(closePrayer, 2500);
            })
            .finally(function() {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Submit Prayer';
            });
        });
    })();

    // Contact Form → Breeze API
    (function() {
        var form = document.querySelector('.contact-form');
        if (!form) return;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var submitBtn = form.querySelector('button[type="submit"]');
            var origHTML = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            var data = {
                fullName: form.querySelector('#fullName').value.trim(),
                email: form.querySelector('#email').value.trim(),
                phone: (form.querySelector('#phone').value || '').trim(),
                interest: form.querySelector('#interest').value,
                message: (form.querySelector('#message').value || '').trim()
            };

            fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(function(res) { return res.json(); })
            .then(function(result) {
                if (result.success) {
                    form.innerHTML = '<div class="form-success"><span class="prayer-success-icon">&#10003;</span><h4>Message Sent</h4><p>Thank you for reaching out! We will be in touch soon.</p></div>';
                } else {
                    throw new Error(result.error);
                }
            })
            .catch(function() {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origHTML;
                alert('Something went wrong. Please try again or email us directly.');
            });
        });
    })();

    // Newsletter Form (footer on all pages) → Breeze API
    (function() {
        var forms = document.querySelectorAll('.newsletter-form');
        if (!forms.length) return;

        forms.forEach(function(form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                var submitBtn = form.querySelector('button[type="submit"]');
                var emailInput = form.querySelector('input[name="email"]');
                var origText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.textContent = 'Subscribing...';

                fetch('/api/stay-updated', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email: emailInput.value.trim() })
                })
                .then(function(res) { return res.json(); })
                .then(function(result) {
                    if (result.success) {
                        emailInput.value = '';
                        submitBtn.textContent = 'Subscribed!';
                        submitBtn.classList.add('subscribed');
                        setTimeout(function() {
                            submitBtn.textContent = origText;
                            submitBtn.classList.remove('subscribed');
                            submitBtn.disabled = false;
                        }, 3000);
                    } else {
                        throw new Error(result.error);
                    }
                })
                .catch(function() {
                    submitBtn.textContent = origText;
                    submitBtn.disabled = false;
                    alert('Something went wrong. Please try again.');
                });
            });
        });
    })();
});
