// Documentation Site Navigation
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('#sidebar-nav a');
    const sections = document.querySelectorAll('main section');

    function showSection(id) {
        // Remove active class from all links and sections
        navLinks.forEach(link => link.classList.remove('active'));
        sections.forEach(section => section.classList.remove('active'));

        // Add active class to target link and section
        const targetLink = document.querySelector(`#sidebar-nav a[href="${id}"]`);
        const targetSection = document.querySelector(id);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo(0, 0);
        }
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Handle initial load (hash in URL)
    if (window.location.hash) {
        showSection(window.location.hash);
    }

    // Handle link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, id);
                showSection(id);
            }
        });
    });

    // Handle footer link clicks
    const footerLinks = document.querySelectorAll('footer a');
    footerLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const id = link.getAttribute('href');
            if (id.startsWith('#')) {
                e.preventDefault();
                history.pushState(null, null, id);
                showSection(id);
            }
        });
    });

    // Simple search placeholder functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            alert('검색 기능은 현재 준비 중입니다. 좌측 내비게이션을 이용해 주세요.');
            searchInput.value = '';
        }
    });
});
