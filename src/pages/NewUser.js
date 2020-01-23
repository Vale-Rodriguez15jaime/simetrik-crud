import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/styles.sass";
import Layout from "../components/Layout";
import Swal from "sweetalert2";

import { createNewUserAction } from "../actions/usersAction";

const NewUser = ({ history }) => {
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

  const dispatch = useDispatch();

  const error = useSelector(state => state.user.error);

  const addUser = user => dispatch(createNewUserAction(user));
  const submitNewUser = e => {
    e.preventDefault();
    if (
      Object.values(fields).includes("") ||
      Object.values(fields)
        .filter(fiel => typeof fiel == "object")
        .map(fiel => Object.values(fiel))
        .reduce((all, cur) => all.concat(cur))
        .includes("") ||
      Object.values(fields)
        .filter(fiel => typeof fiel == "object")
        .map(fiel => Object.values(fiel))
        .reduce((all, cur) => all.concat(cur))
        .filter(fiel => typeof fiel == "object")
        .map(fiel => Object.values(fiel))
        .reduce((all, cur) => all.concat(cur))
        .includes("")
    ) {
      Swal.fire({
        title: "Campos Incompletos",
        text: "Debe llenar todos los campos para guardar el registro",
        icon: "warning",
        timer: 3000
      });
      return;
    }

    addUser(fields);

    history.push("/usuario");
  };
  return (
    <Layout>
      <div className='column is-12'>
        <div className='card events-card'>
          <header className='card-header DB'>
            <p className='card-header-title center'>Agregar Nuevo Usuario</p>
          </header>

          <form className='pd' onSubmit={submitNewUser}>
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

            {error ? (
              <p>
                Hubo un error <bold>${error}</bold>{" "}
              </p>
            ) : null}

            <div className='center'>
              <button className='button is-link' type='submit'>
                Agregar
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default NewUser;
