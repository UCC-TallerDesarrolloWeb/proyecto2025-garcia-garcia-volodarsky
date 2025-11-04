// Includes: cargar header/sponsors/footer desde fragments
async function includeFragments() {
    const includes = [
        { url: 'header.html', id: 'header' },
        { url: 'sponsors.html', id: 'sponsors' },
        { url: 'footer.html', id: 'footer' }
    ];

    async function fetchAndInsert(url, id) {
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
            const html = await res.text();
            const placeholder = document.getElementById(id);
            if (placeholder) placeholder.innerHTML = html;
            return { url, ok: true };
        } catch (err) {
            console.error('Include failed for', url, err);
            return { url, ok: false, error: String(err) };
        }
    }

    // Ejecutar en paralelo
    const results = await Promise.all(includes.map(i => fetchAndInsert(i.url, i.id)));
    document.dispatchEvent(new CustomEvent('includes:loaded', { detail: { results } }));
    return results;
}

document.addEventListener("DOMContentLoaded", async () => {
    console.log("Página lista ✅");

    // Asegurar que los includes se han cargado antes de inicializar lógica que depende del header
    await includeFragments();

    // Inicializar carrito si estamos en shop.html
    if (window.location.pathname.includes('shop.html')) {
        initShop();
        loadCart();
    }

    // Inicializar checkout si estamos en checkout.html
    if (window.location.pathname.includes('checkout.html')) {
        initCheckout();
    }

    // Inicializar roster si estamos en roster.html
    if (window.location.pathname.includes('roster.html')) {
        initRoster();
    }

    // Inicializar calendario si estamos en calendario.html
    if (window.location.pathname.includes('calendario.html')) {
        initCalendario();
    }
});

// ===== MENU MOBILE =====
function toggleMenu() {
    const nav = document.querySelector('.primary-nav');
    const toggle = document.getElementById('menuToggle');

    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

// Cerrar menú al hacer click en un link
document.addEventListener('click', (e) => {
    if (e.target.matches('.primary-nav a')) {
        const nav = document.querySelector('.primary-nav');
        const toggle = document.getElementById('menuToggle');

        if (nav && toggle) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
});

// Cerrar menú al redimensionar ventana
window.addEventListener('resize', () => {
    if (window.innerWidth > 640) {
        const nav = document.querySelector('.primary-nav');
        const toggle = document.getElementById('menuToggle');

        if (nav && toggle) {
            nav.classList.remove('active');
            toggle.classList.remove('active');
        }
    }
});

// ===== ROSTER =====
function initRoster() {
    // Filtro de cards por posición
    const posFilter = document.getElementById("pos");
    if (posFilter) {
        posFilter.addEventListener("change", function () {
            const pos = this.value;
            document.querySelectorAll(".player-card").forEach((card) => {
                if (!pos || card.dataset.pos === pos) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
}

// ===== CALENDARIO =====
function initCalendario() {
    const total = document.querySelectorAll(".game-card").length;
    const countEl = document.getElementById("calCount");
    const emptyEl = document.getElementById("calEmpty");

    if (countEl) countEl.textContent = String(total);
    if (emptyEl) emptyEl.hidden = total > 0;


    // Filtrado por mes (funcionalidad adicional)
    const mesFilter = document.getElementById("mes");
    if (mesFilter) {
        mesFilter.addEventListener("change", function () {
            const mes = this.value;
            let count = 0;
            document.querySelectorAll(".game-card").forEach((card) => {
                if (!mes || card.getAttribute("data-month") === mes) {
                    card.style.display = "";
                    count++;
                } else {
                    card.style.display = "none";
                }
            });
            countEl.textContent = String(count);
            emptyEl.hidden = count > 0;

        });
    }
}

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
        const id = a.getAttribute("href");
        const el = document.querySelector(id);
        if (el) {
            e.preventDefault();
            el.scrollIntoView({behavior: "smooth", block: "start"});
        }
    });
});

// ===== CARRITO =====
let cart = [];
let cartOpen = false; // Asegurar que esté cerrado por defecto

// Cargar carrito desde localStorage al inicializar
function loadCart() {
    const savedCart = localStorage.getItem('bullsCart');
    cart = savedCart ? JSON.parse(savedCart) : [];
    // Always update the cart display so UI (counter/icon) reflects current state
    updateCartDisplay();
    // Asegurar que el carrito esté cerrado al cargar
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');
    if (sidebar && overlay) {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        cartOpen = false;
        document.body.style.overflow = '';
    }
}

// Guardar carrito en localStorage
function saveCart() {
    localStorage.setItem('bullsCart', JSON.stringify(cart));
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({name, price, quantity: 1});
    }
    saveCart();
    updateCartDisplay();
    // Eliminar la apertura automática del carrito
}

function removeFromCart(name) {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartDisplay();
    // Eliminar el cierre automático del carrito
}

function changeQuantity(name, change) {
    const item = cart.find(item => item.name === name);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(name);
        } else {
            saveCart();
            updateCartDisplay();
        }
    }
}

