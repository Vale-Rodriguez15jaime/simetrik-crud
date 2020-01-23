import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/styles.sass";
import Layout from "../components/Layout";
import { createNewArticleAction } from "../actions/articleActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import Swal from "sweetalert2";
const NewArticle = ({ history }) => {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const error = useSelector(state => state.article.error);
  const alerta = useSelector(state => state.article.alerta);

  const addArticle = article => dispatch(createNewArticleAction(article));

  const submitNewArticle = e => {
    e.preventDefault();

    if (
      id.trim() === "" ||
      userId.trim() === "" ||
      title.trim() === "" ||
      body.trim() === ""
    ) {
      Swal.fire({
        title: "Campos Incompletos",
        text: "Debe llenar todos los campos para guardar el registro",
        icon: "warning",
        timer: 3000
      });
      dispatch(mostrarAlerta(alerta));
      return;
    }

    dispatch(ocultarAlertaAction());

    addArticle({
      id,
      userId,
      title,
      body
    });

    history.push("/articulos");
  };

  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Agregar Nuevo Articulo</p>
          </header>

          <form className='pd' onSubmit={submitNewArticle}>
            <div className='field'>
              <label className='label'>Id</label>

              <input
                className='input'
                type='number'
                placeholder='id'
                name='id'
                value={id}
                onChange={e => setId(e.target.value)}
              />
            </div>
            <div className='field'>
              <label className='label'>Id Usuario</label>
              <input
                className='input'
                type='number'
                placeholder='id de usuario'
                name='userId'
                value={userId}
                onChange={e => setUserId(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Titulo</label>
              <input
                className='input'
                type='text'
                placeholder='Titulo del articulo'
                name='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Descripción</label>
              <input
                className='input'
                type='text'
                placeholder='Descripción'
                name='body'
                value={body}
                onChange={e => setBody(e.target.value)}
              />
            </div>

            {error ? <p>Hubo un error</p> : null}

            <div className='center'>
              <button className='button is-link' type='submit'>
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewArticle;
