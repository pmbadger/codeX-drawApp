const createFill = (x, y, color, canvas) => {
  canvas[y][x] = color;
  const regexp = new RegExp(`[^x${color}\\|\\-]`);
  regexp.test(canvas[y][x - 1]) && createFill(x - 1, y, color, canvas);
  regexp.test(canvas[y][x + 1]) && createFill(x + 1, y, color, canvas);
  regexp.test(canvas[y + 1][x]) && createFill(x, y + 1, color, canvas);
  regexp.test(canvas[y - 1][x]) && createFill(x, y - 1, color, canvas);
  return canvas;
};

const fill = ([x, y, color], canvas) => {
  [x, y] = [+x, +y];
  if (canvas.length === 0) throw new Error("The are no canvas");
  if (
    isNaN(x) ||
    isNaN(y) ||
    color === "" ||
    color === undefined ||
    canvas.length - 2 < y ||
    canvas[0].length - 2 < x ||
    x <= 0 ||
    y <= 0
  )
    throw new Error("Can't fill. Bad input");

  if (color.length > 1) color = color.charAt(0);

  let regexp = new RegExp(`[^x${color}\\|\\-]`);
  if (regexp.test(canvas[y][x])) {
    canvas = createFill(x, y, color, canvas);
  }
  return canvas;
};

module.exports = {
  fill,
  createFill
};
