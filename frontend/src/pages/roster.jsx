import { useEffect, useState } from "react";
const logo = "/logo-bulls.png";
import "@styles/Roster.scss";
import { getPlayers } from "@api/playersApi";

const Roster = () => {
  const [players, setPlayers] = useState([]);
  const [pos, setPos] = useState("");

  const assets = import.meta.glob("/src/assets/**", {
    eager: true,
    query: "?url",
    import: "default",
  });
  const resolveImage = (name) => {
    if (!name) return logo;
    const key = Object.keys(assets).find((k) => k.endsWith(name));
    return key ? assets[key] : logo;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getPlayers();
        if (mounted)
          setPlayers(Array.isArray(data) ? data : data.players || []);
      } catch (err) {
        console.error("Error al obtener players desde la API", err);
        if (mounted) setPlayers([]);
      }
    })();
    return () => (mounted = false);
  }, []);

  const filtered = players.filter((p) => (pos ? p.position === pos : true));

  return (
    <main className="container">
      <section id="roster" className="roster" aria-labelledby="titulo-roster">
        <h1 id="titulo-roster">Roster</h1>
        <p className="roster-legend">
          <strong>Posiciones:</strong> Base · Escolta · Alero · Ala-Pívot ·
          Pívot · Entrenador
        </p>

        <form
          className="roster-filters"
          onSubmit={(e) => e.preventDefault()}
          aria-label="Filtrar roster"
        >
          <label htmlFor="pos">Filtrar por posición</label>
          <select
            id="pos"
            name="pos"
            value={pos}
            onChange={(e) => setPos(e.target.value)}
          >
            <option value="">Todas</option>
            <option value="Base">Base</option>
            <option value="Escolta">Escolta</option>
            <option value="Alero">Alero</option>
            <option value="Ala-Pívot">Ala-Pívot</option>
            <option value="Pívot">Pívot</option>
            <option value="Entrenador">Entrenadores</option>
          </select>
        </form>

        <div className="roster-grid" id="rosterGrid">
          {filtered.length === 0 && (
            <p className="cal-empty">No hay jugadores para esa posición.</p>
          )}
          {filtered.map((pl) => (
            <article
              className="card player-card"
              data-pos={pl.position}
              key={pl.id}
            >
              <img
                src={resolveImage(pl.img)}
                alt={pl.name}
                className="card-img"
              />
              <h3 className="card-title">
                {pl.name}
                {pl.number ? ` #${pl.number}` : ""}
              </h3>
              <ul className="card-info">
                <li>
                  <strong>Posición:</strong> {pl.position}
                </li>
                {pl.height && (
                  <li>
                    <strong>Altura:</strong> {pl.height}
                  </li>
                )}
                {pl.weight && (
                  <li>
                    <strong>Peso:</strong> {pl.weight}
                  </li>
                )}
                {pl.age && (
                  <li>
                    <strong>Edad:</strong> {pl.age}
                  </li>
                )}
                {pl.nationality && (
                  <li>
                    <strong>Nacionalidad:</strong> {pl.nationality}
                  </li>
                )}
                {pl.bio && (
                  <li>
                    <strong>Bio:</strong> {pl.bio}
                  </li>
                )}
                {pl.stats && (
                  <li>
                    <strong>Stats:</strong> PTS {pl.stats.pts} · REB{" "}
                    {pl.stats.reb} · AST {pl.stats.ast}
                  </li>
                )}
              </ul>
            </article>
          ))}
        </div>

        <div id="sponsors"></div>
      </section>
    </main>
  );
};

export default Roster;
