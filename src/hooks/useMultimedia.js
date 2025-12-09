const ApiMultimedia = "http://localhost:8080/api/multimedia/subir";

export const subirMultimedia = async (archivo, tipo, propiedadId) => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("No hay token disponible");

    const formData = new FormData();
    formData.append("archivo", archivo);
    formData.append("tipo", tipo);          
    formData.append("propiedadId", propiedadId);

    const respuesta = await fetch(ApiMultimedia, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,  
      },
      body: formData,  // El navegador define correctamente multipart/form-data
    });

    if (!respuesta.ok) {
      throw new Error(`Error del servidor: ${respuesta.status}`);
    }

    return await respuesta.json();
  } catch (error) {
    console.error("Error al subir multimedia:", error);
    throw error;
  }
};




// export const useMultimedia = () => {
    // export const subirMultimedia = async ( archivo, descripcion, propiedadId ) => {
    //   try {
    //     const token = localStorage.getItem("token");
    //     if (!token) throw new Error("No hay token disponible");
    //     console.log("PropiedadID en hook:", propiedadId);
    //     console.log("Archivo en hook:", token);

    //     const formData = new FormData();
    //     formData.append("archivo", archivo);
    //     formData.append("descripcion", descripcion);
    //     formData.append("propiedadId", propiedadId);

    //     const respuesta = await fetch(ApiMultimedia, {
    //       method: "POST",
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       body: formData,
    //     });

    //     if (!respuesta.ok) {
    //       throw new Error(`Error del servidor: ${respuesta.status}`);
    //     }

    //     const data = await respuesta.json();
    //     return data;
    //   } catch (error) {
    //     console.error("Error al subir multimedia:", error);
    //     throw error;
    //   }
    // };
    // subirMultimedia;

// };



// const ApiMultimedia = "http://localhost:8080/api/multimedia/subir";

// export const useMultimedia = () => {
//     const subirMultimedia = async (archivo, descripcion, propiedadId) => {
//         try {
//             const formData = new FormData();
//             formData.append("archivo", archivo);
//             formData.append("descripcion", descripcion);
//             formData.append("propiedadId", propiedadId);
//         }catch (error) {
//             const respuesta = await fetch(ApiMultimedia, {
//                 method: "POST",
//                 body: formData,
//             });
//             if (!respuesta.ok) {
//                 throw new Error(`Error del servidor: ${respuesta.status}`);
//             } else {
//                 const data = await respuesta.json();
//                 return data;
//             }

//             }
//         }
//     }
//     return { subirMultimedia };

