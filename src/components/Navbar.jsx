import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [openTema, setOpenTema] = useState(false); // 👈 toggle del menú
  const [tema, setTema] = useState("claro");
  console.log("Tema en Navbar:", tema);

  const handlePanel = () => {
    navigate("Crud");
  };

  return (
    <div class="bg-white flex justify-center w-full px-[30px] h-[76px] 2xl:px-10 sm:px-[60px] md:px-[32px]">
      {/* rounded-md shadow-md */}
      <div class="flex justify-between h-[76px] px-0 items-center w-[1468px] bg-white gap-10 p-[16px] 2xl:px-[64px] xl:px-[60px] lg:px-[10px] md:px-[32px] sm:px-0">
        {/* LOGO */}
        <div class="flex gap-2 h-15 text-left w-6x1 justify-between content-center items-center">
          <img class="w-[35px] h-[35px]" src="/img/Home.svg" alt="" />
          <div>
            <h1 class="text-[12px] lg:text-[18px] xl:text-[18px]">
              Terrenos Cusco
            </h1>
            <p class="text-[8px] lg:text-[8px] xl:text-[8px]">
              Terrenos en el Corazón de los Andes
            </p>
          </div>
        </div>

        {/* BOTONES DERECHA */}
        <div class="relative flex gap-6 h-15 text-center mx-5 items-center">
          {/* BOTÓN COLOR */}
          {localStorage.getItem("token") && (
            <button
              onClick={handlePanel}
              className="!bg-[#FEF7F2] !text-[#0e0d0d] !p-1 rounded-sm cursor-pointer shadow-sm shadow-black"
            >
              Administrador
            </button>
          )}
          <button
            id="btncolor"
            onClick={() => setOpenTema(!openTema)} // 👈 toggle React
            class="bg-[#FEF7F2] text-black !p-1 rounded-sm cursor-pointer relative shadow-sm shadow-black"
          >
            <img class="w-5" src="/public/img/color.png" alt="" />
          </button>

          {/* MENÚ TEMAS */}
          {openTema && (
            <div
              id="temas"
              class="absolute right-10 top-15 bg-white shadow-md rounded-md p-3 z-10"
            >
              <div class="flex gap-2 flex-col">
                <button id="claro" onClick={() => setTema("claro")}>
                  Claro
                </button>
                <button id="oscuro" onClick={() => setTema("oscuro")}>
                  Oscuro
                </button>
              </div>
            </div>
          )}
          <button class="bg-[#FEF7F2] text-black !p-1 rounded-sm cursor-pointer shadow-sm shadow-black">
            <img class="w-5" src="/public/img/global.png" alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
