import { ACTUALIZAR_TEXTO } from "../types";



const initialState = {
    codes: []
 
};

export default function(state = initialState, action) {
  switch (action.type) {
    case ACTUALIZAR_TEXTO:
      return {
        ...state,
        viewList: true,
        loading: action.payload
      };

    default:
      return state;
  }
}
