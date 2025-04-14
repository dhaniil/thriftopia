import { router } from '@inertiajs/react';

export const logout = () => {
  router.post(route('logout'));
};

export type LoginCredentials = {
  [key: string]: string | boolean | undefined;
  email: string;
  password: string;
  remember?: boolean;
}

export type SignupData = {
  [key: string]: string;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const loginUser = async (credentials: LoginCredentials, options?: {
  onSuccess?: () => void;
  onError?: (errors: any) => void;
}) => {
  router.post(route('login'), credentials, {
    preserveState: true,
    preserveScroll: true,
    onSuccess: () => {
      options?.onSuccess?.();
    },
    onError: (errors) => {
      options?.onError?.(errors);
    }
  });
};

export const signupUser = async (data: SignupData) => {
  if (data.password !== data.password_confirmation) {
    return { success: false, message: "Password tidak cocok!" };
  }

  router.post(route('register'), data);
};
