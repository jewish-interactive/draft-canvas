import * as React from 'react';
import { Component } from "react";
import {
    Editor,
    EditorState,
} from 'draft-js';

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
}

export class DraftEditor extends Component<Props, State> {
    render() {
        const { editorState, onChange } = this.props;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    onChange={onChange}
                />
            </div>
        )
    }
}
