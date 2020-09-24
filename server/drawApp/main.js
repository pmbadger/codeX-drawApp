const fs = require("fs");
const { drawCanvas } = require("./commands/canvas");
const { drawLine } = require("./commands/line");
const { drawRectangle } = require("./commands/rectangle");
const { fill } = require("./commands/fill");

const getFile = (fileInput, fileOutput) => {
  fs.readFile(fileInput, "utf8", (err, res) => {
    if (err) throw err;
    else {
      fileInfo = res.split("\r\n");
      draw(fileInfo, fileOutput);
    }
  });
};

const writeToFile = (file, canvas) => {
  let data = "";
  canvas.map(row => {
    row.map(item => {
      data += item;
    });
    data += "\n";
  });
  fs.appendFileSync(file, data);
};

const draw = (fileInfo, fileOutput, canvas = []) => {
  try {
    const commandList = {
      C: drawCanvas,
      L: drawLine,
      R: drawRectangle,
      B: fill
    };
    fileInfo.map(enteredCommand => {
      const command = enteredCommand.split(/\s+/);
      if (commandList[command[0]] === undefined)
        throw new Error("Wrong command");
      canvas = commandList[command[0]](command.slice(1), canvas);
      fileOutput !== undefined && writeToFile(fileOutput, canvas);
    });
  } catch (error) {
    throw error;
  }
  return canvas;
};

const start = (fileInput, fileOutput) => {
  fs.writeFile(fileOutput, "", err => {
    if (err) throw err;
  });
  getFile(fileInput, fileOutput);
};

module.exports = {
  start,
  draw
};
