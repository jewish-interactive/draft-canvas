import * as React from "react";
import { Component } from "react";
import "./styles.css";

const classNames = require("classnames");

export interface Props {
  children: any;
  onChange: Function;
  label: string;
  selectedValue?: any;
}

export interface State {
  highlighted: number;
  expanded: boolean;
}

export default class Dropdown extends Component<Props, State> {
  state = {
    highlighted: -1,
    expanded: false
  };

  onChange = value => {
    this.props.onChange(value);
    this.toggleExpanded();
  };

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  setHighlighted = (highlighted: number) => {
    this.setState({ highlighted });
  };

  preventDefault = event => {
    event.preventDefault();
  };

  render() {
    const { children, label, selectedValue } = this.props;
    const { highlighted, expanded } = this.state;
    return (
      <div className="dce-dropdown-wrapper" onMouseDown={this.preventDefault}>
        <a className="dce-dropdown-label" onClick={this.toggleExpanded}>
          {label}
          <div
            className={classNames({
              "dce-dropdown-carettoclose": expanded,
              "dce-dropdown-carettoopen": !expanded
            })}
          />
        </a>
        {expanded && (
          <ul className="dce-dropdown-optionwrapper">
            {React.Children.map(children, (option: any, index) => {
              const temp =
                option &&
                React.cloneElement(option, {
                  onSelect: this.onChange,
                  highlighted: highlighted === index,
                  setHighlighted: this.setHighlighted,
                  selectedValue,
                  index
                });
              return temp;
            })}
          </ul>
        )}
      </div>
    );
  }
}
