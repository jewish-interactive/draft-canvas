import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Dropdown, Option } from "../../Dropdown";
import { fontFamilies } from "../../../utils/draft";
import * as DraftJSUtils from "draftjs-utils";

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
    currentFontFamily: "",
    allFonts: fontFamilies
  };

  componentWillMount(): void {
    const { editorState, customFonts } = this.props;
    const currentFontFamily = DraftJSUtils.getSelectionCustomInlineStyle(
      editorState,
      ["FONTFAMILY"]
    ).FONTFAMILY;
    this.setState({
      currentFontFamily: currentFontFamily && currentFontFamily.substr(11),
      allFonts: [...fontFamilies, ...(customFonts || [])]
    });
  }

  componentWillReceiveProps(props) {
    const newState = {} as any;
    if (this.props.customFonts !== props.customFonts) {
      newState.allFonts = [...fontFamilies, ...(props.customFonts || [])];
    }
    if (this.props.editorState !== props.editorState) {
      const currentFontFamily = DraftJSUtils.getSelectionCustomInlineStyle(
        props.editorState,
        ["FONTFAMILY"]
      ).FONTFAMILY;
      newState.currentFontFamily =
        currentFontFamily && currentFontFamily.substr(11);
    }
    this.setState(newState);
  }

  onChange = fontFamily => {
    const { currentFontFamily } = this.state;
    const { editorState, onChange } = this.props;
    const newFontFamily = currentFontFamily === fontFamily ? "" : fontFamily;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
      editorState,
      "fontFamily",
      newFontFamily
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { currentFontFamily, allFonts } = this.state;
    return (
      <Dropdown
        onChange={this.onChange}
        label={currentFontFamily || "Font Family"}
        selectedValue={currentFontFamily}
      >
        {allFonts.map(fontFamily => (
          <Option value={fontFamily.fontName} key={fontFamily.fontName}>
            {fontFamily.label || fontFamily.fontName}
          </Option>
        ))}
      </Dropdown>
    );
  }
}
