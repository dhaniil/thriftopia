import '../../css/app.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import RootLayout from './layouts/RootLayout';
import PageLayout from './layouts/PageLayout';

declare global {
    interface Window {
        route: (name: string, params?: Record<string, any>) => string;
    }
}

const appName = "Thriftopia";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const page = pages[`./pages/${name}.tsx`] as { default: { layout?: (page: React.ReactElement) => React.ReactElement } };
            page.default.layout =
            page.default.layout || ((page: React.ReactElement) => <PageLayout>{page}</PageLayout>);
    
        return page;
    },    
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <App {...props}>
                {({ Component, key, props }) => (
                    <RootLayout>
                        <Component key={key} {...props} />
                    </RootLayout>
                )}
            </App>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
