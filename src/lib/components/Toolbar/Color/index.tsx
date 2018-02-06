import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import Color from '../../../../icons/color';
import * as DraftJSUtils from 'draftjs-utils';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentTextColor?: string;
}

export default class FontFamily extends Component<Props, State> {
  state = {
    currentTextColor: '',
  }

  componentWillMount(): void {
    const { editorState } = this.props;
    this.setState({
      currentTextColor: 
        DraftJSUtils.getSelectionCustomInlineStyle(
          editorState,
          ['FONTFAMILY']
        ).FONTFAMILY,
    });
  }

  onChange = (textColor) => {
    const { currentTextColor } = this.state;
    const { editorState, onChange } = this.props;
    const newTextColor = currentTextColor === textColor ? '' : textColor;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      newTextColor,
    );
    if (newState) {
      onChange(newState);
    }
    this.setState({ currentTextColor: newTextColor });
  };

  render() {
    const { currentTextColor } = this.state;
    return (
      <button className="dce-toolbar-icon"><Color /></button>
    );
  }
}
