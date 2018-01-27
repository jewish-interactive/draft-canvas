import * as React from 'react';
import { Component } from "react";
import { EditorState, convertToRaw } from 'draft-js';
import { getStyleSections } from '../../utils/canvas';
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

const getAlignmentForSection = (ctx, text) => {
  if (isHebrew(text)) {
    ctx.textAlign="right";
    return 500;
  } else {
    ctx.textAlign="left";
    return 0;
  }
}

const getFontStyleForSection = styles => {
  let fontStyle = "16px Verdana, Geneva, Tahoma, sans-serif";
  if(styles.BOLD) {
    fontStyle = `bold ${fontStyle}`;
  }
  if(styles.ITALIC) {
    fontStyle = `italic ${fontStyle}`;
  }
  return fontStyle;
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
        let x = getAlignmentForSection(ctx, block.text);
        const styleSections = getStyleSections(block);
        styleSections.forEach(section => {
          console.log(section)
          ctx.font = getFontStyleForSection(section.styles);
          ctx.fillText(section.text, x, y);
          x += ctx.measureText(section.text).width;
        });
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
