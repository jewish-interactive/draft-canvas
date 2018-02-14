import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { DraftCanvas } from "lib/Lib";
import "./styles.css";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export interface Props {}

export interface State {
  canvas?: HTMLCanvasElement;
}

class App extends Component<Props, State> {
  state = {
    canvas: undefined
  };

  getCanvasRef = ref => {
    this.setState({
      canvas: ReactDOM.findDOMNode(ref) as HTMLCanvasElement
    });
  };

  render() {
    return (
      <div className="dce-canvas-container">
        <DraftCanvas
          target={this.state.canvas}
          onSave={obj => {
            console.log(JSON.stringify(obj));
          }}
        />
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

ReactDOM.render(<App />, document.getElementById("app"));
