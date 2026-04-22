// ========== CONTADORES ANIMADOS ==========
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.innerText = target;
            clearInterval(timer);
        } else {
            element.innerText = Math.floor(start);
        }
    }, 16);
}

// Observador para activar contadores al hacer scroll
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'counter1') animateCounter(entry.target, 358);
            if (id === 'counter2') animateCounter(entry.target, 1247);
            if (id === 'counter3') animateCounter(entry.target, 892);
            counterObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.counter-number').forEach(counter => {
    counterObserver.observe(counter);
});

// ========== PRODUCTOS DINÁMICOS ==========
const products = [
    { name: 'Osito Chibi 🐻', price: 35, desc: 'Pan de leche con carita de osito', img: 'assets/img/products/chibi-bear-bread.jpg', badge: '⭐ Más kawaii' },
    { name: 'Conejito Croissant 🐰', price: 45, desc: 'Hojaldre con forma de conejito', img: 'assets/img/products/bunny-croissant.jpg', badge: null },
    { name: 'Pan Arcoíris 🌈', price: 55, desc: '7 capas de colores, sabor a nube', img: 'assets/img/products/rainbow-bread.jpg', badge: null },
    { name: 'Gatito Mochi 🐱', price: 40, desc: 'Pan estilo mochi suavecito', img: 'assets/img/products/cat-mochi.jpg', badge: null }
];

const productsGrid = document.getElementById('productsGrid');
if (productsGrid) {
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card kawaii-card" data-aos="flip-up">
            <div class="product-image">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
                ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-price">
                    <span>$${product.price}</span>
                    <a href="#" class="btn-kawaii add-to-cart" data-name="${product.name}" data-price="${product.price}">¡Quiero! 💕</a>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== CARRUSEL DE TESTIMONIOS ==========
const testimonials = [
    { avatar: '🌸', text: '"¡Los panes más adorables que he visto! Mi hija ama el pan osito, no quiere comer otro"', name: 'María 💕', role: 'Cliente feliz' },
    { avatar: '⭐', text: '"El pan arcoíris es una experiencia mágica. Rico y hermoso, perfecto para fotos"', name: 'Sofía ✨', role: 'Siempre vuelve' },
    { avatar: '🍰', text: '"La atención es súper linda y los personajes chibi hacen todo más especial"', name: 'Camila 🎀', role: 'Recomienda a todos' },
    { avatar: '🐻', text: '"Pedí el pan osito para mi hijo y le encantó. Además el empaque es precioso"', name: 'Andrea 🌸', role: 'Pedido a domicilio' },
    { avatar: '✨', text: '"El mejor pan de masa madre que he probado, y con caritas adorables"', name: 'Daniel 💖', role: 'Cliente frecuente' }
];

let currentIndex = 0;
const track = document.getElementById('testimonialTrack');
const dotsContainer = document.getElementById('carouselDots');

function renderCarousel() {
    if (!track) return;
    track.innerHTML = testimonials.map((t, i) => `
        <div class="testimonial-card kawaii-card carousel-item">
            <div class="testimonial-avatar">${t.avatar}</div>
            <p>${t.text}</p>
            <div class="customer">
                <strong>${t.name}</strong>
                <span>${t.role}</span>
            </div>
        </div>
    `).join('');
    
    // Actualizar dots
    if (dotsContainer) {
        dotsContainer.innerHTML = testimonials.map((_, i) => `
            <span class="dot ${i === currentIndex ? 'active' : ''}" data-index="${i}"></span>
        `).join('');
        
        document.querySelectorAll('.dot').forEach(dot => {
            dot.addEventListener('click', () => {
                currentIndex = parseInt(dot.dataset.index);
                updateCarousel();
            });
        });
    }
    updateCarousel();
}

function updateCarousel() {
    if (!track) return;
    const itemWidth = track.querySelector('.carousel-item')?.offsetWidth + 30 || 350;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
    
    document.querySelectorAll('.dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === currentIndex);
    });
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % testimonials.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
    updateCarousel();
}

document.getElementById('nextBtn')?.addEventListener('click', nextSlide);
document.getElementById('prevBtn')?.addEventListener('click', prevSlide);

// Auto-slide cada 5 segundos
let autoSlide = setInterval(nextSlide, 5000);

// Pausar auto-slide al hacer hover
const carouselContainer = document.querySelector('.carousel-container');
carouselContainer?.addEventListener('mouseenter', () => clearInterval(autoSlide));
carouselContainer?.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 5000);
});

// ========== MODO OSCURO ==========
const darkmodeToggle = document.getElementById('darkmodeToggle');
darkmodeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const icon = darkmodeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        localStorage.setItem('darkmode', 'enabled');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        localStorage.setItem('darkmode', 'disabled');
    }
});

// Cargar preferencia guardada
if (localStorage.getItem('darkmode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkmodeToggle.querySelector('i').classList.remove('fa-moon');
    darkmodeToggle.querySelector('i').classList.add('fa-sun');
}

// ========== EFECTO PARALLAX ==========
window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const parallax = document.querySelector('.parallax');
    if (parallax) {
        parallax.style.backgroundPositionY = scrolled * 0.3 + 'px';
    }
});

// ========== NOTIFICACIÓN AL AÑADIR AL CARRITO ==========
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart')) {
        e.preventDefault();
        const name = e.target.dataset.name;
        const notification = document.createElement('div');
        notification.className = 'toast-notification';
        notification.innerHTML = `🍞 ¡${name} añadido al carrito! 💕`;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
});

// ========== INICIALIZAR AOS ==========
AOS.init({
    duration: 800,
    once: true,
    offset: 100
});

// ========== RENDER INICIAL ==========
renderCarousel();

console.log('%c✨ Chibi Cheff Modo Épico Activado ✨', 'color: #ff8aa3; font-size: 14px; font-weight: bold;');