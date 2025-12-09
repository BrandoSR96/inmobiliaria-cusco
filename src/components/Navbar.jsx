import { useState } from "react";

const Navbar = () => {

  const [openTema, setOpenTema] = useState(false); // 👈 toggle del menú
  const [tema, setTema] = useState("claro");
  console.log("Tema en Navbar:", tema);

  return (
    <div class="bg-white flex justify-center w-full px-[30px] h-[76px] 2xl:px-10 sm:px-[60px] md:px-[32px]">
      {/* rounded-md shadow-md */}
      <div class="flex justify-between h-[76px] px-0 items-center w-[1468px] bg-white gap-10 p-[16px] 2xl:px-[64px] xl:px-[60px] lg:px-[10px] md:px-[32px] sm:px-0">

        {/* LOGO */}
        <div class="flex gap-2 h-15 text-left w-6x1 justify-between content-center items-center">
          <img class='w-[35px] h-[35px]' src="/public/img/Home.svg" alt="" />
          <div>
            <h1 class='text-[12px] lg:text-[18px] xl:text-[18px]'>Terrenos Cusco</h1>
            <p class='text-[8px] lg:text-[8px] xl:text-[8px]'>Terrenos en el Corazón de los Andes</p>
          </div>
        </div>

        {/* BOTONES DERECHA */}
        <div class="relative flex gap-6 h-15 text-center mx-5 items-center">

          {/* BOTÓN COLOR */}
          <button 
            id='btncolor' 
            onClick={() => setOpenTema(!openTema)}  // 👈 toggle React
            class="bg-[#FEF7F2] text-black p-2 py-1 rounded-sm cursor-pointer"
          >
            <img class='w-5' src="/public/img/color.png" alt="" />
          </button>

          {/* MENÚ TEMAS */}
          {openTema && (
            <div 
              id='temas' 
              class='absolute right-10 top-15 bg-white shadow-md rounded-md p-3 z-10'
            >
              <div class='flex gap-2 flex-col'>
                <button id="claro"  onClick={()=>setTema("claro")}>Claro</button>
                <button id="oscuro" onClick={()=>setTema("oscuro")}>Oscuro</button>
              </div>
            </div>
          )}

          {/* OTRO BOTÓN */}
          <button class="bg-[#FEF7F2] text-black p-2 py-1 rounded-sm cursor-pointer">
            <img class='w-5' src="/public/img/global.png" alt="" />
          </button>

        </div>
      </div>
    </div>
  );
}

export default Navbar;


// const Navbar = () => {

// const color=document.getElementById('btncolor');
// console.log(color);
// const tema= document.getElementById('temas');
// console.log(tema);

// color.addEventListener("click", () => {
//   tema.style.display = tema.style.display === 'block' ? 'none' : 'block';
// });

//   return (
//     // 
//     <div class='bg-white  flex justify-center w-full h-[76px] px-10 rounded-md shadow-md 2xl:px-15 '>
//       <div class="flex justify-between h-[76px] items-center w-[1468px] bg-white gap-10 p-[16px]">
//         <div class="flex gap-2 h-15  text-left w-6x1 justify-between content-center items-center">
//           <img class='w-15' src="/public/img/Home.svg" alt="" />
//           <div>
//             <h1 class='text-[20px]'>Terrenos Cusco</h1>
//             <p class='text-[12px]'>Terrenos en el Corazón de los Andes</p>
//           </div>
//         </div>
//         <div class=" relative flex gap-6 h-15 text-center mx-5 items-center">
//           <buttton id='btncolor' class="bg-[#FEF7F2] text-black p-2 py-1 rounded-sm cursor-pointer ">
//             <img class='w-5' src="/public/img/color.png" alt="" />
//           </buttton>
//           {/* hidden */}
//           <div id='temas' class='absolute right-10 top-15 bg-white shadow-md rounded-md p-3 z-10'>
//             <div class=' flex gap-2 flex-col'>
//               <button id="claro">Claro</button>
//               <button id="oscuro">Oscuro</button>
//             </div>
//           </div>
//           {/* <Temas id='temas'/> */}
//           <buttton class="bg-[#FEF7F2] text-black p-2 py-1 rounded-sm cursor-pointer">
//             <img class='w-5' src="/public/img/global.png" alt="" />
//           </buttton>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Navbar




  // const cuerpo=document.getElementById('body');
  // console.log(cuerpo);
  // const claro=document.getElementById('claro');
  // claro.addEventListener("click", () => {
  //   cuerpo.style.backgroundColor = "#FEF7F2";
  // });
  // const oscuro=document.getElementById('oscuro');
  // oscuro.addEventListener("click", () => {
  //   document.cuerpo.classList.add('dark-theme');
  // });



// color.addEventListener('click',()=>{
// console.log('click');
// });
// const claro=document.getElementById('claro');
// const oscuro=document.getElementById('oscuro');