function clearCart() {
    cart = [];
    localStorage.removeItem('bullsCart');
    updateCartDisplay();
    // Eliminar el cierre automático del carrito
}

function updateCartDisplay() {
    const cartCount = document.getElementById('cartCount');
    const cartCounter = document.getElementById('cartCounter');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCount) cartCount.textContent = totalItems;

    // Mostrar contador si estamos en shop.html o si hay items en otras páginas
    if (cartCounter) {
        const isShopPage = window.location.pathname.includes('shop.html');
        cartCounter.style.display = (isShopPage || totalItems > 0) ? 'block' : 'none';
    }

    if (cartTotal) cartTotal.textContent = totalPrice.toLocaleString();

    if (cartItems) {
        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="cart-empty">Tu carrito está vacío</p>';
        } else {
            cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
          <div class="item-left">
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${item.price.toLocaleString()}</span>
          </div>
          <div class="item-right">
            <div class="quantity-controls">
              <button onclick="changeQuantity('${item.name}', -1)" class="qty-btn">-</button>
              <span class="quantity">${item.quantity}</span>
              <button onclick="changeQuantity('${item.name}', 1)" class="qty-btn">+</button>
            </div>
            <button onclick="removeFromCart('${item.name}')" class="remove-btn">×</button>
          </div>
        </div>
      `).join('');
        }
    }
}

function showCartSection() {
    toggleCart();
}

function hideCartSection() {
    if (cartOpen) {
        toggleCart();
    }
}

function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (!sidebar || !overlay) {
        console.log('Cart elements not found');
        return;
    }

    cartOpen = !cartOpen;
    console.log('Cart toggled:', cartOpen);

    if (cartOpen) {
        sidebar.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
    } else {
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
    }
}

// Función específica para cerrar el carrito
function closeCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar && overlay) {
        cartOpen = false;
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        console.log('Cart closed');
    }
}

function checkout() {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    // Guardar carrito y redirigir a checkout
    saveCart();
    window.location.href = 'checkout.html';
}

// ===== SHOP FILTERS =====
function initShop() {
    // Mostrar ícono del carrito en el header cuando estamos en shop
    // pero NO abrir el sidebar automáticamente
    const cartCounter = document.getElementById('cartCounter');
    if (cartCounter) {
        cartCounter.style.display = 'block';
    }

    const q = document.getElementById("qShop");
    const cat = document.getElementById("catShop");
    const talle = document.getElementById("talleShop");
    const precio = document.getElementById("precioShop");
    const orden = document.getElementById("ordenShop");
    const grid = document.getElementById("shopGrid");

    if (!grid) return; // No estamos en shop.html

    const cards = Array.from(grid.querySelectorAll(".prod-card"));

    const norm = (s) =>
        (s || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();

    function matchPrecio(p, bucket) {
        if (!bucket) return true;
        const n = Number(p);
        if (bucket === "1") return n <= 20000;
        if (bucket === "2") return n > 20000 && n <= 40000;
        if (bucket === "3") return n > 40000;
        return true;
    }

    function aplicar() {
        const term = norm(q.value);
        const c = cat.value;
        const t = talle.value;
        const pr = precio.value;

        cards.forEach((card) => {
            const txt = norm(card.getAttribute("data-text"));
            const okText = !term || txt.includes(term);

            const okCat = !c || card.dataset.cat === c;

            const sizes = (card.dataset.size || "").split(",");
            const okSize = !t || sizes.includes(t);

            const okPrice = matchPrecio(card.dataset.price, pr);

            const show = okText && okCat && okSize && okPrice;
            card.style.display = show ? "" : "none";
        });

        ordenar();
    }

    function ordenar() {
        const val = orden.value;
        const visibles = cards.filter((c) => c.style.display !== "none");
        if (!val) return; // sin orden → queda natural

        visibles.sort((a, b) => {
            if (val === "price-asc" || val === "price-desc") {
                const pa = Number(a.dataset.price),
                    pb = Number(b.dataset.price);
                return val === "price-asc" ? pa - pb : pb - pa;
            } else {
                const na = a.querySelector(".prod-title").textContent.trim();
                const nb = b.querySelector(".prod-title").textContent.trim();
                return val === "name-asc"
                    ? na.localeCompare(nb)
                    : nb.localeCompare(na);
            }
        });

        // Reinsertar en el DOM solo los visibles (los ocultos quedan donde están)
        visibles.forEach((el) => grid.appendChild(el));
    }

    [q, cat, talle, precio].forEach((el) =>
        el.addEventListener("input", aplicar)
    );
    orden.addEventListener("change", ordenar);

    aplicar(); // init
}

// ===== CHECKOUT =====
function initCheckout() {
    const cartData = localStorage.getItem('bullsCart');
    const cart = cartData ? JSON.parse(cartData) : [];

    if (cart.length === 0) {
        // Si no hay productos, redirigir al shop
        window.location.href = 'shop.html';
        return;
    }

    // Mostrar items del carrito
    const checkoutItems = document.getElementById('checkoutItems');
    const checkoutTotal = document.getElementById('checkoutTotal');

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    checkoutTotal.textContent = totalPrice.toLocaleString();

    checkoutItems.innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span>${item.name} x${item.quantity}</span>
      <span>$${(item.price * item.quantity).toLocaleString()}</span>
    </div>
  `).join('');

    // Manejar envío del formulario
    const checkoutForm = document.getElementById('checkoutForm');
    checkoutForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Simular procesamiento
        setTimeout(() => {
            // Limpiar carrito
            localStorage.removeItem('bullsCart');

            // Mostrar modal de éxito
            const modal = document.getElementById('successModal');
            modal.classList.add('open');
            document.body.style.overflow = 'hidden';
        }, 1000);
    });

    // Formatear número de tarjeta
    const cardNumberInput = document.getElementById('cardNumber');

    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        e.target.value = value.match(/.{1,4}/g)?.join(' ') || value;
    });

    // Formatear fecha de vencimiento
    const cardExpiryInput = document.getElementById('cardExpiry');
    cardExpiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
}


