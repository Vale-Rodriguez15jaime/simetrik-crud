import { combineReducers } from "redux";

import albumReducer from "./albumReducer";
import articleReducer from "./articleReducer";
import alertaReducer from "./alertaReducer";
import usersReducer from "./usersReducer";
import commentReducer from "./commentReducer";
import photoReducers from "./photoReducers";

export default combineReducers({
  album: albumReducer,
  article: articleReducer,
  alerta: alertaReducer,
  user: usersReducer,
  comment: commentReducer,
  photo: photoReducers
});
