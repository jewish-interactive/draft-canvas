import * as React from "react";
import * as ReactDOM from "react-dom";
import { DraftCanvas } from "lib/Lib";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

const App = () => <DraftCanvas onSave={e => console.log(e)} />;

ReactDOM.render(<App />, document.getElementById("app"));
