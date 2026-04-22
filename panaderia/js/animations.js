// ========== ANIMACIÓN AL SCROLL ==========
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar a tarjetas
document.querySelectorAll('.specialty-card, .product-card, .character-card, .testimonial-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// ========== CONFETTI DE BIENVENIDA ==========
function showWelcomeConfetti() {
    const emojis = ['🍞', '🥐', '🥖', '💕', '🌸', '⭐', '✨', '🎀', '🐻', '🐰'];
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-40px';
            confetti.style.fontSize = Math.random() * 20 + 15 + 'px';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.animation = `fall ${Math.random() * 2 + 1}s linear forwards`;
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }, i * 80);
    }
}

const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        0% { transform: translateY(0) rotate(0deg); opacity: 1; }
        100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(fallStyle);

// Mostrar confeti después de cargar
setTimeout(showWelcomeConfetti, 500);

// ========== CONSOLA KAWAII ==========
console.log('%c✨ ¡Bienvenidx a Chibi Cheff! ✨', 'color: #ff8aa3; font-size: 14px; font-weight: bold;');
console.log('%c🍞 Los panes más kawaii te esperan 🍞', 'color: #5a3e2b; font-size: 12px;');