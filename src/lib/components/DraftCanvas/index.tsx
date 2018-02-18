import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { DraftEditor } from "../DraftEditor";
import { Canvas } from "../Canvas";
import "./styles.css";

export interface Props {
  customFonts?: any[];
  target?: HTMLCanvasElement;
  onSave?: Function;
  defaultValue?: object;
}

export interface State {
  editorState: EditorState;
  editorDimensions: any;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
  canvas = undefined;
  state = {
    editorState: EditorState.createEmpty(),
    editorDimensions: { height: 500, width: 500 }
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  onSave = () => {
    const { editorState, editorDimensions } = this.state;
    const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
    const { width, height } = editorDimensions;
    this.canvas.width = width;
    this.canvas.height = height;
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);
    ctx.drawImage(this.props.target, 0, 0, width, height, 0, 0, width, height);
    this.props.onSave({ rawDraftContentState, canvas: this.canvas });
  };

  getCanvasRef = ref => {
    this.canvas = ReactDOM.findDOMNode(ref) as HTMLCanvasElement;
  };

  setDimensions = editorDimensions => {
    this.setState({ editorDimensions });
  };

  render() {
    const { editorState, editorDimensions } = this.state;
    const { customFonts, target, defaultValue } = this.props;
    return (
      <div className="dce-container">
        <DraftEditor
          defaultValue={defaultValue}
          customFonts={customFonts}
          editorState={editorState}
          onChange={this.onChange}
        />
        <Canvas
          editorState={editorState}
          canvas={target}
          height={500}
          width={500}
          setDimensions={this.setDimensions}
        />
        <canvas style={{ display: "none" }} ref={this.getCanvasRef} />
        <button onClick={this.onSave} className="dce-save-btn">
          Save
        </button>
      </div>
    );
  }
}
