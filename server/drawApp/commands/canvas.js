const createCanvas = (width, height, canvas) => {
  canvas = Array.from(Array(height), () => new Array(width));
  canvas.forEach((row, rowIndex) => {
    if (rowIndex === 0 || rowIndex === height - 1) {
      row.fill("-");
    } else
      row = [...row].forEach((item, itemIndex) => {
        if (itemIndex === 0 || itemIndex === width - 1) row[itemIndex] = "|";
        else row[itemIndex] = " ";
      });
  });
  return canvas;
};

const drawCanvas = ([width = 10, height = 10], canvas = []) => {
  if (width <= 0 || height <= 0)
    throw new Error("Can't draw canvas. Bad input");
  width = Number(width) + 2;
  height = Number(height) + 2;
  canvas = createCanvas(width, height, canvas);
  return canvas;
};

module.exports = {
  drawCanvas,
  createCanvas
};
