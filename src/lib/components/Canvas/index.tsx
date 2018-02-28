import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import {
  getAlignmentForBlock,
  getStyleSections,
  getBlockArray,
  setCanvasTextStyles,
  getMaxFontSizeInBlock,
  getLines
} from "../../utils/canvas";
import "./styles.css";

export interface Props {
  editorState: EditorState;
  setCanvasRef: Function;
  setDimensions: Function;
}

export interface State {}

export class Canvas extends Component<Props, State> {
  canvas = undefined;

  componentWillReceiveProps(props) {
    const { editorState, setDimensions } = props;
    if (this.props.editorState !== editorState) {
      const ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      const blocks = getBlockArray(editorState);
      let y = 0;
      let x = 0;
      let maxWidth = 0;
      const dir = {
        left: false,
        right: false
      };
      blocks.forEach(block => {
        let { x, direction } = getAlignmentForBlock(block, 500);
        dir[direction] = true;
        ctx.textAlign = direction;
        const styleSections = getStyleSections(block);
        const blockHeight = getMaxFontSizeInBlock(styleSections);
        y += blockHeight;
        let blockWidth = 0;
        styleSections.forEach(section => {
          setCanvasTextStyles(ctx, section.styles);
          const lines = getLines(ctx, section.text, blockWidth);
          lines.forEach((line, index) => {
            const textWidth = ctx.measureText(line).width;
            blockWidth += textWidth;
            if (section.styles.bgcolor) {
              ctx.fillStyle = section.styles.bgcolor;
              ctx.fillRect(
                direction === "right" ? x - textWidth : x,
                y - blockHeight,
                textWidth,
                blockHeight + blockHeight / 5
              );
            }
            if (section.styles.UNDERLINE) {
              ctx.fillRect(
                direction === "right" ? x - textWidth : x,
                y + 1,
                textWidth,
                1
              );
            }
            ctx.fillStyle = section.styles.color
              ? section.styles.color
              : "black";
            ctx.fillText(line, x, y);
            x += (direction === "left" ? 1 : -1) * textWidth;
            if (lines.length > 1 && index < lines.length - 1) {
              y += blockHeight + blockHeight / 5;
              x = direction === "right" ? 500 : 0;
              maxWidth = 500;
            }
          });
        });
        y += blockHeight / 5;
        if (blockWidth > maxWidth) {
          maxWidth = blockWidth;
        }
      });
      setDimensions({ width: maxWidth, height: y, dir });
    }
  }

  getCanvasRef = ref => {
    this.canvas = ReactDOM.findDOMNode(ref) as HTMLCanvasElement;
    this.props.setCanvasRef(this.canvas);
  };

  render() {
    return (
      <canvas
        ref={this.getCanvasRef}
        className="dce-canvas"
        height="500"
        width="500"
      />
    );
  }
}
