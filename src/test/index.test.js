import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "../index.html"), "utf8");

let dom;
let container;

describe("原始 HTML", () => {
  beforeEach(async () => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;
  });

  it("#data-panel 沒有資料", () => {
    const dataPanel = container.querySelector("#data-panel");
    expect(dataPanel.children.length).toBe(0);
  });
});

describe("測試動態資料", () => {
  beforeEach(async () => {
    dom = new JSDOM(html, { runScripts: "dangerously" });
    container = dom.window.document.body;

    // 讀取 main.js 文件並將其作為 script 插入到 JSDOM 實例中
    const js = fs.readFileSync(path.resolve(__dirname, "../main.js"), "utf-8");
    const scriptEl = dom.window.document.createElement("script");
    scriptEl.textContent = js;
    dom.window.document.head.appendChild(scriptEl);

    // 等待 DOMContentLoaded 事件
    await new Promise((resolve) => {
      dom.window.document.addEventListener("DOMContentLoaded", resolve);
    });
  });

  it("測試 球員", () => {
    const nameAns = ["櫻木花道", "流川楓", "赤木剛憲", "宮城良田", "三井壽"];
    const nodeList = container.querySelectorAll("#data-panel tr");
    expect(nodeList.length).toBe(5);
    nodeList.forEach((node, i) => {
      expect(node.children[0].textContent).toBe(nameAns[i]);
    });
  });

  it("測試 得分", () => {
    const pointAns = ["0", "30", "16", "6", "21"];
    const nodeList = container.querySelectorAll("#data-panel tr");
    expect(nodeList.length).toBe(5);
    nodeList.forEach((node, i) => {
      expect(node.children[1].children[0].textContent).toBe(pointAns[i]);
      expect(node.children[1].children[1].className).toBe(
        "fa fa-plus-circle up"
      );
      expect(node.children[1].children[2].className).toBe(
        "fa fa-minus-circle down"
      );
    });
  });

  it("測試 籃板", () => {
    const reboundAns = ["0", "6", "10", "0", "4"];
    const nodeList = container.querySelectorAll("#data-panel tr");
    expect(nodeList.length).toBe(5);
    nodeList.forEach((node, i) => {
      expect(node.children[2].children[0].textContent).toBe(reboundAns[i]);
      expect(node.children[2].children[1].className).toBe(
        "fa fa-plus-circle up"
      );
      expect(node.children[2].children[2].className).toBe(
        "fa fa-minus-circle down"
      );
    });
  });

  it("測試 助攻", () => {
    const assistAns = ["0", "3", "0", "7", "3"];
    const nodeList = container.querySelectorAll("#data-panel tr");
    expect(nodeList.length).toBe(5);
    nodeList.forEach((node, i) => {
      expect(node.children[3].children[0].textContent).toBe(assistAns[i]);
      expect(node.children[3].children[1].className).toBe(
        "fa fa-plus-circle up"
      );
      expect(node.children[3].children[2].className).toBe(
        "fa fa-minus-circle down"
      );
    });
  });

  it("測試 抄截", () => {
    const stealAns = ["0", "3", "0", "6", "0"];
    const nodeList = container.querySelectorAll("#data-panel tr");
    expect(nodeList.length).toBe(5);
    nodeList.forEach((node, i) => {
      expect(node.children[4].children[0].textContent).toBe(stealAns[i]);
      expect(node.children[4].children[1].className).toBe(
        "fa fa-plus-circle up"
      );
      expect(node.children[4].children[2].className).toBe(
        "fa fa-minus-circle down"
      );
    });
  });

  it("測試 阻攻", () => {
    const blockAns = ["2", "0", "5", "0", "0"];
    const nodeList = container.querySelectorAll("#data-panel tr");
    expect(nodeList.length).toBe(5);
    nodeList.forEach((node, i) => {
      expect(node.children[5].children[0].textContent).toBe(blockAns[i]);
      expect(node.children[5].children[1].className).toBe(
        "fa fa-plus-circle up"
      );
      expect(node.children[5].children[2].className).toBe(
        "fa fa-minus-circle down"
      );
    });
  });
});
