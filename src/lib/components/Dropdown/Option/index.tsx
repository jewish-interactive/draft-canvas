import * as React from 'react';
import { PureComponent } from "react";
import './styles.css';

const classNames = require('classnames');

export interface Props {
  children: any,
  value: any,
  onSelect?: Function,
  setHighlighted?: Function,
  index?: number,
  selectedValue?: any,
  highlighted?: boolean,
}

export default class Option extends PureComponent<Props, any> {
  onClick = () => {
    const { onSelect, value } = this.props;
    onSelect(value);
  };

  setHighlighted = () => {
    const { setHighlighted, index } = this.props;
    setHighlighted(index);
  };

  resetHighlighted = () => {
    const { setHighlighted } = this.props;
    setHighlighted(-1);
  };

  render(): Object {
    const {
      children,
      highlighted,
      selectedValue,
      value
    } = this.props;
    return (
      <li
        className={classNames(
          'cde-dropdownoption-default', {
            'cde-dropdownoption-highlighted': highlighted,
            'cde-dropdownoption-selected': selectedValue === value,
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
