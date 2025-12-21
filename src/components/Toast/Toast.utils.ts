export function iconForKind(kind: 'success' | 'error' | 'info' | 'warning') {
  switch (kind) {
    case 'success':
      return 'check';
    case 'error':
      return 'error';
    case 'warning':
      return 'warning';
    default:
      return 'info';
  }
}
