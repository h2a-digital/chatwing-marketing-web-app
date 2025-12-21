import { ReactNode } from 'react';

export type StatusCardProps = {
  status: 'loading' | 'success' | 'error';
  title: string;
  message: string;
  children?: ReactNode;
};
