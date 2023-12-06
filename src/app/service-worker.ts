import { ENV } from '@constants';

export const registerServiceWorker = () => {
	if (ENV.IS_PWA_ENABLED) {
		import('virtual:pwa-register')
			.then(({ registerSW }) => registerSW({}))
			.then((updateSW) => updateSW())
			.then(() => {
				console.log('Service worker registered 🤖');
			})
			.catch(() => {
				console.error('Service worker could not be registered ❌');
			});
	}
};
