import React, { useState } from "react";
//import { render } from "react-dom";
import CodeMirror from "react-codemirror";
import "../styles/codemirror.sass";
import "codemirror/lib/codemirror.css";
import Layout from "./Layout";
//import "../rules/show-hint"
//import "codemirror/lib/mode/htmlmixed/htmlmixed.html"
//<script src="mode/javascript/javascript.js"></script>

require("codemirror/mode/javascript/javascript");
require("codemirror/mode/xml/xml");
require("codemirror/mode/markdown/markdown");
require("codemirror/mode/htmlmixed/htmlmixed");
require("codemirror/mode/sql/sql");
var defaults = {
  markdown:
    "# Heading\n\nSome **bold** and _italic_ text\nBy [Jed Watson](https://github.com/JedWatson)",
  javascript:
    'var component = {\n\tname: "react-codemirror",\n\tauthor: "Jed Watson",\n\trepo: "https://github.com/JedWatson/react-codemirror"\n};'
};

class EditOnline extends React.Component {
    getInitialState() {
        return {
            code: defaults.markdown,
            readOnly: false,
            mode: "markdown"
    };
}
//const [uploadFile, setUploadFile] = useState()
constructor() {
    super();
    this.state = {
      //  name: "CodeMirror",
      code: "// Code"
    };
  }
  myModeSpec = {
    name: "htmlmixed",
    tags: {
      style: [
        ["type", /^text\/(x-)?scss$/, "text/x-scss"],
        [null, null, "css"]
      ],
      custom: [[null, null, "customMode"]]
    }
  };

  updateCode = newCode => {
    this.setState({
      code: newCode
    });
  };

  changeMode = e => {
    var mode = e.target.value;
    this.setState({
      mode: mode,
      code: defaults[mode]
    });
  };

  change = () => {
    this.setState({
      code: this.setState.code
    });
  };
  onFileChangeHandler = () => {
    console.log("subi");
  };

  toggleReadOnly = () => {
    this.setState(
      {
        readOnly: !this.state.readOnly
      },
      () => this.refs.editor.focus()
    );
  };
  render = () => {
    let options = {
      lineNumbers: true,
      readOnly: this.state.readOnly,
      mode: this.state.mode
    };
    return (
      <Layout>
        <div>
          <p>EDITOR</p>
          <CodeMirror
            ref='editor'
            value={this.state.code}
            options={options}
            autoFocus={true}
            onChange={this.updateCode.bind(this)}
          />
          <div style={{ marginTop: 10 }}>
            <div className='file is-info has-name'>
              <label className='file-label'>
                <input
                  className='file-input'
                  type='file'
                  name='resume'
                  onChange={this.onFileChangeHandler}
                />
                <span className='file-cta'>
                  <span className='file-icon'>
                    <i className='fas fa-upload'></i>
                  </span>
                  <span className='file-label'>Subir archivo</span>
                </span>
                <span className='file-name'>
                  Screen Shot 2017-07-29 at 15.54.25.png
                </span>
              </label>
            </div>
          </div>
          <div className='select is-info pd'>
            <select onChange={this.changeMode} value={this.state.mode}>
              <option value='markdown'>Markdown</option>
              <option value='javascript'>JavaScript</option>
              <option value='htmlmixed'>HTML MIXTO</option>
              <option value='sql'>SQL</option>
            </select>
          </div>
          <button
            className='button is-warning is-light pd'
            onClick={this.toggleReadOnly}>
            Solo lectura ( {this.state.readOnly ? "on " : "off "})
          </button>
          <div class='field'></div>
        </div>
      </Layout>
    );
  };
}

export default EditOnline;
