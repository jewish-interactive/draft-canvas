import * as React from "react";
import { Component } from "react";
import { ContentState, convertToRaw, RawDraftContentState, Editor, EditorState, RichUtils, convertFromRaw, Modifier } from "draft-js";
import * as DraftJSUtils from "draftjs-utils";
import { Toolbar } from "../Toolbar/Toolbar";
import Cross from "../../../icons/cross";
import { blockStyleFn, getEditorHeight, getStyleMap } from "../../utils/Draft-Utils";
import "../../../../node_modules/draft-js/dist/Draft.css";
import "./DraftEditor-Styles.css";
import htmlToDraftPlugin from "html-to-draftjs";

const customStyleMap = getStyleMap();

const letters = [
  ["~", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "-", "="],
  ["/", "'", "ק", "ר", "א", "ט", "ו", "ן", "ם", "פ", "\\"],
  ["ש", "ד", "ג", "כ", "ע", "י", "ח", "ל", "ך", "ף", ",", "]", "["],
  ["ז", "ס", "ב", "ה", "נ", "מ", "צ", "ת", "ץ", "."]
];

export interface Props {
  editorState: EditorState;
  editorRef: React.RefObject<Editor>;
  onChange: (editorState: EditorState) => void;
  customFonts?: any[];
  defaultValue?: string | RawDraftContentState;
  onSave: () => void;
}

export interface State {
  showKeyboard: boolean;
}

const convertFromHtml = (html:string):ContentState => {
    const blocksFromHTML = htmlToDraftPlugin(html);
    const {contentBlocks, entityMap} = blocksFromHTML;
    return ContentState.createFromBlockArray(contentBlocks, entityMap);
}

/**
 * Editor component with DeraftJS Editor component as child.
 */
export class DraftEditor extends Component<Props, State> {

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

  initializeEditor = (initialValue:string | RawDraftContentState) => {
    const contentState = typeof initialValue !== "string"
        ?   convertFromRaw(initialValue)
        :   convertFromHtml(initialValue);

    const editorState = EditorState.createWithContent(contentState);
    this.props.onChange(EditorState.moveSelectionToEnd(editorState));
  };


  focusEditor = () => {
    (this.props.editorRef.current as any).focus();
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
            ref={this.props.editorRef}
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
