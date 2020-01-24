import React from "react";
import Albums from "./pages/Albums";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AdminArticles from './pages/AdminArticles'
import { Provider } from "react-redux";
import store from "./store";
import Articles from "./pages/Articles";
import EditArticles from "./pages/editArticle";
import NewArticle from "./pages/NewArticle";
import NewUser from "./pages/NewUser";
import Users from "./pages/Users";
import EditUser from "./pages/editUser";
import NewComment from "./pages/NewComment";
import EditComment from "./pages/editComment";
import Comments from "./pages/Comments";
import NewAlbum from "./pages/NewAlbum";
import EditAlbum from "./pages/editAlbum";
import Photos from "./pages/Photos";
import NewPhoto from "./pages/NewPhoto";
import EditPhoto from "./pages/editPhoto";
import DetailAlbum from "./pages/DetailAlbum";
import EditOnline from "./components/EditOnline";

function App() {
  return (
    <Router>
      <Provider store={store}>
        <div>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/adminArticulos' component={AdminArticles
            } />

            <Route exact path='/articulos' component={Articles} />
            <Route exact path='/articulos/nuevo' component={NewArticle} />
            <Route
              exact
              path='/articulos/editar/:id'
              component={EditArticles}
            />
            <Route exact path='/usuario' component={Users} />
            <Route exact path='/usuario/nuevo' component={NewUser} />
            <Route exact path='/usuario/editar/:id' component={EditUser} />

            <Route exact path='/comentario' component={Comments} />
            <Route exact path='/comentario/nuevo' component={NewComment} />
            <Route
              exact
              path='/comentario/editar/:id'
              component={EditComment}
            />
            <Route exact path='/album' component={Albums} />
            <Route exact path='/album/nuevo' component={NewAlbum} />
            <Route exact path='/album/editar/:id' component={EditAlbum} />
            <Route exact path='/album/ver/:id' component={DetailAlbum} />

            <Route exact path='/foto' component={Photos} />
            <Route exact path='/foto/nuevo' component={NewPhoto} />
            <Route exact path='/foto/editar/:id' component={EditPhoto} />\
            <Route exact path='/editor' component={EditOnline} />
          </Switch>
        </div>
      </Provider>
    </Router>
  );
}

export default App;
