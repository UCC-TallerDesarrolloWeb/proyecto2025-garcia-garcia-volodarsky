/**
 * Carga fragmentos HTML (header, sponsors, footer) usando XHR y callbacks.
 * Evita el uso de Promises/async para ajustarse al temario.
 * @method includeFragments
 * @param {Function} [done] Callback que se ejecuta cuando todos los fragmentos se insertan.
 * @returns {void}
 */
const includeFragments = (done) => {
    const includes = [
        { url: 'header.html', id: 'header' },
        { url: 'sponsors.html', id: 'sponsors' },
        { url: 'footer.html', id: 'footer' }
    ];

    let remaining = includes.length;

    const fetchAndInsert = (url, id) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.onload = function () {
            const placeholder = document.getElementById(id);
            if (placeholder) placeholder.innerHTML = xhr.responseText;
            remaining -= 1;
            if (remaining <= 0 && typeof done === 'function') done();
        };
        xhr.onerror = function (e) {
            console.error('Include failed for', url, e);
            remaining -= 1;
            if (remaining <= 0 && typeof done === 'function') done();
        };
        xhr.send();
    };

    includes.forEach(i => fetchAndInsert(i.url, i.id));
};

document.addEventListener("DOMContentLoaded", () => {
    console.log("Página lista ✅");

    // Cargar includes con callbacks (no usamos CustomEvent ni Promises)
    includeFragments(() => {
        // Inicializar páginas según la ruta
        if (window.location.pathname.includes('shop.html')) {
            initShop();
            loadCart();
        }
        if (window.location.pathname.includes('checkout.html')) {
            initCheckout();
        }
        if (window.location.pathname.includes('roster.html')) {
            initRoster();
        }
        if (window.location.pathname.includes('calendario.html')) {
            initCalendario();
        }
    });
});

// ===== MENU MOBILE =====
/**
 * Alterna el menú mobile (clase .active en nav y botón).
 * Usado desde el HTML con `onclick="toggleMenu()"`.
 * @method toggleMenu
 * @returns {void}
 */
const toggleMenu = () => {
    const nav = document.querySelector('.primary-nav');
    const toggle = document.getElementById('menuToggle');

    if (nav && toggle) {
        nav.classList.toggle('active');
        toggle.classList.toggle('active');
    }
};
window.toggleMenu = toggleMenu;

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
/**
 * Inicializa filtros y comportamiento de la página Roster.
 * Añade listener al select de posición si existe.
 * @method initRoster
 * @returns {void}
 */
