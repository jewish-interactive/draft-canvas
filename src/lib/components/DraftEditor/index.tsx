import * as React from "react";
import { Component } from "react";
import { Editor, EditorState, RichUtils, convertFromRaw, Modifier } from "draft-js";
import * as DraftJSUtils from "draftjs-utils";
import { Toolbar } from "../Toolbar";
import Cross from "../../../icons/cross";
import { blockStyleFn, getEditorHeight, getStyleMap } from "../../utils/draft";
import "../../../../node_modules/draft-js/dist/Draft.css";
import "./styles.css";

const customStyleMap = getStyleMap();

const letters = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "\\"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", ",", "]", "["],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."]
];

export interface Props {
  editorState: EditorState;
    onEditorRef?: (editor:DraftEditor) => void;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
  defaultValue?: object;
  onSave: Function;
}

export interface State {
  showKeyboard: boolean;
}

/**
 * Editor component with DeraftJS Editor component as child.
 */
export class DraftEditor extends Component<Props, State> {
  editor: DraftEditor = undefined;

  constructor(props) {
    super(props);
    this.state = {
      showKeyboard: false,
    }
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
    this.props.onChange(EditorState.moveSelectionToEnd(editorState));
  };

  setEditorReference = ref => {
      if(this.props.onEditorRef) {
          this.props.onEditorRef(ref);
      }
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
    if (editorHeight && editorHeight >= 480) {
      return true;
    }
    return false;
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

  toggleShowKeyboard = () => {
    console.log('into toggleShowKeyboard')
    this.setState({
      showKeyboard: !this.state.showKeyboard
    });
  };

  render() {
    const { showKeyboard } = this.state;
    const { editorState, onChange, customFonts, onSave } = this.props;
    return (
      <div className="dce-editor-wrapper">
        <Toolbar
          editorState={editorState}
          onChange={onChange}
          customFonts={customFonts}
          onSave={onSave}
          toggleShowKeyboard={this.toggleShowKeyboard}
        />
        <div className="dce-editor-container" onClick={this.focusEditor}>
          <Editor
            ref={this.setEditorReference}
            customStyleMap={customStyleMap}
            blockStyleFn={blockStyleFn}
            handleKeyCommand={this.handleKeyCommand}
            handleReturn={this.handleReturn}
            editorState={editorState}
            onChange={onChange}
          />
        </div>
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
