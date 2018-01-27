import {RawDraftContentState} from "draft-js";

export interface TextToImageDataOptions {
    rawText: RawDraftContentState;
    canvasWidth: number;
    canvasHeight: number;
    crop?: boolean;
}

export const textToImageData = (options:TextToImageDataOptions):ImageData => {
    return new ImageData(200,200)
}
