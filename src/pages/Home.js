import React from "react";
import Layout from "../components/Layout";

const Home = () => (
  <div>
    <Layout>
      <section className='hero is-info welcome is-small'>
        <div className='hero-body'>
          <div className='container'>
            <h1 className='title'>Hola, Admin.</h1>
            <h2 className='subtitle'>Administracion de tablas</h2>
          </div>
        </div>
      </section>

      <div className='columns'>
        <div className='column is-6'>
          <div className='card events-card'>
            <header className='card-header'>
              <p className='card-header-title'>Tablas</p>
              <a
                href='#'
                className='card-header-icon'
                aria-label='more options'>
                <span className='icon'>
                  <i className='fa fa-angle-down' aria-hidden='true'></i>
                </span>
              </a>
            </header>
            <div className='card-table'>
              <div className='content'>
                <table className='table is-fullwidth is-striped'>
                  <tbody>
                    <tr>
                      <td width='5%'>
                        <i className='fa fa-bell-o'></i>
                      </td>
                      <td>Articulos</td>
                      <td className='level-right'>
                        <a
                          className='button is-small is-link'
                          href='/articulos'>
                          Ver
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td width='5%'>
                        <i className='fa fa-bell-o'></i>
                      </td>
                      <td>Albumes</td>
                      <td className='level-right'>
                        <a className='button is-small is-link' href='/album'>
                          Ver
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td width='5%'>
                        <i className='fa fa-bell-o'></i>
                      </td>
                      <td>Usuarios</td>
                      <td className='level-right'>
                        <a className='button is-small is-link' href='/usuario'>
                          Ver
                        </a>
                      </td>
                    </tr>

                    <tr>
                      <td width='5%'>
                        <i className='fa fa-bell-o'></i>
                      </td>
                      <td>Comentarios</td>
                      <td className='level-right'>
                        <a
                          className='button is-small is-link'
                          href='/comentario'>
                          Ver
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  </div>
);

export default Home;
