import { useState } from "react";
import { Shell } from "./shell";
import "./element.css";
import { type ParseResult } from "../core/parser";

const Element = ({ result }: { result: ParseResult }) => {
  let { config } = result.ast;

  return (
    <div className="element">
      {config.map(({ level, subshell, occupancy }) => (
        <Shell
          key={level}
          level={level}
          subshell={subshell}
          occupancy={occupancy}
        />
      ))}
    </div>
  );
};

export { Element };
