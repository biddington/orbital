import type { Token } from "./tokeniser";
import type { TokenType } from "./tokeniser";

type Error = { token: Token; message: string };

type Shell = {
  level: number | null;
  subshell: "p" | "s" | null;
  occupancy: number | null;
};

class Element {
  config: Shell[] = [];
}

type ParseResult = {
  ast: Element;
  errors: Error[];
};

const Shell = ({
  level,
  subshell,
  occupancy,
}: {
  level: number;
  subshell: "p" | "s";
  occupancy: number;
}) => ({
  level,
  subshell,
  occupancy,
});

class ParseError {
  token: Token;
  message: string;

  constructor(token: Token, message: string) {
    this.token = token;
    this.message = message;
  }
}

class Parser {
  private tokens: Token[];
  private errors: Error[];
  private current: number;

  constructor() {
    this.tokens = [];
    this.current = 0;
    this.errors = [];
  }

  parse(tokens: Token[]): ParseResult {
    this.tokens = tokens;

    return {
      ast: this.element(),
      errors: this.errors,
    };
  }

  private atEnd(): boolean {
    return this.current >= this.tokens.length - 1;
  }

  private check(type: TokenType): boolean {
    if (this.atEnd()) return false;

    return this.tokens.at(this.current)!.type === type;
  }

  private advance(): Token | undefined {
    if (!this.atEnd()) return this.tokens.at(this.current++)!;
  }

  private error(token: Token, message: string) {
    // The list of errors forms part of the return type of `parse()`
    this.errors.push({ token, message });
    // We also throw here, and unwind the stack which stops parsing the rest of this
    // incorrect shell. Instead we find the next shell boundary and parse that.
    // This is caught in `element()` and `synchronise()` is called to find that next
    // shell (which are delimitted SPACE tokens)
    // return throw new ParseError(token, message);
  }

  private match(...types: TokenType[]): boolean {
    for (let t of types) {
      if (this.check(t)) {
        return true;
      }
    }

    return false;
  }

  private peek() {
    return this.tokens.at(this.current)!;
  }

  private element() {
    let element = new Element();

    while (this.peek().type === "NUMBER") {
      // No matter what, store it
      element.config.push(this.shell());

      this.synchronise();
    }

    if (!this.atEnd()) {
      this.error(
        this.peek(),
        `Expected shell layer number at pos ${this.peek().position}`,
      );
    }

    return element;
  }

  private synchronise() {
    while (!this.atEnd()) {
      if (this.match("SPACE")) {
        this.advance();
        return;
      }

      this.advance();
    }
  }

  private shell() {
    let level = this.layer();

    let subshell = this.subshell();

    let occupancy = this.occupancy();

    return Shell({ level, subshell, occupancy });
  }

  /**
   * @pre `current` token has been checked to be NUMBER
   * @returns number
   */
  private layer() {
    // By this stage, element() has already checked that the current
    // token is a NUMBER so we can just consume it
    let token = this.advance()!;
    return token.literal;
  }

  private occupancy() {
    if (this.match("NUMBER")) {
      let token = this.advance()!;
      return token.literal;
    }

    this.error(this.peek(), "Expected shell occupancy e.g. (1, 2, 3..)");

    return null;
  }

  private subshell() {
    if (this.match("P", "S")) {
      let token = this.advance()!;
      return token.literal!;
    }

    this.error(this.peek(), "Expected s or p subshell");

    return null;
  }
}

export { Parser, type ParseResult, type Error, type Element, type Shell };
