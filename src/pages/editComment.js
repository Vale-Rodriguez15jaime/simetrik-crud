import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCommentAction } from "../actions/commentActions";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/styles.sass";
const EditComment = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [value, setValue] = useState({
    id: "",
    postId: "",
    name: "",
    email: "",
    body: ""
  });

  const commentEdit = useSelector(state => state.comment.commentsEdit);

  useEffect(() => {
    setValue(commentEdit);
  }, [commentEdit]);

  const onChangeForm = e => {
    setValue({
      ...value,
      [e.target.name]: [e.target.value]
    });
  };

  const { id, postId, name, email, body } = value;
  const submitEditComment = e => {
    e.preventDefault();
    dispatch(editCommentAction(value));
    history.push("/comentario");
  };
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Editar Comentario</p>
          </header>

          <form className='pd' onSubmit={submitEditComment}>
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
              <label className='label'>Post Id</label>
              <input
                className='input'
                type='number'
                placeholder='Id post'
                name='postId'
                value={postId}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Nombre</label>
              <input
                type='text'
                className='input'
                placeholder='Nombre'
                name='name'
                value={name}
                onChange={onChangeForm}
              />
            </div>

            <div className='field'>
              <label className='label'>Email</label>
              <input
                type='email'
                className='input'
                placeholder='Email'
                name='email'
                value={email}
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

export default EditComment;
