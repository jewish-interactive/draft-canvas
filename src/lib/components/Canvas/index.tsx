import * as React from 'react';
import { Component } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import './styles.css';

export interface Props {
  editorState: EditorState;
}

export interface State {
}

const getBlockArray = (editorState: EditorState) => {
  return convertToRaw(editorState.getCurrentContent()).blocks;
}

const isHebrew = str => {
  var char = str.trim()[0];
  var position = char && char.search(/[\u0590-\u05FF]/);
  return position >= 0;
}

export class Canvas extends Component<Props, State> {
    componentWillReceiveProps(props) {
      if (this.props.editorState !== props.editorState) {
        var canvas = document.getElementById('canvas') as HTMLCanvasElement;
        var ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, 500, 500);

        const blocks = getBlockArray(props.editorState);
        ctx.font = "16px Verdana, Geneva, Tahoma, sans-serif";
        let y = 16;
        blocks.forEach(block => {
          let x;
          if (isHebrew(block.text)) {
            x = 500;
            ctx.textAlign="right";
          } else {
            x = 0;
            ctx.textAlign="left";
          }
          ctx.fillText(block.text, x, y);
          y += 19;
        })
      }
    }

    render() {
        const { editorState } = this.props;
        return (
            <div className="canvas-container">
                <canvas id="canvas" height="500" width="500" className="canvas"></canvas>
            </div>
        )
    }
}
