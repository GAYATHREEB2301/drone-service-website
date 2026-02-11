document.addEventListener('DOMContentLoaded', () => {
    // Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        if (icon) icon.className = 'fas fa-sun'; // Switch to sun icon
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');

            // Update Icon
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }

            // Save Preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        });
    }

    // Mobile Menu Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('nav ul');
    const headerActions = document.querySelector('.header-actions');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.className = 'fas fa-times';

                // Clone header actions into mobile menu if not already there
                if (!document.getElementById('mobile-actions-clone') && headerActions) {
                    const clone = headerActions.cloneNode(true);
                    clone.id = 'mobile-actions-clone';
                    clone.style.display = 'flex';
                    clone.style.flexDirection = 'column';
                    clone.style.marginTop = '1rem';
                    clone.style.gap = '1rem';

                    // Re-attach theme toggle listener to cloned button
                    const clonedToggle = clone.querySelector('#theme-toggle');
                    if (clonedToggle) {
                        clonedToggle.id = 'theme-toggle-mobile'; // Unique ID for clone

                        clonedToggle.addEventListener('click', (e) => {
                            e.preventDefault(); // Prevent bubbling issues
                            document.body.classList.toggle('dark-mode');
                            const isDark = document.body.classList.contains('dark-mode');
                            const clonedIcon = clonedToggle.querySelector('i');
                            if (clonedIcon) clonedIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                            localStorage.setItem('theme', isDark ? 'dark' : 'light');

                            // Also update the original toggle icon to stay in sync
                            const originalToggle = document.getElementById('theme-toggle');
                            if (originalToggle) {
                                const origIcon = originalToggle.querySelector('i');
                                if (origIcon) origIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                            }
                        });
                    }

                    navMenu.appendChild(clone);
                }

                // Sync state whenever menu is opened
                const mobileToggle = document.getElementById('theme-toggle-mobile');
                if (mobileToggle) {
                    const isDark = document.body.classList.contains('dark-mode');
                    const mIcon = mobileToggle.querySelector('i');
                    if (mIcon) mIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
                }
            } else {
                icon.className = 'fas fa-bars';
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('back-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Highlights active link based on URL
    const navLinks = document.querySelectorAll('nav a');
    const currentPath = window.location.pathname.split('/').pop(); // "index.html" etc.

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        }
    });
});
