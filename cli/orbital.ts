import { Orbital } from "../core/orbital";

let expression = Bun.argv[2];

if (!expression) {
  console.error("Provide an orbital expression to parse");
  process.exit(1);
}

let orbital = new Orbital();

let result = orbital.parse(expression);

if (result.kind === "err") {
  console.error(result.message);
  process.exit(1);
}

console.log(result.value);
