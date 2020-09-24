const { createLine } = require("./line");
const createRectangle = ({ x1, y1 }, { x2, y2 }, canvas) => {
  createLine({ x1, y1 }, { x2, y2: y1 }, canvas);
  createLine({ x1, y1 }, { x2: x1, y2 }, canvas);
  createLine({ x1: x2, y1 }, { x2, y2 }, canvas);
  createLine({ x1, y1: y2 }, { x2, y2 }, canvas);
  return canvas;
};

const drawRectangle = ([x1, y1, x2, y2], canvas) => {
  [x1, y1, x2, y2] = [+x1, +y1, +x2, +y2];
  if (canvas.length === 0) throw new Error("The are no canvas");
  if (
    isNaN(x1) ||
    isNaN(y1) ||
    isNaN(x2) ||
    isNaN(y2) ||
    canvas.length - 2 < y1 ||
    canvas[0].length - 2 < x1 ||
    canvas.length - 2 < y2 ||
    canvas[0].length - 2 < x2 ||
    x1 <= 0 ||
    y1 <= 0 ||
    x2 <= 0 ||
    y2 <= 0
  )
    throw new Error("Can't draw rectangle. Bad input");
  return createRectangle({ x1, y1 }, { x2, y2 }, canvas);
};

module.exports = {
  drawRectangle,
  createRectangle
};
