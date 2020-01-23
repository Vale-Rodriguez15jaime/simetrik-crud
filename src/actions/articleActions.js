import {
  AGREGAR_ARTICULO,
  AGREGAR_ARTICULO_ERROR,
  AGREGAR_ARTICULO_EXITO,
  COMENZAR_DESCARGA_ARTICULOS,
  DESCARGA_ARTICULOS_ERROR,
  DESCARGA_ARTICULOS_EXITO,
  OBTENER_ARTICULO_ELIMINAR,
  ARTICULO_ELIMINADO_EXITO,
  ARTICULO_ELIMINADO_ERROR,
  OBTENER_ARTICULO_EDITAR,
  COMENZAR_EDICION_ARTICULO,
  ARTICULO_EDITADO_EXITO,
  ARTICULO_EDITADO_ERROR,
  CARGAR_RELACION_TABLAS,
  CARGAR_RELACION_TABLAS_EXITO,
  CARGAR_RELACION_TABLAS_ERROR,
  CARGAR_RELACION_TABLASDOS,
  CARGAR_RELACION_TABLAS_EXITODOS,
  CARGAR_RELACION_TABLAS_ERRORDOS
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewArticleAction(article) {
  return async dispatch => {
    dispatch(addArticle());
    try {
      await clienteAxios.post("/posts", article);

      dispatch(addArticleSucces(article));
      Swal.fire("Correcto", "El articulo se agrego", "succes");
    } catch (error) {
      dispatch(addArticleError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addArticle = () => ({
  type: AGREGAR_ARTICULO,
  payload: true
});

const addArticleSucces = article => ({
  type: AGREGAR_ARTICULO_EXITO,
  payload: article
});

const addArticleError = estado => ({
  type: AGREGAR_ARTICULO_ERROR,
  payload: estado
});

export function getArticleAction() {
  return async dispatch => {
    dispatch(downloadArticle());
    try {
      const response = await clienteAxios.get("/posts");
      dispatch(downloadArticleSucces(response.data));
    } catch (error) {
      dispatch(downloadArticleError());
    }
  };
}

const downloadArticle = () => ({
  type: COMENZAR_DESCARGA_ARTICULOS,
  payload: true
});

const downloadArticleSucces = articles => ({
  type: DESCARGA_ARTICULOS_EXITO,
  payload: articles
});

const downloadArticleError = () => ({
  type: DESCARGA_ARTICULOS_ERROR,
  payload: true
});

export function getRelationArticle(id) {
  return async dispatch => {
    dispatch(downloadArticleRelation(id));
    try {
      const response = await clienteAxios.get(`/comments?postId=${id}`);
      dispatch(downloadArticleRelationSucces(response.data, id));
    } catch (error) {
      dispatch(downloadArticleRelationError());
    }
  };
}

const downloadArticleRelation = id => ({
  type: CARGAR_RELACION_TABLAS,
  payload: { load: true, id: id }
});

const downloadArticleRelationSucces = (comments, id) => ({
  type: CARGAR_RELACION_TABLAS_EXITO,
  payload: { comments: comments, id: id }
});

const downloadArticleRelationError = (estado, id) => ({
  type: CARGAR_RELACION_TABLAS_ERROR,
  payload: (estado, id)
});

export function getRelationArticle2(id) {
  return async dispatch => {
    dispatch(downloadArticleRelation2(id));
    try {
      const response = await clienteAxios.get(`/users?id=${id}`);
      dispatch(downloadArticleRelationSucces2(response.data[0], id));
    } catch (error) {
      dispatch(downloadArticleRelationError2());
    }
  };
}

const downloadArticleRelation2 = id => ({
  type: CARGAR_RELACION_TABLASDOS,
  payload: { load: true, id: id }
});

const downloadArticleRelationSucces2 = (users, id) => ({
  type: CARGAR_RELACION_TABLAS_EXITODOS,
  payload: { users: users, id: id }
});

const downloadArticleRelationError2 = (estado, id) => ({
  type: CARGAR_RELACION_TABLAS_ERRORDOS,
  payload: (estado, id)
});

export function deleteArticleAction(id) {
  return async dispatch => {
    dispatch(getArticleDelete(id));

    try {
      await clienteAxios.delete(`/albums/${id}`);
      dispatch(deleteArticleSucces());
      Swal.fire(
        "Eliminado",
        "El Articulo se elimino correctamente.",
        "success"
      );
    } catch (error) {
      console.log(error);
      dispatch(deleteArticleError());
    }
  };
}

const getArticleDelete = id => ({
  type: OBTENER_ARTICULO_ELIMINAR,
  payload: id
});

const deleteArticleSucces = () => ({
  type: ARTICULO_ELIMINADO_EXITO
});

const deleteArticleError = () => ({
  type: ARTICULO_ELIMINADO_ERROR,
  payload: true
});

export function getArticleEdit(article) {
  return dispatch => {
    dispatch(getArticleEditAction(article));
  };
}

const getArticleEditAction = article => ({
  type: OBTENER_ARTICULO_EDITAR,
  payload: article
});

export function editArticleAction(article) {
  return async dispatch => {
    dispatch(editArticle(article));
    try {
      await clienteAxios.put(`/posts/${article.id}`, article);
      dispatch(editArticleSucces(article));
    } catch (error) {
      dispatch(editArticleError());
    }
  };
}

const editArticle = () => ({
  type: COMENZAR_EDICION_ARTICULO
});

const editArticleSucces = article => ({
  type: ARTICULO_EDITADO_EXITO,
  payload: article
});

const editArticleError = () => ({
  type: ARTICULO_EDITADO_ERROR,
  payload: true
});
