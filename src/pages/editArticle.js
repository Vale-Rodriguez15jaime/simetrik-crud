import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editArticleAction } from "../actions/articleActions";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/styles.sass";
const EditArticles = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    id: "",
    userId: "",
    title: "",
    body: ""
  });

  const articleEdit = useSelector(state => state.article.articleEdit);

  useEffect(() => {
    setValue(articleEdit);
  }, [articleEdit]);

  const onChangeForm = e => {
    setValue({
      ...value,
      [e.target.name]: [e.target.value]
    });
  };

  const { id, userId, title, body } = value;

  const submitEditArticle = e => {
    e.preventDefault();
    dispatch(editArticleAction(value));
    history.push("/articulos");
  };
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Editar Articulo</p>
          </header>

          <form className='pd' onSubmit={submitEditArticle}>
            <div className='field'>
              <label className='label'>Id</label>
              <input
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
                type='text'
                className='input'
                placeholder='Titulo del articulo'
                name='title'
                value={title}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Descripción</label>
              <input
                type='text'
                className='input'
                placeholder='Descripción'
                name='body'
                value={body}
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

export default EditArticles;
