import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { getArticleAction } from "../actions/articleActions";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "../styles/styles.sass";
import AdminArticle from "../components/AdminArticle";

function useSearch(articles) {
  const [query, setQuery] = React.useState("");
  const [filteredArticle, setFilteredArticle] = React.useState(articles);

  React.useMemo(() => {
    const result = articles.filter(article => {
      let us =
        article.users !== undefined
          ? `${article.users.name}`
              .toLowerCase()
              .includes(query.toLowerCase()) ||
            `${article.users.username}`
              .toLowerCase()
              .includes(query.toLowerCase())
          : false;
      return (
        `${article.title}`.toLowerCase().includes(query.toLowerCase()) ||
        `${article.id}`.includes(query) ||
        us
      );
    });
    setFilteredArticle(result);
  }, [articles, query]);
  return { query, setQuery, filteredArticle };
}

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
  const { query, setQuery, filteredArticle } = useSearch(articles);
  const [byPage, setByPage] = useState(20);
  const [page, setPage] = useState(1);
  const articleList = filteredArticle.filter(
    val => val.id < byPage * page && val.id >= byPage * page - byPage
  );

  if (filteredArticle.length === 0) {
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
        <div className='containerBtn'>
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

          <div className='card-content list-of-post'>
            {articles.length === 0 ? (
              <p>No hay articulos</p>
            ) : (
              articleList.map(article => {
                return <AdminArticle key={article.id} article={article} />;
              })
            )}
          </div>
          <div className='center-page'>
            <FaArrowCircleLeft
              onClick={e => setPage(page == 1 ? 1 : page - 1)}
            />
            <span>Pagina {page}</span>
            <FaArrowCircleRight
              onClick={e =>
                setPage(
                  filteredArticle.length < page * byPage ? page : page + 1
                )
              }
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Articles;
