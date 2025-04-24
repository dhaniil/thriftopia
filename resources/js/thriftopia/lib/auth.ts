import { router } from '@inertiajs/react';

export function logout() {
  router.post('/logout');
}

export function login(credentials: { email: string; password: string; remember?: boolean }) {
  router.post('/login', credentials);
}

export function register(data: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  router.post('/register', data);
}
