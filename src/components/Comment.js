import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { deleteCommentAction, getCommentEdit } from "../actions/commentActions";

const Comment = ({ comment }) => {
  const { id, postId, name, email, body } = comment;

  const dispatch = useDispatch();
  const history = useHistory();
  const SIZE = "22";
  const confirmDeleteComment = id => {
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
        dispatch(deleteCommentAction(id));
      }
    });
  };

  const redirectEdit = comment => {
    dispatch(getCommentEdit(comment));
    history.push(`/comentario/editar/${comment.id}`);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{postId}</td>
      <td>{name}</td>

      <td>{email}</td>
      <td>{body}</td>

      <td>
        <button
          className='button is-link is-outlined mr5'
          type='button'
          onClick={() => redirectEdit(comment)}>
          <FaEdit size={SIZE} />
        </button>
        <button
          className='button is-danger is-outlined mr5'
          onClick={() => confirmDeleteComment(id)}
          type='button'>
          <FaTrash size={SIZE} />
        </button>
      </td>
    </tr>
  );
};

export default Comment;
