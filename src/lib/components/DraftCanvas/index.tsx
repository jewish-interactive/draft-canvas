import * as React from 'react';
import { Component } from "react";
import { EditorState } from 'draft-js';
import { DraftEditor } from '../DraftEditor';
import { Canvas } from '../Canvas';

export interface Props {
}

export interface State {
  editorState: EditorState;
}

export class DraftCanvas extends Component {
    state = {
        editorState: EditorState.createEmpty()
    }

    onChange = editorState => {
        this.setState({ editorState });
    }

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <DraftEditor
                    editorState={editorState}
                    onChange={this.onChange}
                />
                <Canvas
                  editorState={editorState}
                />
            </div>
        )
    }
}
