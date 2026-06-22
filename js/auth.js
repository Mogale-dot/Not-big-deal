// ============================================
// AUTH.JS - Calls Your Live Server
// ============================================

// 🔗 YOUR LIVE SERVER URL
const API_URL = 'https://admin-peter-server.onrender.com/api/love';



document.addEventListener('DOMContentLoaded', () => {
    
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    const loginBtn = document.getElementById('loginBtn');
    
    createFloatingHearts();
    
    togglePassword.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePassword.querySelector('i');
        icon.classList.toggle('fa-eye-slash');
        icon.classList.toggle('fa-eye');
    });
    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        hideError();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        
        if (!email) {
            showError('Please enter your email address ');
            emailInput.focus();
            return;
        }
        
        if (!isValidEmail(email)) {
            showError('Hmm, that doesn\'t look like a valid email 🤔');
            emailInput.focus();
            return;
        }
        
        if (!password) {
            showError('You need the secret password to enter 🔐');
            passwordInput.focus();
            return;
        }
        
        await login(email, password);
    });
    
    async function login(email, password) {
        setLoading(true);
        
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            
            const data = await response.json();
            
            if (data.success) {
                // Store token and user info
                localStorage.setItem('love_token', data.token);
                localStorage.setItem('her_name', data.user.name);
                localStorage.setItem('her_email', data.user.email);
                localStorage.setItem('isLoggedIn', 'true');
                
                loginBtn.classList.add('login-success');
                loginBtn.innerHTML = '<span class="btn-text">Welcome, Beautiful!</span><i class="fas fa-heart btn-heart"></i>';
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 800);
            } else {
                showError(data.message);
                setLoading(false);
            }
        } catch (err) {
            console.error('Login error:', err);
            showError('Cannot connect to our secret place. Try again soon 🌐');
            setLoading(false);
        }
    }
    
    function showError(message) {
        errorText.textContent = message;
        errorMessage.classList.add('show');
        errorMessage.style.animation = 'none';
        errorMessage.offsetHeight;
        errorMessage.style.animation = 'shake 0.5s ease';
    }
    
    function hideError() {
        errorMessage.classList.remove('show');
    }
    
    function setLoading(isLoading) {
        if (isLoading) {
            loginBtn.classList.add('btn-loading');
            loginBtn.disabled = true;
        } else {
            loginBtn.classList.remove('btn-loading');
            loginBtn.disabled = false;
        }
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    function createFloatingHearts() {
        const heartsBg = document.getElementById('heartsBg');
        const heartEmojis = ['💕', '💖', '💗', '💝', '🌸', '✨', '🩷', '💓'];
        
        function createHeart() {
            const heart = document.createElement('span');
            heart.classList.add('heart-float');
            heart.textContent = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 8 + 6) + 's';
            heart.style.fontSize = (Math.random() * 20 + 12) + 'px';
            heartsBg.appendChild(heart);
            setTimeout(() => heart.remove(), 14000);
        }
        
        setInterval(createHeart, 800);
        for (let i = 0; i < 8; i++) {
            setTimeout(createHeart, i * 400);
        }
    }
});

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(shakeStyle);