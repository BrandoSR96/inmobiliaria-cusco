import { Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { listarContactos } from "../Services/ApiContacto";

const TabUsuario = () => {
  const [contacto,setContacto]=useState("");
  console.log("contacto", contacto);
  console.log("set", setContacto)

  useEffect(() => {
    listarContactos()
      .then((res) => setContacto(res.data)) // guarda los contactos en el estado
      .catch((err) => console.error(err));
  }, []);

  return (
    <main class="mx-auto px-6 py-8 bg-[#FEF7F2]">
      <div class="flex items-center justify-between mb-6 border-b border-red-200">
        <div class="text-[25px]">
          <h1 class="text-[25px] font-bold">
            Panel de Administración de Usuarios
          </h1>
          <p class="text-gray-400 text-[15px]">Gestiona todos los usuarios</p>
        </div>
        <span>{contacto.length} Contactos encontrados</span>
      </div>
      <section >
        {/* class="!border-1 !border-black !rounded-lg" */}
        <SimpleGrid
          spacing={4}
          templateColumns="repeat(auto-fill, minmax(250px, 2fr))"
        >
          {Array.isArray(contacto) && contacto.map((contac, index) => (
          <Card key={index} boxShadow={'2px 2px 2px 2px rgb(0,0,0,0.5)'}>
            <CardHeader pb="5px">
              <Heading size="md" pb="5px" fontSize={'18px'}> {contac.nombre} {contac.apellidos}</Heading>
              <Text fontSize={'14px'} color={'silver'} fontWeight={'600'}>{contac.email}</Text>
            </CardHeader>
            <CardBody pt={'5px'} pb={'5px'}>
              <Text fontSize={'14px'}>
                {contac.comentario}
              </Text>
            </CardBody>
            <CardFooter pt={'5px'}>
              <div class='w-full'>
                <a href={`https://wa.me/+51${contac.celular}?text=Hola%20quiero%20contactame%20contigo`} 
                target="_blank" class='w-full'>
                <Button class='w-full flex justify-center !bg-[#EDF2F7] !py-1 !rounded-sm'>
                  <img class="w-5 m-1 transition-all duration-200"
                    src="../../public/img/whatsapp.png" alt="" />
                  <span class='font-semibold'>+51 {contac.celular}</span> 
                </Button>
              </a> 
              </div>    
            </CardFooter>
          </Card>
          ))}
        </SimpleGrid>
        {/* <table class="w-full caption-bottom text-sm border-collapse md:border-separate md:rounded-lg overflow-hidden !border-1 !border-black">
          <thead>
            <tr class="text-foreground text-center font-medium whitespace-nowrap h-[40px] bg-[#dac6be] ">
              <th class="w-[30%] text-left text-[14px] px-5 border border-gray-300 ">
                Nombre
              </th>
              <th class="w-[13%] text-left text-[14px] px-5 border border-gray-300  ">
                Correo
              </th>
              <th class="w-[12%] text-left text-[14px] px-5 border border-gray-300  ">
                Numero
              </th>
              <th class="w-[50%] text-left text-[14px] px-5 border border-gray-300  ">
                Mensaje
              </th>
            </tr>
          </thead>

          <tbody class='!border-1 !border-black bg-white'>
            <td class="p-2 text-left items-center whitespace-nowrap 
            h-[52px] text-[14px] px-5" >
              Kenyo Daishoni Saenz Rojas
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              saenzkenyo@gmail.com
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">+51 990495535</td>
            <td class="text-left p-2 h-[14px] text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore a
              delectus itaque asperiores, magni consectetur.
            </td>
          </tbody>
          <tbody class='!border-1 !border-black bg-white'>
            <td
              class="p-2 text-left items-center whitespace-nowrap 
            h-[52px] text-[14px] px-5"
            >
              Kenyo Daishoni Saenz Rojas
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              saenzkenyo@gmail.com
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">+51 990495535</td>
            <td class="text-left p-2 h-[14px] text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore a
              delectus itaque asperiores, magni consectetur. 
            </td>
          </tbody>
          <tbody class='!border-1 !border-black bg-white'>
            <td
              class="p-2 text-left items-center whitespace-nowrap 
            h-[52px] text-[14px] px-5"
            >
              Kenyo Daishoni Saenz Rojas
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              saenzkenyo@gmail.com
            </td>
            <td class="text-left p-2 h-[14px] text-[14px] ">
              +51 990495535
            </td>
            <td class="text-left p-2 h-[14px] text-[14px]">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore a
              delectus itaque asperiores, magni consectetur. 
            </td>
          </tbody>
        </table> */}
      </section>
    </main>
  );
}

export default TabUsuario
