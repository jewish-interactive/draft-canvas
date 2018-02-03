import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import {
  toggleCustomInlineStyle,
  getSelectionCustomInlineStyle,
} from 'draftjs-utils';
import { Dropdown, Option } from '../../Dropdown';
import './styles.css';

const fontFamilies = ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Verdana'];

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentFontFamily?: string;
}

export default class FontFamily extends Component<Props, State> {

  componentWillMount(): void {
    const { editorState } = this.props;
    this.setState({
      currentFontFamily: getSelectionCustomInlineStyle(editorState, ['FONTFAMILY']).FONTFAMILY,
    });
  }

  onChange = (fontFamily) => {
    const { currentFontFamily } = this.state;
    const { editorState, onChange } = this.props;
    const newFontFamily = currentFontFamily === fontFamily ? '' : fontFamily;
    const newState = toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      newFontFamily,
    );
    if (newState) {
      onChange(newState);
    }
    this.setState({ currentFontFamily: newFontFamily });
  };

  render() {
    const { currentFontFamily } = this.state;
    return (
      <Dropdown
        onChange={this.onChange}
        label={currentFontFamily || 'Font Family'}
        selectedValue={currentFontFamily}
      >
        {fontFamilies.map(fontFamily =>
          <Option value={fontFamily} key={fontFamily}>{fontFamily}</Option>)
        }
      </Dropdown>
    );
  }
}
