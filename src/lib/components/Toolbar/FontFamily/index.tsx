import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { Dropdown, Option } from '../../Dropdown';
import './styles.css';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
}

export default class FontFamily extends Component<Props, State> {
  onChange = () => {
    console.log('into on change of font family');
  }

  render() {
    return (
      <Dropdown onChange={this.onChange}>
        <Option value="">Font Family</Option>
        <Option value="">Font Family</Option>
      </Dropdown>
    );
  }
}
