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
