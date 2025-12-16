import React, { useState } from "react";
import {
  Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader,
  ModalFooter, ModalBody, ModalCloseButton, FormControl,
  FormLabel, Input, Textarea, NumberInput, NumberInputField,
  Select, useToast, } from "@chakra-ui/react";
import { actualizarPropiedad } from "../Services/ApiServices";
import { subirMultimedia } from "../hooks/useMultimedia";

const BtnActualizar = ({ propiedad, onActualizado }) => {
  //Subir archivo
  const [archivo, setArchivo] = useState([]); //-file

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({ ...propiedad });
  const [loading, setLoading] = useState(false);
  const toast=useToast()

  // 🔄 Maneja cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNumberChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value) || 0,
    }));
  };

  // 🧩 Guardar cambios
  const handleSubmit = async () => {
  try {
    setLoading(true);

    // 1️⃣ Actualizar la propiedad
    const response = await actualizarPropiedad(formData.id, formData);

    if (!response) {
      toast({
        title: "Error",
        description: "No se pudo actualizar la propiedad",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    // 2️⃣ Si hay imagen seleccionada, subirla
    if (archivo.length > 0) {
  try {
    const imagenesSubidas = [];

    for (const img of archivo) {
      const nuevaImagen = await subirMultimedia(img, "imagen", formData.id);
      imagenesSubidas.push({ url: nuevaImagen.archivo.url });
    }

    toast({
      title: "Imágenes subidas",
      description: "Todas las imágenes fueron subidas correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    console.log("Imágenes subidas:", imagenesSubidas);

  } catch (error) {
    console.error("Error subiendo multimedia:", error);
    toast({
      title: "Error al subir imágenes",
      description: "La propiedad se actualizó, pero algunas imágenes fallaron",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  }
}

    toast({
      title: "Propiedad actualizada",
      description: "Los datos fueron guardados correctamente",
      status: "success",
      duration: 3000,
      isClosable: true,
    });

    onClose();
    if (onActualizado) onActualizado();

  } catch (error) {
    console.error("Error al actualizar:", error);
    toast({
      title: "Error",
      description: "No se pudo actualizar la propiedad",
      status: "error",
      duration: 3000,
      isClosable: true,
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      {/* Botón Editar */}
      <Button
        onClick={onOpen}
        class="bg-[#952C00] w-[20px] text-2xl flex justify-center flex-row gap-5 items-center "
      >
        <svg
          data-slot="icon"
          fill="none"
          stroke-width="1.5"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          class="w-5 h-5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
          ></path>
        </svg>
      </Button>

      {/* Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent m={4} w={"448px"}>
          <ModalHeader py={"5px"}>Editar Propiedad</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <FormControl mb={1}>
              <FormLabel>Título</FormLabel>
              <Input
                name="titulo"
                value={formData.titulo || ""}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl mb={3}>
              <FormLabel>Descripción</FormLabel>
              <Textarea
                name="descripcion"
                value={formData.descripcion || ""}
                onChange={handleChange}
              />
            </FormControl>

            <div class="flex flex-row gap-4">
              <FormControl mb={2}>
                <FormLabel>Precio (USD)</FormLabel>
                <NumberInput
                  value={formData.precio || 0}
                  onChange={(value) => handleNumberChange("precio", value)}
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>

              <FormControl mb={2}>
                <FormLabel>Área (m²)</FormLabel>
                <NumberInput
                  value={formData.metrosCuadrados || 0}
                  onChange={(value) =>
                    handleNumberChange("metrosCuadrados", value)
                  }
                >
                  <NumberInputField />
                </NumberInput>
              </FormControl>
            </div>

            <div class="flex flex-row gap-4">
              <FormControl mb={3}>
                <FormLabel>Dirección</FormLabel>
                <Input
                  name="direccion"
                  value={formData.direccion || ""}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Distrito</FormLabel>
                <Input
                  name="distrito"
                  value={formData.distrito || ""}
                  onChange={handleChange}
                />
              </FormControl>
            </div>

            <div class="flex flex-row gap-4">
              <FormControl mb={3}>
                <FormLabel>Tipo</FormLabel>
                <Select
                  name="tipo"
                  value={formData.tipo || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="TERRENO_AGRICOLA">Agrícola</option>
                  <option value="TERRENO_URBANO">Urbano</option>
                  <option value="LOTIZACIÓN">Lotización</option>
                </Select>
              </FormControl>

              <FormControl mb={3}>
                <FormLabel>Estado</FormLabel>
                <Select
                  name="estado"
                  value={formData.estado || ""}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar</option>
                  <option value="DISPONIBLE">Disponible</option>
                  <option value="RESERVADO">Reservado</option>
                  <option value="VENDIDO">Vendido</option>
                </Select>
              </FormControl>
            </div>

            <div class="mb-3">
              <FormLabel class="flex flex-col gap-1">File Imagen</FormLabel>
              <Input
                key="fileInput"
                type="file"
                multiple
                accept="image/*"
                class="pb-2"
                onChange={(e) => setArchivo(Array.from(e.target.files))}
                // onChange={(e) => setArchivo(e.target.files[0])}
              />
             
            </div>
            <FormControl mb={3}>
              <FormLabel>Características</FormLabel>
              <Input
                name="servicios"
                value={formData.servicios || ""}
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter pt={"0px"} pb={"10px"}>
            <Button onClick={onClose} mr={3}>
              Cancelar
            </Button>
            <Button
              colorScheme="orange"
              onClick={handleSubmit}
              isLoading={loading}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnActualizar;


    // if (archivo.length > 0) {
    //   try {
    //     await subirMultimedia(archivo, "imagen", formData.id);

    //     toast({
    //       title: "Imagen actualizada",
    //       description: "La nueva imagen fue subida correctamente",
    //       status: "success",
    //       duration: 3000,
    //       isClosable: true,
    //     });
    //   } catch (error) {
    //     console.error("Error subiendo multimedia:", error);
    //     toast({
    //       title: "Error al subir imagen",
    //       description: "La propiedad se actualizó, pero la imagen falló",
    //       status: "error",
    //       duration: 3000,
    //       isClosable: true,
    //     });

     {/* <FormLabel >Adjuntar Imagen</FormLabel>
              <Input 
              class='rounded-sm border-4 border-indigo-500 ' 
              type="file"  
              onChange={(e) => setArchivo(e.target.files[0])}/> */}
    //   }
    // }

  // const handleSubmit = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await actualizarPropiedad(formData.id, formData);

  //     if (response) {
  //       // alert("✅ Propiedad actualizada correctamente");
  //       toast({title: "Exitoso.",description: "Propiedad actualizada correctamente",status: "success",duration: 3000,isClosable: true,})
  //       onClose();
  //       if (onActualizado) onActualizado(); // 🔁 recarga lista
  //     } else {
  //       // toast({title:"No se actualizo",description: "No se hizo ningun cambio",status: "info",duration: 2000,isClosable: true})
  //       alert("❌ No se pudo actualizar la propiedad");
  //     }
  //   } catch (error) {
  //     console.error("Error al actualizar:", error);
  //     alert("Error al actualizar la propiedad");
  //   } finally {
  //     setLoading(false);
  //   }
  // };