import { EditorState, convertToRaw } from "draft-js";

/**
 * The function will return array with details of style applicable to each character in the block.
 */
function getStyleArrayForBlock(block) {
  const { text, inlineStyleRanges } = block;
  let styleArray = [];
  for (let i = 0; i < text.length; i++) {
    styleArray[i] = {};
  }
  if (inlineStyleRanges && inlineStyleRanges.length > 0) {
    inlineStyleRanges.forEach(range => {
      const offset = range.offset;
      const length = offset + range.length;
      let styleName;
      let styleValue = true;
      console.log("*** *** ***", range.style);
      if (range.style.indexOf("fontfamily") === 0) {
        styleName = "fontfamily";
        styleValue = range.style.substr(11);
      } else if (range.style.indexOf("fontsize") === 0) {
        styleName = "fontsize";
        styleValue = range.style.substr(9);
      } else {
        styleName = range.style;
        styleValue = true;
      }
      for (let i = offset; i < length; i += 1) {
        styleArray[i][styleName] = styleValue;
      }
    });
  }
  return styleArray;
}

/**
 * Function will check if styles applicable on a character are same as that on previous character.
 */
const sameStyleAsPrevious = (styleArray, index) => {
  if (index === 0) {
    return false;
  }
  let sameStyled = false;
  let prevStyle = Object.keys(styleArray[index - 1]);
  let currentStyle = Object.keys(styleArray[index]);
  return (
    prevStyle.length === currentStyle.length &&
    !prevStyle.some(
      style => styleArray[index - 1][style] !== styleArray[index][style]
    )
  );
};

/**
 * The function returns array of sections in a block which have same style.
 */
export const getStyleSections = block => {
  const styleSections = [];
  const { text } = block;
  if (text.length > 0) {
    const styleArray = getStyleArrayForBlock(block);
    let section;
    for (let i = 0; i < text.length; i++) {
      if (sameStyleAsPrevious(styleArray, i)) {
        section.text.push(text[i]);
      } else {
        section = {
          styles: styleArray[i],
          text: [text[i]]
        };
        styleSections.push(section);
      }
    }
  }
  styleSections.forEach(styleSection => {
    styleSection.text = styleSection.text.join("");
  });
  return styleSections;
};

/**
 * The function will return true if first character of the string is hebrew.
 */
const isHebrew = str => {
  var char = str.trim()[0];
  var position = char && char.search(/[\u0590-\u05FF]/);
  return position >= 0;
};

/**
 * The function returns alignment from the block, finding it from block metadata.
 */
export const getAlignmentForBlock = block => {
  if (block.data["text-align"]) {
    const direction = block.data["text-align"];
    let x = 0;
    if (direction === "right") {
      x = 500;
    } else if (direction === "center") {
      x = 250;
    }
    return { direction, x };
  }
  if (isHebrew(block.text)) {
    return { direction: "right", x: 500 };
  } else {
    return { direction: "left", x: 0 };
  }
};

/**
 * The function will return the list of blocks in draftjs editor content.
 */
export const getBlockArray = (editorState: EditorState): any =>
  convertToRaw(editorState.getCurrentContent()).blocks;

/**
 * The function returns font canvas text style depending on inline formatting applied in draftjs editor.
 */
export const getCanvasTextStyle = styles => {
  let fontStyle = `
    ${styles.fontsize || 16}px 
    ${styles.fontfamily || "Verdana, Geneva, Tahoma, sans-serif"}
  `;
  if (styles.BOLD) {
    fontStyle = `bold ${fontStyle}`;
  }
  if (styles.ITALIC) {
    fontStyle = `italic ${fontStyle}`;
  }
  return fontStyle;
};

/**
 * The function returns max fontsize used in a block.
 */
export const getMaxFontSizeInBlock = styleSections => {
  let maxFontSize = 16;
  styleSections.forEach(section => {
    const fontsize = parseInt(section.styles.fontsize);
    if (fontsize > maxFontSize) {
      maxFontSize = fontsize;
    }
  });
  return maxFontSize;
};
