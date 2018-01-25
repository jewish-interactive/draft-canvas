import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
} from 'draft-js';
import './styles.css';
import '../../../../node_modules/draft-js/dist/Draft.css';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
}

export class DraftEditor extends Component<Props, State> {
  editor: DraftEditor = undefined;

  setEditorReference = (ref) => {
    this.editor = ref;
  };
  
  focusEditor = () => {
    (this.editor as any).focus();
  };

  render() {
    const { editorState, onChange } = this.props;
    return (
      <div className="editor-container" onClick={this.focusEditor}>
        <Editor
          ref={this.setEditorReference}
          editorState={editorState}
          onChange={onChange}
        />
      </div>
    )
  }
}
