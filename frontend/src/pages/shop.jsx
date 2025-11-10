import { useEffect, useState } from "react";
import "@styles/shop.scss";
import { useCart } from "@components/CartContext";
import { getProducts } from "@api/productApi";
import Button from "@components/Button";

const logo = "/logo-bulls.png";

const norm = (s) =>
  (s || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .trim();

const matchPrecio = (p, bucket) => {
  if (!bucket) return true;
  const n = Number(p);
  if (bucket === "1") return n <= 20000;
  if (bucket === "2") return n > 20000 && n <= 40000;
  if (bucket === "3") return n > 40000;
  return true;
};

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [talle, setTalle] = useState("");
  const [precio, setPrecio] = useState("");
  const [orden, setOrden] = useState("");

  const { addToCart } = useCart();

  const assets = import.meta.glob("/src/assets/**", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const resolveImage = (name) => {
    if (!name) return null;
    const key = Object.keys(assets).find((k) => k.endsWith(name));
    return key ? assets[key] : logo;
  };

  useEffect(() => {
    let mounted = true;
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        if (!mounted) return;
        // getProducts may return an array or an object
        if (Array.isArray(res)) setProducts(res);
        else setProducts(res.productos || res.products || []);
      } catch (e) {
        console.error("Error loading products", e);
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    document.body.classList.add("shop-page");
    return () => document.body.classList.remove("shop-page");
  }, []);

  const cerrarModal = () => setSelected(null);

  const term = norm(q);
  let visibles = products.filter((card) => {
    const txt = norm(card.name + " " + (card.description || ""));
    const okText = !term || txt.includes(term);
    const okCat = !cat || card.category === cat;
    const sizes = (card.size || "").split(",");
    const okSize = !talle || sizes.includes(talle);
    const okPrice = matchPrecio(card.price, precio);
    return okText && okCat && okSize && okPrice;
  });

  if (orden) {
    visibles = visibles.sort((a, b) => {
      if (orden === "price-asc") return a.price - b.price;
      if (orden === "price-desc") return b.price - a.price;
      if (orden === "name-asc") return a.name.localeCompare(b.name);
      if (orden === "name-desc") return b.name.localeCompare(a.name);
      return 0;
    });
  }

  return (
    <>
      <h1>Shop Chicago Bulls</h1>

      <form className="shop-filters" onSubmit={(e) => e.preventDefault()}>
        <input
          type="search"
          id="qShop"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar…"
        />
        <select
          id="catShop"
          value={cat}
          onChange={(e) => setCat(e.target.value)}
        >
          <option value="">Categoría</option>
          <option value="camiseta">Camiseta</option>
          <option value="gorra">Gorra</option>
        </select>
        <select
          id="talleShop"
          value={talle}
          onChange={(e) => setTalle(e.target.value)}
        >
          <option value="">Talle</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="U">U</option>
        </select>
        <select
          id="precioShop"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        >
          <option value="">Precio</option>
          <option value="1">Hasta $20.000</option>
          <option value="2">$20.001 – $40.000</option>
          <option value="3">Más de $40.000</option>
        </select>
        <select
          id="ordenShop"
          value={orden}
          onChange={(e) => setOrden(e.target.value)}
        >
          <option value="">Orden</option>
          <option value="price-asc">Precio (↑)</option>
          <option value="price-desc">Precio (↓)</option>
          <option value="name-asc">Nombre (A–Z)</option>
          <option value="name-desc">Nombre (Z–A)</option>
        </select>
      </form>

      <section className="shop-grid">
        {visibles.map((prod) => (
          <div key={prod.id} className="prod-card">
            <div className="prod-img">
              {prod.image && (
                <img src={resolveImage(prod.image) || ""} alt={prod.name} />
              )}
            </div>

            <h3 className="prod-title">{prod.name}</h3>

            <p className="prod-desc">{prod.description}</p>

            <div className="prod-meta">
              <div className="prod-price">
                {prod.price ? "$ " + prod.price.toLocaleString() : ""}
              </div>
              <div className="prod-actions">
                <Button variant="primary" onClick={() => addToCart(prod)}>
                  Agregar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {selected && (
        <div className="modalProd">
          <h2>Detalle del producto</h2>
          <p>{selected.name}</p>
          <p>{selected.description}</p>
          <p>{selected.price ? "$ " + selected.price.toLocaleString() : ""}</p>
          <button
            onClick={() => {
              addToCart(selected);
              cerrarModal();
            }}
          >
            Agregar y cerrar
          </button>
          <button onClick={cerrarModal}>Cerrar</button>
        </div>
      )}
    </>
  );
};

export default Shop;
