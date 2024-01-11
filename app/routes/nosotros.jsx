import imagen from '../../public/img/nosotros.jpg'
import styles from '../styles/nosotros.css'

export function meta() {
  return [
    { title: "GuitarLA - About Us" },
    { description: "Guitar sales, music blog" },
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: styles
    },
    {
      rel: 'preload',
      href: imagen,
      as: 'image'
    }
  ]
}

function Nosotros() {

  return (
    <main className='contenedor nosotros'>
      <h2 className='heading'>Nosotros</h2>

      <div className='contenido'>
        <img src={imagen} alt='About us Image' />

        <div>
          <p>Lorem inpus inpus that doesnt work at all, because the page have to many advertisings</p>
          <p>Lorem inpus Two inpus that doesnt work at all, because the page have to many advertisings</p>
        </div>
      </div>
    </main>
  )
}

export default Nosotros