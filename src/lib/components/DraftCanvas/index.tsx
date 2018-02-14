import * as React from "react";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { DraftEditor } from "../DraftEditor";
import { Canvas } from "../Canvas";
import "./styles.css";

export interface Props {
  customFonts?: any[];
  target?: HTMLCanvasElement;
  onSave?: Function;
}

export interface State {
  editorState: EditorState;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
  state = {
    editorState: EditorState.createEmpty()
  };

  onChange = editorState => {
    this.setState({ editorState });
  };

  onSave = () => {
    const { editorState } = this.state;
    const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
    this.props.onSave({rawDraftContentState});
  };

  render() {
    const { editorState } = this.state;
    const { customFonts, target } = this.props;
    return (
      <div className="dce-container">
        <DraftEditor
          customFonts={customFonts}
          editorState={editorState}
          onChange={this.onChange}
        />
        <Canvas editorState={editorState} canvas={target} />
        <button onClick={this.onSave} className="dce-save-btn">
          Save
        </button>
      </div>
    );
  }
}
