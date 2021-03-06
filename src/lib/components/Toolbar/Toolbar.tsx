import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import {FontFamily} from "./FontFamily/Toolbar-FontFamily";
import {FontSize} from "./FontSize/Toolbar-FontSize";
import {FontColor} from "./Color/Toolbar-Color";
import * as DraftJSUtils from "draftjs-utils";
import Bold from "../../../icons/bold";
import Italic from "../../../icons/italic";
import Underline from "../../../icons/underline";
import AlignLeft from "../../../icons/alignLeft";
import AlignRight from "../../../icons/alignRight";
import AlignCenter from "../../../icons/alignCenter";
import Sefaria from "../../../icons/sefaria";
import Keyboard from "../../../icons/keyboard";
import Save from "../../../icons/save";
import "./Toolbar-Styles.css";

import {classNames} from "../../utils/Imports";

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
  onSave: any;
  toggleShowKeyboard: any;
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
        <FontColor editorState={editorState} onChange={onChange} />
        <a
          target="_blank"
          className="dce-sefaria-link"
          href="https://www.sefaria.org/texts"
        >
          <Sefaria />
        </a>
        <button
          className="dce-toolbar-option dce-toolbar-option-keyboard"
          onMouseDown={this.props.toggleShowKeyboard}
        >
          <Keyboard />
        </button>
        {
            /* Hidden for now
        <button className="dce-toolbar-option" onMouseDown={onSave}>
          <Save />
        </button>
        */
        }
        <FontFamily
          editorState={editorState}
          onChange={onChange}
          customFonts={customFonts}
        />
        <FontSize editorState={editorState} onChange={onChange} />
      </div>
    );
  }
}
