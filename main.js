// Documentation Site Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');

    function showSection(id) {
        // Normalize ID
        if (!id || id === '#') id = '#home';

        // Toggle is-landing class
        if (id === '#home') {
            document.body.classList.add('is-landing');
        } else {
            document.body.classList.remove('is-landing');
        }

        // Remove active class from all sections and sidebar links
        sections.forEach(section => section.classList.remove('active'));
        document.querySelectorAll('#sidebar-nav a').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.landing-header nav a').forEach(link => link.classList.remove('active'));

        // Add active class to target section
        const targetSection = document.querySelector(id);
        const targetLinkSidebar = document.querySelector(`#sidebar-nav a[href="${id}"]`);
        const targetLinkLanding = document.querySelector(`.landing-header nav a[href="${id}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0);
        }
        if (targetLinkSidebar) targetLinkSidebar.classList.add('active');
        if (targetLinkLanding) targetLinkLanding.classList.add('active');
    }

    // Handle initial load (hash in URL)
    if (window.location.hash) {
        showSection(window.location.hash);
    } else {
        showSection('#home');
    }

    // ==========================================
    // Mobile Menu Toggle Logic
    // ==========================================
    const menuToggle = document.getElementById('menu-toggle');
    const landingMenuToggle = document.getElementById('landing-menu-toggle');
    const landingNav = document.getElementById('landing-nav');
    const aside = document.querySelector('aside');
    const overlay = document.getElementById('sidebar-overlay');

    if (landingMenuToggle && landingNav) {
        landingMenuToggle.addEventListener('click', () => {
            landingNav.classList.toggle('active');
        });
    }

    if (menuToggle && aside && overlay) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            aside.classList.toggle('active');
            overlay.classList.toggle('active');
        });

        overlay.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            aside.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Handle all internal hash link clicks
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const id = link.getAttribute('href');
        if (id && id.startsWith('#')) {
            const targetSection = document.querySelector(id);
            if (targetSection) {
                e.preventDefault();
                history.pushState(null, null, id);
                showSection(id);
                
                // Close landing mobile menu
                if (landingNav) landingNav.classList.remove('active');

                // Close doc sidebar
                if (window.innerWidth <= 768) {
                    if (menuToggle) menuToggle.classList.remove('active');
                    if (aside) aside.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                }
            }
        }
    });

    // ==========================================
    // LED Calculator Logic
    // ==========================================
    const btnCalculate = document.getElementById('btn-calculate');
    const calcResults = document.getElementById('calc-results');

    if (btnCalculate) {
        btnCalculate.addEventListener('click', () => {
            const pitch = parseFloat(document.getElementById('pixel-pitch').value);
            const widthM = parseFloat(document.getElementById('screen-width').value);
            const heightM = parseFloat(document.getElementById('screen-height').value);

            if (isNaN(pitch) || isNaN(widthM) || isNaN(heightM)) {
                alert('올바른 숫자를 입력해 주세요.');
                return;
            }

            const widthPx = Math.floor((widthM * 1000) / pitch);
            const heightPx = Math.floor((heightM * 1000) / pitch);
            
            calcResults.innerHTML = `
                <div class="result-card">
                    <div class="label">해상도</div>
                    <div class="value">${widthPx} x ${heightPx} <span class="unit">px</span></div>
                </div>
                <div class="result-card">
                    <div class="label">권장 시청 거리</div>
                    <div class="value">${(pitch * 1.5).toFixed(1)} <span class="unit">m 이상</span></div>
                </div>
            `;
            calcResults.style.display = 'grid';
        });
    }
});
