import { Link, useLocation } from "@remix-run/react"
import imagen from '../../public/img/carrito.png'

function Navegacion() {

  const location = useLocation()

  return (
    <nav className="navegacion">
      <Link
        to="/"
        className={location.pathname === '/' ? 'active' : ''}
      >
        Home
      </Link>
      <Link
        to="/nosotros"
        className={location.pathname === '/nosotros' ? 'active' : ''}
      >
        About us
      </Link>
      <Link
        to="/guitarras"
        className={location.pathname === '/guitarras' ? 'active' : ''}
      >
        Shop
      </Link>
      <Link
        to="/blogs"
        className={location.pathname === '/blogs' ? 'active' : ''}
      >
        Blog
      </Link>
      <Link
        to="/carrito"
      >
        <img src={imagen} alt="shopping cart" />
      </Link>
    </nav>
  )
}

export default Navegacion