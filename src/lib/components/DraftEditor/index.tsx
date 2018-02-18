import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils, convertFromRaw } from "draft-js";
import * as DraftJSUtils from "draftjs-utils";
import { Toolbar } from "../Toolbar";
import { blockStyleFn, getEditorHeight } from "../../utils/draft";
import "../../../../node_modules/draft-js/dist/Draft.css";
import "./styles.css";

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
  defaultValue?: object;
  height: number;
  width: number;
}

export interface State {}

/**
 * Editor component with DeraftJS Editor component as child.
 */
export class DraftEditor extends Component<Props, State> {
  editor: DraftEditor = undefined;

  constructor(props) {
    super(props);
    if (props.defaultValue) {
      this.initializeEditor(props.defaultValue);
    }
  }

  componentWillReceiveProps(props) {
    if (!this.props.defaultValue && props.defaultValue) {
      this.initializeEditor(props.defaultValue);
    }
  }

  initializeEditor = rawContentState => {
    const contentState = convertFromRaw(rawContentState);
    const editorState = EditorState.createWithContent(contentState);
    DraftJSUtils.extractInlineStyle(editorState);
    this.props.onChange(EditorState.moveSelectionToEnd(editorState));
  };

  setEditorReference = ref => {
    this.editor = ref;
  };

  focusEditor = () => {
    (this.editor as any).focus();
  };

  handleKeyCommand: any = command => {
    const { editorState, onChange } = this.props;
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  handleReturn = (): any => {
    const editorHeight = getEditorHeight();
    if (editorHeight && editorHeight >= this.props.height - 20) {
      return true;
    }
    return false;
  };

  render() {
    const { editorState, onChange, customFonts, height, width } = this.props;
    return (
      <div>
        <Toolbar
          editorState={editorState}
          onChange={onChange}
          customFonts={customFonts}
          width={width}
        />
        <div
          className="dce-editor-container"
          style={{ height, width }}
          onClick={this.focusEditor}
        >
          <Editor
            ref={this.setEditorReference}
            customStyleMap={DraftJSUtils.getCustomStyleMap()}
            blockStyleFn={blockStyleFn}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            editorState={editorState}
            onChange={onChange}
          />
        </div>
      </div>
    );
  }
}
