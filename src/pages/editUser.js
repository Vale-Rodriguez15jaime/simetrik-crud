import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserAction } from "../actions/usersAction";
import { useHistory } from "react-router-dom";
import Layout from "../components/Layout";
import "../styles/styles.sass";
import Axios from "axios";

const EditUser = props => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  const [fields, setFields] = useState({
    id: "",
    name: "",
    username: "",
    email: "",
    address: {
      street: "",
      suite: "",
      city: "",
      zipcode: "",
      geo: {
        lat: "",
        lon: ""
      }
    },
    company: {
      name: "",
      catchPhrase: "",
      bs: ""
    }
  });

  const [userEdit, setUserEdit] = useState(
    useSelector(state => state.user.usersEdit)
  );

  if (userEdit == undefined) {
    Axios.get(
      "https://jsonplaceholder.typicode.com/users?id=" + props.match.params.id
    ).then(res => {
      setUserEdit(res.data[0]);
    });
  } else {
    if (loaded == false) {
      setLoaded(true);
      setFields(userEdit);
    }
  }
  if (loaded == false) {
    return <h1>Cargando...</h1>;
  }

  const submitEditUser = e => {
    e.preventDefault();
    dispatch(editUserAction(fields));
    history.push("/usuario");
  };
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Editar Usuario</p>
          </header>

          <form className='pd' onSubmit={submitEditUser}>
            {Object.entries(fields).map(field => {
              if (typeof field[1] == "object") {
                return Object.entries(field[1])
                  .map(intoField => {
                    if (typeof intoField[1] == "object") {
                      return Object.entries(intoField[1])
                        .map(intoIntoField => {
                          return (
                            <div className='field'>
                              <label className='label'>
                                {intoIntoField[0]}
                              </label>
                              <input
                                className='input'
                                type='text'
                                placeholder={intoIntoField[0]}
                                name={intoIntoField[0]}
                                value={intoIntoField[1]}
                                onChange={e => {
                                  e.persist();
                                  setFields(prev => ({
                                    ...prev,
                                    [field[0]]: {
                                      ...field[1],
                                      [intoField[0]]: {
                                        ...intoField[1],
                                        [intoIntoField[0]]: e.target.value
                                      }
                                    }
                                  }));
                                }}
                              />
                            </div>
                          );
                        })
                        .reduce(
                          (acc, x) => (acc === null ? [x] : [acc, "", x]),
                          null
                        );
                    } else {
                      return (
                        <div className='field'>
                          <label className='label'>{intoField[0]}</label>
                          <input
                            className='input'
                            type='text'
                            placeholder={intoField[0]}
                            name={intoField[0]}
                            value={intoField[1]}
                            onChange={ez => {
                              ez.persist();
                              setFields(prev => ({
                                ...prev,
                                [field[0]]: {
                                  ...field[1],
                                  [intoField[0]]: ez.target.value
                                }
                              }));
                            }}
                          />
                        </div>
                      );
                    }
                  })
                  .reduce(
                    (acc, x) => (acc === null ? [x] : [acc, "", x]),
                    null
                  );
              } else {
                return (
                  <div className='field'>
                    <label className='label'>{field[0]}</label>
                    <input
                      className='input'
                      type='text'
                      disabled={field[0] == "id"}
                      placeholder={field[0]}
                      name={field[0]}
                      value={field[1]}
                      onChange={e => {
                        e.persist();
                        setFields(prev => ({
                          ...prev,
                          [field[0]]: e.target.value
                        }));
                      }}
                    />
                  </div>
                );
              }
            })}

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

export default EditUser;
