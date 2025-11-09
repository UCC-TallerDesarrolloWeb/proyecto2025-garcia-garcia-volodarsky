import React from 'react'
import '@styles/Historia.scss'
import jordanImg from '@assets/historia/jordan.jpg'
import pippenImg from '@assets/historia/pippen.jpg'
import rodmanImg from '@assets/historia/rodman.webp'

const Historia = () => {
  return (
    <main className="container historia">
      <header className="page-header">
        <h1>Historia de los Chicago Bulls</h1>
        <p className="lead">Un recorrido por los hitos del equipo: desde los inicios hasta la dinastía de los 90s.</p>
      </header>

      <section className="timeline" aria-labelledby="titulo-cronologia">
        <h2 id="titulo-cronologia">Cronología de hitos</h2>
        <article className="t-item"><div className="t-year">1966</div><div className="t-card"><h3>Fundación del equipo</h3><p>Nacen los Chicago Bulls y debutan oficialmente en la NBA.</p></div></article>
        <article className="t-item"><div className="t-year">1984</div><div className="t-card"><h3>Llegada de Michael Jordan</h3><p>Un draft histórico que cambia el destino de la franquicia.</p></div></article>
        <article className="t-item"><div className="t-year">1991–1993</div><div className="t-card"><h3>Primer three-peat</h3><p>Tres campeonatos consecutivos bajo el liderazgo de MJ, Pippen y Phil Jackson.</p></div></article>
        <article className="t-item"><div className="t-year">1996–1998</div><div className="t-card"><h3>Segundo three-peat</h3><p>Regreso triunfal de MJ y consolidación de una dinastía irrepetible.</p></div></article>
        <article className="t-item"><div className="t-year">Siglo XXI</div><div className="t-card"><h3>Nuevas etapas</h3><p>Renovaciones, jóvenes talentos y momentos memorables para nuevas generaciones.</p></div></article>
      </section>

      <section className="figuras" aria-labelledby="titulo-figuras">
        <h2 id="titulo-figuras">Figuras históricas</h2>
        <div className="figuras-grid">
          <figure className="fig-card"><img src={jordanImg} alt="Michael Jordan levantando un trofeo" /><figcaption><h3>Michael Jordan</h3><p>MVP múltiples veces y emblema de la franquicia.</p></figcaption></figure>
          <figure className="fig-card"><img src={pippenImg} alt="Scottie Pippen, el escudero de Jordan" /><figcaption><h3>Scottie Pippen</h3><p>Versatilidad, defensa de élite y cerebro del equipo.</p></figcaption></figure>
          <figure className="fig-card"><img src={rodmanImg} alt="Dennis Rodman capturando un rebote" /><figcaption><h3>Dennis Rodman</h3><p>Trabajo sucio, dominio absoluto del rebote y energía inagotable.</p></figcaption></figure>
        </div>
      </section>

      <section className="trophies" aria-labelledby="titulo-trophies">
        <h2 id="titulo-trophies">Títulos y logros</h2>
        <ul className="trophies-list" role="list">
          <li className="trophy">
            <div className="t-num">6</div>
            <div className="t-label">Campeonatos NBA</div>
          </li>
          <li className="trophy">
            <div className="t-num">33</div>
            <div className="t-label">Presencias en Playoffs</div>
          </li>
          <li className="trophy">
            <div className="t-num">6</div>
            <div className="t-label">Finales ganadas (invictos en finales)</div>
          </li>
        </ul>
      </section>

      <section className="quote" aria-labelledby="titulo-cita">
        <h2 id="titulo-cita" className="visually-hidden">Cita destacada</h2>
        <blockquote>
          <p>“El talento gana partidos, pero el trabajo en equipo y la inteligencia ganan campeonatos.”</p>
          <footer>— Michael Jordan</footer>
        </blockquote>
      </section>

      <section className="faq" aria-labelledby="titulo-faq">
        <h2 id="titulo-faq">Preguntas frecuentes</h2>

        <details className="faq-item">
          <summary>¿Cuándo se fundaron los Bulls?</summary>
          <p>En 1966. Fueron el tercer equipo de la ciudad de Chicago en la NBA.</p>
        </details>

        <details className="faq-item">
          <summary>¿Cuántos campeonatos tienen?</summary>
          <p>Seis títulos de la NBA (1991–1993 y 1996–1998).</p>
        </details>

        <details className="faq-item">
          <summary>¿Quiénes integraron el núcleo de la dinastía?</summary>
          <p>Michael Jordan, Scottie Pippen, Dennis Rodman, con Phil Jackson como entrenador.</p>
        </details>
      </section>

      <div id="sponsors"></div>
    </main>
  )
}

export default Historia
