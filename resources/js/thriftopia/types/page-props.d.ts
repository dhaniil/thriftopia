import { PageProps as InertiaPageProps } from '@inertiajs/core';
import { CartState } from './cart';
import { User } from './user';

declare module '@inertiajs/core' {
    interface PageProps {
        auth: {
            user: User | null;
        };
        cart: CartState;
        errors?: Record<string, string>;
    flash: {
        success?: string | null;
        error?: string | null;
    };
    }
}
