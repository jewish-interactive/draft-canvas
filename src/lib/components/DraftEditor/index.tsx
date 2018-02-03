import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import * as DraftJSUtils from 'draftjs-utils';
import { Toolbar } from '../Toolbar';
import { blockStyleFn } from '../../utils/block-style';
import '../../../../node_modules/draft-js/dist/Draft.css';
import './styles.css';

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
      <div>
        <Toolbar editorState={editorState} onChange={onChange}/>
        <div className="dce-editor-container" onClick={this.focusEditor}>
          <Editor
            ref={this.setEditorReference}
            customStyleMap={DraftJSUtils.getCustomStyleMap()}
            blockStyleFn={blockStyleFn}
            handleKeyCommand={this.handleKeyCommand}
            editorState={editorState}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}
