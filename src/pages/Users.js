import React, { Fragment, useEffect } from "react";
import User from "../components/User";
import Layout from "../components/Layout";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaPlusCircle, FaArrowCircleLeft } from "react-icons/fa";
import { getUserAction } from "../actions/usersAction";
import "../styles/styles.sass";
const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const loadUsers = () => dispatch(getUserAction());
    loadUsers();
    // eslint-disable-next-line
  }, []);

  const users = useSelector(state => state.user.users);
  const SIZE = "22";
  const error = useSelector(state => state.user.error);
  const cargando = useSelector(state => state.user.loading);

  return (
    <Layout>
      <div className='column is-12'>
        <div className='containerBtn'>
          <Link
            className='button is-link is-outlined mr15'
            to={"/usuario/nuevo"}>
            <FaPlusCircle size={SIZE} />
          </Link>

          <a className='button is-secondary mr15' href='/'>
            <FaArrowCircleLeft size={SIZE} />
          </a>
        </div>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Listado de Usuarios</p>
          </header>

          {error ? <p>Hubo un error</p> : null}

          {cargando ? <p>Cargando...</p> : null}

          <table className='table'>
            <thead>
              <tr>
                <th>Id</th>
                <th>Nombre</th>
                <th>Username</th>
                <th>Email</th>
                <th>Ciudad</th>
                <th>Compañia</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0
                ? "No hay Usuarios"
                : users.map(user => <User key={user.id} user={user} />)}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
