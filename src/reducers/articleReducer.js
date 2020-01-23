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
  ARTICULO_EDITADO_EXITO,
  ARTICULO_EDITADO_ERROR,
  CARGAR_RELACION_TABLAS,
  CARGAR_RELACION_TABLAS_EXITO,
  CARGAR_RELACION_TABLAS_ERROR,
  CARGAR_RELACION_TABLASDOS,
  CARGAR_RELACION_TABLAS_EXITODOS,
  CARGAR_RELACION_TABLAS_ERRORDOS
} from "../types";

const initialState = {
  articles: [],
  error: null,
  loading: false,
  articleDelete: null,
  articleEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CARGAR_RELACION_TABLAS:
      let tabletemp = state.articles.map(article => {
        if (article.id == action.payload.id) {
          article.loading = action.payload.load;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: action.payload.load,
        article: [...state.articles, tabletemp]
      };
    case CARGAR_RELACION_TABLASDOS:
      let tabletem = state.articles.map(article => {
        if (article.userId == action.payload.id) {
          article.loading = action.payload.load;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: action.payload.load,
        article: [...state.articles, tabletem]
      };

    case COMENZAR_DESCARGA_ARTICULOS:
    case AGREGAR_ARTICULO:
      return {
        ...state,
        loading: action.payload
      };

    case CARGAR_RELACION_TABLAS_EXITO:
      let temp = state.articles.map(article => {
        if (article.id == action.payload.id) {
          article.comments = action.payload.comments;
          article.loading = false;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: false,
        articles: [...state.articles, temp]
      };

    case CARGAR_RELACION_TABLAS_EXITODOS:
      let temporal = state.articles.map(article => {
        if (article.userId == action.payload.id) {
          article.users = action.payload.users;
          article.loading = false;
        } else {
          return article;
        }
      });

      return {
        ...state,
        loading: false,
        articles: [...state.articles, temporal]
      };

    case AGREGAR_ARTICULO_EXITO:
      return {
        ...state,
        loading: false,
        articles: [...state.articles, action.payload]
      };
    case CARGAR_RELACION_TABLAS_ERROR:
    case CARGAR_RELACION_TABLAS_ERRORDOS:
    case DESCARGA_ARTICULOS_ERROR:
    case AGREGAR_ARTICULO_ERROR:
    case ARTICULO_ELIMINADO_ERROR:
    case ARTICULO_EDITADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGA_ARTICULOS_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        articles: action.payload
      };

    case OBTENER_ARTICULO_ELIMINAR:
      return {
        ...state,
        articleDelete: action.payload
      };
    case ARTICULO_ELIMINADO_EXITO:
      return {
        ...state,
        articles: state.articles.filter(
          article => article.id !== state.articleDelete
        ),
        articleDelete: null
      };

    case OBTENER_ARTICULO_EDITAR:
      return {
        ...state,
        articleEdit: action.payload
      };
    case ARTICULO_EDITADO_EXITO:
      return {
        ...state,
        articleEdit: null,
        articles: state.articles.map(article =>
          article.id === action.payload.id
            ? (article = action.payload)
            : article
        )
      };

    default:
      return state;
  }
}
