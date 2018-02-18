import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { EditorState, convertToRaw } from "draft-js";
import { DraftEditor } from "../DraftEditor";
import { Canvas } from "../Canvas";
import "./styles.css";

export interface Props {
  customFonts?: any[];
  target?: HTMLCanvasElement;
  onSave?: Function;
  defaultValue?: object;
}

export interface State {
  editorState: EditorState;
  dimensions: any;
  initDimensions: any;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
  canvas = undefined;
  constructor(props) {
    super(props);
    let height = 500;
    let width = 500;
    if (props.target) {
      height = props.target.clientHeight;
      width = props.target.clientWidth;
    }
    this.state = {
      editorState: EditorState.createEmpty(),
      dimensions: { height, width },
      initDimensions: { height, width }
    };
  }

  componentWillReceiveProps(props) {
    if (!this.props.target && props.target) {
      this.setState({
        initDimensions: {
          height: props.target.clientHeight,
          width: props.target.clientWidth
        }
      });
    }
  }

  onChange = editorState => {
    this.setState({ editorState });
  };

  onSave = () => {
    const { editorState, dimensions } = this.state;
    const rawDraftContentState = convertToRaw(editorState.getCurrentContent());
    const { width, height } = dimensions;
    this.canvas.width = width;
    this.canvas.height = height;
    const ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(this.props.target, 0, 0, width, height, 0, 0, width, height);
    this.props.onSave({ rawDraftContentState, canvas: this.canvas });
  };

  getCanvasRef = ref => {
    this.canvas = ReactDOM.findDOMNode(ref) as HTMLCanvasElement;
  };

  setDimensions = dimensions => {
    this.setState({ dimensions });
  };

  render() {
    const { editorState, dimensions, initDimensions } = this.state;
    const { customFonts, target, defaultValue } = this.props;
    return (
      <div className="dce-container">
        <DraftEditor
          defaultValue={defaultValue}
          customFonts={customFonts}
          editorState={editorState}
          onChange={this.onChange}
          height={initDimensions.height}
          width={initDimensions.width}
        />
        <Canvas
          editorState={editorState}
          canvas={target}
          height={initDimensions.height}
          width={initDimensions.width}
          setDimensions={this.setDimensions}
        />
        <canvas className="dce-hidden" ref={this.getCanvasRef} />
        <button onClick={this.onSave} className="dce-save-btn">
          Save
        </button>
      </div>
    );
  }
}
