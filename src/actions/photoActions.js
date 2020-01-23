import {
  AGREGAR_FOTO,
  AGREGAR_FOTO_ERROR,
  AGREGAR_FOTO_EXITO,
  COMENZAR_DESCARGA_FOTO,
  DESCARGA_FOTO_ERROR,
  DESCARGA_FOTO_EXITO,
  OBTENER_FOTO_ELIMINAR,
  FOTO_ELIMINADO_EXITO,
  FOTO_ELIMINADO_ERROR,
  OBTENER_FOTO_EDITAR,
  COMENZAR_EDICION_FOTO,
  FOTO_EDITADO_EXITO,
  FOTO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewPhotoAction(photo) {
  return async dispatch => {
    dispatch(addPhoto());
    try {
      await clienteAxios.post("/photos", photo);

      dispatch(addPhotoSucces(photo));
      Swal.fire("Correcto", "la informacion de la FOTO se agrego", "succes");
    } catch (error) {
      dispatch(addPhotoError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addPhoto = () => ({
  type: AGREGAR_FOTO,
  payload: true
});

const addPhotoSucces = photo => ({
  type: AGREGAR_FOTO_EXITO,
  payload: photo
});

const addPhotoError = estado => ({
  type: AGREGAR_FOTO_ERROR,
  payload: estado
});

export function getPhotoAction() {
  return async dispatch => {
    dispatch(downloadPhoto());
    try {
      const response = await clienteAxios.get("/photos");
      dispatch(downloadPhotoSucces(response.data));
    } catch (error) {
      dispatch(downloadPhotoError());
    }
  };
}

const downloadPhoto = () => ({
  type: COMENZAR_DESCARGA_FOTO,
  payload: true
});

const downloadPhotoSucces = photos => ({
  type: DESCARGA_FOTO_EXITO,
  payload: photos
});

const downloadPhotoError = () => ({
  type: DESCARGA_FOTO_ERROR,
  payload: true
});

export function deletePhotoAction(id) {
  return async dispatch => {
    dispatch(getPhotoDelete(id));

    try {
      await clienteAxios.delete(`/photos/${id}`);
      dispatch(deletePhotoSucces());
      Swal.fire("Eliminado", "El FOTO se elimino correctamente.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deletePhotoError());
    }
  };
}

const getPhotoDelete = id => ({
  type: OBTENER_FOTO_ELIMINAR,
  payload: id
});

const deletePhotoSucces = () => ({
  type: FOTO_ELIMINADO_EXITO
});

const deletePhotoError = () => ({
  type: FOTO_ELIMINADO_ERROR,
  payload: true
});

export function getPhotoEdit(photo) {
  return dispatch => {
    dispatch(getPhotoEditAction(photo));
  };
}

const getPhotoEditAction = photo => ({
  type: OBTENER_FOTO_EDITAR,
  payload: photo
});

export function editPhotoAction(photo) {
  return async dispatch => {
    dispatch(editPhoto(photo));
    try {
      await clienteAxios.put(`/photos/${photo.id}`, photo);
      dispatch(editPhotoSucces(photo));
    } catch (error) {
      dispatch(editPhotoError());
    }
  };
}

const editPhoto = () => ({
  type: COMENZAR_EDICION_FOTO
});

const editPhotoSucces = photo => ({
  type: FOTO_EDITADO_EXITO,
  payload: photo
});

const editPhotoError = () => ({
  type: FOTO_EDITADO_ERROR,
  payload: true
});
