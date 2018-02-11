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
import "./styles.css";

export interface Props {
  editorState: EditorState;
  setCanvasRef: Function;
}

export interface State {}

export class Canvas extends Component<Props, State> {
  canvas: HTMLCanvasElement | undefined = undefined;

  getCanvasRef = ref => {
    this.canvas = ReactDOM.findDOMNode(ref) as HTMLCanvasElement;
    this.props.setCanvasRef(this.canvas);
  };

  componentWillReceiveProps(props) {
    if (this.props.editorState !== props.editorState) {
      var ctx = this.canvas.getContext("2d");
      ctx.clearRect(0, 0, 500, 500);
      const blocks = getBlockArray(props.editorState);

      let y = 0;
      let maxWidth = 0;
      blocks.forEach(block => {
        let { x, direction } = getAlignmentForBlock(block);
        ctx.textAlign = direction;
        const styleSections = getStyleSections(block);
        const blockHeight = getMaxFontSizeInBlock(styleSections);
        y += blockHeight;
        let blockWidth = 0;
        styleSections.forEach(section => {
          setCanvasTextStyles(ctx, section.styles);
          const textWidth = ctx.measureText(section.text).width;
          blockWidth += textWidth;
          if (section.styles.UNDERLINE) {
            ctx.fillRect(x, y + 1, textWidth, 1);
          }
          if (section.styles.bgcolor) {
            ctx.fillStyle = section.styles.bgcolor;
            ctx.fillRect(
              x,
              y - blockHeight,
              textWidth,
              blockHeight + blockHeight / 5
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
        />
      </div>
    );
  }
}
