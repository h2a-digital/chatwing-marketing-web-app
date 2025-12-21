export type DomainErrorKind =
  | 'Network'
  | 'Auth'
  | 'NotFound'
  | 'Validation'
  | 'Unauthorized'
  | 'Database'
  | 'Unknown';

export interface DomainError {
  kind: DomainErrorKind;
  message: string;
  cause?: unknown;
}

export type Result<T> = { ok: true; data: T } | { ok: false; error: DomainError };
