import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/styles.sass";
import Layout from "../components/Layout";

import { createNewCommentAction } from "../actions/commentActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import Swal from "sweetalert2";
const NewComment = ({ history }) => {
  const [id, setId] = useState("");
  const [postId, setPostId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [body, setBody] = useState("");

  const dispatch = useDispatch();

  const loading = useSelector(state => state.comment.loading);
  const error = useSelector(state => state.comment.error);
  const alerta = useSelector(state => state.comment.alerta);

  const addComment = comment => dispatch(createNewCommentAction(comment));

  const submitNewComment = e => {
    e.preventDefault();

    if (
      id.trim() === "" ||
      postId.trim() === "" ||
      name.trim() === "" ||
      email.trim() === "" ||
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

    addComment({
      id,
      postId,
      name,
      email,
      body
    });

    history.push("/comentario");
  };

  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Agregar Nuevo Comentario</p>
          </header>

          <form className='pd' onSubmit={submitNewComment}>
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
              <label className='label'>Post Id</label>

              <input
                className='input'
                type='number'
                placeholder='id Post'
                name='postId'
                value={postId}
                onChange={e => setPostId(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Nombre</label>
              <input
                className='input'
                type='text'
                placeholder='Nombre'
                name='name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Email</label>

              <input
                className='input'
                type='email'
                placeholder='Email input'
                name='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
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

            {loading ? <p>CARGANDO</p> : null}

            {error ? console.log(error) : null}

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

export default NewComment;
