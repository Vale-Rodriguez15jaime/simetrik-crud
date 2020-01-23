import {
  AGREGAR_ALBUM,
  AGREGAR_ALBUM_ERROR,
  AGREGAR_ALBUM_EXITO,
  CARGAR_FOTOS_ALBUM,
  CARGAR_FOTOS_ALBUM_ERROR,
  CARGAR_FOTOS_ALBUM_EXITO,
  COMENZAR_DESCARGA_ALBUM,
  DESCARGA_ALBUM_ERROR,
  DESCARGA_ALBUM_EXITO,
  OBTENER_ALBUM_ELIMINAR,
  ALBUM_ELIMINADO_EXITO,
  ALBUM_ELIMINADO_ERROR,
  OBTENER_ALBUM_EDITAR,
  COMENZAR_EDICION_ALBUM,
  ALBUM_EDITADO_EXITO,
  ALBUM_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewAlbumAction(album) {
  return async dispatch => {
    dispatch(addAlbum());
    try {
      await clienteAxios.post("/albums", album);

      dispatch(addAlbumSucces(album));
      Swal.fire("Correcto", "El album se agrego", "succes");
    } catch (error) {
      dispatch(addAlbumError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addAlbum = () => ({
  type: AGREGAR_ALBUM,
  payload: true
});

const addAlbumSucces = album => ({
  type: AGREGAR_ALBUM_EXITO,
  payload: album
});

const addAlbumError = estado => ({
  type: AGREGAR_ALBUM_ERROR,
  payload: estado
});

export function getPhotoAlbumAction(id, all = false) {
  return async dispatch => {
    dispatch(cargarFotosAlbum(id));
    try {
      const response = await clienteAxios.get(`/photos?albumId=${id}`);
      dispatch(
        cargarFotosAlbumSucces(
          all ? response.data : response.data.slice(0, 5),
          id
        )
      );
    } catch (error) {
      dispatch(cargarFotosAlbumError(error, id));
    }
  };
}

const cargarFotosAlbum = id => ({
  type: CARGAR_FOTOS_ALBUM,
  payload: { load: true, id: id }
});

const cargarFotosAlbumSucces = (photos, id) => ({
  type: CARGAR_FOTOS_ALBUM_EXITO,
  payload: { photos: photos, id: id }
});

const cargarFotosAlbumError = (estado, id) => ({
  type: CARGAR_FOTOS_ALBUM_ERROR,
  payload: { estado, id }
});

export function getAlbumAction() {
  return async dispatch => {
    dispatch(downloadAlbum());
    try {
      const response = await clienteAxios.get("/albums");
      dispatch(downloadAlbumSucces(response.data));
    } catch (error) {
      dispatch(downloadAlbumError());
    }
  };
}

const downloadAlbum = () => ({
  type: COMENZAR_DESCARGA_ALBUM,
  payload: true
});

const downloadAlbumSucces = albums => ({
  type: DESCARGA_ALBUM_EXITO,
  payload: albums
});

const downloadAlbumError = () => ({
  type: DESCARGA_ALBUM_ERROR,
  payload: true
});

export function deleteAlbumAction(id) {
  return async dispatch => {
    dispatch(getAlbumDelete(id));

    try {
      await clienteAxios.delete(`/albums/${id}`);
      dispatch(deleteAlbumSucces());
      Swal.fire("Eliminado", "El album se elimino correctamente.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteAlbumError());
    }
  };
}

const getAlbumDelete = id => ({
  type: OBTENER_ALBUM_ELIMINAR,
  payload: id
});

const deleteAlbumSucces = () => ({
  type: ALBUM_ELIMINADO_EXITO
});

const deleteAlbumError = () => ({
  type: ALBUM_ELIMINADO_ERROR,
  payload: true
});

export function getAlbumEdit(album) {
  return dispatch => {
    dispatch(getAlbumEditAction(album));
  };
}

const getAlbumEditAction = album => ({
  type: OBTENER_ALBUM_EDITAR,
  payload: album
});

export function editAlbumAction(album) {
  return async dispatch => {
    dispatch(editAlbum(album));
    try {
      await clienteAxios.put(`/albums/${album.id}`, album);
      dispatch(editAlbumSucces(album));
    } catch (error) {
      dispatch(editAlbumError());
    }
  };
}

const editAlbum = () => ({
  type: COMENZAR_EDICION_ALBUM
});

const editAlbumSucces = album => ({
  type: ALBUM_EDITADO_EXITO,
  payload: album
});

const editAlbumError = () => ({
  type: ALBUM_EDITADO_ERROR,
  payload: true
});
