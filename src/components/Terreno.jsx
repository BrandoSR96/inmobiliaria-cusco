import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import React from "react";
import { AiOutlineClose } from "react-icons/ai";
// import { usePropiedadesFilter } from "../hooks/usePropiedadesFilter";
import {
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import Carousel from "./Carousel";
const API_URL = import.meta.env.VITE_API_URL;
const ENV = import.meta.env.VITE_API_URL;

const Terreno = ({ filteredPropiedades, filters, updateFilter }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] = React.useState("inside");
  console.log(setScrollBehavior);

  const btnRef = React.useRef(null);

  const [propiedades, setPropiedades] = useState([]);
  console.log(propiedades);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(50);
  const [direction, setDirection] = useState("asc");
  const [totalPages, setTotalPages] = useState(0);

  console.log(setSize, setDirection);

  const hayFiltrosActivos = Object.entries(filters).some(
    ([key, value]) => key !== "busqueda" && value !== ""
  );

  const limpiarFiltros = () => {
    updateFilter("tipo", "");
    updateFilter("estado", "");
    updateFilter("precioMin", "");
    updateFilter("precioMax", "");
    updateFilter("areaMin", "");
    updateFilter("areaMax", "");
    updateFilter("distrito", "");
  };

  const cargarPropiedadesPage = useCallback(async () => {
    try {
      setLoading(true);

      const response = await axios.get(`${API_URL}/api/propiedades/paginadas`, {
        params: {
          page,
          size,
          sortBy: "precio",
          direction,
        },
      });
      setPropiedades(response.data.content || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("❌ Error al listar propiedades:", error);
    } finally {
      setLoading(false);
    }
  }, [page, size, direction]); //, tipo, estado, precioMin, precioMax, areaMin, areaMax, distrito

  useEffect(() => {
    cargarPropiedadesPage();
  }, [cargarPropiedadesPage]);

  const [selectedProp, setSelectedProp] = useState(null);

  if (loading) return <p class="text-center p-8">Cargando propiedades...</p>;

  return (
    <div class="grid gap-6 bg-[#FEF7F2] 2xl:w-full 2xl:grid-cols-[280px_1fr] 2xl:gap-6 xl:grid-cols-[280px_1fr] xl:px-0 lg:px-0  2xl:px-0 lg:grid-cols-[280px_1fr] md:grid-cols-1 sm:grid-cols-1  lg:w-full lg:px-auto justify-center items-center md:w-full">
      <section class="lg:sticky w-full top-4 self-start h-fit bg-white p-0 rounded-lg shadow-md mb-[45px]">
        <div class=" w-full md:w-[100%] sm:w-[100%] xs:w-[100%] 2xl:w-[280px] lg:w-[280px] bg-white rounded-xl border p-4 shadow-sm overflow-hidden hover:shadow-lg transition-shadow flex flex-col gad-4 ">
          <div class="pb-4 text-lg flex justify-between items-center flex-row ">
            <p class="font-semibold text-[22px]">Filtros</p>
            {hayFiltrosActivos && (
              <button
                onClick={limpiarFiltros}
                className="flex justify-between text-[10px] gap-[5px] text-black  items-center !text-black-500 w-fit font-sans !px-[8px] !py-[3px] hover:shadow-sm hover:rounded-xl hover:border hover:!text-white hover:font-semibold hover:gap-[5px] hover:!bg-green-700"
              >
                <AiOutlineClose class="text-black-600 hover:font-extrabold hover:text-white" />{" "}
                Limpiar Filtros
              </button>
            )}
          </div>
          <div class="pb-4">
            <label
              htmlFor="opciones"
              class="text-[15px] font-sans font-semibold"
            >
              Tipo de Terreno{" "}
            </label>
            <div class="pt-2 text-[15px] w-fit">
              <select
                placeholder="Todos"
                id="tipo"
                // !appearance-none md:w-[95px] sm:w-[95px] !py-[5px] !px-[8px]
                class="!border !border-gray-400 rounded-md w-fit bg-transparent h-[36px] content-start flex items-center justify-center !px-[8px]"
                value={filters.tipo}
                onChange={(e) => updateFilter("tipo", e.target.value)}
              >
                <option value="" class="text-[15px] w-fit ">
                  Todos
                </option>
                <option value="TERRENO_URBANO" class="text-[15px] w-fit ">
                  Urbano
                </option>
                <option value="TERRENO_AGRICOLA" class="text-[15px] w-fit ">
                  Agrícola
                </option>
                <option value="LOTIZACIÓN" class="text-[15px] w-fit ">
                  Lotización
                </option>
              </select>
            </div>
          </div>
          <div class="pb-4">
            <label
              htmlFor="opciones1"
              class="font-sans font-semibold text-[15px]"
            >
              Estados
            </label>
            <div class="pt-2 text-[15px] w-fit">
              <select
                placeholder="Todos"
                id="estado"
                // !appearance-none sm:w-[95px] md:w-[95px] !py-[5px] !px-[10px]
                class="!border !border-gray-400 rounded-md w-fit bg-transparent h-[36px] content-start flex items-center justify-center !px-[8px]"
                value={filters.estado}
                onChange={(e) => updateFilter("estado", e.target.value)}
              >
                <option value="" class="text-[15px] w-50px">
                  Todos
                </option>
                <option value="DISPONIBLE" class="text-[15px] w-fit">
                  Disponible
                </option>
                <option value="RESERVADO" class="text-[15px] w-fit">
                  Reservado
                </option>
                <option value="VENDIDO" class="text-[15px] w-fit">
                  Vendido
                </option>
              </select>
            </div>
          </div>
          <div class="pb-4">
            <label htmlFor="" class="font-sans font-semibold text-[18px]">
              Rango
            </label>{" "}
            <br />
            <div class="grid grid-cols-2 gap-2 pt-2 md:gap-[30px] sm:gap-[30px]">
              <input
                type="number"
                placeholder="Mínimo"
                class="!border !border-gray-500 !appearance-none rounded-md h-[36px] !py-[5px] !px-[8px]"
                // class="border rounded px-3 py-1 h-[30px] "
                value={filters.precioMin}
                onChange={(e) => updateFilter("precioMin", e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder="Máximo"
                // class="border rounded px-3 py-1 h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.precioMax}
                onChange={(e) => updateFilter("precioMax", e.target.value)}
                min={0}
              />
            </div>
          </div>

          <div class="pb-4">
            <label
              htmlFor="areaMax"
              class="font-sans font-semibold text-[18px]"
            >
              Área (m²)
            </label>{" "}
            <br />
            <div class="grid grid-cols-2 gap-2 pt-2 md:gap-[30px] sm:gap-[30px]">
              <input
                type="number"
                placeholder="Mínimo"
                // class=" border rounded px-3 py-1 h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.areaMin}
                onChange={(e) => updateFilter("areaMin", e.target.value)}
                min={0}
              />
              <input
                type="number"
                placeholder="Máximo"
                // class="border rounded px-3 py-1 h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px]"
                value={filters.areaMax}
                onChange={(e) => updateFilter("areaMax", e.target.value)}
                min={0}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="distrito"
              class="font-sans font-semibold text-[18px]"
            >
              Distrito
            </label>
            <div class="pt-2">
              <input
                type="text"
                id="distrito"
                placeholder="Distrito"
                // class="border rounded px-3 py-1 w-full h-[30px]"
                class="!border !border-gray-500 !appearance-none rounded-md !py-[5px] !px-[8px] h-[36px] w-full"
                value={filters.distrito}
                onChange={(e) => updateFilter("distrito", e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      <section
        id="terrenosUp"
        class="sm:px-0 xl:gap-6 2xl:gap-5 md:px-0 2xl:w-full"
      >
        <p class="w-full pb-5 ">
          {filteredPropiedades.length} terrenos encontrados
        </p>
        <div className="w-full pb-5">
          {filteredPropiedades.length > 0 ? (
            <div
              onClick={onOpen}
              ref={btnRef}
              class="lg:sticky grid justify-center w-full h-fit sm:grid-cols-1 md:grid-cols-2 xl:gap-6 gap-6 2xl:grid-cols-3 xl:grid-cols-3 2xl:gap-6 lg:grid-cols-2 lg:gap-6 md:gap-6 2xl:w-full lg:w-full md:justify-center md:items-center sm:justify-center sm:items-center md:w-full"
            >
              {filteredPropiedades.map((prop) => {
                // Debug: muestra multimedia
                console.log("Propiedad multimedia", prop.multimedia);
                console.log("Propiedad completa:", prop);
                console.log("Multimedia:", prop.multimedia);
                console.log("multimedia[0]?.url:", prop.multimedia?.[0]?.url);
                const urlImagen = prop.multimedia?.[0]?.url || "/img/fondo.png";
                console.log("urlImagen:", urlImagen);
                return (
                  <div
                    key={prop.id}
                    onClick={() => {
                      setSelectedProp(prop);
                      onOpen();
                    }}
                    class="bg-white h-[523px] w-[360px] xl:w-full md:w-full bg-card text-card-foreground flex flex-col gap-3 py-6 rounded-xl border shadow-sm overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group 2xl:w-full lg:w-full sm:w-full "
                  >
                    <div class="flex gap-6 flex-col md:gap-3 ">
                      <div class="relative overflow-hidden h-40 bg-muted">
                        <span class="absolute left-70 top-1 inline-flex items-center justify-center rounded-md border text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden border-transparent [a&]:hover:bg-primary/90 z-10 text-foreground md:left-3 sm:left-3 2xl:left-3 lg:left-3 xl:left-3">
                          {prop.estado === "DISPONIBLE" && (
                            <p class="text-[11px] text-white py-0.5 px-2 items-center w-fit bg-green-700">
                              DISPONIBLE
                            </p>
                          )}
                          {prop.estado === "RESERVADO" && (
                            <p class="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-yellow-600">
                              RESERVADO
                            </p>
                          )}
                          {prop.estado === "VENDIDO" && (
                            <p class="text-[11px] py-0.5 px-2 text-white items-center w-fit bg-red-700">
                              VENDIDO
                            </p>
                          )}
                        </span>
                        <img
                          class="sm:w-full object-cover group-hover:scale-105 transition-transform duration-300 z-0  h-[192px] w-[382px] inset-0 text-transparent sm:h-full "
                          src={urlImagen || prop.multimedia?.[0]?.url}
                          alt={prop.titulo}
                        />
                      </div>
                      <div class="p-[16px] flex flex-col gap-6 ">
                        <div class="flex gap-1 items-start justify-between ">
                          <h1 class="text-[15px] w-[150px] text-left lg:w-[150px] !xl:w-[150px] 2xl:w-[200px]">
                            {prop.titulo}
                          </h1>
                          <p
                            class="inline-flex !w-[90px] items-start px-1 h-fit text-xs justify-center rounded-md py-0.5  text-black  outline-2 outline-amber-700/100 content-center"
                            // style={{ minWidth: "100px" }} bg-yellow-100 text-black bg-amber-800
                          >
                            {prop.tipo === "TERRENO_AGRICOLA" && (
                              <p class="text-[11px]  items-center w-fit">
                                Terreno agrícola
                              </p>
                            )}
                            {prop.tipo === "TERRENO_URBANO" && (
                              <p class="text-[11px] xl:text-[10px] w-fit items-center">
                                Terreno urbano
                              </p>
                            )}
                            {prop.tipo === "LOTIZACIÓN" && (
                              <p class="text-[11px] w-fit items-center">
                                {" "}
                                Lotización
                              </p>
                            )}
                          </p>
                        </div>
                        <div>
                          <p class="text-sm text-left">
                            {prop.descripcion.length > 92
                              ? prop.descripcion.substring(0, 92) + "..."
                              : prop.descripcion}
                          </p>
                        </div>
                        <div class="flex gap-6 flex-col">
                          <div class="flex gap-6">
                            <img
                              class="w-5 h-5 text-xs"
                              src="/public/img/MapPin.svg"
                              alt=""
                            />
                            <p>{prop.direccion}</p>
                          </div>
                          <div class="flex gap-6">
                            <img
                              class="w-5 text-xs"
                              src="/public/img/Arrow-Arrow-expand.svg"
                              alt=""
                            />
                            <p class="">{prop.metrosCuadrados} m²</p>
                          </div>
                        </div>
                      </div>
                      <div class="flex gap-6 px-4 pb-4">
                        <svg
                          class="text-amber-950 "
                          viewBox="0 0 32 32"
                          width="32"
                          height="32"
                          stroke="currentColor"
                          fill="brown"
                        >
                          <path d="M8 21.6c0.3 3.3 3 5.7 7.2 6V30h2.1v-2.4c4.5-0.4 7.4-2.9 7.3-6.6 0-3.2-1.9-5-5.9-6.1l-1.4-0.4V6.9c2.2 0.2 3.8 1.4 4.1 3.3h2.9c-0.3-3.2-3.1-5.5-7-5.8V2H15.2v2.5c-3.9 0.5-6.5 2.9-6.6 6.3 0 2.9 1.9 5 5.4 5.8l1.2 0.3v8.1c-2.3-0.3-3.9-1.6-4.3-3.4H8z m6.8-7.7c-2.1-0.5-3.2-1.6-3.2-3.2 0-1.9 1.4-3.3 3.6-3.7v7l-0.4-0.1z m3.2 3.7c2.6 0.6 3.7 1.7 3.7 3.6 0 2.2-1.7 3.7-4.4 3.8V17.5l0.7 0.1z" />
                        </svg>
                        <p class="text-2xl text-amber-950 font-bold">
                          {prop.precio}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div class="text-gray-500 w-[100%] h-[500px] flex justify-center items-center">
              No se encontraron terrenos con los criterios seleccionados
            </div>
          )}
        </div>

        <Modal
          onClose={onClose}
          isOpen={isOpen}
          class="w-[460px] h-[250px] p-[20px] lg:w-[300px] md:w-[250px] sm:w-[200px]"
          finalFocusRef={btnRef}
          scrollBehavior={scrollBehavior}
          isCentered
        >
          <ModalOverlay />
          <ModalContent class="w-fit h-fit p-[0px] bg-white 2xl:w-[850px] lg:w-[650px] md:w-[550px] sm:w-fit">
            <ModalBody>
              {selectedProp && (
                <div
                  key={selectedProp.id}
                  class="bg-white h-[523px] w-[460px] xl:w-full md:w-full bg-card
                    text-card-foreground flex flex-col  cursor-pointer"
                >
                  <div class="flex justify-between items-center px-[0px]">
                    <ModalHeader class="py-[15px] text-[24px]">
                      {selectedProp.titulo}
                    </ModalHeader>
                    <ModalCloseButton class="w-[30px] p-[10px]" />
                  </div>
                  <div class="flex gap-6 flex-col ">
                    <div class=" h-full bg-muted">
                      {(() => {
                        const imagenesProp =
                          selectedProp?.multimedia?.map(
                            (img) => `${ENV || API_URL}${img.url}`
                          ) || [];

                        return (
                          <Carousel
                            images={
                              imagenesProp.length > 0
                                ? imagenesProp
                                : ["/img/fondo.png"]
                            }
                          />
                        );
                      })()}
                      {/* <Carousel images={imagenesProp.length > 0 ? imagenesProp : ["/img/fondo.png"]}/> */}
                      {/* <img
                        class="w-full h-full object-cover"
                        src="/public/img/fondo.png "
                        alt="Imagen"
                      /> */}
                    </div>

                    <div class="p-[16px] flex flex-col gap-6">
                      <div class="flex gap-2 items-center">
                        <span class="text-[10px] bg-white text-amber-700 rounded-sm outline-2 outline-amber-700/100  px-2 py-1 font-bold ">
                          {selectedProp.estado}
                        </span>

                        <span class="text-[10px] text-white bg-amber-800 font-bold px-2 py-1 rounded">
                          {selectedProp.tipo === "TERRENO_AGRICOLA" &&
                            "Terreno agrícola"}
                          {selectedProp.tipo === "TERRENO_URBANO" &&
                            "Terreno urbano"}
                          {selectedProp.tipo === "LOTIZACIÓN" && "Lotización"}
                        </span>
                      </div>
                      <div class="grid grid-cols-2 gap-[15px]">
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950 px-2">
                            $
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[15px] text-zinc-400">Precio</p>
                            <p class="text-[18px] text-black-400 font-bold">
                              {" "}
                              $ {selectedProp.precio}
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950">
                            <img
                              class="w-5"
                              src="/public/img/Arrow-Arrow-expand.svg"
                            />
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[15px] text-zinc-400">Área</p>
                            <p class="text-black-400 font-bold text-[18px]">
                              {selectedProp.metrosCuadrados} m²
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950">
                            <img class="w-5" src="/public/img/MapPin.svg" />
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[15px] text-zinc-400">Distrito</p>
                            <p class="text-black-400 font-bold text-[18px]">
                              {selectedProp.direccion}
                            </p>
                          </div>
                        </div>
                        <div class="flex gap-2 items-start">
                          <p class="text-[20px] items-start text-amber-950">
                            🗓️
                          </p>
                          <div class="flex flex-col">
                            <p class="text-[15px] text-zinc-400">Publicado</p>
                            <p class="text-black text-[18px] font-bold">
                              {selectedProp.fechaPublicacion}
                            </p>
                          </div>
                        </div>
                      </div>
                      <footer class="flex flex-col gap-2">
                        <div class="flex flex-row gap-[10px]">
                          <p class="text-[15px] text-zinc-400">📝</p>
                          <p class="text-[18px] text-black-400 font-bold">
                            Descripcion
                          </p>
                        </div>
                        <p class="text-[15px]">{selectedProp.descripcion}</p>
                      </footer>
                    </div>
                    <div>
                      <Button
                        onClick={onClose}
                        colorScheme="red"
                        variant="outline"
                        w={"100%"}
                        my={"20px"}
                      >
                        Cerrar
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>

        <div class="flex justify-center items-center gap-4 mt-6">
          <button
            onClick={() => {
              setPage((p) => {
                const newPage = Math.max(p - 1, 0);
                window.scrollTo({ top: 70, behavior: "instant" });
                return newPage;
              });
            }}
            disabled={page === 0}
            class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {/* Anterior */}
          </button>
          {/* <span>
            Página {page + 1} de {totalPages}
          </span> */}
          <button
            onClick={() => {
              setPage((p) => {
                const newPage = Math.min(p + 1, totalPages - 1);
                window.scrollTo({ top: 70, behavior: "instant" });
                return newPage;
              });
            }}
            disabled={page + 1 >= totalPages}
            class="px-3 py-1 border rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
          >
            {/* Siguiente */}
          </button>
        </div>
      </section>
    </div>
  );
};

export default Terreno;
