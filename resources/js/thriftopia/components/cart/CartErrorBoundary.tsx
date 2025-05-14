import React from 'react';

interface Props {
    children: React.ReactNode;
}

interface State {
    hasError: boolean;
    error?: Error;
}

export class CartErrorBoundary extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error) {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        console.error('Cart error:', error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <h3 className="text-red-800 font-medium">Terjadi kesalahan</h3>
                    <p className="text-red-600 text-sm">
                        Mohon refresh halaman atau coba beberapa saat lagi
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-2 px-4 py-2 bg-red-100 text-red-800 rounded-md text-sm hover:bg-red-200"
                    >
                        Refresh Halaman
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}
