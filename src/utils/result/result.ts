import type { DomainError, Result } from "./result.model";

export type { Result, DomainError } from "./result.model";

export function ok<T>(data: T): Result<T> {
  return { ok: true, data };
}

export function err<T = never>(error: DomainError): Result<T> {
  return { ok: false, error };
}

export function createDomainError(
  kind: DomainError["kind"],
  message: string,
  cause?: unknown
): DomainError {
  return { kind, message, cause };
}

export function isOk<T>(result: Result<T>): result is { ok: true; data: T } {
  return result.ok;
}

export function isErr<T>(result: Result<T>): result is { ok: false; error: DomainError } {
  return !result.ok;
}

export function unwrap<T>(result: Result<T>): T {
  if (isOk(result)) {
    return result.data;
  }
  throw new Error(`Cannot unwrap error result: ${result.error.message}`);
}

export function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
  return isOk(result) ? result.data : defaultValue;
}

export function map<T, U>(result: Result<T>, fn: (data: T) => U): Result<U> {
  return isOk(result) ? ok(fn(result.data)) : (result as unknown as Result<U>);
}

export function mapErr<T>(result: Result<T>, fn: (error: DomainError) => DomainError): Result<T> {
  return isErr(result) ? err(fn(result.error)) : result;
}

export function andThen<T, U>(result: Result<T>, fn: (data: T) => Result<U>): Result<U> {
  return isOk(result) ? fn(result.data) : (result as unknown as Result<U>);
}

