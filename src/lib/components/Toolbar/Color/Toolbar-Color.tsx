import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import { colors } from "../../../utils/Draft-Utils";
import Color from "../../../../icons/color";
import * as DraftJSUtils from "draftjs-utils";
import "./Toolbar-Color-Styles.css";


import {classNames} from "../../../utils/Imports"; 


export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentTextColor: string;
  expanded: boolean;
  currentStyle: string;
  currentColor: string;
  currentBgColor: string;
}

export class FontColor extends Component<Props, State> {
  state = {
    currentTextColor: "",
    expanded: false,
    currentStyle: "color",
    currentColor: "",
    currentBgColor: ""
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    this.setState({
      currentColor: DraftJSUtils.getSelectionCustomInlineStyle(editorState, [
        "COLOR"
      ]).COLOR,
      currentBgColor: DraftJSUtils.getSelectionCustomInlineStyle(editorState, [
        "BGCOLOR"
      ]).BGCOLOR
    });
  }

  componentWillReceiveProps(props) {
    const newState = {} as any;
    if (this.props.editorState !== props.editorState) {
      newState.currentColor = DraftJSUtils.getSelectionCustomInlineStyle(
        props.editorState,
        ["COLOR"]
      ).COLOR;
      newState.currentBgColor = DraftJSUtils.getSelectionCustomInlineStyle(
        props.editorState,
        ["BGCOLOR"]
      ).BGCOLOR;
    }
    this.setState(newState);
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded, currentStyle: "color" });
  };

  toggleCurrentStyle = () => {
    this.setState({
      currentStyle: this.state.currentStyle === "color" ? "bgcolor" : "color"
    });
  };

  onChange = event => {
    const { editorState, onChange } = this.props;
    let newStyle = event.currentTarget.name;
    newStyle =
      this.state[`current${this.state.currentStyle}`] === newStyle
        ? ""
        : newStyle;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
      editorState,
      this.state.currentStyle,
      newStyle
    );
    if (newState) {
      onChange(newState);
    }
    this.toggleExpanded();
  };

  preventDefault = event => {
    event.preventDefault();
  };

  render() {
    const {
      currentStyle,
      currentTextColor,
      expanded,
      currentColor,
      currentBgColor
    } = this.state;
    return (
      <div
        className="dce-colorpicker-wrapper"
        onMouseDown={this.preventDefault}
      >
        <button
          className="dce-toolbar-option dce-colorpicker-option-icon"
          onClick={this.toggleExpanded}
        >
          <Color />
          <span
            className={classNames({
              "dce-carettoclose": expanded,
              "dce-carettoopen": !expanded
            })}
          />
        </button>
        {expanded && (
          <div className="dce-colorpicker-modal">
            <span className="dce-colorpicker-modal-header">
              <span
                className={classNames("dce-colorpicker-modal-style-label", {
                  "dce-colorpicker-modal-style-label-active":
                    currentStyle === "color"
                })}
                onClick={this.toggleCurrentStyle}
              >
                Text
              </span>
              <span
                className={classNames("dce-colorpicker-modal-style-label", {
                  "dce-colorpicker-modal-style-label-active":
                    currentStyle === "bgcolor"
                })}
                onClick={this.toggleCurrentStyle}
              >
                Highlight
              </span>
            </span>
            <span className="dce-colorpicker-modal-options">
              {colors.map((color, index) => (
                <button
                  className="dce-colorpicker-option"
                  onClick={this.onChange}
                  name={color}
                  key={color}
                >
                  <div
                    style={{ backgroundColor: color }}
                    className={classNames("dce-colorpicker-cube", {
                      "dce-colorpicker-cube-selected":
                        (currentStyle === "bgcolor" &&
                          currentBgColor === `bgcolor-${color}`) ||
                        (currentStyle === "color" &&
                          currentColor === `color-${color}`)
                    })}
                  />
                </button>
              ))}
            </span>
          </div>
        )}
      </div>
    );
  }
}
