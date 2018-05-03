import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { DraftCanvas } from "lib/Lib";
import "./styles.css";
import {ContentState, convertToRaw, RawDraftContentState} from "draft-js";
import htmlToDraftPlugin from 'html-to-draftjs';
import draftToHtmlPlugin from 'draftjs-to-html';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

export interface Props {
    defaultValue;
    onSave;
    setSaveTrigger;
}

interface State {
  canvas?:HTMLCanvasElement
}

class Container extends Component<Props, State> {
  constructor(props:Props) {
    super(props);

    this.state = {};
  }

  componentDidUpdate(prevProps, prevState) {
    //couldn't get this to work easily via just JSX

    if(prevState.canvas) {
      document.body.removeChild(prevState.canvas);
    }

    if(this.state.canvas) {
      const canvas = this.state.canvas;
      canvas.style.position = "absolute";
      canvas.style.top = "700px";
      canvas.style.left = ((window.innerWidth - canvas.width)/2) + "px";
      document.body.appendChild(canvas);
    }
    
  }
  render() { 
    return (
      <div className="dce-canvas-container">
        <DraftCanvas
            useCanvas={true}
            setSaveTrigger={this.props.setSaveTrigger}
            onSave={obj => {
            console.log(obj);
            this.setState({
              canvas: obj.canvas
            })
            this.props.onSave(obj);
          }}

          defaultValue={this.props.defaultValue}
        />
      </div>
    );
  }
}

class App extends Component<{}, {visible: boolean, defaultValue:any}> {
    private doSave: () => void;
    constructor(props) {
        super(props);

        this.onSave = this.onSave.bind(this);
        this.setSaveTrigger = this.setSaveTrigger.bind(this);

        this.state = {
            visible: true,
            defaultValue: {
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
          }
        }
    }

    onSave(obj) {
        this.setState({
            defaultValue: obj.rawDraftContentState,
        });
    }


    setSaveTrigger(callback:() => void) {
        this.doSave = callback;
    }

    doRoundTrip() {
        const html = draftToHtmlPlugin(this.state.defaultValue);

        console.log(html);

        const blocksFromHTML = htmlToDraftPlugin(html);
        const {contentBlocks, entityMap} = blocksFromHTML;


        const contentState = ContentState.createFromBlockArray(
            contentBlocks,
            entityMap
        );
     
        const raw = convertToRaw(contentState);

        console.log(raw);

        this.setState({defaultValue: raw});
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={() => this.doSave()}>
                    Save 
                </button> 
                <button onClick={() => this.setState({visible: !this.state.visible})}>
                    {this.state.visible ? "Hide" : "Show"} 
                </button> 

                <button onClick={() => this.doRoundTrip()}>
                    Roundtrip
                </button> 

                {this.state.visible ? <Container setSaveTrigger={this.setSaveTrigger} defaultValue={this.state.defaultValue} onSave={this.onSave} /> : null}
            </React.Fragment>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("app"));
