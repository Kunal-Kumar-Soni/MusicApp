function decodeHtmlEntities(text) {
  if (typeof text !== "string") return text;

  const textArea = document.createElement("textarea");
  textArea.innerHTML = text;
  return textArea.value;
}

export default decodeHtmlEntities;