const initRoster = () => {
    // Filtro de cards por posición
    const posFilter = document.getElementById("pos");
    if (posFilter) {
        posFilter.addEventListener("change", (e) => {
            const pos = e.target.value;
            document.querySelectorAll(".player-card").forEach((card) => {
                if (!pos || card.dataset.pos === pos) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }
};

// ===== CALENDARIO =====
/**
 * Inicializa el conteo y filtros de la página Calendario.
 * @method initCalendario
 * @returns {void}
 */
const initCalendario = () => {
    const total = document.querySelectorAll(".game-card").length;
    const countEl = document.getElementById("calCount");
    const emptyEl = document.getElementById("calEmpty");

    if (countEl) countEl.textContent = String(total);
    if (emptyEl) emptyEl.hidden = total > 0;


    // Filtrado por mes (funcionalidad adicional)
    const mesFilter = document.getElementById("mes");
    if (mesFilter) {
        mesFilter.addEventListener("change", (e) => {
            const mes = e.target.value;
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
};

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

/**
 * Carga el carrito desde localStorage (clave 'bullsCart') y actualiza la UI.
 * @method loadCart
 * @returns {void}
 */
const loadCart = () => {
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
};

/**
 * Guarda el carrito en localStorage (clave 'bullsCart').
 * @method saveCart
 * @returns {void}
 */
const saveCart = () => {
    localStorage.setItem('bullsCart', JSON.stringify(cart));
};

/**
 * Añade un producto al carrito o incrementa la cantidad si ya existe.
 * @method addToCart
 * @param {string} name Nombre del producto
 * @param {number} price Precio en unidades enteras (p.ej. 29999)
 * @returns {void}
 */
const addToCart = (name, price) => {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({name, price, quantity: 1});
    }
    saveCart();
    updateCartDisplay();
    // Eliminar la apertura automática del carrito
};
window.addToCart = addToCart;

// Exponer funciones usadas por handlers inline en HTML
window.removeFromCart = removeFromCart;
window.changeQuantity = changeQuantity;
window.clearCart = clearCart;
window.updateCartDisplay = updateCartDisplay;

/**
 * Elimina un producto del carrito por nombre.
 * @method removeFromCart
 * @param {string} name Nombre del producto a eliminar
 * @returns {void}
 */
const removeFromCart = (name) => {
    cart = cart.filter(item => item.name !== name);
    saveCart();
    updateCartDisplay();
    // Eliminar el cierre automático del carrito
};

/**
 * Cambia la cantidad de un producto en el carrito.
 * Si la cantidad llega a 0, elimina el producto.
 * @method changeQuantity
 * @param {string} name Nombre del producto
 * @param {number} change Incremento (+1) o decremento (-1)
 * @returns {void}
 */
const changeQuantity = (name, change) => {
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
};

/**
 * Vacía el carrito y elimina la entrada de localStorage.
 * @method clearCart
 * @returns {void}
 */
const clearCart = () => {
    cart = [];
    localStorage.removeItem('bullsCart');
    updateCartDisplay();
    // Eliminar el cierre automática del carrito
};

/**
 * Actualiza la interfaz del carrito: contador, lista de items y total.
 * Genera HTML para `#cartItems` usando handlers inline seguros.
 * @method updateCartDisplay
 * @returns {void}
 */
const updateCartDisplay = () => {
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
};

/**
 * Muestra la sección del carrito (proxy a toggleCart).
 * @method showCartSection
 * @returns {void}
 */
const showCartSection = () => toggleCart();

/**
 * Oculta la sección del carrito si está abierta.
 * @method hideCartSection
 * @returns {void}
 */
const hideCartSection = () => {
    if (cartOpen) {
        toggleCart();
    }
};

/**
 * Alterna el estado abierto/cerrado del sidebar del carrito y overlay.
 * @method toggleCart
 * @returns {void}
 */
const toggleCart = () => {
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
};
window.toggleCart = toggleCart;

// Función específica para cerrar el carrito
/**
 * Cierra el carrito y restaura el scroll del body.
 * @method closeCart
 * @returns {void}
 */
const closeCart = () => {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('cartOverlay');

    if (sidebar && overlay) {
        cartOpen = false;
        sidebar.classList.remove('open');
        overlay.classList.remove('open');
        document.body.style.overflow = '';
        console.log('Cart closed');
    }
};
window.closeCart = closeCart;

/**
 * Inicia el proceso de checkout: valida que haya items y redirige a checkout.html
 * @method checkout
 * @returns {void}
 */
const checkout = () => {
    if (cart.length === 0) {
        alert('El carrito está vacío');
        return;
    }
    // Guardar carrito y redirigir a checkout
    saveCart();
    window.location.href = 'checkout.html';
};
window.checkout = checkout;

// ===== SHOP FILTERS =====
/**
 * Inicializa filtros, búsqueda y ordenamiento en la página Shop.
 * @method initShop
 * @returns {void}
 */
const initShop = () => {
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

    /**
     * Normaliza texto para búsqueda: minúsculas, sin tildes y trim.
     * @method norm
     * @param {string} s Texto a normalizar
     * @returns {string} Texto normalizado
     */
    const norm = (s) =>
        (s || "")
            .toLowerCase()
            .normalize("NFD")
            .replace(/[ -\u036f]/g, "")
            .trim();

    /**
     * Comprueba si un precio pertenece al bucket seleccionado.
     * @method matchPrecio
     * @param {string|number} p Precio (string o number)
     * @param {string} bucket Identificador del bucket ('1','2','3' o '')
     * @returns {boolean} true si el precio entra en el bucket
     */
    const matchPrecio = (p, bucket) => {
        if (!bucket) return true;
        const n = Number(p);
        if (bucket === "1") return n <= 20000;
        if (bucket === "2") return n > 20000 && n <= 40000;
        if (bucket === "3") return n > 40000;
        return true;
    };

    const aplicar = () => {
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
    };

    const ordenar = () => {
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
    };

    [q, cat, talle, precio].forEach((el) =>
        el.addEventListener("input", aplicar)
    );
    orden.addEventListener("change", ordenar);

    aplicar(); // init
};

// ===== CHECKOUT =====
/**
 * Inicializa la página de checkout: muestra items desde localStorage
 * y configura el envío del formulario.
 * @method initCheckout
 * @returns {void}
 */
const initCheckout = () => {
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
        const m = value.match(/.{1,4}/g);
        e.target.value = m ? m.join(' ') : value;
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
};


// ===== Filtro de calendario (por mes y texto) =====
(() => {
    const list = document.getElementById("partidos");
    if (!list) return; // solo corre en calendario.html

    const selMes = document.getElementById("mes");
    const q = document.getElementById("q");
    const count = document.getElementById("calCount");
    const empty = document.getElementById("calEmpty");

    const items = Array.from(list.querySelectorAll(".game-card"));

    const normalizar = (str) =>
        (str || "").toLowerCase()
            .normalize("NFD").replace(/[\u0300-\u036f]/g, "") // quitar tildes
            .replace(/\s+/g, " ").trim();

    const aplicarFiltro = () => {
        const mes = (selMes && selMes.value) || "";               // "" o "10".."12","1".."4"
        const term = normalizar((q && q.value) || "");

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
    };

    if (selMes) selMes.addEventListener("change", aplicarFiltro);
    if (q) q.addEventListener("input", aplicarFiltro);

    // init
    aplicarFiltro();
})();
