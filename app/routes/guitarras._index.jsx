import { useLoaderData } from "@remix-run/react";
import { getGuitarras } from "../models/guitarras.server";
import ListadoGuitarras from "../components/listado-guitarras";

export function meta() {
  return [
    { title: "GuitarLA - Guitar Shops" },
    { description: "Our Guitar Collection" },
  ];
}

export async function loader() {
  const guitarras = await getGuitarras()
  return guitarras.data
}

function Tienda() {

  const guitarras = useLoaderData()

  return (
    <ListadoGuitarras
      guitarras={guitarras}
    />
  )
}

export default Tienda