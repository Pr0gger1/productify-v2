import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { store } from 'store';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeType } from 'types/slices/SliceStates';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppLayout from 'components/layout/AppLayout';
import SnackbarProvider from 'providers/SnackbarProvider';

import './styles/index.scss';

document.title = 'Productify ToDo App';

const currentTheme: ThemeType = localStorage.getItem('theme') as ThemeType;
if (!currentTheme) localStorage.setItem('theme', 'light');

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		try {
			navigator.serviceWorker.register('/service-worker.js').then(() => {
				console.log('service-worker.js loaded');
			});
			navigator.serviceWorker
				.register('/firebase-messaging-sw.js')
				.then((registration: ServiceWorkerRegistration) => {
					if (registration.active) {
					registration.active.postMessage({
						type: 'config',
						data: {
							apiKey: import.meta.env.VITE_API_KEY_FIREBASE,
							authDomain: import.meta.env.VITE_AUTH_DOMAIN_FIREBASE,
							databaseURL: import.meta.env.VITE_DATABASE_URL_FIREBASE,
							projectId: import.meta.env.VITE_PROJECT_ID_FIREBASE,
							storageBucket: import.meta.env.VITE_STORAGE_BUCKET_FIREBASE,
							messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID_FIREBASE,
							appId: import.meta.env.VITE_APP_ID_FIREBASE,
							measurementId: import.meta.env.VITE_MEASUREMENT_ID_FIREBASE
						}
					});
					console.log('Registration successful, scope is:', registration.scope);
				}
				})
				.catch(err => {
					console.log('Service worker registration failed, error:', err);
				});
		} catch (error) {
			console.log(error);
		}
	});
}

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement,
);

root.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<ReduxProvider store={store}>
					<AppLayout>
						<SnackbarProvider>
							<App />
						</SnackbarProvider>
					</AppLayout>
				</ReduxProvider>
			</BrowserRouter>
		</QueryClientProvider>
	</React.StrictMode>,
);
