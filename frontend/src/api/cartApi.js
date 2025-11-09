const BASE_URL = "http://localhost:4000/cart";

//POST
export async function addToCart(product) {
  //1) Primero verificamos si el producto ya existe en el carrito
  const res = await fetch(`${BASE_URL}?productId=${product.id}`);
  const data = await res.json();

  if (data.length > 0) {
    //Si el producto ya existe, incrementamos la cantidad
    await updateQty(data[0].id, data[0].qty + 1);
  } else {
    //Si el producto no existe, lo agregamos al carrito
    const newItem = {
      productId: product.id,
      name: product.name,
      price: product.price,
      qty: 1,
      image: product.image,
    };

    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem),
    });

    if (!res.ok) throw new Error("Erro al agregar al carrito");
    console.log(`Producto agregado al carrito ${newItem}`);
    return res.json();
  }
}

//GET
export async function getCart() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw Error("Error al obtener el carrito");
  return res.json();
}

//DELETE
export async function removeFromCart(cartItemId) {
  const res = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar del carrito");
  return true;
}

//UPDATE
export async function updateQty(cartItemId, qty) {
  const res = await fetch(`${BASE_URL}/${cartItemId}`, {
    method: "PATCH",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify({ qty }),
  });
  if (!res.ok) throw new Error("Error al modificar el carrito");
  return true;
}