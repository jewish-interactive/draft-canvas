import * as React from "react";
import { Component } from "react";
import { EditorState } from "draft-js";
import { DraftEditor } from "../DraftEditor";
import { Canvas } from "../Canvas";
import "./styles.css";

export interface Props {
  customFonts?: any[];
  onSave?: Function;
}

export interface State {
  editorState: EditorState;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
  canvasRef = undefined;
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  setCanvasRef = ref => {
    this.canvasRef = ref;
  };

  onSave = () => {
    this.props.onSave(this.canvasRef);
  };

  render() {
    const { editorState } = this.state;
    const { customFonts } = this.props;
    return (
      <div className="dce-container">
        <div className="dce-inner-container">
          <div className="dce-editor-wrapper">
            <DraftEditor
              customFonts={customFonts}
              editorState={editorState}
              onChange={this.onChange}
            />
            <Canvas
              editorState={editorState}
              setCanvasRef={this.setCanvasRef}
            />
          </div>
          <button onClick={this.onSave} className="dce-save-btn">
            Save
          </button>
        </div>
      </div>
    );
  }
}
