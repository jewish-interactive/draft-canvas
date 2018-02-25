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

class App extends Component<Props, undefined> {
  render() {
    return (
      <div className="dce-canvas-container">
        <DraftCanvas
          onSave={obj => {
            console.log(obj);
          }}
          defaultValue={{
            blocks: [
              {
                key: "71u9",
                text: "saved state",
                type: "unstyled",
                depth: 0,
                inlineStyleRanges: [
                  { offset: 0, length: 11, style: "BOLD" },
                  { offset: 0, length: 11, style: "color-rgb(97,189,109)" }
                ],
                entityRanges: [],
                data: {}
              }
            ],
            entityMap: {}
          }}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
