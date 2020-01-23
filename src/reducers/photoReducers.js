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
  FOTO_EDITADO_EXITO,
  FOTO_EDITADO_ERROR
} from "../types";

const initialState = {
  photos: [],
  error: null,
  loading: false,
  photosDelete: null,
  photosEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_FOTO:
    case AGREGAR_FOTO:
      return {
        ...state,
        loading: action.payload
      };

    case AGREGAR_FOTO_EXITO:
      return {
        ...state,
        loading: false,
        photos: [...state.photos, action.payload]
      };
    case AGREGAR_FOTO_ERROR:
    case DESCARGA_FOTO_ERROR:
    case FOTO_EDITADO_ERROR:
    case FOTO_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGA_FOTO_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        photos: action.payload
      };

    case OBTENER_FOTO_ELIMINAR:
      return {
        ...state,
        photosDelete: action.payload
      };
    case FOTO_ELIMINADO_EXITO:
      return {
        ...state,
        photos: state.photos.filter(photo => photo.id !== state.photosDelete),
        photosDelete: null
      };

    case OBTENER_FOTO_EDITAR:
      return {
        ...state,
        photosEdit: action.payload
      };
    case FOTO_EDITADO_EXITO:
      return {
        ...state,
        photosEdit: null,
        photos: state.photos.map(photo =>
          photo.id === action.payload.id ? (photo = action.payload) : photo
        )
      };

    default:
      return state;
  }
}
