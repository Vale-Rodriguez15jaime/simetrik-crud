import React from "react";
import "../styles/styles.sass";

const SideBar = () => {
  return (
    <div>
      <aside className='menu is-hidden-mobile'>
        <p className='menu-label'>Tablas</p>
        <ul className='menu-list'>
          <li>
            <a href='/usuario'>Usuarios</a>
          </li>
          <li>
            <a href='/articulos'>Articulos</a>
          </li>
          <li>
            <a href='/comentario'>Comentarios</a>
          </li>
          <li>
            <a href='/foto'>Fotos</a>
          </li>
        </ul>
        <p className='menu-label'>Administración</p>
        <ul className='menu-list'>
          <li>
            <a href='/adminArticulos'>Admin Articulos</a>
          </li>
          <li>
            <a href='/album'>Administración Albums</a>
          </li>
          <li>
            <a href='/editor'>Editor de Texto en Linea</a>
          </li>
        </ul>
      </aside>
    </div>
  );
};

export default SideBar;
