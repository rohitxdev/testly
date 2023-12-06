import { useEffect } from 'react';

import { useAppContext } from './use-contexts';

export const useTheme = () => {
	const { appState, appDispatch } = useAppContext();
	const { theme } = appState;

	const toggleTheme = () => appDispatch({ type: 'TOGGLE_THEME' });

	const detectTheme = () => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark' || theme === 'light') {
			return appDispatch({ type: 'SET_THEME', payload: theme });
		}
		const prefersDarkTheme = Boolean(
			window?.matchMedia('(prefers-color-scheme: dark)').matches,
		);
		return appDispatch({
			type: 'SET_THEME',
			payload: prefersDarkTheme ? 'dark' : 'light',
		});
	};

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
		localStorage.setItem('theme', theme);
	}, [theme]);

	useEffect(() => {
		detectTheme();
	}, []);

	return { theme, toggleTheme };
};
