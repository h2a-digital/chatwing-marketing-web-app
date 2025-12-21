export type ToastKind = 'success' | 'error' | 'info' | 'warning';

export interface ToastPM {
  id: string;
  kind: ToastKind;
  title?: string;
  description?: string;
  durationMs?: number; // default 3500
}

export interface ToastRepositoryModel {
  toasts: ToastPM[];
}
