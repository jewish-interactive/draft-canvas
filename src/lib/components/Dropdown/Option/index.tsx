import * as React from 'react';
import { PureComponent } from "react";
import PropTypes from 'prop-types';
import './styles.css';

const classNames = require('classnames');

export interface Props {
  children: any,
  value: any,
  onClick?: Function,
  onSelect?: Function,
  setHighlighted?: Function,
  index?: number,
  disabled?: boolean,
  active?: boolean,
  highlighted?: boolean,
}

export default class Option extends PureComponent<Props, any> {
  onClick = (event) => {
    const { onSelect, onClick, value, disabled } = this.props;
    if (!disabled) {
      if (onSelect) {
        onSelect(value);
      }
      if (onClick) {
        event.stopPropagation();
        onClick(value);
      }
    }
  };

  setHighlighted = () => {
    const { setHighlighted, index } = this.props;
    if (setHighlighted) {
      setHighlighted(index);
    }
  };

  resetHighlighted = () => {
    const { setHighlighted } = this.props;
    if (setHighlighted) {
      setHighlighted(-1);
    }
  };

  render(): Object {
    const {
      children,
      active,
      disabled,
      highlighted,
    } = this.props;
    return (
      <li
        className={classNames(
          'rdw-dropdownoption-default', {
            'rdw-dropdownoption-active': active,
            'rdw-dropdownoption-highlighted': highlighted,
            'rdw-dropdownoption-disabled': disabled,
          })
        }
        onMouseEnter={this.setHighlighted}
        onMouseLeave={this.resetHighlighted}
        onClick={this.onClick}
      >
        {children}
      </li>
    );
  }
}
