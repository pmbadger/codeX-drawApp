import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../App.css";

export const Canvas = () => {
  const { canvas } = useSelector(state => state);

  useEffect(() => {
    fetch("http://localhost:3001/refresh").catch(err => console.log(err));
  }, []);

  return canvas.width !== 0 && canvas.height !== 0 ? (
    <div className="canvas">
      {canvas.value.map((row, rowIndex) => (
        <span className="row" key={rowIndex}>
          {row.map((item, itemIndex) => (
            <pre key={`${rowIndex}${itemIndex}`}>{item}</pre>
          ))}
        </span>
      ))}
    </div>
  ) : (
    <div className="about-canvas">
      <h2>You canvas will be here</h2>
      <h3>Enter his size</h3>
    </div>
  );
};
