import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import { Dropdown, Option } from '../../Dropdown';
import * as DraftJSUtils from 'draftjs-utils';

const fonts = [
  { label: "Arial", fontName: "Arial" },
  { label: "Georgia", fontName: "Georgia" },
  { label: "Impact", fontName: "Impact" },
  { label: "Tahoma", fontName: "Tahoma" },
  { label: "Verdana", fontName: "Verdana" }
];

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
}

export interface State {
  currentFontFamily?: string;
  allFonts: any[];
}

export default class FontFamily extends Component<Props, State> {
  state = {
    currentFontFamily: '',
    allFonts: fonts,
  }

  componentWillMount(): void {
    const { editorState, customFonts } = this.props;
    this.setState({
      currentFontFamily: 
        DraftJSUtils.getSelectionCustomInlineStyle(
          editorState,
          ['FONTFAMILY']
        ).FONTFAMILY,
        allFonts: [...fonts, ...customFonts || []]
    });
  }

  componentWillReceiveProps(props) {
    if (this.props.customFonts !== props.customFonts) {
      this.setState({
        allFonts: [...fonts, ...props.customFonts || []]
      });
    }
  }

  onChange = (fontFamily) => {
    const { currentFontFamily } = this.state;
    const { editorState, onChange } = this.props;
    const newFontFamily = currentFontFamily === fontFamily ? '' : fontFamily;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
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
    const { currentFontFamily, allFonts } = this.state;
    return (
      <Dropdown
        onChange={this.onChange}
        label={currentFontFamily || 'Font Family'}
        selectedValue={currentFontFamily}
      >
        {allFonts.map(fontFamily =>
          <Option value={fontFamily.fontName} key={fontFamily.fontName}>
            {fontFamily.label || fontFamily.fontName}
          </Option>
        )}
      </Dropdown>
    );
  }
}
