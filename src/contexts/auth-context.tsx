import { apiRoutes } from '@constants';
import { createContext, ReactNode, useEffect, useState } from 'react';

interface AuthContext {
	fetch: (endPoint: string, init?: RequestInit) => Promise<Response>;
	logOut: () => void;
	isLoggedIn: boolean;
}

interface AuthContextProviderProps {
	children: ReactNode;
}

export const AuthContext = createContext<AuthContext | null>(null);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const API_URL = '/api/v1';
	const REFETCH_INTERVAL_IN_MINUTES = 10;
	const isLoggedIn = Boolean(accessToken);

	const fetchWithAccessToken = (endPoint: string, init?: RequestInit) => {
		return fetch(API_URL + endPoint, {
			...init,
			headers: {
				...init?.headers,
				Authorization: `Bearer ${accessToken}`,
			},
		});
	};

	const logOut = () => {
		setAccessToken(null);
	};

	const refreshAccessToken = async () => {
		const res = await fetchWithAccessToken(apiRoutes.auth.refreshAccessToken);
		if (!res.ok) {
			throw new Error('Could not refresh access token');
		}
		if (res.status === 401) {
			throw new Error('Unauthorized');
		}
		const data = await res.json();
		setAccessToken(data);
	};

	useEffect(() => {
		const localUser = localStorage.getItem('user');
		let timer: number | null = null;
		if (localUser) {
			timer = window.setInterval(() => {
				refreshAccessToken().catch((error) => {
					if (
						error instanceof Error &&
						error.message === 'Unauthorized' &&
						timer
					) {
						window.clearInterval(timer);
						setAccessToken(null);
					}
				});
			}, REFETCH_INTERVAL_IN_MINUTES * 60 * 1000);
		}

		return () => {
			if (timer) {
				window.clearInterval(timer);
			}
		};
	}, [accessToken]);

	return (
		<AuthContext.Provider
			value={{ fetch: fetchWithAccessToken, logOut, isLoggedIn }}
		>
			{children}
		</AuthContext.Provider>
	);
};
