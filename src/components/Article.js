import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { deleteArticleAction, getArticleEdit } from "../actions/articleActions";

const Article = ({ article }) => {
  const { userId, id, title, body } = article;

  const dispatch = useDispatch();
  const history = useHistory();
  const SIZE = "22";
  const confirmDeleteArticle = id => {
    Swal.fire({
      title: "Estas seguro?",
      text: "Una vez que se eliminar no se puede eliminar",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Eliminar!",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.value) {
        dispatch(deleteArticleAction(id));
      }
    });
  };

  const redirectEdit = article => {
    dispatch(getArticleEdit(article));
    history.push(`/articulos/editar/${article.id}`);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{userId}</td>
      <td>
        <span> {title}</span>
      </td>
      <td>{body}</td>

      <td>
        <button
          className='button is-link is-outlined mr5'
          type='button'
          onClick={() => redirectEdit(article)}>
          <FaEdit size={SIZE} />
        </button>
        <button
          className='button is-danger is-outlined mr5'
          onClick={() => confirmDeleteArticle(id)}
          type='button'>
          <FaTrash size={SIZE} />
        </button>
      </td>
    </tr>
  );
};

export default Article;
