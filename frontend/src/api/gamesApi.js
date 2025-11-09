const BASE_URL = "http://localhost:4000/games";

export async function getGames() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw Error("Error al obtener el calendario de juegos");
  return res.json();
}