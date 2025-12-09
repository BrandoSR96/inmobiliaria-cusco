import { FormControl, FormLabel, Input, useToast } from '@chakra-ui/react'; 
import { useEffect, useState } from "react";
import { crearContacto, listarContactos } from '../Services/ApiContacto';

const Formulario = () => {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [comentario, setComentario] = useState("");
  const toast=useToast()

  const handleSendEmail = () => {
    const data = {
      nombre,
      apellidos,
      email,
      celular,
      comentario,
    };
     // Limpiar el formulario
    setNombre("");
    setApellidos("");
    setEmail("");
    setCelular("");
    setComentario("");

   if (!nombre || !apellidos || !email || !celular || !comentario) { 
     console.log("Completa el formulario");
     toast({
        title: "Error",
        description: "Completa el formulario",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
     return; // detenemos el envío
   }else{
    toast({
        title: "Enviado",
        description: "Formulario enviado",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
   }
    
    console.log("tipo", typeof data);
    console.log("ENVIANDO DATA:", data);
    crearContacto(data);
   
    // const subject = "Nuevo mensaje desde el formulario";
    // window.location.href = `mailto:saenzkenyo@gmail.com?subject=${encodeURIComponent(
    //   subject
    // )}&body=${encodeURIComponent(body)}`;
   
  };
   useEffect(() => {
      listarContactos();
    }, []);
  
  return (
    <div class="w-full bg-white p-[25px]">
      <p class="text-center pb-[25px] text-black font-extrabold font-mono text-[25px]">
        FORMULARIO
      </p>
      <FormControl isRequired>
        <div className="flex flex-col gap-6 2xl:flex-row 2xl:gap-10 2xl:justify-center 2xl:items-start xl:flex-row xl:gap-10 xl:justify-center xl:items-start">
          <div className="w-full flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full text-black">
                <FormLabel>Nombre</FormLabel>
                <Input value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre" />
              </div>
              <div className="w-full text-black">
                <FormLabel htmlFor="apellido">Apellidos</FormLabel>
                <Input  value={apellidos} onChange={e => setApellidos(e.target.value)} id="apellido" placeholder="Apellido" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="w-full text-black">
                <FormLabel htmlFor="email">E-mail</FormLabel>
                <Input value={email} onChange={e => setEmail(e.target.value)} id="email" placeholder="Correo" />
              </div>
              <div className="w-full text-black">
                <FormLabel htmlFor="celular">Celular</FormLabel>
                <Input value={celular} onChange={e => setCelular(e.target.value)} id="celular" placeholder="+51 - " />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-3">
            <textarea 
              value={comentario} onChange={e => setComentario(e.target.value)}
              class="!p-2 w-full h-32 outline-2 outline-black outline-offset-2 rounded-sm text-black"
              placeholder="Comentario..."
            />
            <button onClick={handleSendEmail} class="w-full h-10 !text-white !bg-black rounded-sm">
              Enviar
            </button>
          </div>
        </div>
      </FormControl>
    </div>
  );
}
export default Formulario
