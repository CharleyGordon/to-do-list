export default function parseHtml(markup) {
  const div = document.createElement("div");
  div.insertAdjacentHTML("afterbegin", markup);
  const content = div.querySelector("*");
  return content;
}
