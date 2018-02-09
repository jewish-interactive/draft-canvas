// The function will return block inline styles using block level meta-data
export function blockStyleFn(block) {
  const blockAlignment = block.getData() && block.getData().get("text-align");
  if (blockAlignment) {
    return `dce-${blockAlignment}-aligned-block`;
  }
  return "";
}
