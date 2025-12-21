import { subscribeWithSelector } from 'zustand/middleware';
import { createStore } from 'zustand/vanilla';
import type { ToastPM, ToastRepositoryModel } from './toast.model';
import { uid } from './toast.utils';

export default class ToastRepository {
  private static _i: ToastRepository;
  static get instance(): ToastRepository {
    if (!this._i) this._i = new ToastRepository();
    return this._i;
  }

  private initial: ToastRepositoryModel = { toasts: [] };
  private store = createStore(subscribeWithSelector<ToastRepositoryModel>(() => this.initial));

  // ---- public subscribe API (for presenters/components) ----
  subscribe(cb: (vm: ToastRepositoryModel) => void): () => void {
    return this.store.subscribe(cb);
  }

  // ---- read ----
  getState(): ToastRepositoryModel {
    return this.store.getState();
  }

  // ---- commands ----
  add(input: Omit<ToastPM, 'id'> & { id?: string }): string {
    const id = input.id ?? uid();
    const vm: ToastPM = { id, durationMs: 3500, ...input };
    const curr = this.store.getState().toasts;
    this.store.setState({ toasts: [vm, ...curr].slice(0, 4) }); // cap to 4
    return id;
  }

  remove(id: string): void {
    const curr = this.store.getState().toasts;
    this.store.setState({ toasts: curr.filter((t) => t.id !== id) });
  }

  clear(): void {
    this.store.setState({ toasts: [] });
  }

  // ---- sugar ----
  success(p: { title?: string; description?: string; durationMs?: number }): string {
    return this.add({ kind: 'success', ...p });
  }
  error(p: { title?: string; description?: string; durationMs?: number }): string {
    return this.add({ kind: 'error', ...p });
  }
  info(p: { title?: string; description?: string; durationMs?: number }): string {
    return this.add({ kind: 'info', ...p });
  }
  warning(p: { title?: string; description?: string; durationMs?: number }): string {
    return this.add({ kind: 'warning', ...p });
  }
}
