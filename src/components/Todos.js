import React from "react";
import Axios from "axios";
import Loader from "react-loader-spinner";
import "../styles/todos.sass";
import {
  FaTimesCircle,
  FaClipboardList,
  FaClipboardCheck,
  FaCheck,
  FaSyncAlt,
  FaTimes,
  FaSearch,
  FaCopy,
  FaCheckDouble,
  FaTrashAlt,
  FaPlus
} from "react-icons/fa";

class TodoView extends React.Component {
  
  state = {
    saving: false,
    error: false
  };
  typingTimer = undefined;
  
  typing = () => {
    clearTimeout(this.typingTimer);
    this.typingTimer = setTimeout(this.update, 1000);
  };
  delete = () => {
    if (this.props.todo.id == "nueva") {
      this.props.updateTodos();
      return;
    }
    this.setState({
      saving: true,
      error: false
    });
    Axios.delete(
      "https://jsonplaceholder.typicode.com/todos/" + this.props.todo.id
    )
      .then(res => {
        console.log("ok");
        this.props.onChange(null, this.props.todo.id, "", "", true);
      })
      .catch(err => {
        console.log("ERR");
        this.setState({
          error: true
        });
      })
      .then(() => {
        this.setState({
          saving: false
        });
        //this.props.updateTodos();
      });
  };
  textAreaAdjust = o => {
    this.typing();
    o.target.style.height = "1px";
    o.target.style.height = 25 + o.target.scrollHeight + "px";
  };
  copyText = () => {
    let cont = document.getElementById(
      "content-text-area-" + this.props.todo.id
    );
    cont.select();
    cont.setSelectionRange(0, 99999);
    document.execCommand("copy");
  };
  switchComplete = () => {
    this.setState({
      saving: true,
      error: false
    });
    Axios.patch(
      "https://jsonplaceholder.typicode.com/todos/" + this.props.todo.id,
      {
        completed: !this.props.todo.completed
      }
    )
      .then(res => {
        console.log("ok");
        this.props.onChange(
          null,
          this.props.todo.id,
          "completed",
          !this.props.todo.completed
        );
      })
      .catch(err => {
        console.log("ERR");
        this.setState({
          error: true
        });
      })
      .then(() => {
        this.setState({
          saving: false
        });
      });
  };
  update = () => {
    this.setState({
      saving: true,
      error: false
    });
    console.log("Run update");
    if (this.props.todo.id == "nueva") {
      Axios.post("https://jsonplaceholder.typicode.com/todos", {
        title: this.props.title
      })
        .then(res => {
          console.log("ok");
          this.props.onChange(null, this.props.todo.id, "id", res.data.id);
        })
        .catch(err => {
          console.log("ERR");
          this.setState({
            error: true
          });
        })
        .then(() => {
          this.setState({
            saving: false
          });
        });
    } else {
      Axios.patch(
        "https://jsonplaceholder.typicode.com/todos/" + this.props.todo.id,
        {
          title: this.props.title
        }
      )
        .then(res => {
          console.log("ok");
        })
        .catch(err => {
          console.log("ERR");
          this.setState({
            error: true
          });
        })
        .then(() => {
          this.setState({
            saving: false
          });
        });
    }
  };
  render() {
    return (
      <div className='card card-todo'>
        <header className='card-header'>
          <p className='card-header-title'>Tarea {this.props.todo.id}</p>
          <a className='card-header-icon' aria-label='State of data'>
            <span className='icon'>
              {this.state.saving ? (
                <FaSyncAlt className='animate-spin' title='Sincronizando...' />
              ) : this.state.error ? (
                <FaTimes
                  className='has-text-danger'
                  title='Error de sincronización'
                />
              ) : this.props.todo.id == "nueva" ? (
                <FaPlus />
              ) : (
                <FaCheck
                  className='has-text-success animate-check'
                  title='Sincronizado correctamente'
                />
              )}
            </span>
          </a>
          <a
            className='card-header-icon'
            aria-label='Copiar al portapapeles'
            onClick={this.copyText}>
            <span>
              <FaCopy />
            </span>
          </a>
        </header>
        <div className='card-content'>
          <textarea
            id={"content-text-area-" + this.props.todo.id}
            className='content'
            onChange={e =>
              this.props.onChange(
                e,
                this.props.todo.id,
                "title",
                e.target.value
              )
            }
            onKeyDown={e => this.textAreaAdjust(e)}
            value={this.props.todo.title}></textarea>
        </div>
        <footer className='card-footer'>
          <a onClick={this.switchComplete} className='card-footer-item'>
            {this.props.todo.completed ? (
              <span className='has-text-danger'>
                <FaTimes />
                Sin Completar
              </span>
            ) : (
              <span>
                <FaCheckDouble />
                Finalizar
              </span>
            )}
          </a>
          <a onClick={this.delete} className='card-footer-item has-text-danger'>
            <FaTrashAlt />
            {this.props.todo.id == "nueva" ? "Cancelar" : "Eliminar"}
          </a>
        </footer>
      </div>
    );
  }
}

