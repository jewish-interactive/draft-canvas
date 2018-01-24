import * as React from "react";
import * as ReactDOM from "react-dom";
import {DraftCanvas} from "lib/Lib";

declare global { 
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }
    } 
}

const App = () => (
    <div>
        <h1>Hello World</h1>
        <DraftCanvas />
    </div>
)

ReactDOM.render(<App />, document.getElementById("app"));