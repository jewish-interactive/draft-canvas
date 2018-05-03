// The function will return block inline styles using block level meta-data
export function blockStyleFn(block) {
  const blockAlignment = block.getData() && block.getData().get("text-align");
  if (blockAlignment) {
    return `dce-${blockAlignment}-aligned-block`;
  }
  return "";
}

export function getEditorHeight() {
  try {
    const domNode = document.getElementsByClassName(
      "public-DraftEditor-content"
    )[0].children[0];
    if (domNode) {
      return domNode.clientHeight;
    }
  } catch (exp) {}
}

export const colors = [
  "rgb(97,189,109)",
  "rgb(26,188,156)",
  "rgb(84,172,210)",
  "rgb(44,130,201)",
  "rgb(147,101,184)",
  "rgb(71,85,119)",
  "rgb(204,204,204)",
  "rgb(65,168,95)",
  "rgb(0,168,133)",
  "rgb(61,142,185)",
  "rgb(41,105,176)",
  "rgb(85,57,130)",
  "rgb(40,50,78)",
  "rgb(0,0,0)",
  "rgb(247,218,100)",
  "rgb(251,160,38)",
  "rgb(235,107,86)",
  "rgb(226,80,65)",
  "rgb(163,143,132)",
  "rgb(239,239,239)",
  "rgb(255,255,255)",
  "rgb(250,197,28)",
  "rgb(243,121,52)",
  "rgb(209,72,65)",
  "rgb(184,49,47)",
  "rgb(124,112,107)",
  "rgb(209,213,216)"
];

export const fontFamilies = [
  { label: "Arial", fontName: "Arial" },
  { label: "Georgia", fontName: "Georgia" },
  { label: "Impact", fontName: "Impact" },
  { label: "Tahoma", fontName: "Tahoma" },
  { label: "Verdana", fontName: "Verdana" }
];

export const fontSizes = [
  8,
  9,
  10,
  11,
  12,
  14,
  16,
  18,
  24,
  30,
  36,
  48,
  60,
  72,
  96
];

export function getStyleMap() {
  const styles = {};
  colors.forEach(color => {
    styles[`color-${color}`] = { color };
    styles[`bgcolor-${color}`] = { backgroundColor: color };
  });
  fontFamilies.forEach(family => {
    styles[`fontfamily-${family.fontName}`] = { fontFamily: family.fontName };
  });
  fontSizes.forEach(size => {
    styles[`fontsize-${size}`] = { fontSize: size };
  });
  return styles;
}
