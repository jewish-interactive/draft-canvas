import * as React from 'react';
import { Component } from "react";
import { EditorState } from 'draft-js';
import { DraftEditor } from '../DraftEditor';
import { Canvas } from '../Canvas';
import Close from '../../../icons/close';
import './styles.css';

export interface Props {
  customFonts?: any[]
}

export interface State {
  editorState: EditorState;
  hidden: boolean;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
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
    const { customFonts } = this.props;
    if (hidden) {
      return null;
    }
    return (
      <div className="dce-container">
        <div className="dce-editor-wrapper">
          <Close onClick={this.hideEditor} />
          <DraftEditor
            customFonts={customFonts}
            editorState={editorState}
            onChange={this.onChange}
          />
          <Canvas
            editorState={editorState}
          />
        </div>
      </div>
    );
  }
}
