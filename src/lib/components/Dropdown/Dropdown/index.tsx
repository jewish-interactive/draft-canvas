import * as React from 'react';
import { Component } from "react";
import PropTypes from 'prop-types';
import './styles.css';

const classNames = require('classnames');

export interface Props {
  children: any;
  onChange: Function;
}

export interface State {
  highlighted: number;
  expanded: boolean;
}

export default class Dropdown extends Component<Props, State> {
  state = {
    highlighted: -1,
    expanded: false,
  };

  onChange = (value) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(value);
    }
    this.setState({ expanded: false });
  };

  setHighlighted = (highlighted: number) => {
    this.setState({ highlighted });
  };

  render() {
    console.log('classNames', classNames)
    const { children } = this.props;
    const { highlighted, expanded } = this.state;
    const options = children.slice(1, children.length);
    return (
      <div className="cde-dropdown-wrapper">
        <a
          className="cde-dropdown-selectedtext"
        >
          {children[0]}
          <div
            className={classNames({
              'cde-dropdown-carettoclose': expanded,
              'cde-dropdown-carettoopen': !expanded,
            })}
          />
        </a>
        {expanded ?
          <ul className="cde-dropdown-optionwrapper">
            {
              React.Children.map(options, (option: any, index) => {
                const temp = option && React.cloneElement(
                  option, {
                    onSelect: this.onChange,
                    highlighted: highlighted === index,
                    setHighlighted: this.setHighlighted,
                    index,
                  });
                return temp;
              })
            }
          </ul> : undefined}
      </div>
    );
  }
}
