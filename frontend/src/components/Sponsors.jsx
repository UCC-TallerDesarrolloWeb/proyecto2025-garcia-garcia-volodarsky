import moto from '@assets/sponsors/logo-motorola.jpg'
import nike from '@assets/sponsors/logo-nike.jpg'
import foot from '@assets/sponsors/logo-FootLocker.jpg'

const Sponsors = () => {
  return (
  <section className="sponsors" aria-label="Sponsors">
      <h2>Nuestros Sponsors</h2>
      <div className="sponsors-grid">
        <figure className="sponsor">
          <img src={moto} alt="Motorola" />
        </figure>
        <figure className="sponsor">
          <img src={nike} alt="Nike" />
        </figure>
        <figure className="sponsor">
          <img src={foot} alt="Foot Locker" />
        </figure>
      </div>
    </section>
  )
}

export default Sponsors
