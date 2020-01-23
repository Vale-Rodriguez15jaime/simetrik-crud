import {
  AGREGAR_TABLA,
  AGREGAR_TABLA_ERROR,
  AGREGAR_TABLA_EXITO,
  COMENZAR_DESCARGA_TABLA,
  DESCARGA_TABLA_ERROR,
  DESCARGA_TABLA_EXITO,
  OBTENER_TABLA_ELIMINAR,
  TABLA_ELIMINADO_EXITO,
  TABLA_ELIMINADO_ERROR,
  OBTENER_TABLA_EDITAR,
  TABLA_EDITADO_EXITO,
  TABLA_EDITADO_ERROR
} from "../types";

const initialState = {
  todos: [],
  error: null,
  todos_loading: false,
  tab_todos: false,
  search: "",

  todosDelete: null,
  todosEdit: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case COMENZAR_DESCARGA_TABLA:
    case AGREGAR_TABLA:
      return {
        ...state,
        loading: action.payload
      };

    case AGREGAR_TABLA_EXITO:
      return {
        ...state,
        loading: false,
        todos: [...state.todos, action.payload]
      };
    case AGREGAR_TABLA_ERROR:
    case DESCARGA_TABLA_ERROR:
    case TABLA_EDITADO_ERROR:
    case TABLA_ELIMINADO_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case DESCARGA_TABLA_EXITO:
      return {
        ...state,
        loading: false,
        error: null,
        todos: action.payload
      };

    case OBTENER_TABLA_ELIMINAR:
      return {
        ...state,
        todosDelete: action.payload
      };
    case TABLA_ELIMINADO_EXITO:
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== state.todosDelete),
        todosDelete: null
      };

    case OBTENER_TABLA_EDITAR:
      return {
        ...state,
        todosEdit: action.payload
      };
    case TABLA_EDITADO_EXITO:
      return {
        ...state,
        todosEdit: null,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ? (todo = action.payload) : todo
        )
      };

    default:
      return state;
  }
}
