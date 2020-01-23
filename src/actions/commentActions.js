import {
  AGREGAR_COMENTARIO,
  AGREGAR_COMENTARIO_ERROR,
  AGREGAR_COMENTARIO_EXITO,
  COMENZAR_DESCARGA_COMENTARIO,
  DESCARGA_COMENTARIO_ERROR,
  DESCARGA_COMENTARIO_EXITO,
  OBTENER_COMENTARIO_ELIMINAR,
  COMENTARIO_ELIMINADO_EXITO,
  COMENTARIO_ELIMINADO_ERROR,
  OBTENER_COMENTARIO_EDITAR,
  COMENTARIO_EDITADO_EXITO,
  COMENTARIO_EDITADO_ERROR,
  COMENZAR_EDICION_COMENTARIO
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewCommentAction(comment) {
  return async dispatch => {
    dispatch(addComment());
    try {
      await clienteAxios.post("/comments", comment);

      dispatch(addCommentSucces(comment));
      Swal.fire("Correcto", "El Comentario se agrego", "succes");
    } catch (error) {
      dispatch(addCommentError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addComment = () => ({
  type: AGREGAR_COMENTARIO,
  payload: true
});

const addCommentSucces = comment => ({
  type: AGREGAR_COMENTARIO_EXITO,
  payload: comment
});

const addCommentError = estado => ({
  type: AGREGAR_COMENTARIO_ERROR,
  payload: estado
});

export function getCommentAction() {
  return async dispatch => {
    dispatch(downloadComment());
    try {
      const response = await clienteAxios.get("/comments");
      dispatch(downloadCommentSucces(response.data));
    } catch (error) {
      dispatch(downloadCommentError());
    }
  };
}

const downloadComment = () => ({
  type: COMENZAR_DESCARGA_COMENTARIO,
  payload: true
});

const downloadCommentSucces = comments => ({
  type: DESCARGA_COMENTARIO_EXITO,
  payload: comments
});

const downloadCommentError = () => ({
  type: DESCARGA_COMENTARIO_ERROR,
  payload: true
});

export function deleteCommentAction(id) {
  return async dispatch => {
    dispatch(getCommentDelete(id));

    try {
      await clienteAxios.delete(`/comments/${id}`);
      dispatch(deleteCommentSucces());
      Swal.fire(
        "Eliminado",
        "El COMENTARIO se elimino correctamente.",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(deleteCommentError());
    }
  };
}

const getCommentDelete = id => ({
  type: OBTENER_COMENTARIO_ELIMINAR,
  payload: id
});

const deleteCommentSucces = () => ({
  type: COMENTARIO_ELIMINADO_EXITO
});

const deleteCommentError = () => ({
  type: COMENTARIO_ELIMINADO_ERROR,
  payload: true
});

export function getCommentEdit(comment) {
  return dispatch => {
    dispatch(getCommentEditAction(comment));
  };
}

const getCommentEditAction = comment => ({
  type: OBTENER_COMENTARIO_EDITAR,
  payload: comment
});

export function editCommentAction(comment) {
  return async dispatch => {
    dispatch(editComment(comment));
    try {
      await clienteAxios.put(`/comments/${comment.id}`, comment);
      dispatch(editCommentSucces(comment));
    } catch (error) {
      dispatch(editCommentError());
    }
  };
}

const editComment = () => ({
  type: COMENZAR_EDICION_COMENTARIO
});

const editCommentSucces = comment => ({
  type: COMENTARIO_EDITADO_EXITO,
  payload: comment
});

const editCommentError = () => ({
  type: COMENTARIO_EDITADO_ERROR,
  payload: true
});
