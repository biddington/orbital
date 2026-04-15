type Ok<T> = {
  kind: "ok";
  value: T;
};

const Ok = <T>(value: T): Ok<T> => ({
  kind: "ok",
  value,
});

type Err<U> = {
  kind: "err";
  error: U;
};

const Err = <U>(error: U): Err<U> => ({
  kind: "err",
  error,
});

type Result<T, U> = Ok<T> | Err<U>;

export type { Result };
export { Ok, Err };
