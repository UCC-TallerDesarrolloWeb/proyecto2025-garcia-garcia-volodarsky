const BASE_URL = "http://localhost:4000/productos";

export async function getProducts() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw Error("Error al obtener el catalogo de productos");
  return res.json();
}