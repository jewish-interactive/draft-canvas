import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import {
  getAlignmentForBlock,
  getStyleSections,
  getBlockArray,
  setCanvasTextStyles,
  getMaxFontSizeInBlock
} from "../../utils/canvas";

export interface Props {
  editorState: EditorState;
  canvas: HTMLCanvasElement;
  height: number;
  width: number;
  setDimensions: Function;
}

export interface State {}

export class Canvas extends Component<Props, State> {
  componentWillReceiveProps(props) {
    const { editorState, canvas, height, width, setDimensions } = props;
    if (
      this.props.editorState !== editorState ||
      this.props.canvas !== props.canvas
    ) {
      const ctx = props.canvas.getContext("2d");
      ctx.clearRect(0, 0, height, width);
      const blocks = getBlockArray(editorState);
      let y = 0;
      let x = 0;
      let maxWidth = 0;
      blocks.forEach(block => {
        let { x, direction } = getAlignmentForBlock(block, width);
        ctx.textAlign = direction;
        const styleSections = getStyleSections(block);
        const blockHeight = getMaxFontSizeInBlock(styleSections);
        y += blockHeight;
        let blockWidth = 0;
        styleSections.forEach(section => {
          setCanvasTextStyles(ctx, section.styles);
          const textWidth = ctx.measureText(section.text).width;
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
          ctx.fillStyle = section.styles.color ? section.styles.color : "black";
          ctx.fillText(section.text, x, y);
          x += (direction === "left" ? 1 : -1) * textWidth;
        });
        y += blockHeight / 5;
        if (blockWidth > maxWidth) {
          maxWidth = blockWidth;
        }
      });
      setDimensions({ width: maxWidth, height: y });
    }
  }

  render() {
    return null;
  }
}
