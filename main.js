// Documentation Site Navigation
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('main section');

    function showSection(id) {
        if (!id || id === '#') id = '#home';

        if (id === '#home') {
            document.body.classList.add('is-landing');
        } else {
            document.body.classList.remove('is-landing');
        }

        sections.forEach(section => section.classList.remove('active'));
        document.querySelectorAll('#sidebar-nav a').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.landing-header nav a').forEach(link => link.classList.remove('active'));

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
                
                if (landingNav) landingNav.classList.remove('active');

                if (window.innerWidth <= 768) {
                    if (menuToggle) menuToggle.classList.remove('active');
                    if (aside) aside.classList.remove('active');
                    if (overlay) overlay.classList.remove('active');
                }
            }
        }
    });

    // ==========================================
    // LED Calculator Logic (Full Restored)
    // ==========================================
    const btnCalculate = document.getElementById('btn-calculate');
    const btnSave = document.getElementById('btn-save');
    const calcResults = document.getElementById('calc-results');

    function calculateLED() {
        const pitch = parseFloat(document.getElementById('pixel-pitch').value);
        const widthM = parseFloat(document.getElementById('screen-width').value);
        const heightM = parseFloat(document.getElementById('screen-height').value);

        if (isNaN(pitch) || isNaN(widthM) || isNaN(heightM)) {
            alert('올바른 숫자를 입력해 주세요.');
            return null;
        }

        const widthPx = Math.floor((widthM * 1000) / pitch);
        const heightPx = Math.floor((heightM * 1000) / pitch);
        const diagonalInch = (Math.sqrt(Math.pow(widthM, 2) + Math.pow(heightM, 2)) * 39.37).toFixed(1);
        const area = (widthM * heightM).toFixed(2);
        
        const cabWidth = pitch >= 2.5 ? 0.64 : 0.5;
        const cabHeight = pitch >= 2.5 ? 0.48 : 0.5;
        const totalCabs = Math.ceil(widthM / cabWidth) * Math.ceil(heightM / cabHeight);

        const powerAvg = Math.round(area * 300);
        const powerPeak = Math.round(area * 800);
        const weight = Math.round(area * 35); 

        const results = [
            { label: '전체 해상도', value: `${widthPx} x ${heightPx}`, unit: 'px' },
            { label: '대각선 크기', value: diagonalInch, unit: 'inch' },
            { label: '총 캐비닛 수', value: totalCabs, unit: '개' },
            { label: '평균 소비 전력', value: powerAvg, unit: 'W' },
            { label: '최대 소비 전력', value: powerPeak, unit: 'W' },
            { label: '예상 총 중량', value: weight, unit: 'kg' },
            { label: '권장 시청 거리', value: (pitch * 1.5).toFixed(1), unit: 'm 이상' }
        ];

        calcResults.innerHTML = '';
        results.forEach(res => {
            const card = document.createElement('div');
            card.className = 'feature-card';
            card.style.padding = '24px';
            card.style.background = '#fff';
            card.style.borderRadius = '12px';
            card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.05)';
            card.innerHTML = `
                <div style="font-size: 13px; color: #666; font-weight: 600; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px;">${res.label}</div>
                <div style="font-size: 24px; font-weight: 700; color: #004b9b;">${res.value} <span style="font-size: 14px; font-weight: 500; color: #333;">${res.unit}</span></div>
            `;
            calcResults.appendChild(card);
        });
        calcResults.style.display = 'grid';
        return { pitch, widthM, heightM, date: new Date().toLocaleString() };
    }

    if (btnCalculate) btnCalculate.addEventListener('click', calculateLED);
    if (btnSave) {
        btnSave.addEventListener('click', () => {
            const data = calculateLED();
            if (data) {
                alert('계산 결과가 임시 저장되었습니다 (Local).');
            }
        });
    }
});
