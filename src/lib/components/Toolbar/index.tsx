import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils, Modifier } from "draft-js";
import FontFamily from "./FontFamily";
import FontSize from "./FontSize";
import Color from "./Color";
import * as DraftJSUtils from "draftjs-utils";
import Bold from "../../../icons/bold";
import Italic from "../../../icons/italic";
import Underline from "../../../icons/underline";
import AlignLeft from "../../../icons/alignLeft";
import AlignRight from "../../../icons/alignRight";
import AlignCenter from "../../../icons/alignCenter";
import Sefaria from "../../../icons/sefaria";
import Keyboard from "../../../icons/keyboard";
import Cross from "../../../icons/cross";
import "./styles.css";

const classNames = require("classnames");

const letters = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "\\"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", ",", "]", "["],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."]
];

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
  onSave: any;
}

export interface State {
  showKeyboard: boolean;
  currentStyles: {
    inlineStyles: { BOLD: boolean; ITALIC: boolean; UNDERLINE: boolean };
    alignmentStyle: any;
  };
}

/**
 * Toolbar component for DraftJS editor.
 */
export class Toolbar extends Component<Props, State> {
  state = {
    showKeyboard: false,
    currentStyles: {
      inlineStyles: { BOLD: false, ITALIC: false, UNDERLINE: false },
      alignmentStyle: {}
    }
  };

  componentWillMount() {
    const { editorState } = this.props;
    if (editorState) {
      this.setState({
        currentStyles: this.getCurrentStyles(editorState)
      });
    }
  }

  componentWillReceiveProps(props) {
    const { editorState } = props;
    if (editorState) {
      this.setState({
        currentStyles: this.getCurrentStyles(editorState)
      });
    }
  }

  getCurrentStyles = editorState => {
    return {
      inlineStyles: DraftJSUtils.getSelectionInlineStyle(editorState),
      alignmentStyle: DraftJSUtils.getSelectedBlocksMetadata(editorState).toJS()
    };
  };

  toggleInlineStyle = event => {
    event.preventDefault();
    const { editorState, onChange } = this.props;
    let newState = RichUtils.toggleInlineStyle(
      editorState,
      event.currentTarget.name
    );
    if (newState) {
      onChange(newState);
    }
  };

  addBlockAlignmentData = event => {
    const { editorState, onChange } = this.props;
    const currentTextAlignment = DraftJSUtils.getSelectedBlocksMetadata(
      editorState
    ).get("text-align");
    const textAlignment = event.currentTarget.name;
    if (currentTextAlignment !== textAlignment) {
      onChange(
        DraftJSUtils.setBlockData(editorState, { "text-align": textAlignment })
      );
    } else {
      onChange(
        DraftJSUtils.setBlockData(editorState, { "text-align": undefined })
      );
    }
  };

  toggleShowKeyboard = () => {
    this.setState({
      showKeyboard: !this.state.showKeyboard
    });
  };

  enterTextInEditor = event => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      event.target.id,
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    const { editorState, onChange, customFonts, onSave } = this.props;
    const { showKeyboard, currentStyles } = this.state;
    return (
      <div className="dce-toolbar">
        <button
          name="BOLD"
          className={classNames("dce-toolbar-option", {
            "dce-toolbar-option-selected": currentStyles.inlineStyles.BOLD
          })}
          onMouseDown={this.toggleInlineStyle}
        >
          <Bold />
        </button>
        <button
          name="ITALIC"
          className={classNames("dce-toolbar-option", {
            "dce-toolbar-option-selected": currentStyles.inlineStyles.ITALIC
          })}
          onMouseDown={this.toggleInlineStyle}
        >
          <Italic />
        </button>
        <button
          name="UNDERLINE"
          className={classNames("dce-toolbar-option", {
            "dce-toolbar-option-selected": currentStyles.inlineStyles.UNDERLINE
          })}
          onMouseDown={this.toggleInlineStyle}
        >
          <Underline />
        </button>
        <button
          name="left"
          className={classNames("dce-toolbar-option", {
            "dce-toolbar-option-selected":
              currentStyles.alignmentStyle["text-align"] === "left"
          })}
          onMouseDown={this.addBlockAlignmentData}
        >
          <AlignLeft />
        </button>
        <button
          name="center"
          className={classNames("dce-toolbar-option", {
            "dce-toolbar-option-selected":
              currentStyles.alignmentStyle["text-align"] === "center"
          })}
          onMouseDown={this.addBlockAlignmentData}
        >
          <AlignCenter />
        </button>
        <button
          name="right"
          className={classNames("dce-toolbar-option", {
            "dce-toolbar-option-selected":
              currentStyles.alignmentStyle["text-align"] === "right"
          })}
          onMouseDown={this.addBlockAlignmentData}
        >
          <AlignRight />
        </button>
        <Color editorState={editorState} onChange={onChange} />
        <FontFamily
          editorState={editorState}
          onChange={onChange}
          customFonts={customFonts}
        />
        <FontSize editorState={editorState} onChange={onChange} />
        <a
          target="_blank"
          className="dce-sefaria-link"
          href="https://www.sefaria.org/texts"
        >
          <Sefaria />
        </a>
        <button name="right" className="dce-save-btn" onMouseDown={onSave}>
          Save
        </button>
        <button
          name="right"
          className="dce-toolbar-option"
          onMouseDown={this.toggleShowKeyboard}
        >
          <Keyboard />
        </button>
        {showKeyboard && (
          <div className="dce-keyboard" onMouseDown={this.enterTextInEditor}>
            <button onClick={this.toggleShowKeyboard} className="dce-cross-btn">
              <Cross />
            </button>
            {letters.map((row, index) => (
              <div key={`row-${index}`}>
                {row.map(ch => (
                  <span key={ch} className="dce-hebrew-char" id={ch}>
                    {ch}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}
