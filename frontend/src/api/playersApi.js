const BASE_URL = "http://localhost:4000/players";

export async function getPlayers() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw Error("Error al obtener el roster del equipo");
  return res.json();
}