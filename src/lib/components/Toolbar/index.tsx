import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import FontFamily from './FontFamily';
import FontSize from './FontSize';
import * as DraftJSUtils from 'draftjs-utils';
import Bold from '../../../icons/bold';
import Italic from '../../../icons/italic';
import Underline from '../../../icons/underline';
import AlignLeft from '../../../icons/alignLeft';
import AlignRight from '../../../icons/alignRight';
import AlignCenter from '../../../icons/alignCenter';
import Sefaria from '../../../icons/sefaria';
import './styles.css';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
}

/**
 * Toolbar component for DraftJS editor.
 */
export class Toolbar extends Component<Props, State> {

  toggleInlineStyle = (event) => {
    event.preventDefault();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      event.currentTarget.name,
    );
    if (newState) {
      onChange(newState);
    }
  };

  addBlockAlignmentData = (event) => {
    const { editorState, onChange } = this.props;
    const currentTextAlignment = DraftJSUtils.getSelectedBlocksMetadata(editorState).get('text-align');
    const textAlignment = event.currentTarget.name;
    if (currentTextAlignment !== textAlignment) {
      onChange(DraftJSUtils.setBlockData(editorState, { 'text-align': textAlignment }));
    } else {
      onChange(DraftJSUtils.setBlockData(editorState, { 'text-align': undefined }));
    }
  }

  render() {
    const { editorState, onChange } = this.props;
    return (
      <div className="dce-toolbar">
        <div>
          <div className="dce-toolbar-row">
            <button name="BOLD" className="dce-toolbar-icon" onMouseDown={this.toggleInlineStyle}><Bold /></button>
            <button name="ITALIC" className="dce-toolbar-icon" onMouseDown={this.toggleInlineStyle}><Italic /></button>
            <button name="UNDERLINE" className="dce-toolbar-icon" onMouseDown={this.toggleInlineStyle}><Underline /></button>
            <div className="dce-toolbar-separator" />
            <button name="left" className="dce-toolbar-icon" onMouseDown={this.addBlockAlignmentData}><AlignLeft /></button>
            <button name="center" className="dce-toolbar-icon" onMouseDown={this.addBlockAlignmentData}><AlignCenter /></button>
            <button name="right" className="dce-toolbar-icon" onMouseDown={this.addBlockAlignmentData}><AlignRight /></button>
          </div>
          <div className="dce-toolbar-row">
            <FontFamily editorState={editorState} onChange={onChange}/>
            <div className="dce-toolbar-separator" />
            <FontSize editorState={editorState} onChange={onChange}/>
          </div>
        </div>
        <a target="_blank" className="dce-sefaria-link" href="https://www.sefaria.org/texts">
          <Sefaria />
        </a>
      </div>
    );
  }
}
