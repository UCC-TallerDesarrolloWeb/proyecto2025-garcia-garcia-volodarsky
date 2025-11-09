import React from "react";
import "@styles/Nosotros.scss";
import chicagoImg from "@assets/nosotros/chicago.jpg";
import estadio1 from "@assets/nosotros/estadio1.webp";
import estadio2 from "@assets/nosotros/estadio2.jpg";
import estadio4 from "@assets/nosotros/estadio4.webp";

const Nosotros = () => {
  return (
    <main className="container nosotros">
      <header className="n-head">
        <h1>Nuestro ADN</h1>
        <p className="lead">
            Esta página está pensada para acercar la historia del equipo, la
            ciudad y su estadio a los fans hispanohablantes, celebrando tanto sus
            grandes momentos como su presente en la liga. Aquí encontrarás
            información sobre sus raíces, íconos, cultura y logros, todo en un
            solo lugar para que vivas la experiencia Bulls.
        </p>
      </header>

      <section className="panel">
        <h2 className="section-title">Chicago</h2>
        <p className="text">
            Chicago, Illinois es una ciudad vibrante situada a orillas del Lago
            Míchigan, reconocida por su imponente arquitectura, sus museos,
            teatros y festivales que la convierten en un centro cultural de
            Estados Unidos. La gastronomía, y su fuerte identidad deportiva la
            hacen única. Además, es el hogar de los legendarios Chicago Bulls,
            símbolo de pasión y orgullo para la ciudad.
        </p>
        <figure className="hero-figure">
          <img
            src={chicagoImg}
            alt="Skyline de Chicago al atardecer"
            loading="lazy"
          />
          <figcaption>Vista de la ciudad.</figcaption>
        </figure>
      </section>

      <section className="panel">
        <h2 className="section-title">United Center</h2>
        <p className="text">
          {" "}
          El United Center, inaugurado en 1994, es el estadio actual de los
          Chicago Bulls y uno de los recintos deportivos más emblemáticos de
          Estados Unidos. Con capacidad para más de 20.000 espectadores, es
          conocido como “la casa que construyó Jordan”, ya que fue inaugurado en
          plena era dorada del equipo liderado por Michael Jordan. Además de ser
          el hogar de los Bulls y de los Chicago Blackhawks de la NHL, el United
          Center alberga conciertos, espectáculos y eventos internacionales,
          convirtiéndose en un verdadero centro de entretenimiento para la
          ciudad.
        </p>
        <div className="gallery-3">
          <figure className="foto-card">
            <img
              src={estadio1}
              alt="Vista aérea del United Center"
              loading="lazy"
            />
            <figcaption>UNITED CENTER</figcaption>
          </figure>
          <figure className="foto-card">
            <img
              src={estadio2}
              alt="Interior del United Center durante un partido"
              loading="lazy"
            />
            <figcaption>CITY EDITION</figcaption>
          </figure>
          <figure className="foto-card">
            <img
              src={estadio4}
              alt="Cancha del United Center con logo en el centro"
              loading="lazy"
            />
            <figcaption>GAME DAY</figcaption>
          </figure>
        </div>
      </section>

      <div id="sponsors"></div>
    </main>
  );
};

export default Nosotros;
