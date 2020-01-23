import React from "react";
import { useHistory } from "react-router-dom";
import Swals from "sweetalert2";
import Loader from "react-loader-spinner";
import withReactContent from "sweetalert2-react-content";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteArticleAction,
  getRelationArticle,
  getRelationArticle2
} from "../actions/articleActions";
const Swal = withReactContent(Swals);

const AdminArticle = ({ article }) => {
  const { userId, id, title, body } = article;

  const dispatch = useDispatch();

  const load = useSelector(state => state.article.loading);
  if (
    article.users == undefined &&
    (article.loading == undefined || article.loading == false) &&
    !load
  ) {
    dispatch(getRelationArticle2(userId));
  }
  if (
    article.comments == undefined &&
    (article.loading == undefined || article.loading == false) &&
    !load
  ) {
    dispatch(getRelationArticle(id));
  }
  const openComment = () => {
    Swal.fire({
      title: "Comentarios",
      html:
        article.comments == undefined ? (
          <Loader
            type='RevolvingDot'
            color='#aaaaaa'
            height={100}
            width={100}
            timeout={10000}></Loader>
        ) : (
          <div>
            {article.comments.map(comment => (
              <div className='card' style={{ marginBottom: "10px" }}>
                <div className='card-header'>
                  <div className='card-header-title'>{comment.name}</div>
                </div>
                <div className='card-content'>{comment.body}</div>
                <div className='card-footer'>
                  <div className='card-footer-item'>{comment.email}</div>
                </div>
              </div>
            ))}
          </div>
        )
    });
  };
  const confirmDeleteArticle = id => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una vez que se eliminar no se puede eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        dispatch(deleteArticleAction(id));
      }
    });
  };

  return (
    <div className='card post-item'>
      <div className='card-content'>
        <div className='media'>
          <div className='media-left'>
            <figure className='image is-48x48'>
              <img
                src='https://bulma.io/images/placeholders/96x96.png'
                alt='Placeholder image'
              />
            </figure>
          </div>
          <div className='media-content'>
            <p className='title is-4'>
              {article.users !== undefined ? article.users.name : "Cargando.."}
            </p>
            <p className='subtitle is-6'>
              @
              {article.users !== undefined
                ? article.users.username
                : "Cargando.."}
            </p>
          </div>
        </div>

        <div className='content'>
          <div>
            <b>{article.title}</b>
          </div>
          {article.body}
          <br />
          <div>
            <b style={{ cursor: "pointer" }} onClick={openComment}>
              Comentarios (
              {article.comments !== undefined ? article.comments.length : "..."})
            </b>
          </div>
          <time dateTime={new Date()}>11:09 PM - 22 Jan 2019</time>
        </div>
      </div>
    </div>
  );
};

export default AdminArticle;
