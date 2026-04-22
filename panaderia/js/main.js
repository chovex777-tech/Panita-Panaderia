// ========== MENÚ HAMBURGUESA ==========
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
    
    // Cerrar menú al hacer click en un enlace
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
});

// ========== NEWSLETTER ==========
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        if (email) {
            alert(`💕 ¡Gracias por suscribirte ${email}! 💕\nPronto recibirás noticias kawaii de Chibi Cheff`);
            this.reset();
        }
    });
}

// ========== HEADER SCROLL EFFECT ==========
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 245, 233, 0.98)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'rgba(255, 245, 233, 0.95)';
    }
});