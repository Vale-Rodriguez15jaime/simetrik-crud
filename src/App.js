import React, { Suspense, lazy } from "react";
import Albums from "./pages/Albums";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
//import Home from "./pages/Home";
//import AdminArticles from './pages/AdminArticles'
import { Provider } from "react-redux";
import store from "./store";
import { ToastsContainer, ToastsStore } from "react-toasts";

const EditArticles = lazy(() => import("./pages/editArticle"));
const NewArticle = lazy(() => import("./pages/NewArticle"));
const NewUser = lazy(() => import("./pages/NewUser"));
const Users = lazy(() => import("./pages/Users"));
const EditUser = lazy(() => import("./pages/editUser"));
const NewComment = lazy(() => import("./pages/NewComment"));
const EditComment = lazy(() => import("./pages/editComment"));
const Comments = lazy(() => import("./pages/Comments"));
const NewAlbum = lazy(() => import("./pages/NewAlbum"));
const EditAlbum = lazy(() => import("./pages/editAlbum"));
const Photos = lazy(() => import("./pages/Photos"));
const NewPhoto = lazy(() => import("./pages/NewPhoto"));

const EditPhoto = lazy(() => import("./pages/editPhoto"));
const DetailAlbum = lazy(() => import("./pages/DetailAlbum"));
const EditOnline = lazy(() => import("./components/EditOnline"));
const Articles = lazy(() => import("./pages/Articles"));
const AdminArticles = lazy(() => import("./pages/AdminArticles"));
const Home = lazy(() => import("./pages/Home"));

function App() {
  return (
    <Router>
      <Provider store={store}>
        <Suspense fallback={<div>Loading</div>}>
          <div>
            <ToastsContainer store={ToastsStore} />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/adminArticulos' component={AdminArticles} />
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
        </Suspense>
      </Provider>
    </Router>
  );
}

export default App;
