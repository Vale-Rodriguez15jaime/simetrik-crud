import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editPhotoAction } from "../actions/photoActions";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/styles.sass";
const EditPhoto = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    id: "",
    albumId: "",
    title: "",
    url: "",
    thumbnailUrl: ""
  });

  const photoEdit = useSelector(state => state.photo.photosEdit);

  useEffect(() => {
    setValue(photoEdit);
  }, [photoEdit]);

  const onChangeForm = e => {
    setValue({
      ...value,
      [e.target.name]: [e.target.value]
    });
  };

  const { id, albumId, title, url, thumbnailUrl } = value;

  const submitEditPhoto = e => {
    e.preventDefault();
    dispatch(editPhotoAction(value));
    history.push("/foto");
  };
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Editar Fotos</p>
          </header>

          <form className='pd' onSubmit={submitEditPhoto}>
            <div className='field'>
              <label className='label'>Id</label>
              <input
                className='input'
                type='number'
                placeholder='Id'
                name='id'
                value={id}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Album Id</label>
              <input
                type='text'
                className='input'
                placeholder='albumId'
                name='albumId'
                value={albumId}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Titulo</label>
              <input
                type='text'
                className='input'
                placeholder='Titulo'
                name='title'
                value={title}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Url de la foto</label>
              <input
                type='text'
                className='input'
                placeholder='url'
                name='url'
                value={url}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Url Miniatura</label>
              <input
                type='text'
                className='input'
                placeholder='Miniatura'
                name='thumbnailUrl'
                value={thumbnailUrl}
                onChange={onChangeForm}
              />
            </div>
            <div className='center'>
              <button className='button is-link' type='submit'>
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default EditPhoto;
