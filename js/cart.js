// ========== CARRITO DE COMPRAS ==========
let cart = [];

// Cargar carrito guardado
const savedCart = localStorage.getItem('chibiCart');
if (savedCart) {
    cart = JSON.parse(savedCart);
    updateCartUI();
}

// Función para añadir al carrito
function addToCart(id, name, price) {
    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    saveCart();
    updateCartUI();
    showAddToCartAnimation(name);
}

// Función para quitar del carrito
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    saveCart();
    updateCartUI();
}

// Actualizar cantidad
function updateQuantity(id, newQuantity) {
    const item = cart.find(item => item.id === id);
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(id);
        } else {
            item.quantity = newQuantity;
            saveCart();
            updateCartUI();
        }
    }
}

// Guardar en localStorage
function saveCart() {
    localStorage.setItem('chibiCart', JSON.stringify(cart));
}

// Actualizar UI del carrito
function updateCartUI() {
    const cartItems = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');
    
    // Actualizar contador
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = totalItems;
    
    // Actualizar lista de items
    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Aún no hay panes... ¡añade uno! 🍞</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
                <div class="cart-item" data-id="${item.id}">
                    <div class="cart-item-info">
                        <span class="cart-item-name">${item.name}</span>
                        <span class="cart-item-price">$${item.price}</span>
                    </div>
                    <div class="cart-item-controls">
                        <button class="cart-qty-btn minus" data-id="${item.id}">-</button>
                        <span class="cart-item-qty">${item.quantity}</span>
                        <button class="cart-qty-btn plus" data-id="${item.id}">+</button>
                        <button class="cart-remove-btn" data-id="${item.id}">🗑️</button>
                    </div>
                </div>
            `).join('');
        }
        
        // Eventos de los botones del carrito
        document.querySelectorAll('.cart-qty-btn.minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.find(i => i.id === id);
                if (item) updateQuantity(id, item.quantity - 1);
            });
        });
        
        document.querySelectorAll('.cart-qty-btn.plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const item = cart.find(i => i.id === id);
                if (item) updateQuantity(id, item.quantity + 1);
            });
        });
        
        document.querySelectorAll('.cart-remove-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                removeFromCart(id);
            });
        });
    }
    
    // Actualizar total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotal) cartTotal.textContent = `$${total}`;
}

// Animación al añadir al carrito
function showAddToCartAnimation(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `🍞✨ ¡${productName} añadido al carrito! ✨🍞`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 500);
    }, 2000);
}

// ========== CARRITO SIDEBAR ==========
const cartButton = document.getElementById('cartButton');
const cartSidebar = document.getElementById('cartSidebar');
const cartOverlay = document.getElementById('cartOverlay');
const closeCart = document.getElementById('closeCart');

function openCart() {
    if (cartSidebar) cartSidebar.classList.add('open');
    if (cartOverlay) cartOverlay.classList.add('active');
}

function closeCartSidebar() {
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('active');
}

if (cartButton) cartButton.addEventListener('click', openCart);
if (closeCart) closeCart.addEventListener('click', closeCartSidebar);
if (cartOverlay) cartOverlay.addEventListener('click', closeCartSidebar);

// ========== CHECKOUT POR WHATSAPP ==========
const checkoutBtn = document.getElementById('checkoutBtn');
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        if (cart.length === 0) {
            alert('🍞 ¡Añade panes al carrito primero! 🍞');
            return;
        }
        
        const itemsList = cart.map(item => `- ${item.name} x${item.quantity} = $${item.price * item.quantity}`).join('%0A');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const message = `🍞 *PEDIDO CHIBI CHEFF* 🍞%0A%0A${itemsList}%0A%0A📦 *TOTAL:* $${total}%0A%0A💕 *Datos de envío:*%0ANombre: %0ADirección: %0AColonia: %0AReferencia: %0A%0A✨ ¡Gracias por tu pedido! ✨`;
        
        const whatsappUrl = `https://wa.me/5215512345678?text=${message}`;
        window.open(whatsappUrl, '_blank');
        
        // Limpiar carrito después de pedir
        cart = [];
        saveCart();
        updateCartUI();
        closeCartSidebar();
    });
}

// ========== EVENTOS PARA AÑADIR AL CARRITO ==========
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const id = parseInt(e.target.dataset.id);
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        addToCart(id, name, price);
    }
});