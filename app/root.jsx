import {
  Meta,
  Links,
  Outlet,
  Scripts,
  LiveReload,
  useRouteError,
  isRouteErrorResponse,
  Link
} from '@remix-run/react'
import styles from './styles/index.css'
import Header from './components/header';
import Footer from './components/footer';
import { useEffect, useState } from 'react';

export function meta({ error }) {

  if (error?.status === 404) {
    return ([
      { title: `GuitarLA - Guitar not Found` },
      { description: `Contend not found` }
    ])
  }

  return [
    { charset: "utf-8" },
    { title: "GuitarLA - Remix" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
}

export function links() {
  return [
    {
      rel: 'stylesheet',
      href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossOrigin: "true"
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&display=swap'
    },
    {
      rel: 'stylesheet',
      href: styles
    }
  ]
}

export default function App() {

  //const carritoLS = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : null
  const [carrito, setCarrito] = useState([])

  useEffect(() => {
    if (carrito?.length === 0) return;
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  useEffect(() => {
    const carritoLS = JSON.parse(localStorage.getItem('carrito')) ?? [];
    setCarrito(carritoLS);
  }, []);

  const agregarCarrito = guitarra => {
    if (carrito.some(guitarraState => guitarraState.id === guitarra.id)) {
      const carritoActualizado = carrito.map(guitarraState => {
        if (guitarraState.id === guitarra.id) {
          guitarraState.cantidad = guitarra.cantidad
        }
        return guitarraState
      })
      setCarrito(carritoActualizado)
    } else {
      setCarrito([...carrito, guitarra])
    }
  }

  const actualizarCantidad = guitarra => {
    const carritoActualizado = carrito.map(guitarraState => {
      if (guitarraState.id === guitarra.id) {
        guitarraState.cantidad = guitarra.cantidad
      }
      return guitarraState
    })
    setCarrito(carritoActualizado)
  }

  const eliminarGuitarra = id => {
    const carritoActualizado = carrito.filter(guitarraState => guitarraState.id !== id)
    carritoActualizado.length === 0 && localStorage.setItem('carrito', '[]');
    setCarrito(carritoActualizado);
  }

  return (
    <Document>
      <Outlet
        context={{
          agregarCarrito,
          carrito,
          actualizarCantidad,
          eliminarGuitarra
        }}
      />
    </Document>

  )
}

function Document({ children }) {
  return (
    <html lang="es">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

/** Manejo de errores */
export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <Document>
        <p className='error'>{error.status} {error.statusText}</p>
        <Link className='error-enlace' to="/">Get back to Home</Link>
      </Document>
    )
  }

  return (
    <Document>
      <p className='error'>{error.status} {error.statusText}</p>
      <Link className='error-enlace' to="/">Get back to Home</Link>
    </Document>
  )
}