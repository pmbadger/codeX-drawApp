const createLine = ({ x1, y1 }, { x2, y2 }, canvas) => {
  canvas.forEach((row, rowIndex) => {
    row.forEach((item, itemIndex) => {
      if (x1 === x2) {
        if (
          itemIndex === x1 &&
          rowIndex >= Math.min(y1, y2) &&
          rowIndex <= Math.max(y1, y2)
        ) {
          canvas[rowIndex][itemIndex] = "x";
        }
      } else if (y1 === y2) {
        if (
          rowIndex === y1 &&
          itemIndex >= Math.min(x1, x2) &&
          itemIndex <= Math.max(x1, x2)
        ) {
          row[itemIndex] = "x";
        }
      } else throw new Error("Line is diagonal");
    });
  });
  return canvas;
};

const drawLine = ([x1, y1, x2, y2], canvas) => {
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
    throw new Error("Can't draw line. Bad input");
  try {
    canvas = createLine({ x1, y1 }, { x2, y2 }, canvas);
  } catch (error) {
    throw new Error("Line is diagonal");
  }
  return canvas;
};

module.exports = {
  drawLine,
  createLine
};
