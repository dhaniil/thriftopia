export interface MidtransCallback {
    onSuccess: () => void;
    onPending: () => void;
    onError: () => void;
    onClose: () => void;
}

declare global {
    interface Window {
        snap: {
            pay: (token: string, callbacks: MidtransCallback) => void;
        };
        isMidtransLoaded: boolean;
        midtransClientKey: string;
        midtransEnvironment: 'sandbox' | 'production';
    }
}
