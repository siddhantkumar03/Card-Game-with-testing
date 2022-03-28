//import { fireEvent, getByText } from ''
require("@testing-library/jest-dom/extend-expect");
const domEvents = require("@testing-library/dom");
const jsdom = require("jsdom");
const fs = require("fs");
const path = require("path");

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");

let dom;
let container;
const { JSDOM } = jsdom;
describe("index.html", () => {
  beforeEach(() => {
    // Constructing a new JSDOM with this option is the key
    // to getting the code in the script tag to execute.
    // This is indeed dangerous and should only be done with trusted content.
    // https://github.com/jsdom/jsdom#executing-scripts
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("renders a heading element", () => {
    expect(container.querySelector("h1")).not.toBeNull();
    expect(domEvents.getByText(container, "Pun Generator")).toBeInTheDocument();
  });

  it("renders a paragraph tag", () => {
    expect(container.querySelector("p")).not.toBeNull();
    expect(
      domEvents.getByText(container, "Get ready for some good pun-ch lines.")
    ).toBeInTheDocument();
  });

  it("renders a button element", () => {
    expect(container.querySelector("button")).not.toBeNull();
    expect(
      domEvents.getByText(container, "Click me for a terrible pun")
    ).toBeInTheDocument();
  });

  it("renders a new paragraph via JavaScript when the button is clicked", async () => {
    const button = domEvents.getByText(
      container,
      "Click me for a terrible pun"
    );

    domEvents.fireEvent.click(button);
    let generatedParagraphs = container.querySelectorAll("#pun-container p");
    expect(generatedParagraphs.length).toBe(1);

    expect(generatedParagraphs[0]).toBeVisible();

    domEvents.fireEvent.click(button);
    generatedParagraphs = container.querySelectorAll("#pun-container p");
    expect(generatedParagraphs.length).toBe(2);

    domEvents.fireEvent.click(button);
    generatedParagraphs = container.querySelectorAll("#pun-container p");
    expect(generatedParagraphs.length).toBe(3);
  });
});
