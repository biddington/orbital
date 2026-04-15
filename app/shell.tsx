import "./shell.css";
import { Electron } from "./electron";
import { type Shell as Sh } from "../core/parser";

const Shell = ({ level, subshell, occupancy }: Sh) => {
  let electrons =
    occupancy && Array.from({ length: occupancy }).map(() => <Electron />);

  return <div className={`shell _${level}`}>{electrons}</div>;
};

export { Shell };
