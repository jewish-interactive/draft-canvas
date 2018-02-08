import * as React from 'react';
import { Component } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
} from 'draft-js';
import Color from '../../../../icons/color';
import * as DraftJSUtils from 'draftjs-utils';
import './styles.css';

const classNames = require('classnames');

const colors = ['rgb(97,189,109)', 'rgb(26,188,156)', 'rgb(84,172,210)', 'rgb(44,130,201)',
  'rgb(147,101,184)', 'rgb(71,85,119)', 'rgb(204,204,204)', 'rgb(65,168,95)', 'rgb(0,168,133)',
  'rgb(61,142,185)', 'rgb(41,105,176)', 'rgb(85,57,130)', 'rgb(40,50,78)', 'rgb(0,0,0)',
  'rgb(247,218,100)', 'rgb(251,160,38)', 'rgb(235,107,86)', 'rgb(226,80,65)', 'rgb(163,143,132)',
  'rgb(239,239,239)', 'rgb(255,255,255)', 'rgb(250,197,28)', 'rgb(243,121,52)', 'rgb(209,72,65)',
  'rgb(184,49,47)', 'rgb(124,112,107)', 'rgb(209,213,216)'];

export interface Props {
  editorState: EditorState;
  onChange: (editorState: EditorState) => void;
}

export interface State {
  currentTextColor: string;
  showSelector: boolean;
}

export default class FontFamily extends Component<Props, State> {
  state = {
    currentTextColor: '',
    showSelector: false,
  }

  componentWillMount(): void {
    const { editorState } = this.props;
    this.setState({
      currentTextColor: 
        DraftJSUtils.getSelectionCustomInlineStyle(
          editorState,
          ['FONTFAMILY']
        ).FONTFAMILY,
    });
  }

  toggleShowSelector = () => {
    this.setState({ showSelector: !this.state.showSelector });
  }

  onChange = (textColor) => {
    const { currentTextColor } = this.state;
    const { editorState, onChange } = this.props;
    const newTextColor = currentTextColor === textColor ? '' : textColor;
    const newState = DraftJSUtils.toggleCustomInlineStyle(
      editorState,
      'fontFamily',
      newTextColor,
    );
    if (newState) {
      onChange(newState);
    }
    this.setState({ currentTextColor: newTextColor });
  };

  render() {
    const { currentTextColor, showSelector } = this.state;
    let currentStyle = 'color';
    return (
      <div className="dce-colorpicker-wrapper">
        <button className="dce-toolbar-icon" onClick={this.toggleShowSelector}>
          <Color />
        </button>
        {showSelector &&
          <div className="dce-colorpicker-modal">
            <span className="rdw-colorpicker-modal-header">
              <span
                className={classNames(
                  'rdw-colorpicker-modal-style-label',
                  { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'color' },
                )}
              >
                Text
              </span>
              <span
                className={classNames(
                  'rdw-colorpicker-modal-style-label',
                  { 'rdw-colorpicker-modal-style-label-active': currentStyle === 'bgcolor' },
                )}
              >
                Highlight
              </span>
            </span>
            <span className="dce-colorpicker-modal-options">
              {
                colors.map((c, index) =>
                  (<div className="dce-colorpicker-option">
                    <div
                      style={{ backgroundColor: c }}
                      className="dce-colorpicker-cube"
                    />
                  </div>))
              }
            </span>
          </div>
        }
      </div>
    );
  }
}
