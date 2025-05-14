const RETRY_DELAY = 500; // 500ms
const MAX_RETRIES = 10; // 5 seconds total

import type { MidtransCallback } from '@/types/midtrans';

interface SnapStatus {
    isReady: boolean;
    error?: string;
}

const verifySnapInstance = (): SnapStatus => {
    try {
        if (typeof window.snap === 'undefined') {
            return { isReady: false, error: 'Midtrans Snap belum dimuat' };
        }

        if (!window.isMidtransLoaded) {
            return { isReady: false, error: 'Midtrans Snap belum selesai dimuat' };
        }

        if (typeof window.snap.pay !== 'function') {
            return { isReady: false, error: 'Midtrans Snap tidak valid' };
        }

        if (!window.midtransClientKey) {
            return { isReady: false, error: 'Client key tidak ditemukan' };
        }

        return { isReady: true };
    } catch (error) {
        console.error('Error verifying Snap instance:', error);
        return { isReady: false, error: 'Gagal memverifikasi Snap' };
    }
};

const waitForMidtrans = async (retries = 0): Promise<SnapStatus> => {
    const status = verifySnapInstance();
    if (status.isReady) {
        console.log('Midtrans is ready');
        // Add a small delay to ensure everything is fully initialized
        await new Promise(resolve => setTimeout(resolve, 100));
        return status;
    }

    if (retries >= MAX_RETRIES) {
        console.error('Midtrans initialization timeout');
        return { isReady: false, error: 'Timeout menunggu Midtrans' };
    }

    console.log(`Waiting for Midtrans (attempt ${retries + 1}/${MAX_RETRIES})...`);
    await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
    return waitForMidtrans(retries + 1);
};

export const validateSnapToken = async (token?: string): Promise<{ isValid: boolean; error?: string }> => {
    try {
        // Validate token
        if (!token) {
            return { isValid: false, error: 'Token pembayaran tidak tersedia' };
        }

        if (typeof token !== 'string') {
            return { isValid: false, error: 'Token pembayaran tidak valid' };
        }

        if (token.trim() === '') {
            return { isValid: false, error: 'Token pembayaran kosong' };
        }

        // Wait for Midtrans initialization
        const snapStatus = await waitForMidtrans();
        if (!snapStatus.isReady) {
            return { isValid: false, error: snapStatus.error || 'Sistem pembayaran belum siap' };
        }

        // Additional validation
        console.log('Payment validation successful:', {
            tokenLength: token.length,
            hasSnap: true,
            hasClientKey: !!window.midtransClientKey,
            environment: window.midtransEnvironment,
            snapReady: typeof window.snap.pay === 'function'
        });

        return { isValid: true };
    } catch (error) {
        console.error('Error validating payment:', error);
        return { isValid: false, error: 'Terjadi kesalahan saat validasi pembayaran' };
    }
};

export const initializePayment = async (
    token: string, 
    callbacks: MidtransCallback
): Promise<boolean> => {
    try {
        const snapStatus = await waitForMidtrans();
        if (!snapStatus.isReady) {
            throw new Error(snapStatus.error || 'Snap tidak siap');
        }

        window.snap.pay(token, callbacks);
        return true;
    } catch (error) {
        console.error('Payment initialization error:', error);
        return false;
    }
};
