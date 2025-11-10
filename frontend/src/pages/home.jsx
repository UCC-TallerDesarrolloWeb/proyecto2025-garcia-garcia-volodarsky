import Button from "@components/Button";
import newsDraft from "@assets/news/noticia-draft-landon-olbrich.jpg";
import newsDonovan from "@assets/news/Noticia-BillyDonovan2025-2026.jpg";
import newsUniform from "@assets/news/Noticia-nuevouniforme.jpg";

const Home = () => {
  return (
    <>
      <section id="home-hero" className="hero">
        <h1>Chicago Bulls</h1>
      </section>

      <section id="noticias" className="news-3up">
        <h2 className="visually-hidden">Noticias</h2>
        <div className="news-grid">
          <article className="news-card">
            <img src={newsDraft} alt="Draft 2025" className="img" />
            <h3>Los Bulls seleccionan a Lachlan Olbrich en el Draft 2025</h3>
            <p>
              En el segundo round del Draft 2025, los Bulls hicieron un
              movimiento: intercambiaron el pick No. 45 con los Lakers para
              obtener el pick No. 55, con el que seleccionaron al interno
              australiano Lachlan Olbrich. Este jugador aporta altura (6'10") y
              se une al proyecto joven del equipo.
            </p>
          </article>
          <article className="news-card">
            <img src={newsDonovan} alt="Billy Donovan" className="img" />
            <h3>
              Billy Donovan seguirá como entrenador de los Bulls en 2025-26
            </h3>
            <p>
              A pesar del interés de otros equipos, como los New York Knicks,
              los Bulls rechazaron que entrevistaran a Billy Donovan. Se espera
              que Donovan continúe al frente del equipo en la temporada 2025-26.
            </p>
          </article>
          <article className="news-card">
            <img src={newsUniform} alt="Nuevo uniforme" className="img" />
            <h3>
              Chicago Bulls anuncia nuevo uniforme Statement con rayas rojas
              para la temporada 2025-26
            </h3>
            <p>
              Los Bulls revelaron su diseño "Statement Edition" para 2025-26
              inspirado en sus uniformes con rayas rojas de 1995-97. El nuevo
              uniforme combina elementos clásicos (rayas, diseño de diamante en
              los costados de los pantalones) con detalles modernos: tiene
              palabra "Chicago" en el pecho, ribetes rojos y negros, y estrellas
              del escudo de Chicago en la cintura del short.
            </p>
          </article>
        </div>
      </section>

      <section id="proximo-partido" className="next-game">
        <h2 className="section-title">Próximo partido</h2>
        <div className="next-game-card">
          <div className="teams">
            <div className="team">
              <div className="badge">CHI</div>
              <span>Chicago Bulls</span>
            </div>
            <div className="vs">vs</div>
            <div className="team">
              <div className="badge alt">LAL</div>
              <span>Los Angeles Lakers</span>
            </div>
          </div>
          <div className="meta">
            <p className="date">Sáb 12 Oct · 21:00</p>
            <p className="venue">United Center</p>
          </div>
          <Button to="/calendario" variant="primary">
            Más partidos
          </Button>
        </div>
      </section>

      <section className="home-actions">
        <div className="actions-row">
          <Button to="/roster" variant="primary">
            Roster
          </Button>
          <Button to="/calendario" variant="primary">
            Calendario
          </Button>
          <Button to="/historia" variant="primary">
            Historia
          </Button>
          <Button to="/nosotros" variant="primary">
            Nosotros
          </Button>
          <Button to="/shop" variant="primary">
            Shop
          </Button>
        </div>
      </section>
    </>
  );
};

export default Home;
