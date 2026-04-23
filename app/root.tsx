import { useState } from "react";
import { ConfigurationInput } from "./configurationinput";
import { Element } from "./element";
import { Orbital } from "../core/orbital";
import "./root.css";
import { type Result } from "../core/result";
import type { ParseResult } from "../core/parser";
import type { BadToken } from "../core/tokeniser";
import { Legend } from "./legend";

let orbital = new Orbital();

const Root = () => {
  let [expr, setExpr] = useState("1s1");

  let result: Result<ParseResult, BadToken> = orbital.parse(expr);

  let error;
  if (result.kind === "err") {
    error = result.error;
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <h4 style={{ textDecorationLine: "underline", marginBottom: 0 }}>
          Orbital
        </h4>
        <p style={{ fontSize: "1rem", fontWeight: 350, maxWidth: "40ch" }}>
          Enter an electron configuration between Hydrogen and Neon to see the
          electron orbitals
        </p>
      </div>

      {result.kind === "ok" ? (
        <Element result={result.value} />
      ) : (
        <Element
          result={{
            ast: { config: [{ level: 1, subshell: null, occupancy: null }] },
            errors: [],
          }}
        />
      )}

      <Legend />

      <ConfigurationInput value={expr} onKeyUp={setExpr} error={error} />
    </>
  );
};

export { Root };
