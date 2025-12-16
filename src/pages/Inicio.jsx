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

  // const hayFiltrosBusqueda = Object.values(filters).some(value => value !== "");
  const hayFiltrosBusqueda = filters.busqueda.trim() !== "";
  const limpiarBusqueda = () => {
    updateFilter("busqueda", "");
  };

  return (
    <div id="body" class="m-0 box-border text-base bg-[#FEF7F2] h-fit w-full ">
      <header class="justify-center flex items-center w-full 2xl:w-full xl:w-[100%] lg:w-[100%] md:w-[100%] sm:w-[100%] ">
        <Navbar />
      </header>
      <main id="Propiedades" class=" flex justify-center bg-[#FEF7F2] h-fit">
        <section class="relative py-[32px] max-w-[1468px] h-[100%] bg-[#FEF7F2] my-auto flex justify-center flex-col xl:px-[64px] xl:mx-[20px] lg:px-[16px] lg:mx-[20px] 2xl:w-full 2xl:justify-center md:px-[35px] md:mx-[35px] md:items-center sm:px-[35px] sm:mx-[35px] 2xl:mx-auto">
          <div class="relative max-w-[100%] w-[400px] mx-auto max-h-[48px] flex justify-center py-1 mb-10 items-center 2xl:px-0  xl:w-[100%] xl:px-0 md:px-0 md:w-[100%] lg:w-full bg-[#FEF7F2] lg:px-0 2xl:w-full  sm:w-full">
            <input
              type="text"
              placeholder="Buscar por ubicación, distrito o características..."
              value={filters.busqueda}
              onChange={(e) => updateFilter("busqueda", e.target.value)}
              class="  file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input w-full min-w-0 rounded-md border bg-transparent px-3 py-1 shadow-xs transition-[color,box-shadow] outline-1 file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-md file:font-medium disabled:pointer-events-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-[#8a3a13] focus-visible:ring-[#8a3a13]/50 focus-visible:ring-[5px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive !pl-5 !h-10 text-base"
            />
            {hayFiltrosBusqueda && (
              // text-sm !text-black-500 font-thin w-fit !px-[10px] !py-[5px] hover:shadow-sm hover:rounded-xl hover:border !hover:bg-green-700 flex justify-between gap-2 items-center
              <button onClick={limpiarBusqueda} class="absolute right-[20px] ">
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

        <div class=" fixed  bottom-5 right-5 ">
          <a
            class="!hover:bg-amber-400"
            href="https://wa.me/+51919527727?text=Hola%20quiero%20contactame%20contigo"
            target="_blank"
          >
            <img
              class="w-13 hover:w-15 transition-all duration-200"
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
