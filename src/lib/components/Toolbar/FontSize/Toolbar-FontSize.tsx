import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { Dropdown} from "../../Dropdown/Dropdown";
import {Option} from "../../Dropdown/Option/Dropdown-Option";
import { fontSizes } from "../../../utils/Draft-Utils";
import * as DraftJSUtils from "draftjs-utils";

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentFontSize?: string;
}

export class FontSize extends Component<Props, State> {
  componentWillMount(): void {
    const { editorState } = this.props;
    const fontSize = DraftJSUtils.getSelectionCustomInlineStyle(editorState, [
      "FONTSIZE"
    ]).FONTSIZE;
    this.setState({ currentFontSize: fontSize && fontSize.substr(9) });
  }

  componentWillReceiveProps(props) {
    if (this.props.editorState !== props.editorState) {
      const fontSize = DraftJSUtils.getSelectionCustomInlineStyle(
        props.editorState,
        ["FONTSIZE"]
      ).FONTSIZE;
      this.setState({ currentFontSize: fontSize && fontSize.substr(9) });
    }
  }

  onChange = fontSize => {
    const { currentFontSize } = this.state;
    const { editorState, onChange } = this.props;
    const newFontSize = currentFontSize === fontSize.toString() ? "" : fontSize;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
      editorState,
      "fontSize",
      newFontSize
    );
    if (newState) {
      onChange(newState);
    }
  };

  render() {
    const { currentFontSize } = this.state;
    return (
      <Dropdown
        onChange={this.onChange}
        label={currentFontSize || "Font Size"}
        selectedValue={currentFontSize}
      >
        {fontSizes.map(fontSize => (
          <Option value={fontSize} key={fontSize}>
            {fontSize}
          </Option>
        ))}
      </Dropdown>
    );
  }
}
