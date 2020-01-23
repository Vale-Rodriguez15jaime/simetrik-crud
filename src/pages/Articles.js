import React, { useEffect } from "react";
import Article from "../components/Article";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getArticleAction } from "../actions/articleActions";
import { FaPlusCircle, FaArrowCircleLeft } from "react-icons/fa";
import "../styles/styles.sass";
const Articles = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadArticles = () => dispatch(getArticleAction());
    loadArticles();
    // eslint-disable-next-line
  }, []);

  const articles = useSelector(state => state.article.articles);
  const SIZE = "22";
  const error = useSelector(state => state.article.error);
  const cargando = useSelector(state => state.article.loading);

  return (
    <Layout>
      <div className='column is-12'>
        <div className='containerBtn'>
          <Link
            className='button is-link is-outlined mr15'
            to={"/articulos/nuevo"}>
            <FaPlusCircle size={SIZE} />
          </Link>

          <a className='button is-secondary mr15' href='/'>
            <FaArrowCircleLeft size={SIZE} />
          </a>
        </div>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Listado de Articulos</p>
          </header>

          {error ? <p>Hubo un error</p> : null}

          {cargando ? <p>Cargando...</p> : null}

          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>usuario</th>
                <th>Titulo</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {articles.length === 0
                ? "No hay Articulos"
                : articles.map(article => (
                    <Article key={article.id} article={article} />
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
