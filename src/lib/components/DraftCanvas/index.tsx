import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { DraftEditor } from "../DraftEditor";
import { plotCanvas } from "../../utils/canvas";
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

  plotCanvas = editorState => {
    const editorDimensions = plotCanvas(
      this.props.target,
      editorState,
      500,
      500
    ) as any;
  };

  onChange = editorState => {
    const editorDimensions = this.plotCanvas(editorState);
    this.setState({ editorState, editorDimensions });
  };

  onSave = () => {
    const { editorState, editorDimensions } = this.state;
    const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
    const { width, height } = editorDimensions;
    this.canvas.width = width;
    this.canvas.height = height;
    this.canvas
      .getContext("2d")
      .drawImage(this.props.target, 0, 0, width, height, 0, 0, width, height);
    this.props.onSave({ rawDraftContentState });
  };

  getCanvasRef = ref => {
    this.canvas = ReactDOM.findDOMNode(ref) as HTMLCanvasElement;
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
        <canvas style={{ display: "none" }} ref={this.getCanvasRef} />
        <button onClick={this.onSave} className="dce-save-btn">
          Save
        </button>
      </div>
    );
  }
}

// todo: init state
