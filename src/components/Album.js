import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  deleteAlbumAction,
  getAlbumEdit,
  getPhotoAlbumAction
} from "../actions/albumsActions";

const Album = ({ album }) => {
  const { userId, id, title } = album;

  const dispatch = useDispatch();
  const history = useHistory();
  const SIZE = "22";

  const load = useSelector(state => state.album.loading);
  if (album.photos == undefined && album.loading == undefined && !load) {
    dispatch(getPhotoAlbumAction(id));
  }

  const confirmDeleteAlbum = id => {
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
        dispatch(deleteAlbumAction(id));
      }
    });
  };

  const redirectEdit = album => {
    dispatch(getAlbumEdit(album));
    history.push(`/album/editar/${album.id}`);
  };
  const redirectView = album => {
    album.loading = undefined;
    album.photos = undefined;
    dispatch(getAlbumEdit(album));

    history.push(`/album/ver/${album.id}`);
  };

  return (
    <tr>
      <td>
        <button
          className='button is-link is-outlined mr5'
          type='button'
          onClick={() => redirectView(album)}>
          <FaEye size={SIZE} />
        </button>
      </td>
      <td>{id}</td>
      <td>{userId}</td>
      <td>{title}</td>
      <td>
        {album.loading !== undefined && album.loading == true
          ? "Cargando..."
          : ""}
        {album.photos !== undefined
          ? album.photos
              .slice(0, 4)
              .map((photo, index) => (
                <img
                  className='album-thumbnail'
                  key={index}
                  src={photo.thumbnailUrl}
                />
              ))
          : ""}
      </td>

      <td>
        <button
          className='button is-link is-outlined mr5'
          type='button'
          onClick={() => redirectEdit(album)}>
          <FaEdit size={SIZE} />
        </button>
        <button
          className='button is-danger is-outlined mr5'
          onClick={() => confirmDeleteAlbum(id)}
          type='button'>
          <FaTrash size={SIZE} />
        </button>
      </td>
    </tr>
  );
};

export default Album;
