import * as React from 'react';
import { Component } from "react";
import { EditorState } from 'draft-js';
import { DraftEditor } from '../DraftEditor';
import { Canvas } from '../Canvas';
import Close from '../../../icons/close';
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
    editorState: EditorState.createEmpty(),
    hidden: false
  }

  onChange = editorState => {
    this.setState({ editorState });
  }

  hideEditor = () => {
    this.setState({hidden: true});
  }

  render() {
    const { editorState, hidden } = this.state;
    if (hidden) {
      return null;
    }
    return (
      <div className="container">
        <div className="editor-wrapper">
          <Close onClick={this.hideEditor} />
          <DraftEditor
            editorState={editorState}
            onChange={this.onChange}
          />
          <Canvas
            editorState={editorState}
          />
        </div>
      </div>
    )
  }
}
