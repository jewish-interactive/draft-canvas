import * as React from 'react';
import { Component } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import {
  getAlignmentForBlock,
  getStyleSections,
  getBlockArray,
  getCanvasTextStyle
} from '../../utils/canvas';
import './styles.css';

export interface Props {
  editorState: EditorState;
}

export interface State {
}

export class Canvas extends Component<Props, State> {
  componentWillReceiveProps(props) {
    if (this.props.editorState !== props.editorState) {
      var canvas = document.getElementById('canvas') as HTMLCanvasElement;
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, 500, 500);
      const blocks = getBlockArray(props.editorState);

      let y = 16;
      blocks.forEach(block => {
        let { x, direction } = getAlignmentForBlock(block.text);
        ctx.textAlign = direction;
        const styleSections = getStyleSections(block);
        styleSections.forEach(section => {
          ctx.font = getCanvasTextStyle(section.styles);
          ctx.fillText(section.text, x, y);
          x += (direction === 'left' ? 1 : -1) * ctx.measureText(section.text).width;
        });
        y += 19;
      })
    }
  }

  render() {
    const { editorState } = this.props;
    return (
      <div className="canvas-container">
        <canvas
          id="canvas"
          height="500"
          width="500"
          className="canvas"
        >
        </canvas>
      </div>
    );
  }
}
