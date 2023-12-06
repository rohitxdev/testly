import { useAppContext, useViewport } from '@hooks';
import { ReactNode, useEffect } from 'react';

import { Footer } from '../footer/footer';
import { NavBar } from '../nav-bar/nav-bar';
import styles from './layout.module.scss';

interface LayoutProps {
	children: ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	const { vh, vw } = useViewport();
	const { appState, appDispatch } = useAppContext();
	const { theme } = appState;

	const detectTheme = () => {
		const theme = localStorage.getItem('theme');
		if (theme === 'dark' || theme === 'light') {
			return appDispatch({ type: 'SET_THEME', payload: theme });
		}
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			return appDispatch({ type: 'SET_THEME', payload: 'dark' });
		} else {
			return appDispatch({ type: 'SET_THEME', payload: 'light' });
		}
	};

	useEffect(() => {
		const root = document.getElementById('root');
		if (root) {
			root.style.setProperty('--vh', `${vh}px`);
			root.style.setProperty('--vw', `${vw}px`);
		}
	}, [vh, vw]);

	useEffect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	}, [theme]);

	useEffect(() => {
		detectTheme();
	}, []);

	return (
		<div className={styles.layout}>
			<NavBar />
			<main>{children}</main>
			<Footer />
		</div>
	);
};
