// ========== PRODUCTOS COMPLETOS ==========
const fullProducts = [
    { id: 1, name: 'Osito Chibi 🐻', price: 35, desc: 'Pan de leche con carita de osito, ojos de chispas de chocolate', img: 'assets/img/products/chibi-bear-bread.jpg', badge: '⭐ ¡MÁS VENDIDO! ⭐', category: 'dulce' },
    { id: 2, name: 'Conejito Croissant 🐰', price: 45, desc: 'Hojaldre con orejitas crujientes y corazón de nutella', img: 'assets/img/products/bunny-croissant.jpg', badge: '🐇 ¡NUEVO! 🐇', category: 'hojaldre' },
    { id: 3, name: 'Pan Arcoíris 🌈', price: 55, desc: '7 capas de colores, sabor a nube y magia', img: 'assets/img/products/rainbow-bread.jpg', badge: '🌈 EDICIÓN LIMITADA 🌈', category: 'especial' },
    { id: 4, name: 'Gatito Mochi 🐱', price: 40, desc: 'Pan estilo mochi suavecito, relleno de crema pastelera', img: 'assets/img/products/cat-mochi.jpg', badge: '🐱 ¡SUAVE COMO GATITO! 🐱', category: 'mochi' },
    { id: 5, name: 'Pan de Muñeca 🎀', price: 38, desc: 'Pan con forma de lazo, sabor fresa natural', img: 'assets/img/products/bow-bread.jpg', badge: '🎀 PARA REGALAR 🎀', category: 'dulce' },
    { id: 6, name: 'Baguette Mágica ✨', price: 42, desc: 'Baguette crujiente con semillas mágicas', img: 'assets/img/products/magic-baguette.jpg', badge: '✨ CRUJIENTE ✨', category: 'salado' }
];

// Renderizar productos
const productsContainer = document.getElementById('productsGridComplete');
if (productsContainer) {
    productsContainer.innerHTML = fullProducts.map(product => `
        <div class="product-card-disaster" data-id="${product.id}">
            <div class="product-image-disaster">
                <img src="${product.img}" alt="${product.name}" onerror="this.src='https://via.placeholder.com/300x200?text=${encodeURIComponent(product.name)}'">
                <div class="product-badge-disaster">${product.badge}</div>
            </div>
            <div class="product-info-disaster">
                <h3>${product.name}</h3>
                <p>${product.desc}</p>
                <div class="product-price-disaster">
                    <span>$${product.price}</span>
                    <button class="btn-kawaii-disaster add-to-cart-btn" data-id="${product.id}" data-name="${product.name}" data-price="${product.price}">
                        ¡LO QUIERO! 💕
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// ========== TESTIMONIOS COMPLETOS ==========
const fullTestimonials = [
    { avatar: '🌸', text: '"¡Los panes más adorables que he visto! Mi hija ama el pan osito, no quiere comer otro"', name: 'María G.', role: 'Cliente feliz', rating: 5 },
    { avatar: '⭐', text: '"El pan arcoíris es una experiencia mágica. Rico y hermoso, perfecto para fotos"', name: 'Sofía R.', role: 'Siempre vuelve', rating: 5 },
    { avatar: '🍰', text: '"La atención es súper linda y los personajes chibi hacen todo más especial. Llegaron a tiempo y el pan delicioso."', name: 'Camila L.', role: 'Recomienda a todos', rating: 5 },
    { avatar: '🐻', text: '"Pedí el pan osito para mi hijo y le encantó. Además el empaque es precioso, súper cuidado."', name: 'Andrea M.', role: 'Pedido a domicilio', rating: 5 },
    { avatar: '✨', text: '"El mejor pan de masa madre que he probado, y con caritas adorables. 10/10"', name: 'Daniel H.', role: 'Cliente frecuente', rating: 5 }
];

let currentSpinIndex = 0;
const spinContainerComplete = document.getElementById('spinTestimonialsComplete');

function renderSpinTestimonialsComplete() {
    if (!spinContainerComplete) return;
    spinContainerComplete.innerHTML = fullTestimonials.map((t, i) => `
        <div class="testimonial-spin-card ${i === currentSpinIndex ? 'active' : ''}">
            <div style="font-size: 3rem;">${t.avatar}</div>
            <div class="rating-stars-small">
                ${'⭐'.repeat(t.rating)}
            </div>
            <p>${t.text}</p>
            <div class="customer">
                <strong>${t.name}</strong>
                <span>${t.role}</span>
            </div>
        </div>
    `).join('');
}

function nextSpinTestimonialComplete() {
    currentSpinIndex = (currentSpinIndex + 1) % fullTestimonials.length;
    renderSpinTestimonialsComplete();
}

renderSpinTestimonialsComplete();
setInterval(nextSpinTestimonialComplete, 5000);

// ========== FAQ ACCORDION ==========
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        const icon = question.querySelector('i');
        if (faqItem.classList.contains('active')) {
            icon.style.transform = 'rotate(180deg)';
        } else {
            icon.style.transform = 'rotate(0deg)';
        }
    });
});

// ========== FORMULARIO DE CONTACTO ==========
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.querySelector('input[placeholder="Tu nombre"]').value;
        alert(`💌 ¡Gracias ${name}! Nos pondremos en contacto contigo pronto. ¡Un pan volador para ti! 🍞✨`);
        contactForm.reset();
    });
}

// ========== BARRA DE AVISO ==========
const topBanner = document.getElementById('topBanner');
const closeBanner = document.getElementById('closeBanner');

if (closeBanner && topBanner) {
    closeBanner.addEventListener('click', () => {
        topBanner.style.display = 'none';
    });
}

// ========== NAVEGACIÓN SUAVE ==========
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#') return;
        
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== VER TODOS LOS PRODUCTOS ==========
const viewAllBtn = document.getElementById('viewAllProducts');
if (viewAllBtn) {
    viewAllBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const productsSection = document.getElementById('productos');
        if (productsSection) {
            productsSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// ========== INICIALIZAR AOS ==========
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });
}

console.log('%c✨ Chibi Cheff - Modo Completo Activado ✨', 'color: #ff8aa3; font-size: 16px; font-weight: bold;');
console.log('%c🍞 15 secciones listas para vender 🍞', 'color: #ffb7c5; font-size: 14px;');