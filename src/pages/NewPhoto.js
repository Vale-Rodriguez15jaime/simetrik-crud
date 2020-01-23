import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/styles.sass";
import Layout from "../components/Layout";
import Swal from "sweetalert2";

import { createNewPhotoAction } from "../actions/photoActions";
import { mostrarAlerta, ocultarAlertaAction } from "../actions/alertaActions";

const NewPhoto = ({ history }) => {
  const [id, setId] = useState("");
  const [albumId, setAlbumId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");

  const dispatch = useDispatch();

  const error = useSelector(state => state.photo.error);
  const alerta = useSelector(state => state.photo.alerta);

  const addPhoto = photo => dispatch(createNewPhotoAction(photo));

  const submitNewPhoto = e => {
    e.preventDefault();

    if (
      id.trim() === "" ||
      albumId.trim() === "" ||
      title.trim() === "" ||
      url.trim() === "" ||
      thumbnailUrl.trim() === ""
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

    addPhoto({
      id,
      albumId,
      title,
      url,
      thumbnailUrl
    });

    history.push("/foto");
  };

  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Agregar Nueva Foto</p>
          </header>

          <form className='pd' onSubmit={submitNewPhoto}>
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
              <label className='label'>Id Album</label>

              <input
                className='input'
                type='number'
                placeholder='id album'
                name='albumId'
                value={albumId}
                onChange={e => setAlbumId(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Titulo</label>
              <input
                className='input'
                type='text'
                placeholder='Titulo'
                name='title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </div>

            <div className='field'>
              <label className='label'>Url de La foto</label>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className='input '
                  type='text'
                  placeholder='Url'
                  name='url'
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </div>
            </div>

            <div className='field'>
              <label className='label'>Miniatura</label>

              <div className='control has-icons-left has-icons-right'>
                <input
                  className='input '
                  type='email'
                  placeholder='Url foto Min'
                  name='thumbnailUrl'
                  value={thumbnailUrl}
                  onChange={e => setThumbnailUrl(e.target.value)}
                />
              </div>
            </div>

            {error ? (
              <p>
                Hubo un error <bold>${error}</bold>{" "}
              </p>
            ) : null}

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

export default NewPhoto;
