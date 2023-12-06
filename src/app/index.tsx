import './globals.scss';
import 'react-loading-skeleton/dist/skeleton.css';

import { Layout } from '@components';
import { AppContextProvider, AuthContextProvider } from '@contexts';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { Router } from './router';
import { registerServiceWorker } from './service-worker';

registerServiceWorker();

const App = () => {
	return (
		<StrictMode>
			<AuthContextProvider>
				<AppContextProvider>
					<Layout>
						<Router />
					</Layout>
				</AppContextProvider>
			</AuthContextProvider>
		</StrictMode>
	);
};

const root = document.getElementById('root');
if (!root) {
	throw new Error('Root element could not be found');
}

createRoot(root).render(<App />);
