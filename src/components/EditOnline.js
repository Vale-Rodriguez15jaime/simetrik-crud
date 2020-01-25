import React from "react";
import { Controlled as CodeMirror } from "react-codemirror2";
import Layout from "./Layout";
import { FaFileDownload, FaCode, FaCheck } from "react-icons/fa";
import "../styles/styles.sass";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/theme/material.css";
import { ToastsStore } from "react-toasts";
const jbeautify = require("js-beautify").js;
require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/javascript-hint.js");
require("codemirror/addon/hint/html-hint.js");
require("codemirror/addon/hint/sql-hint.js");
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/css-hint.js");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");

const hbeautify = require("js-beautify").html;

class EditOnline extends React.Component {
  componentDidMount() {
    if (document.getElementById("jsonlint") === null) {
      var s = document.createElement("script");
      s.id = "jsonlint";
      s.type = "text/javascript";
      s.src = "/jsonlint.js";
      document.body.appendChild(s);
    }
  }
  state = {
    code: "",
    mode: "javascript",
    file: null,
    fileName: "Untitled",
    fileType: "js"
  };

  async handleChange(selectorFiles) {
    const text = await new Response(selectorFiles).text();
    let newName = selectorFiles.name.split(".");
    newName[newName.length - 2] = newName[newName.length - 2] + "_updated";
    newName.splice(-1, 1);
    newName = newName.join(".");
    this.setState({ code: text, file: selectorFiles, fileName: newName });
  }

  formatCode = () => {
    let textCode = this.state.code;

    switch (this.state.mode) {
      case "javascript":
        textCode = jbeautify(textCode, {
          indent_size: 2,
          space_in_empty_paren: true
        });

        break;
      case "htmlmixed":
        textCode = hbeautify(textCode, {
          indent_size: 2,
          space_in_empty_paren: true
        });
        break;
      default:
        break;
    }
    this.setState({
      code: textCode
    });
  };
  validateCode = (e, showValid = true) => {
    switch (this.state.mode) {
      case "javascript":
        try {
          var result = window.jsonlint.parse(this.state.code);
          if (result) {
            if (showValid) {
              ToastsStore.success(
                "Tu codigo JSON es valido! :)",
                5000,
                "has-text-white"
              );
            }
            return true;
          }
        } catch (e) {
          ToastsStore.error(e.message, 5000, "has-text-white");
          return false;
        }
        break;
      default:
        break;
    }
    return false;
  };
  changeMode = e => {
    let mode = "js";

    switch (e.target.value) {
      case "htmlmixed":
        mode = "html";

        break;
      case "sql":
        mode = "sql";

        break;

      default:
        break;
    }
    this.setState({
      mode: e.target.value,
      fileType: mode
    });
  };
  saveFile = () => {
    this.formatCode();
    if (!this.validateCode(null, false)) {
      return false;
    }
    let vm = this;
    setTimeout(() => {
      let a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      let blob = new File(
        [vm.state.code],
        vm.state.fileName + "." + vm.state.fileType,
        {
          type: "text/plain;charset=utf-8"
        }
      );
      let url = window.URL.createObjectURL(blob);
      a.href = url;
      a.download = blob.name;
      a.click();
      window.URL.revokeObjectURL(url);
      a.remove();

      ToastsStore.success(
        "¡Se ha descargado tu codigo!",
        5000,
        "has-text-white"
      );
    }, 200);
  };
  toggleReadOnly = () => {
    this.setState({
      readOnly: !this.state.readOnly
    });
  };
  render = () => {
    let options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode,
      theme: "material",
      extraKeys: {
        "Shift-Space": "autocomplete",
        "Shift-tab": "autoFormatSelection"
      },

      hint: "CodeMirror.hint." + this.state.mode
    };

    return (
      <Layout>
        <div>
          <p>EDITOR</p>
          <div className='ContainerEdit'>
            <span>Modo de edición: </span>
            <div className='select is-info pd Container__option'>
              <select onChange={this.changeMode} value={this.state.mode}>
                <option value='javascript'>JavaScript</option>
                <option value='htmlmixed'>HTML Mixto</option>
                <option value='sql'>SQL</option>
              </select>
            </div>
            <button
              className={
                "button " +
                (this.state.readOnly ? "is-warning is-light" : "is-success")
              }
              style={{
                margin: "10px",
                border:
                  "1px solid #" + (this.state.readOnly ? "ffe003" : "00a41c"),
                lineHeight: "12px",
                padding: "0px 15px"
              }}
              onClick={this.toggleReadOnly}>
              Solo lectura ( {this.state.readOnly ? "on " : "off "})
            </button>
          </div>
          <div className='ContainerEdit'>
            <span>Nombre del archivo: </span>
            <input
              type='text'
              value={this.state.fileName}
              onChange={e => {
                this.setState({ fileName: e.target.value });
              }}
              className='input Input__Name-file'
              style={{
                maxWidth: "305px",
                margin: "10px 0px 10px 20px",
                borderTopRightRadius: "0px",
                borderBottomRightRadius: "0px"
              }}></input>
            <span
              style={{
                background: "rgba(0,0,0,.1)",
                border: "1px solid rgba(0,0,0,.2)",
                fontSize: "1rem",
                height: "2.5em",
                lineHeight: "2.2rem",
                margin: "10px 20px 10px 0px",
                padding: "0px 10px 0px 5px",
                borderTopRightRadius: "10px",
                borderBottomRightRadius: "10px"
              }}>
              .{this.state.fileType}
            </span>
            <button className='button is-success' onClick={this.saveFile}>
              <FaFileDownload /> Descargar archivo
            </button>
            <button
              className='button is-success'
              onClick={this.formatCode}
              style={{
                margin: "0px 0px 0px 20px"
              }}>
              <FaCode /> Formatear Codigo
            </button>
            <button
              className='button is-success'
              onClick={this.validateCode}
              style={{
                margin: "0px 0px 0px 20px"
              }}>
              <FaCheck /> Validar Codigo
            </button>
          </div>
          <CodeMirror
            value={this.state.code}
            options={options}
            ref='codeMirrorInstance'
            onKeyDown={(code, e) => {
              if (
                window.navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey
              ) {
                if (e.keyCode === 83) {
                  e.preventDefault();
                  this.saveFile();
                } else if (e.keyCode === 70) {
                  e.preventDefault();
                  this.formatCode();
                } else if (e.keyCode === 79) {
                  e.preventDefault();
                  document.getElementById("dileElem").click();
                }
              }
            }}
            onBeforeChange={(editor, data, value) => {
              this.setState({ code: value });
            }}
            onChange={(editor, data, value) => {}}
          />

          <div style={{ marginTop: 10 }}>
            <form>
              <div className='file is-info has-name'>
                <label className='file-label'>
                  <input
                    className='file-input'
                    type='file'
                    name='resume'
                    id='dileElem'
                    accept={"." + this.state.fileType}
                    onChange={e => this.handleChange(e.target.files[0])}
                  />
                  <span className='file-cta'>
                    <span className='file-icon'>
                      <i className='fas fa-upload'></i>
                    </span>
                    <span className='file-label'>Subir archivo</span>
                  </span>
                  <span className='file-name'>
                    {this.state.file == null
                      ? "Seleccione un archivo"
                      : this.state.file.name}
                  </span>
                </label>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    );
  };
}

export default EditOnline;
