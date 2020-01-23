import {
  AGREGAR_USUARIO,
  AGREGAR_USUARIO_ERROR,
  AGREGAR_USUARIO_EXITO,
  COMENZAR_DESCARGA_USUARIO,
  DESCARGA_USUARIO_ERROR,
  DESCARGA_USUARIO_EXITO,
  OBTENER_USUARIO_ELIMINAR,
  USUARIO_ELIMINADO_EXITO,
  USUARIO_ELIMINADO_ERROR,
  OBTENER_USUARIO_EDITAR,
  COMENZAR_EDICION_USUARIO,
  USUARIO_EDITADO_EXITO,
  USUARIO_EDITADO_ERROR
} from "../types";

import clienteAxios from "../config/axios";
import Swal from "sweetalert2";

export function createNewUserAction(user) {
  return async dispatch => {
    dispatch(addUser());
    try {
      await clienteAxios.post("/users", user);

      dispatch(addUserSucces(user));
      Swal.fire("Correcto", "El usuario se agrego", "succes");
    } catch (error) {
      dispatch(addUserError(true));
      Swal.fire({
        icon: "error",
        title: "hubo un error",
        text: "hubo un error, Intenta de Nuevo"
      });
    }
  };
}

const addUser = () => ({
  type: AGREGAR_USUARIO,
  payload: true
});

const addUserSucces = user => ({
  type: AGREGAR_USUARIO_EXITO,
  payload: user
});

const addUserError = estado => ({
  type: AGREGAR_USUARIO_ERROR,
  payload: estado
});

export function getUserAction() {
  return async dispatch => {
    dispatch(downloadUser());
    try {
      const response = await clienteAxios.get("/users");
      dispatch(downloadUserSucces(response.data));
    } catch (error) {
      dispatch(downloadUserError());
    }
  };
}

const downloadUser = () => ({
  type: COMENZAR_DESCARGA_USUARIO,
  payload: true
});

const downloadUserSucces = users => ({
  type: DESCARGA_USUARIO_EXITO,
  payload: users
});

const downloadUserError = () => ({
  type: DESCARGA_USUARIO_ERROR,
  payload: true
});

export function deleteUserAction(id) {
  return async dispatch => {
    dispatch(getUserDelete(id));

    try {
      await clienteAxios.delete(`/users/${id}`);
      dispatch(deleteUserSucces());
      Swal.fire("Eliminado", "El usuario se elimino correctamente.", "success");
    } catch (error) {
      console.log(error);
      dispatch(deleteUserError());
    }
  };
}

const getUserDelete = id => ({
  type: OBTENER_USUARIO_ELIMINAR,
  payload: id
});

const deleteUserSucces = () => ({
  type: USUARIO_ELIMINADO_EXITO
});

const deleteUserError = () => ({
  type: USUARIO_ELIMINADO_ERROR,
  payload: true
});

export function getUserEdit(user) {
  return dispatch => {
    dispatch(getUserEditAction(user));
  };
}

const getUserEditAction = user => ({
  type: OBTENER_USUARIO_EDITAR,
  payload: user
});

export function editUserAction(user) {
  return async dispatch => {
    dispatch(editUser(user));
    try {
      await clienteAxios.put(`/users/${user.id}`, user);
      dispatch(editUserSucces(user));
    } catch (error) {
      dispatch(editUserError());
    }
  };
}

const editUser = () => ({
  type: COMENZAR_EDICION_USUARIO
});

const editUserSucces = user => ({
  type: USUARIO_EDITADO_EXITO,
  payload: user
});

const editUserError = () => ({
  type: USUARIO_EDITADO_ERROR,
  payload: true
});
