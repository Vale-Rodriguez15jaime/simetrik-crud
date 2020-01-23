import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/styles.sass";
import Layout from "../components/Layout";
import { createNewAlbumAction } from "../actions/albumsActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";
import Swal from "sweetalert2";
const NewAlbum = ({ history }) => {
  const [id, setId] = useState("");
  const [userId, setUserId] = useState("");
  const [title, setTitle] = useState("");

  const dispatch = useDispatch();

  const loading = useSelector(state => state.album.loading);
  const error = useSelector(state => state.album.error);
  const alerta = useSelector(state => state.album.alerta);

  const addAlbum = album => dispatch(createNewAlbumAction(album));

  const submitNewAlbum = e => {
    e.preventDefault();

    if (id.trim() === "" || userId.trim() === "" || title.trim() === "") {
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

    addAlbum({
      id,
      userId,
      title
    });

    history.push("/album");
  };

  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Agregar Nuevo Album</p>
          </header>

          <form className='pd' onSubmit={submitNewAlbum}>
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
                placeholder='Titulo del album'
                name='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            {loading ? <p>Cargando</p> : null}
            {error ? <p>Hubo un error {error}</p> : null}

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

export default NewAlbum;
