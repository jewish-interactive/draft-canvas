import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { DraftEditor } from "../DraftEditor";
import { Canvas } from "../Canvas";
import "./styles.css";

export interface Props {
  customFonts?: any[];
  onSave?: Function;
  defaultValue?: object;
}

export interface State {
  editorState: EditorState;
  dimensions?: any;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
  canvas = undefined;
    editor:DraftEditor;
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty()
    };
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  onSave = () => {
    const { editorState, dimensions } = this.state;
    const { width, height, dir } = dimensions;
    const x1 = dir.left ? 0 : 500 - width;
    const x2 = dir.right ? 500 : width;
    const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
    const newCanvas = document.createElement("canvas");
    newCanvas.width = width;
    newCanvas.height = height;
    newCanvas.setAttribute("style", `height: ${height}px;width:${width}px;`);
    const ctx = newCanvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.canvas, x1, 0, x2, height, 0, 0, x2, height);
    this.props.onSave({ editor: this.editor, editorState, rawDraftContentState, canvas: newCanvas });
  };


  setCanvasRef = canvas => {
    this.canvas = canvas;
  };

  setDimensions = dimensions => {
    this.setState({ dimensions });
  };

  render() {
    const { editorState, dimensions } = this.state;
    const { customFonts, defaultValue } = this.props;
    return (
      <div className="dce-container">
        <DraftEditor
          defaultValue={defaultValue}
          customFonts={customFonts}
            onEditorRef={editor => this.editor = editor}
          editorState={editorState}
          onChange={this.onChange}
          onSave={this.onSave}
        />
        <Canvas
          editorState={editorState}
          setCanvasRef={this.setCanvasRef}
          setDimensions={this.setDimensions}
        />
      </div>
    );
  }
}
