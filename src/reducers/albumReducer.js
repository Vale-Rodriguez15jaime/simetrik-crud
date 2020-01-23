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
  ALBUM_EDITADO_EXITO,
  ALBUM_EDITADO_ERROR
} from "../types";

const initialState = {
  albums: [],
  error: null,
  loading: false,
  albumsDelete: null,
  albumsEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CARGAR_FOTOS_ALBUM:
      let temp2 = state.albums.map(val => {
        if (val.id == action.payload.id) {
          val.loading = action.payload.load;
        } else {
          return val;
        }
      });
      return {
        ...state,
        loading: action.payload.load,
        albums: [...state.albums, temp2]
      };
    case COMENZAR_DESCARGA_ALBUM:
    case AGREGAR_ALBUM:
      return {
        ...state,
        loading: action.payload
      };

    case CARGAR_FOTOS_ALBUM_EXITO:
      let temp = state.albums.map(val => {
        if (val.id == action.payload.id) {
          val.photos = action.payload.photos;
          val.loading = false;
        } else {
          return val;
        }
      });
      return {
        ...state,
        loading: false,
        albums: [...state.albums, temp]
      };
    case AGREGAR_ALBUM_EXITO:
      return {
        ...state,
        loading: false,
        albums: [...state.albums, action.payload]
      };
    case CARGAR_FOTOS_ALBUM_ERROR:
    case AGREGAR_ALBUM_ERROR:
    case DESCARGA_ALBUM_ERROR:
    case ALBUM_EDITADO_ERROR:
    case ALBUM_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGA_ALBUM_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        albums: action.payload
      };

    case OBTENER_ALBUM_ELIMINAR:
      return {
        ...state,
        albumsDelete: action.payload
      };
    case ALBUM_ELIMINADO_EXITO:
      return {
        ...state,
        albums: state.albums.filter(album => album.id !== state.albumsDelete),
        albumsDelete: null
      };

    case OBTENER_ALBUM_EDITAR:
      return {
        ...state,
        albumsEdit: action.payload
      };
    case ALBUM_EDITADO_EXITO:
      return {
        ...state,
        albumsEdit: null,
        albums: state.albums.map(album =>
          album.id === action.payload.id ? (album = action.payload) : album
        )
      };

    default:
      return state;
  }
}
