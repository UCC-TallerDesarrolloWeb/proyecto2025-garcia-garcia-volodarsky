import { useEffect, useState } from "react";
import { formatCurrency } from "@utils/format.js";
import "@styles/store.scss";

const Store = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const BASE_URL = "https://localhost:4000/productos";

  const fetchProducts = async () => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(`Error al realizar un get en el servicio: ${error}`);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

const cerrarModal = () => {
    setSelected(null);
}

  return (
    <>
    <h2>Tienda</h2>
    <section className="store">
      {products.map((prod, id) => (
        <div key={id} className="cardProduct">
          <h3>{prod.name}</h3>
          <img src={`/store/${prod.image}`} alt={prod.name} />
          <p>{formatCurrency(prod.price)}</p>
          <button onClick={() => setSelected(prod)}>Ver detalle</button>
        </div>
      ))}
    </section>

    {selected && <div className="modalProd">
        <h2>
            detalle del producto
        </h2>
        <p>Producto seleccionado: {selected.name}</p>
        <button onClick={cerrarModal}>Cerrar</button>
    </div>}
    </>
  )
}

export default Store;