export default class Todos extends React.Component {
  state = {
    todos_loading: false,
    todos: [],
    tab_todo: false,
    search: ""
  };
  changeTab = (e, newTab) => {
    this.setState({
      tab_todo: newTab
    });
  };
  newTodo = () => {
    if (this.state.todos[0].id == "nueva") {
      document.getElementById("content-text-area-nueva").focus();
      return;
    }
    let temp = this.state.todos;
    temp.unshift({
      id: "nueva",
      title: "",
      completed: false,
      userId: 1
    });
    this.setState({
      tab_todo: false,
      todos: temp
    });
    setTimeout(() => {
      document.getElementById("content-text-area-nueva").focus();
    }, 100);
  };
  getTodos = () => {
    this.setState({
      todos_loading: true
    });
    Axios.get("https://jsonplaceholder.typicode.com/todos")
      .then(res => {
        this.setState({
          todos: res.data.reverse()
        });
      })
      .catch(err => {})
      .then(() => {
        this.setState({ todos_loading: false });
      });
  };

  componentDidMount = () => {
    this.getTodos();
  };
  onChangeTodo = (e, id, field, val, remove = false) => {
    for (let index = 0; index < this.state.todos.length; index++) {
      if (
        this.state.todos[index] !== undefined &&
        this.state.todos[index].id == id
      ) {
        let sp = this.state.todos;
        if (remove) {
          delete sp[index];
        } else {
          sp[index][field] = val;
        }
        this.setState({
          todos: sp
        });
      }
    }
  };
  render() {
    let todosShow = this.state.todos
      .filter(todo =>
        this.state.search == ""
          ? true
          : todo.title.toLowerCase().includes(this.state.search.toLowerCase())
      )
      .filter(todo => todo.completed == this.state.tab_todo)
      .map((todo, index) => {
        return (
          <TodoView
            key={index}
            todo={todo}
            updateTodos={this.getTodos}
            onChange={this.onChangeTodo}
          />
        );
      });
    return (
      <nav
        id='menu-slide-right'
        className={
          "menu-side menu-slide-right " +
          (this.props.todoOpen ? "is-active" : "")
        }
        onClick={e => {
          if (e.target.id == "menu-slide-right") {
            this.props.switchTodo();
          }
        }}>
        <div className='menu-footer-wrapper'>
          <FaTimesCircle
            className='menu-close'
            onClick={this.props.switchTodo}
          />
          <h1 className='todos-title'>Tareas</h1>
          <button className='button is-small menu-new' onClick={this.newTodo}>
            <span className='icon'>
              <FaPlus />
            </span>
            <span>Nueva Tarea</span>
          </button>
          <div className='control has-icons-left has-icons-right'>
            <input
              className='input'
              type='text'
              value={this.state.search}
              onChange={e => {
                this.setState({
                  search: e.target.value
                });
              }}
              placeholder='Buscar una tarea'
            />
            <span className='icon is-left'>
              <FaSearch />
            </span>
            {this.state.search !== "" ? (
              <span
                onClick={e => {
                  this.setState({ search: "" });
                }}
                className='icon is-right clear-text-icon'>
                <FaTimes />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className='tabs is-medium is-centered'>
            <ul>
              <li
                className={!this.state.tab_todo ? "is-active" : ""}
                onClick={e => this.changeTab(e, false)}>
                <a>
                  <span className='icon is-small'>
                    <FaClipboardList />
                  </span>
                  Sin Completar
                </a>
              </li>
              <li
                className={this.state.tab_todo ? "is-active" : ""}
                onClick={e => this.changeTab(e, true)}>
                <a>
                  <span className='icon is-small'>
                    <FaClipboardCheck />
                  </span>
                  Completadas
                </a>
              </li>
            </ul>
          </div>
          {this.state.todos_loading ? (
            <div className='has-text-centered'>
              <Loader
                type='Puff'
                color='#ffffff'
                height={100}
                width={100}
                timeout={10000}></Loader>
            </div>
          ) : (
            todosShow
          )}
        </div>
      </nav>
    );
  }
}
