import React from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteUserAction, getUserEdit } from "../actions/usersAction";

const User = ({ user }) => {
  const { id, name, username, email, company } = user;

  const dispatch = useDispatch();
  const history = useHistory();
  const SIZE = "22";
  const confirmDeleteUser = id => {
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
        dispatch(deleteUserAction(id));
      }
    });
  };

  const redirectEdit = user => {
    dispatch(getUserEdit(user));
    history.push(`/usuario/editar/${user.id}`);
  };

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>
        <span> {username}</span>
      </td>
      <td>{email}</td>
      <td>
        {
          <ul style={{ listStyle: "circle" }}>
            {Object.values(user.address).map(field => {
              if (typeof field == "object") {
                return Object.entries(field)
                  .map(intoField => {
                    return (
                      <li>
                        {intoField[0]}: {intoField[1]}
                      </li>
                    );
                  })
                  .reduce(
                    (acc, x) => (acc === null ? [x] : [acc, "", x]),
                    null
                  );
              } else {
                return <li>{field}</li>;
              }
            })}
          </ul>
        }
      </td>
      <td>
        <ul style={{ listStyle: "circle" }}>
          {Object.values(company).map(field => {
            return <li>{field}</li>;
          })}
        </ul>
      </td>

      <td>
        <button
          className='button is-link is-outlined mr5'
          type='button'
          onClick={() => redirectEdit(user)}>
          <FaEdit size={SIZE} />
        </button>
        <button
          className='button is-danger is-outlined mr5'
          onClick={() => confirmDeleteUser(id)}
          type='button'>
          <FaTrash size={SIZE} />
        </button>
      </td>
    </tr>
  );
};

export default User;
