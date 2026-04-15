import { createRoot } from "react-dom/client";
import { Level, Subshell as Sub, Occupancy } from "../core/parser";
import { Root } from "./root";

const root = createRoot(document.getElementById("root")!);
root.render(<Root />);
