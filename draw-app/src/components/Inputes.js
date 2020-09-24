import React, { useState, useEffect } from "react";
import Loading from "react-loading-spinner";
import "react-loading-spinner/src/css/index.css";
import { DoneCommands } from "./DoneCommands";
import { actionAddCommandLine } from "../store/actions/commands";
import { useSelector, useDispatch } from "react-redux";
import { actionCreateCanvas } from "../store/actions/canvas";

export const Inputes = () => {
  const dispatch = useDispatch();
  const createCanvas = ({ widthCanvas, heightCanvas }) =>
    dispatch(actionCreateCanvas({ widthCanvas, heightCanvas }));
  const addCommandLine = line => dispatch(actionAddCommandLine(line));
  const [valueTextArea, setValueTextArea] = useState("");
  const [widthCanvas, setWidthCanvas] = useState("");
  const [heightCanvas, setHeightCanvas] = useState("");
  const [widthCanvasError, setWidthCanvasError] = useState("");
  const [heightCanvasError, setHeightCanvasError] = useState("");
  const [mainError, setMainError] = useState("");
  const { error, canvas, isFetching } = useSelector(state => state);

  const onChangeTextArea = str => {
    if (str[str.length - 1] === "\n") {
      addCommandLine(str);
      str = "";
    }
    setValueTextArea(str);
  };

  const validateWidthCanvas = ({ widthCanvas }) => {
    const regExp = /^\d+$/;
    if (!regExp.test(widthCanvas)) {
      setWidthCanvasError("Enter only digits");
    } else if (widthCanvas === "0") {
      setWidthCanvasError("Width can't be 0");
    } else setWidthCanvasError("");
  };

  const validateHeightCanvas = ({ heightCanvas }) => {
    const regExp = /^\d+$/;
    if (!regExp.test(heightCanvas)) {
      setHeightCanvasError("Enter only digits");
    } else if (heightCanvas === "0") {
      setHeightCanvasError("Height can't be 0");
    } else setHeightCanvasError("");
  };

  useEffect(() => {
    validateWidthCanvas({ widthCanvas });
  }, [widthCanvas]);

  useEffect(() => {
    validateHeightCanvas({ heightCanvas });
  }, [heightCanvas]);

  const tryCreateCanvas = ({ widthCanvas, heightCanvas }) => {
    if (
      widthCanvas !== "" &&
      heightCanvas !== "" &&
      widthCanvasError === "" &&
      heightCanvasError === ""
    ) {
      setMainError("");
      createCanvas({ widthCanvas, heightCanvas });
    } else {
      setMainError("Bad input");
    }
  };

  return (
    <div className="inputes">
      <h1>Draw app</h1>
      <p>Create your picture</p>
      <p>Enter size of canvas</p>
      <input
        type="text"
        placeholder="Width"
        onChange={e => setWidthCanvas(e.target.value)}
      ></input>
      <span className="error">{widthCanvasError}</span>
      <input
        type="text"
        placeholder="Height"
        onChange={e => setHeightCanvas(e.target.value)}
      ></input>
      <span className="error">{heightCanvasError}</span>
      <button onClick={() => tryCreateCanvas({ widthCanvas, heightCanvas })}>
        Create
      </button>
      <span className="error">{mainError}</span>
      <a href="http://localhost:3001/download">Download output.txt</a>
      {canvas.width !== 0 && (
        <textarea
          type="text"
          placeholder="Enter commands"
          value={valueTextArea}
          onChange={e => onChangeTextArea(e.target.value)}
        ></textarea>
      )}
      <span className="error">{error}</span>
      <Loading isLoading={isFetching} loadingClassName="loading"></Loading>
      <DoneCommands />
    </div>
  );
};
