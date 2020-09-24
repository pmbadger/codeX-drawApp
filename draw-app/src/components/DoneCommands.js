import React from "react";
import { useSelector } from "react-redux";
import "../App.css";

export const DoneCommands = () => {
  const { commands } = useSelector(state => state);
  return (
    <div className="done-commands">
      {commands.map((command, index) => (
        <span className="done-commands-list" key={index}>
          {command}
        </span>
      ))}
    </div>
  );
};
