// import './bootstrap';
import '../../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import RootLayout from './layouts/RootLayout';
import PageLayout from './layouts/PageLayout';
// import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';

const appName = "Thriftopia";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob('./pages/**/*.tsx', { eager: true });
        const page = pages[`./pages/${name}.tsx`] as { default: { layout?: (page: JSX.Element) => JSX.Element } };
            page.default.layout =
            page.default.layout || ((page: JSX.Element) => <PageLayout>{page}</PageLayout>);
    
        return page;
      },    setup({ el, App, props }) {
        const root = createRoot(el);

    root.render(
            <RootLayout>
                <App {...props} />
            </RootLayout>
        );
    },
    progress: {
        color: '#4B5563',
    },
});