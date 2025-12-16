import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import Footer from "../components/Footer";
import Formulario from "../components/Formulario";
import Navbar from "../components/Navbar";
import Terreno from "../components/Terreno";
import { usePropiedadesFilter } from "../hooks/usePropiedadesFilter";
import axios from "axios";
import BtnSalir from "../components/BtnSalir";

const API_URL = import.meta.env.VITE_API_URL;

const Inicio = () => {
  const [propiedades, setPropiedades] = useState([]);
  const { filteredPropiedades, filters, updateFilter } =
    usePropiedadesFilter(propiedades);

  useEffect(() => {
    const cargarPropiedades = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/propiedades/listar`);
        setPropiedades(response.data);
      } catch (error) {
        console.error("Error al cargar las propiedades:", error);
      }
    };
    cargarPropiedades();
  }, []);

  const hayFiltrosBusqueda = filters.busqueda.trim() !== "";
  const limpiarBusqueda = () => updateFilter("busqueda", "");

  return (
    <div
      id="body"
      className="m-0 box-border text-base bg-[#FEF7F2] h-fit w-full"
    >
      <header className="justify-center flex items-center w-full">
        <Navbar />
      </header>
      <main id="Propiedades" className="flex justify-center bg-[#FEF7F2] h-fit">
        <section className="relative py-[32px] max-w-[1468px] h-[100%] bg-[#FEF7F2] my-auto flex justify-center flex-col">
          <div className="relative w-[400px] mx-auto flex justify-center py-1 mb-10 items-center">
            <input
              type="text"
              placeholder="Buscar por ubicación, distrito o características..."
              value={filters.busqueda}
              onChange={(e) => updateFilter("busqueda", e.target.value)}
              className="border w-full rounded-md px-3 py-1"
            />
            {hayFiltrosBusqueda && (
              <button
                onClick={limpiarBusqueda}
                className="absolute right-[20px]"
              >
                <AiOutlineClose />
              </button>
            )}
          </div>
          <Terreno
            filteredPropiedades={filteredPropiedades}
            filters={filters}
            updateFilter={updateFilter}
          />
          <Formulario />
          <Footer />
        </section>

        <div className="fixed bottom-5 right-5">
          <a
            className="hover:bg-amber-400"
            href="https://wa.me/+51919527727?text=Hola%20quiero%20contactame%20contigo"
            target="_blank"
          >
            <img
              className="w-13 hover:w-15 transition-all duration-200"
              src="/img/whatsapp.png"
              alt="WhatsApp"
            />
          </a>
        </div>
      </main>
    </div>
  );
};

export default Inicio;
