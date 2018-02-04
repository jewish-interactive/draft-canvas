import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { Dropdown, Option } from '../../Dropdown';
import * as DraftJSUtils from 'draftjs-utils';

const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96];

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentFontSize?: string;
}

export default class FontFamily extends Component<Props, State> {

  componentWillMount(): void {
    const { editorState } = this.props;
    this.setState({
      currentFontSize: 
        DraftJSUtils.getSelectionCustomInlineStyle(
          editorState,
          ['FONTSIZE']
        ).FONTSIZE,
    });
  }

  onChange = (fontSize) => {
    const { currentFontSize } = this.state;
    const { editorState, onChange } = this.props;
    const newFontSize = currentFontSize === fontSize ? '' : fontSize;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
      editorState,
      'fontSize',
      newFontSize,
    );
    if (newState) {
      onChange(newState);
    }
    this.setState({ currentFontSize: newFontSize });
  };

  render() {
    const { currentFontSize } = this.state;
    return (
      <Dropdown
        onChange={this.onChange}
        label={currentFontSize || 'Font Size'}
        selectedValue={currentFontSize}
      >
        {fontSizes.map(fontSize =>
          <Option value={fontSize} key={fontSize}>{fontSize}</Option>)
        }
      </Dropdown>
    );
  }
}
