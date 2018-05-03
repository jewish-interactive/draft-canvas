import * as React from "react";
import * as ReactDOM from "react-dom";
import { Component } from "react";
import { Editor, EditorState, convertToRaw, RawDraftContentState } from "draft-js";
import { DraftEditor } from "../DraftEditor/DraftEditor";
import { CanvasContainer } from "../Canvas/Canvas";
import "./DraftCanvas-Styles.css";
import draftToHtmlPlugin from "draftjs-to-html";

export interface SaveData {
    html:string; 
    raw: RawDraftContentState;
    canvas?: HTMLCanvasElement;
}

export interface Props {
    customFonts?: any[];
    useCanvas?: boolean;
    onSave?: (save:SaveData) => void;
    defaultValue?: string | RawDraftContentState 
}

export interface State {
    editorState: EditorState;
    dimensions?: any;
}

/**
 * Root component with DraftJS editor and Canvas components as children.
 */
export class DraftCanvas extends Component<Props, State> {
    private canvasRef:React.RefObject<HTMLCanvasElement>;
    private editorRef:React.RefObject<Editor>;

    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };

        if(this.props.useCanvas) {
            this.canvasRef = React.createRef<HTMLCanvasElement>();
        }
        this.editorRef = React.createRef<Editor>();

        this.save = this.save.bind(this);
    }

    onChange = editorState => {
        this.setState({ editorState });
    };

    public save() {
        if(!this.props.onSave) {
            return;
        }
        const { editorState} = this.state;
        const raw = convertToRaw(editorState.getCurrentContent());
        const html = draftToHtmlPlugin(raw, undefined, true); 

        const saveData:SaveData = {raw, html};

        if(this.props.useCanvas) {
            const {dimensions} = this.state;
            const { width, height, dir } = dimensions;
            const x1 = dir.left ? 0 : 500 - width;
            const x2 = dir.right ? 500 : width;
            const newCanvas = document.createElement("canvas");
            newCanvas.width = width;
            newCanvas.height = height;
            newCanvas.setAttribute("style", `height: ${height}px;width:${width}px;`);
            const ctx = newCanvas.getContext("2d");
            ctx.clearRect(0, 0, width, height);
            ctx.drawImage(this.canvasRef.current, x1, 0, x2, height, 0, 0, x2, height);
            saveData.canvas = newCanvas;
        }

        this.props.onSave(saveData);
    };


    setDimensions = dimensions => {
        this.setState({ dimensions });
    };

    render() {
        const { editorState, dimensions } = this.state;
        const { customFonts, defaultValue } = this.props;
        return (
            <div className="dce-container">
            <DraftEditor
                defaultValue={defaultValue}
                customFonts={customFonts}
                editorRef={this.editorRef}
                editorState={editorState}
                onChange={this.onChange}
                onSave={this.save}
            />
            {this.props.useCanvas &&
                <CanvasContainer
                editorState={editorState}
                canvasRef={this.canvasRef}
                setDimensions={this.setDimensions}
                />
            }
            </div>
        );
    }
}
