export interface User {
    id: number;
    name: string;
    email: string;
    avatar_url?: string;
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface AuthState {
    user: User | null;
}
