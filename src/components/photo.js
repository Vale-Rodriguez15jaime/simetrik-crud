import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deletePhotoAction, getPhotoEdit } from "../actions/photoActions";

const Photoo = ({ photo }) => {
  const { id, albumId, title, url, thumbnailUrl } = photo;

  const dispatch = useDispatch();
  const history = useHistory();
  const SIZE = "22";
  const confirmDeletePhoto = id => {
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
        dispatch(deletePhotoAction(id));
      }
    });
  };

  const redirectEdit = photo => {
    dispatch(getPhotoEdit(photo));
    history.push(`/foto/editar/${photo.id}`);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{albumId}</td>
      <td>{title}</td>
      <td>
        <img alt='cover' src={url} />
      </td>

      <td>
        <img alt='cover' src={thumbnailUrl} />
      </td>

      <td>
        <button
          className='button is-link is-outlined mr5'
          type='button'
          onClick={() => redirectEdit(photo)}>
          <FaEdit size={SIZE} />
        </button>
        <button
          className='button is-danger is-outlined mr5'
          onClick={() => confirmDeletePhoto(id)}
          type='button'>
          <FaTrash size={SIZE} />
        </button>
      </td>
    </tr>
  );
};

export default Photoo;
