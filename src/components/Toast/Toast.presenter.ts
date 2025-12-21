import { ToastRepository } from '@/repositories/toast';
import type { ToastViewportVM } from './Toast.model';

export class ToastPresenter {
  private emit: ((vm: ToastViewportVM) => void) | null = null;
  private vm: ToastViewportVM = { toasts: [] };
  private unsub: (() => void) | null = null;

  subscribe(cb: (vm: ToastViewportVM) => void): () => void {
    this.emit = cb;
    this.vm = { toasts: ToastRepository.instance.getState().toasts };
    this.emit(this.vm);

    this.unsub = ToastRepository.instance.subscribe((state) => {
      this.vm = { toasts: state.toasts };
      this.emit?.(this.vm);
    });

    return () => {
      this.unsub?.();
      this.emit = null;
    };
  }

  dismiss(id: string) {
    ToastRepository.instance.remove(id);
  }
}
