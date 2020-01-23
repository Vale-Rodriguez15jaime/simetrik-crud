import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editAlbumAction, getPhotoAlbumAction } from "../actions/albumsActions";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/styles.sass";
import Axios from "axios";

const DetailAlbum = props => {
  const [value, setValue] = useState({
    id: "",
    userId: "",
    title: ""
  });
  const [loaded, setLoaded] = useState(false);

  const history = useHistory();
  const dispatch = useDispatch();
  const load = useSelector(state => state.album.loading);
  const [albumEdit, setAlbumEdit] = useState(
    useSelector(state => state.album.albumsEdit)
  );
  if (albumEdit == undefined) {
    Axios.get(
      "https://jsonplaceholder.typicode.com/albums?id=" + props.match.params.id
    ).then(res => {
      Axios.get(
        "https://jsonplaceholder.typicode.com/photos?albumId=" +
          props.match.params.id
      ).then(res2 => {
        let alm = res.data[0];
        alm.loading = false;
        alm.photos = res2.data;
        setAlbumEdit(alm);
      });
    });
  } else {
    if (loaded == false) {
      setLoaded(true);
      setValue(albumEdit);
    }
  }
  if (loaded == false) {
    return <h1>Cargando...</h1>;
  }

  const onChangeForm = e => {
    setValue({
      ...value,
      [e.target.name]: [e.target.value]
    });
  };

  const { id, userId, title } = value;

  if (value.photos == undefined && value.loading == undefined && !load) {
    dispatch(getPhotoAlbumAction(value.id, true));
  }

  const submitAlbum = e => {
    e.preventDefault();
    dispatch(editAlbumAction(value));
    history.push("/album");
  };
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Ver Album</p>
          </header>

          <form className='pd' onSubmit={submitAlbum}>
            <div className='field'>
              <label className='label'>Id</label>

              <input
                disabled
                className='input'
                type='text'
                placeholder='Id'
                name='id'
                value={id}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Id Usuario</label>
              <input
                disabled
                type='number'
                className='input'
                placeholder='Id del Usuario'
                name='userId'
                value={userId}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Titulo</label>
              <input
                disabled
                type='text'
                className='input'
                placeholder='Titulo del articulo'
                name='title'
                value={title}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Foto</label>

              <td>
                {value.loading !== undefined && value.loading == true
                  ? "Cargando..."
                  : ""}
                {value.photos !== undefined
                  ? value.photos.map((photo, index) => (
                      <img
                        className='album-thumbnail'
                        key={index}
                        src={photo.thumbnailUrl}
                      />
                    ))
                  : ""}
              </td>
            </div>
            <div className='center'></div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default DetailAlbum;
