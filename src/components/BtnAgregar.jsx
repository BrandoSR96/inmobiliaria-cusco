import { Button, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Textarea, NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper, Select, } from "@chakra-ui/react";
import { useState } from "react";
import { crearPropiedad } from "../Services/ApiServices";
// import { jwtDecode } from "jwt-decode";
import { useToast } from '@chakra-ui/react';
import { subirMultimedia } from "../hooks/useMultimedia";

const BtnAgregar = ({ onPropiedadCreada, className }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //multimedia
  const [archivo, setArchivo] = useState(null);
  console.log("file:", archivo);

  // --- States para inputs ---
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precio, setPrecio] = useState("");
  const [metrosCuadrados, setMetrosCuadrados] = useState("");
  const [direccion, setDireccion] = useState("");
  const [distrito, setDistrito] = useState("");
  const [tipo, setTipo] = useState("");
  const [estado, setEstado] = useState("");
  const [servicios, setServicios] = useState("");

  // --- Validación de campos ---
  const validarCampos = () => {
    if (
      !titulo ||
      !descripcion ||
      !precio ||
      !metrosCuadrados ||
      !direccion ||
      !distrito ||
      !tipo ||
      !estado
    ) {
      alert("Todos los campos son obligatorios");
      return false;
    }
    if (isNaN(precio) || isNaN(metrosCuadrados)) {
      alert("Precio y metros cuadrados deben ser números válidos");
      return false;
    }
    return true;
  };

  // --- Manejar creación ---
  const handleGuardar = async () => {
    if (!validarCampos()) return;

    const token = localStorage.getItem("token");
    const usuarioID = localStorage.getItem("UsuarioID");

    if (!token) {
      alert("No hay token disponible. Por favor, inicia sesión nuevamente.");
      return;
    }

    const data = {
      titulo,
      descripcion,
      precio: Number(precio),
      metrosCuadrados: Number(metrosCuadrados),
      direccion,
      distrito,
      tipo,
      estado,
      servicios,
      usuario: { id: Number(usuarioID) },
    };

    let propiedadCreada = null;

    try {
      // ✅ Crear propiedad correctamente
      propiedadCreada = await crearPropiedad(data, token);

      toast({
        title: "Propiedad creada",
        description: "Se creó correctamente",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      // MULTIMEDIA
      if (archivo) {
        try {
          // await subirMultimedia(archivo, "imagen", propiedadCreada.id);
          const nuevaImagen = await subirMultimedia( archivo, "imagen", propiedadCreada.id);
          propiedadCreada.multimedia = [
            { url:nuevaImagen.archivo.url} ];
          // onPropiedadCreada(propiedadCreada);
          if (onPropiedadCreada) onPropiedadCreada(propiedadCreada);

          toast({
            title: "Imagen subida",
            description: "La imagen se subió correctamente",
            status: "success",
            duration: 3000,
            isClosable: true,
          });
        } catch (error) {
          console.error("Error subiendo multimedia:", error);
          toast({
            title: "Error al subir imagen",
            description: "La propiedad se creó, pero la imagen falló",
            status: "error",
            duration: 3000,
            isClosable: true,
          });
        }
      }

      // Limpiar campos
      setTitulo("");
      setDescripcion("");
      setPrecio("");
      setMetrosCuadrados("");
      setDireccion("");
      setDistrito("");
      setTipo("");
      setEstado("");
      setServicios("");
      setArchivo(null);

      onClose();

      if (onPropiedadCreada) onPropiedadCreada(propiedadCreada);
    } catch (error) {
      console.error("Error al crear propiedad:", error);
      toast({
        title: "Error",
        description: "No se pudo crear la propiedad",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
    //  useEffect((handleGuardar) => {
    //   listarPropiedades();
    // }, []);

  return (
    <>
      <Button
        onClick={onOpen}
        className={className}
        bgColor={"#952C00"}
        colorScheme="#952C00"
      >
        <span className="text-2xl"> + </span> Agregar terreno
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent m={1}>
          <ModalHeader>Crear Nuevo Terreno</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl class="flex flex-col gap-1">
              <FormLabel>Título</FormLabel>
              <Input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
              <FormLabel>Descripción</FormLabel>
              <Textarea
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                placeholder="Descripción..."
              />

              <div className="flex flex-row gap-4">
                <div>
                  <FormLabel>Precio</FormLabel>
                  <NumberInput
                    value={precio}
                    onChange={(value) => setPrecio(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
                <div>
                  <FormLabel>Área (m²)</FormLabel>
                  <NumberInput
                    value={metrosCuadrados}
                    onChange={(value) => setMetrosCuadrados(value)}
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </div>
              </div>

              <div class="flex flex-row gap-4">
                <div>
                  <FormLabel>Dirección</FormLabel>
                  <Input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                  />
                </div>

                <div>
                  <FormLabel>Distrito</FormLabel>
                  <Input
                    type="text"
                    value={distrito}
                    onChange={(e) => setDistrito(e.target.value)}
                  />
                </div>
              </div>

              <div class="flex flex-row gap-20">
                <div>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    value={tipo}
                    onChange={(e) => setTipo(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="TERRENO_AGRICOLA">Agrícola</option>
                    <option value="TERRENO_URBANO">Urbano</option>
                    <option value="LOTIZACION">Lotizacion</option>
                  </Select>
                </div>
                <div>
                  <FormLabel>Estado</FormLabel>
                  <Select
                    value={estado}
                    onChange={(e) => setEstado(e.target.value)}
                  >
                    <option value="">Seleccionar</option>
                    <option value="DISPONIBLE">Disponible</option>
                    <option value="RESERVADO">Reservado</option>
                    <option value="VENDIDO">Vendido</option>
                  </Select>
                </div>
              </div>
              <FormLabel>File Imagen</FormLabel>
              <Input type="file" class='pb-2' onChange={(e)=> setArchivo(e.target.files[0])}/>
              <FormLabel>Características</FormLabel>
              <Input
                type="text"
                value={servicios}
                onChange={(e) => setServicios(e.target.value)}
                placeholder="Ej: Agua, luz, vistas panorámicas"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button bgColor={"cial"} color={"black"} mr={2} onClick={onClose}>
              Cancelar
            </Button>
            <Button bgColor={"#952C00"} colorScheme="#952C00" color={"white"} onClick={handleGuardar}
            >
              Guardar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BtnAgregar;





 // const handleGuardar = async () => {
  //   if (!validarCampos()) return;

  //   const token = localStorage.getItem("token");
  //   const usuarioID = localStorage.getItem("UsuarioID");
  //   console.log("ID:", usuarioID);

  //   if (!token) {
  //     alert("No hay token disponible. Por favor, inicia sesión nuevamente.");
  //     return;
  //   }

  //   // Intentar obtener ID de usuario desde localStorage o token
  //   let usuarioId = localStorage.getItem("usuario");
  //   // console.log("usuario ID:",usuarioId)

  //   try {
  //     const decoded = jwtDecode(token);
  //     console.log("Token decodificado:", decoded);

  //     // Si el backend guarda el id como "sub" o "id" en el token
  //     if (!usuarioId) {
  //       usuarioId = decoded.sub || decoded.id || decoded.userId;
  //     }
  //   } catch (err) {
  //     console.warn("No se pudo decodificar el token:", err);
  //   }

  //   if (!usuarioId) {
  //     alert("No se encontró el ID del usuario. Inicia sesión nuevamente.");
  //     return;
  //   }

  //   const data = {
  //     titulo,
  //     descripcion,
  //     precio: Number(precio),
  //     metrosCuadrados: Number(metrosCuadrados),
  //     direccion,
  //     distrito,
  //     tipo,
  //     estado,
  //     servicios,
  //     usuario: { id: Number(usuarioID) }, // ✅ ahora siempre tendrás un id válido
  //   };

  //   try {
  //     const nuevaPropiedad = await crearPropiedad(token);
  //     // alert("Propiedad creada correctamente");
  //     toast({
  //       title: "Exitoso.",
  //       description: "Propiedad creada correctamente",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });

  //     // Limpiar campos
  //     setTitulo("");
  //     setDescripcion("");
  //     setPrecio("");
  //     setMetrosCuadrados("");
  //     setDireccion("");
  //     setDistrito("");
  //     setTipo("");
  //     setEstado("");
  //     setServicios("");

  //     onClose(); // Cerrar modal

  //     if (onPropiedadCreada) onPropiedadCreada(nuevaPropiedad);
  //   } catch (error) {
  //     console.error("Error al crear propiedad:", error);
  //     alert("No se pudo crear la propiedad: " + (error.message || error));
  //   }
  //   //multimedia
  //   const propiedadId = nuevaPropiedad.id;
  //   const nuevaPropiedad = await subirMultimedia(archivo, "imagen", propiedadId);

  //   console.log(nuevaPropiedad.id);

  // //Si hay archivo seleccionado, subirlo
  // if (archivo) {
  //   try {
  //     await subirMultimedia(archivo, "Imagen principal", nuevaPropiedad.id);
    
  //     toast({
  //       title: "Imagen subida",
  //       description: "La imagen se subió correctamente",
  //       status: "success",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   } catch (error) {
  //     console.error("Error subiendo multimedia:", error);
  //     toast({
  //       title: "Error subiendo imagen",
  //       description: "La propiedad se creó, pero la imagen falló",
  //       status: "error",
  //       duration: 3000,
  //       isClosable: true,
  //     });
  //   }
  // }
    
  // };
