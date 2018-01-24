import * as React from 'react';
import { Component } from "react";
import { EditorState } from 'draft-js';

export interface Props {
  editorState: EditorState;
}

export interface State {
}

const getBlockArray = (editorState: EditorState) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap().toArray();
  console.log(blockMap)
}

export class Canvas extends Component<Props, State> {
    componentWillReceiveProps(props) {
      if (this.props.editorState !== props.editorState) {
        var canvas = document.getElementById('canvas') as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');
        const blocks = getBlockArray(props.editorState);
        ctx.fillText('Editor content will come here', 20, 20);
      }
    }

    render() {
        const { editorState } = this.props;
        return (
            <div>
                <canvas id="canvas"></canvas>
            </div>
        )
    }
}
