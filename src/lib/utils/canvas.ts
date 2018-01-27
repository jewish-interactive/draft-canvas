function getStyleArrayForBlock(block) {
  const { text, inlineStyleRanges } = block;
  let styleArray = [];
  for(let i = 0;i < text.length;i++) {
    styleArray[i] = {};
  }
  if (inlineStyleRanges && inlineStyleRanges.length > 0) {
      inlineStyleRanges.forEach((range) => {
        const offset = range.offset;
        const length = offset + range.length;
        for (let i = offset; i < length; i += 1) {
          styleArray[i][range.style] = true;
        }
      });
  }
  return styleArray;
}

function sameStyleAsPrevious(styleArray, index) {
  if (index === 0) {
    return false;
  }
  let sameStyled = false;
  let prevStyle = Object.keys(styleArray[index - 1]);
  let currentStyle = Object.keys(styleArray[index]);
  return (
    prevStyle.length === currentStyle.length &&
    !prevStyle.some(style => styleArray[index - 1][style] !== styleArray[index][style])
  );
}

export const getStyleSections = (block) => {
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
          text: [text[i]],
        };
        styleSections.push(section);
      }
    }
  }
  styleSections.forEach(styleSection => {
    styleSection.text = styleSection.text.join('');
  });
  return styleSections;
}