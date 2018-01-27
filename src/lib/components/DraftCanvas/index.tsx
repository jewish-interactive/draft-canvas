import * as React from 'react';
import { Component } from "react";
import { EditorState } from 'draft-js';
import { DraftEditor } from '../DraftEditor';
import { Canvas } from '../Canvas';
import './styles.css';

export interface Props {
}

export interface State {
  editorState: EditorState;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component {
  state = {
    editorState: EditorState.createEmpty()
  }

  onChange = editorState => {
    this.setState({ editorState });
  }

  render() {
    const { editorState } = this.state;
    return (
      <div className="container">
        <DraftEditor
          editorState={editorState}
          onChange={this.onChange}
        />
        <Canvas
          editorState={editorState}
        />
      </div>
    )
  }
}
