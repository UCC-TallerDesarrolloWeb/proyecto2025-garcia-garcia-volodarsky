import { useEffect, useState } from "react";
import "@styles/Calendario.scss";
import { getGames } from "@api/gamesApi";

const MONTH_NAMES = [
  "ENE",
  "FEB",
  "MAR",
  "ABR",
  "MAY",
  "JUN",
  "JUL",
  "AGO",
  "SEP",
  "OCT",
  "NOV",
  "DIC",
];

const Calendario = () => {
  const [games, setGames] = useState([]);
  const [month, setMonth] = useState("");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getGames();
        if (!mounted) return;
        setGames(Array.isArray(data) ? data : data.games || []);
      } catch (err) {
        console.error("Error al obtener games desde la API", err);
        setGames([]);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const onMonthChange = (e) => {
    setMonth(e.target.value);
  };

  const filtered = games.filter((g) => {
    if (!month) return true;
    // date tiene formato YYYY-MM-DD
    const d = new Date(g.date);
    const m = d.getMonth() + 1;
    return String(m) === String(month);
  });

  return (
    <main className="container">
      <section
        id="calendario"
        className="cal-listing"
        aria-labelledby="titulo-cal"
      >
        <h1 id="titulo-cal">Partidos de la temporada</h1>

        <form
          className="cal-filters"
          action="#"
          method="get"
          aria-label="Filtrar partidos"
        >
          <label htmlFor="mes">Mes</label>
          <select id="mes" name="mes" onChange={onMonthChange} value={month}>
            <option value="">Todos</option>
            <option value="1">Enero</option>
            <option value="2">Febrero</option>
            <option value="3">Marzo</option>
            <option value="4">Abril</option>
            <option value="5">Mayo</option>
            <option value="6">Junio</option>
            <option value="7">Julio</option>
            <option value="8">Agosto</option>
            <option value="9">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </form>

        <p className="cal-count" aria-live="polite">
          Mostrando <span id="calCount">{filtered.length}</span> partidos
        </p>

        <ul id="partidos" className="games-list">
          {filtered.length === 0 && (
            <p id="calEmpty" className="cal-empty">
              No hay partidos que coincidan con el filtro.
            </p>
          )}
          {filtered.map((g) => {
            const d = new Date(g.date);
            const day = String(d.getDate()).padStart(2, "0");
            const mon = MONTH_NAMES[d.getMonth()];
            // intentar obtener abreviatura del opponent (últimas 3 letras en mayúsc)
            const oppAbbr = (g.opponent || "")
              .split(" ")
              .map((w) => w[0])
              .slice(0, 3)
              .join("")
              .toUpperCase();
            const dataMonth = d.getMonth() + 1;

            return (
              <li className="game-card" data-month={dataMonth} key={g.id}>
                <div className="game-left">
                  <div className="game-date">
                    <span className="day">{day}</span>
                    <span className="mon">{mon}</span>
                  </div>
                  <div className="game-vs">
                    <strong>CHI</strong> <span className="vs">vs</span>{" "}
                    <span className="opp">{oppAbbr || g.opponent}</span>
                  </div>
                  <span className="team-names">
                    Chicago Bulls - {g.opponent}
                  </span>
                </div>
                <div className="game-right">
                  <span className="meta">{g.venue}</span>{" "}
                  <span className="separator">-</span>{" "}
                  <span className="time">{g.time}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div id="sponsors"></div>
      </section>
    </main>
  );
};

export default Calendario;
