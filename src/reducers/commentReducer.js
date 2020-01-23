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
  COMENTARIO_EDITADO_ERROR
} from "../types";

const initialState = {
  comments: [],
  error: null,
  loading: false,
  commentsDelete: null,
  commentsEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_COMENTARIO:
    case AGREGAR_COMENTARIO:
      return {
        ...state,
        loading: action.payload
      };

    case AGREGAR_COMENTARIO_EXITO:
      return {
        ...state,
        loading: false,
        comments: [...state.comments, action.payload]
      };
    case AGREGAR_COMENTARIO_ERROR:
    case DESCARGA_COMENTARIO_ERROR:
    case COMENTARIO_EDITADO_ERROR:
    case COMENTARIO_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGA_COMENTARIO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        comments: action.payload
      };

    case OBTENER_COMENTARIO_ELIMINAR:
      return {
        ...state,
        commentsDelete: action.payload
      };
    case COMENTARIO_ELIMINADO_EXITO:
      return {
        ...state,
        comments: state.comments.filter(
          comment => comment.id !== state.commentsDelete
        ),
        commentsDelete: null
      };

    case OBTENER_COMENTARIO_EDITAR:
      return {
        ...state,
        commentsEdit: action.payload
      };
    case COMENTARIO_EDITADO_EXITO:
      return {
        ...state,
        commentsEdit: null,
        comments: state.comments.map(comment =>
          comment.id === action.payload.id
            ? (comment = action.payload)
            : comment
        )
      };

    default:
      return state;
  }
}
