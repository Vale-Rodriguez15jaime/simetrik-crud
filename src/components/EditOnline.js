import React from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import Layout from "./Layout";
import { FaFileDownload } from "react-icons/fa";
import "../styles/styles.sass";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/theme/material.css";

require("codemirror/mode/sql/sql");
require("codemirror/addon/hint/javascript-hint.js");
require("codemirror/addon/hint/html-hint.js");
require("codemirror/addon/hint/sql-hint.js");
require("codemirror/addon/hint/show-hint.js");
require("codemirror/addon/hint/css-hint.js");
require("codemirror/mode/javascript/javascript");
require("codemirror/mode/htmlmixed/htmlmixed");
class EditOnline extends React.Component {
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
    let a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    let blob = new File(
      [this.state.code],
      this.state.fileName + "." + this.state.fileType,
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
      extraKeys: { "Shift-Space": "autocomplete" },
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
          </div>
          <CodeMirror
            value={this.state.code}
            options={options}
            ref='codeMirrorInstance'
            onChange={(editor, data, value) => {
              this.setState({ code: value });
            }}
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
