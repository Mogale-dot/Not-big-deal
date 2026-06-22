// ============================================
// DASHBOARD.JS - Main Dashboard Controller
// With Hamburger Menu for Mobile
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    
    // --- Check Authentication ---
    if (!localStorage.getItem('isLoggedIn') || !localStorage.getItem('love_token')) {
        window.location.href = 'login.html';
        return;
    }
    
    // --- Elements ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const navItems = document.querySelectorAll('.nav-item');
    const btnLogout = document.getElementById('btnLogout');
    
    // --- Set Her Name ---
    const herName = 'Cute Face';
    document.querySelector('.welcome-text span').textContent = herName;
    document.querySelector('.name-glow').textContent = herName;
    
    // --- Initialize Particles ---
    createParticles();
    
    // --- Hamburger Menu Toggle ---
    hamburgerBtn.addEventListener('click', toggleSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    
    // --- Navigation ---
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            const pageName = item.getAttribute('data-page');
            navigateTo(pageName);
            // Close sidebar on mobile after navigation
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
    
    // --- Logout ---
    btnLogout.addEventListener('click', () => {
        // Sweet confirmation
        if (confirm('Are you sure you want to leave,My lady ? 💕')) {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('love_token');
            localStorage.removeItem('her_name');
            window.location.href = 'login.html';
        }
    });
    
    // --- Handle browser back/forward ---
    window.addEventListener('popstate', (e) => {
        if (e.state && e.state.page) {
            switchPage(e.state.page, false);
        }
    });
    
    // --- Close sidebar on window resize if desktop ---
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeSidebar();
        }
    });
    
    // --- Handle hash on load ---
    if (window.location.hash) {
        const pageFromHash = window.location.hash.replace('#', '');
        if (['home', 'questions', 'date-planner', 'timeline'].includes(pageFromHash)) {
            switchPage(pageFromHash, false);
        }
    }
});

// --- Sidebar Functions ---
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburgerBtn');
    
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Prevent body scroll when sidebar is open
    if (sidebar.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburgerBtn');
    
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    hamburger.classList.remove('active');
    document.body.style.overflow = '';
}

// --- Global Navigation Function ---
function navigateTo(pageName) {
    switchPage(pageName, true);
}

function switchPage(pageName, addToHistory) {
    // Update nav items
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('data-page') === pageName) {
            item.classList.add('active');
        }
    });
    
    // Update pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    const targetPage = document.getElementById(`page-${pageName}`);
    if (targetPage) {
        targetPage.classList.add('active');
        // Scroll to top smoothly
        targetPage.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    
    // Update browser history
    if (addToHistory) {
        history.pushState({ page: pageName }, '', `#${pageName}`);
    }
    
    // Load page-specific content
    loadPageContent(pageName);
}

// --- Load Page Content ---
function loadPageContent(pageName) {
    switch(pageName) {
        case 'questions':
            if (typeof loadQuestions === 'function') loadQuestions();
            break;
        case 'date-planner':
            if (typeof loadDatePlanner === 'function') loadDatePlanner();
            break;
        case 'timeline':
            if (typeof loadTimeline === 'function') loadTimeline();
            break;
    }
}

// --- Create Floating Particles ---
function createParticles() {
    const container = document.getElementById('particlesBg');
    const colors = ['#d4668f', '#ea5b7c', '#ff4d7a', '#960830', '#ffd1e0'];
    
    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const size = Math.random() * 6 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        particle.style.animationDuration = (Math.random() * 12 + 8) + 's';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.opacity = Math.random() * 0.12 + 0.04;
        
        container.appendChild(particle);
    }
}