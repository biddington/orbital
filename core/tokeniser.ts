import { Ok, Err, type Result } from "./result";

type TokenType = "NUMBER" | "S" | "P" | "SPACE" | "EOF";

type Token = {
  kind: "token";
  type: TokenType;
  lexeme: string;
  literal: any | null;
  position: number;
};

type BadToken = string;

const Token = (
  type: TokenType,
  lexeme: string,
  literal: any | null,
  position: number,
): Token => {
  return {
    kind: "token",
    type,
    lexeme,
    literal,
    position,
  };
};

class Tokeniser {
  private source: string;
  private tokens: Token[] = [];
  private current: number = 0;
  private start: number = 0;

  constructor(source: string) {
    this.source = source;
  }

  private get atEnd(): boolean {
    return this.current >= this.source.length;
  }

  private isDigit(ch: string): boolean {
    return /\d/.test(ch);
  }

  tokenise(): Result<Token[], BadToken> {
    while (!this.atEnd) {
      // We're at the beginning of the next lexeme
      this.start = this.current;
      let result = this.scanToken();

      if (result.kind === "err") {
        return result;
      }

      this.tokens.push(result.value);
    }

    this.tokens.push({
      kind: "token",
      type: "EOF",
      lexeme: "",
      literal: null,
      position: this.start,
    });

    return Ok(this.tokens);
  }

  private advance() {
    return this.source.charAt(this.current++);
  }

  private peek() {
    if (this.atEnd) return "\0";

    return this.source.charAt(this.current);
  }

  private Token(type: TokenType, literal: string | number | null): Token {
    let lexeme = this.source.slice(this.start, this.current);
    return { kind: "token", type, lexeme, literal, position: this.start };
  }

  private scanToken(): Result<Token, BadToken> {
    let char = this.advance();

    switch (char) {
      case "s":
        return Ok(this.Token("S", "s"));
      case "p":
        return Ok(this.Token("P", "p"));
      default:
        if (this.isDigit(char)) return Ok(this.number());

        if (/\s/.test(char)) {
          return Ok(this.Token("SPACE", null));
        } else {
          return Err<BadToken>(
            `Invalid character "${char}" at position ${this.current}`,
          );
        }
    }
  }

  number() {
    while (!this.atEnd && this.isDigit(this.peek())) {
      this.advance();
    }

    let literal = Number.parseInt(this.source.slice(this.start, this.current));

    return this.Token("NUMBER", literal);
  }
}

export { Tokeniser };
export type { TokenType, Token, BadToken };
