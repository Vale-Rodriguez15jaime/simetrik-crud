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
  USUARIO_EDITADO_EXITO,
  USUARIO_EDITADO_ERROR
} from "../types";

const initialState = {
  users: [],
  error: null,
  loading: false,
  usersDelete: null,
  usersEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_USUARIO:
    case AGREGAR_USUARIO:
      return {
        ...state,
        loading: action.payload
      };

    case AGREGAR_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        users: [...state.users, action.payload]
      };
    case AGREGAR_USUARIO_ERROR:
    case DESCARGA_USUARIO_ERROR:
    case USUARIO_EDITADO_ERROR:
    case USUARIO_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGA_USUARIO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        users: action.payload
      };

    case OBTENER_USUARIO_ELIMINAR:
      return {
        ...state,
        usersDelete: action.payload
      };
    case USUARIO_ELIMINADO_EXITO:
      return {
        ...state,
        users: state.users.filter(user => user.id !== state.usersDelete),
        usersDelete: null
      };

    case OBTENER_USUARIO_EDITAR:
      return {
        ...state,
        usersEdit: action.payload
      };
    case USUARIO_EDITADO_EXITO:
      return {
        ...state,
        usersEdit: null,
        users: state.users.map(user =>
          user.id === action.payload.id ? (user = action.payload) : user
        )
      };

    default:
      return state;
  }
}
