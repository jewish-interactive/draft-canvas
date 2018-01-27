import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import './styles.css';
import '../../../../node_modules/draft-js/dist/Draft.css';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
}

/**
 * Editor component with DeraftJS Editor component as child.
 */
export class DraftEditor extends Component<Props, State> {
  editor: DraftEditor = undefined;

  setEditorReference = (ref) => {
    this.editor = ref;
  };
  
  focusEditor = () => {
    (this.editor as any).focus();
  };

  handleKeyCommand: any = command => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  render() {
    const { editorState, onChange } = this.props;
    return (
      <div className="editor-container" onClick={this.focusEditor}>
        <Editor
          ref={this.setEditorReference}
          handleKeyCommand={this.handleKeyCommand}
          editorState={editorState}
          onChange={onChange}
        />
      </div>
    )
  }
}
