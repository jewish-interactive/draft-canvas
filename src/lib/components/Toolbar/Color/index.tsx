import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import Color from "../../../../icons/color";
import * as DraftJSUtils from "draftjs-utils";
import "./styles.css";

const classNames = require("classnames");

const colors = [
  "rgb(97,189,109)",
  "rgb(26,188,156)",
  "rgb(84,172,210)",
  "rgb(44,130,201)",
  "rgb(147,101,184)",
  "rgb(71,85,119)",
  "rgb(204,204,204)",
  "rgb(65,168,95)",
  "rgb(0,168,133)",
  "rgb(61,142,185)",
  "rgb(41,105,176)",
  "rgb(85,57,130)",
  "rgb(40,50,78)",
  "rgb(0,0,0)",
  "rgb(247,218,100)",
  "rgb(251,160,38)",
  "rgb(235,107,86)",
  "rgb(226,80,65)",
  "rgb(163,143,132)",
  "rgb(239,239,239)",
  "rgb(255,255,255)",
  "rgb(250,197,28)",
  "rgb(243,121,52)",
  "rgb(209,72,65)",
  "rgb(184,49,47)",
  "rgb(124,112,107)",
  "rgb(209,213,216)"
];

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentTextColor: string;
  expanded: boolean;
  currentStyle: string;
  currentcolor?: string;
  currentbgcolor?: string;
}

export default class FontFamily extends Component<Props, State> {
  state = {
    currentTextColor: "",
    expanded: false,
    currentStyle: "color"
  };

  componentWillMount(): void {
    const { editorState } = this.props;
    this.setState({
      currentcolor: DraftJSUtils.getSelectionCustomInlineStyle(editorState, [
        "COLOR"
      ]).COLOR,
      currentbgcolor: DraftJSUtils.getSelectionCustomInlineStyle(editorState, [
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
    const { currentStyle, currentTextColor, expanded } = this.state;
    return (
      <div
        className="dce-colorpicker-wrapper"
        onMouseDown={this.preventDefault}
      >
        <button
          className="dce-toolbar-icon dce-colorpicker-icon"
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
                    className="dce-colorpicker-cube"
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
