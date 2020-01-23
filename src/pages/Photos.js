import React, { useEffect } from "react";
import Photoo from "../components/photo";

import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlusCircle, FaArrowCircleLeft } from "react-icons/fa";
import { getPhotoAction } from "../actions/photoActions";
import "../styles/styles.sass";
const Photos = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadPhoto = () => dispatch(getPhotoAction());
    loadPhoto();
    // eslint-disable-next-line
  }, []);

  const photos = useSelector(state => state.photo.photos);
  const SIZE = "22";
  const error = useSelector(state => state.photo.error);
  const cargando = useSelector(state => state.photo.loading);

  return (
    <Layout>
      <div className='column is-12'>
        <div className='containerBtn'>
          <Link className='button is-link is-outlined mr15' to={"/foto/nuevo"}>
            <FaPlusCircle size={SIZE} />
          </Link>

          <a className='button is-secondary mr15' href='/'>
            <FaArrowCircleLeft size={SIZE} />
          </a>
        </div>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Listado de Fotos</p>
          </header>

          {error ? <p>Hubo un error</p> : null}

          {cargando ? <p>Cargando...</p> : null}

          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Id del Album</th>
                <th>Titulo</th>
                <th>Foto</th>
                <th>Miniatura</th>
              </tr>
            </thead>

            <tbody>
              {photos.length === 0
                ? "No hay Fotos"
                : photos.map(photo => <Photoo key={photo.id} photo={photo} />)}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Photos;