// ===== Filtro de calendario (por mes y texto) =====
(function () {
    const list = document.getElementById("partidos");
    if (!list) return; // solo corre en calendario.html

    const selMes = document.getElementById("mes");
    const q = document.getElementById("q");
    const count = document.getElementById("calCount");
    const empty = document.getElementById("calEmpty");

    const items = Array.from(list.querySelectorAll(".game-card"));

    function normalizar(str) {
        return (str || "").toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar tildes
            .replace(/\s+/g, " ").trim();
    }

    function aplicarFiltro() {
        const mes = selMes?.value || "";               // "" o "10".."12","1".."4"
        const term = normalizar(q?.value || "");

        let visibles = 0;
        items.forEach(li => {
            const liMes = li.getAttribute("data-month");
            const hayMes = (!mes || mes === liMes);
            const txt = normalizar(li.getAttribute("data-text"));
            const hayQ = (!term || txt.includes(term));
            const show = hayMes && hayQ;
            li.style.display = show ? "" : "none";
            if (show) visibles++;
        });

        if (count) count.textContent = String(visibles);
        if (empty) empty.hidden = visibles > 0;
    }

    selMes?.addEventListener("change", aplicarFiltro);
    q?.addEventListener("input", aplicarFiltro);

    // init
    aplicarFiltro();
})();
