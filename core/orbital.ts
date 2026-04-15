import { Tokeniser, type Token, type BadToken } from "./tokeniser";
import { Parser, type ParseResult } from "./parser";
import { Ok, type Result } from "./result";

class Orbital {
  parse(source: string): Result<ParseResult, BadToken> {
    let tokeniser = new Tokeniser(source);
    let parser = new Parser();
    let result: Result<Token[], BadToken> = tokeniser.tokenise();

    if (result.kind === "err") {
      return result;
    }

    let { value: tokens } = result;

    return Ok(parser.parse(tokens));
  }

  static parseError(token: Token, message: string) {
    console.error(token, message);
  }
}

export { Orbital };
