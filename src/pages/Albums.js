import React, { useEffect, useState } from "react";
import Album from "../components/Album";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import {
  FaPlusCircle,
  FaArrowCircleLeft,
  FaArrowCircleRight
} from "react-icons/fa";

import { useSelector, useDispatch } from "react-redux";
import { getAlbumAction } from "../actions/albumsActions";

function useSearch(albums) {
  const [query, setQuery] = React.useState("");
  const [filteredAlbums, setFilteredAlbums] = React.useState(albums);

  React.useMemo(() => {
    const result = albums.filter(albums => {
      return (
        `${albums.title}`.toLowerCase().includes(query.toLowerCase()) ||
        `${albums.id}`.includes(query)
      );
    });
    setFilteredAlbums(result);
  }, [albums, query]);
  return { query, setQuery, filteredAlbums };
}

const Albums = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadAlbums = () => dispatch(getAlbumAction());
    loadAlbums();
    // eslint-disable-next-line
  }, []);

  const [byPage, setByPage] = useState(10);
  const [page, setPage] = useState(1);

  const albums = useSelector(state => state.album.albums);
  const SIZE = "22";
  const error = useSelector(state => state.album.error);

  const { query, setQuery, filteredAlbums } = useSearch(albums);

  const albumsList = filteredAlbums.filter(
    val => val.id < byPage * page && val.id >= byPage * page - byPage
  );

  if (albumsList.length === 0) {
    return (
      <div className='card'>
        <header className='card-header'>
          <p className='card-header-title'>Busqueda</p>
          <a href='#' className='card-header-icon' aria-label='more options'>
            <span className='icon'>
              <i className='fa fa-angle-down' aria-hidden='true'></i>
            </span>
          </a>
        </header>
        <div className='card-content'>
          <div className='content'>
            <div className='control has-icons-left has-icons-right'>
              <input
                className='input is-large'
                type='text'
                placeholder='Escriba aqui...'
                value={query}
                onChange={e => {
                  setQuery(e.target.value);
                }}
              />
              <span className='icon is-medium is-left'>
                <i className='fa fa-search'></i>
              </span>
              <span className='icon is-medium is-right'>
                <i className='fa fa-check'></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Layout>
      <div className='column is-12'>
        <div className='card'>
          <header className='card-header'>
            <p className='card-header-title'>Busqueda</p>
            <a href='#' className='card-header-icon' aria-label='more options'>
              <span className='icon'>
                <i className='fa fa-angle-down' aria-hidden='true'></i>
              </span>
            </a>
          </header>
          <div className='card-content'>
            <div className='content'>
              <div className='control has-icons-left has-icons-right'>
                <input
                  className='input is-large'
                  type='text'
                  value={query}
                  onChange={e => {
                    setQuery(e.target.value);
                  }}
                />
                <span className='icon is-medium is-left'>
                  <i className='fa fa-search'></i>
                </span>
                <span className='icon is-medium is-right'>
                  <i className='fa fa-check'></i>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className='card events-card'>
          <div className='containerBtn'>
            <Link
              className='button is-link is-outlined mr15'
              to={"/album/nuevo"}>
              <FaPlusCircle size={SIZE} />
            </Link>

            <a className='button is-secondary mr15' href='/'>
              <FaArrowCircleLeft size={SIZE} />
            </a>
          </div>

          <header className='card-header DB'>
            <p className='card-header-title center'>Listado de Album</p>
          </header>

          {error ? <p>Hubo un error</p> : null}

          <table className='table'>
            <thead>
              <tr>
                <th>Ver</th>
                <th>Id</th>
                <th>Id usuario</th>
                <th>Titulo</th>
                <th>Foto</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {albums.length === 0 ? (
                <tr>
                  <td colSpan='5' className='center-page'>
                    "No hay Albums"
                  </td>
                </tr>
              ) : (
                albumsList.map(album => <Album key={album.id} album={album} />)
              )}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan='5' className='center-page'>
                  <FaArrowCircleLeft
                    onClick={e => setPage(page == 1 ? 1 : page - 1)}
                  />
                  <span>Pagina {page}</span>
                  <FaArrowCircleRight
                    onClick={e =>
                      setPage(
                        filteredAlbums.length < page * byPage ? page : page + 1
                      )
                    }
                  />
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Albums;
