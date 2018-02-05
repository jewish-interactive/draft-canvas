import * as React from 'react';
import * as ReactDOM from 'react-dom';
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
  canvas: HTMLCanvasElement | undefined = undefined;;

  getCanvasRef = (ref) => {
    this.canvas = ReactDOM.findDOMNode(ref) as HTMLCanvasElement;
  }

  componentWillReceiveProps(props) {
    if (this.props.editorState !== props.editorState) {
      var ctx = this.canvas.getContext('2d');
      ctx.clearRect(0, 0, 500, 500);
      const blocks = getBlockArray(props.editorState);

      let y = 0;
      blocks.forEach(block => {
        let { x, direction } = getAlignmentForBlock(block);
        ctx.textAlign = direction;
        const styleSections = getStyleSections(block);
        const blockHeight = getMaxFontSizeInBlock(styleSections);
        y += blockHeight;
        styleSections.forEach(section => {
          ctx.font = getCanvasTextStyle(section.styles);
          ctx.fillText(section.text, x, y);
          const textWidth = ctx.measureText(section.text).width;
          if (section.styles.UNDERLINE) {
            ctx.fillRect(x, y + 1, textWidth, 1);
          }
          x += (direction === 'left' ? 1 : -1) * textWidth;
        });
        y += blockHeight/5;
      });
    }
  }

  render() {
    const { editorState } = this.props;
    return (
      <div className="dce-canvas-container">
        <canvas
          ref={this.getCanvasRef}
          height="500"
          width="500"
          className="dce-canvas"
        >
        </canvas>
      </div>
    );
  }
}
