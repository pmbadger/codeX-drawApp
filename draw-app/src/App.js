import React from "react";
import { Inputes } from "./components/Inputes";
import { Canvas } from "./components/Canvas";
import "./App.css";

export const App = () => {
  return (
    <div className="main-body">
      <Inputes />
      <Canvas />
    </div>
  );
};
