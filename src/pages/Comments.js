import React, { Fragment, useEffect } from "react";
import Comment from "../components/Comment";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCommentAction } from "../actions/commentActions";
import "../styles/styles.sass";
import { FaPlusCircle, FaArrowCircleLeft } from "react-icons/fa";
const Comments = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadComments = () => dispatch(getCommentAction());
    loadComments();
    // eslint-disable-next-line
  }, []);

  const comments = useSelector(state => state.comment.comments);
  const SIZE = "22";
  const error = useSelector(state => state.comment.error);
  const cargando = useSelector(state => state.comment.loading);

  return (
    <Layout>
      <div className='column is-12'>
        <div className='containerBtn'>
          <Link
            className='button is-link is-outlined mr15'
            to={"/comentario/nuevo"}>
            <FaPlusCircle size={SIZE} />
          </Link>

          <a className='button is-secondary mr15' href='/'>
            <FaArrowCircleLeft size={SIZE} />
          </a>
        </div>

        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Listado de Comentarios</p>
          </header>

          {error ? <p>Hubo un error</p> : null}

          {cargando ? <p>Cargando...</p> : null}

          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>postId</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Descripción</th>
              </tr>
            </thead>

            <tbody>
              {comments.length === 0
                ? "No hay Comentarios"
                : comments.map(comment => (
                    <Comment key={comment.id} comment={comment} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Comments;
