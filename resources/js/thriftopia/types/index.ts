import { Page } from '@inertiajs/core';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
}

export interface PageProps<T extends object = object> extends Record<string, unknown> {
  auth: {
    user: User | null;
  } & T;
}

export type InertiaProps<T extends object = object> = Page<PageProps<T>>;
