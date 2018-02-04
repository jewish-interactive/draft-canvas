import * as React from 'react';
import { Component } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import {
  getAlignmentForBlock,
  getStyleSections,
  getBlockArray,
  getCanvasTextStyle,
  getMaxFontSizeInBlock
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

      blocks.forEach(block => {
        let { x, direction } = getAlignmentForBlock(block);
        ctx.textAlign = direction;
        const styleSections = getStyleSections(block);
        let y = getMaxFontSizeInBlock(styleSections);
        styleSections.forEach(section => {
          ctx.font = getCanvasTextStyle(section.styles);
          ctx.fillText(section.text, x, y);
          const textWidth = ctx.measureText(section.text).width;
          if (section.styles.UNDERLINE) {
            ctx.fillRect(x, y + 1, textWidth, 1);
          }
          x += (direction === 'left' ? 1 : -1) * textWidth;
        });
        y += y + (y/5);
      })
    }
  }

  render() {
    const { editorState } = this.props;
    return (
      <div className="dce-canvas-container">
        <canvas
          id="canvas"
          height="500"
          width="500"
          className="dce-canvas"
        >
        </canvas>
      </div>
    );
  }
}
