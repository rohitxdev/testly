import { createContext, ReactNode, Reducer, useReducer } from 'react';

export const themes = ['light', 'dark'] as const;
export type Theme = (typeof themes)[number];

interface User {
	name: string;
	username: string;
	email: string;
}

interface AppState {
	theme: Theme;
	user: Partial<User>;
}

type AppAction =
	| { type: 'TOGGLE_THEME' }
	| { type: 'SET_THEME'; payload: Theme }
	| { type: 'UPDATE_USER_DATA'; payload: User };

interface AppContext {
	appState: AppState;
	appDispatch: React.Dispatch<AppAction>;
}

interface AppContextProviderProps {
	children: ReactNode;
}

export const AppContext = createContext<AppContext | null>(null);

const reducer: Reducer<AppState, AppAction> = (state, action) => {
	switch (action.type) {
		case 'TOGGLE_THEME':
			return {
				...state,
				theme: state.theme === 'light' ? 'dark' : 'light',
			};

		case 'SET_THEME':
			return {
				...state,
				theme: action.payload,
			};

		case 'UPDATE_USER_DATA':
			return { ...state, user: action.payload };

		default:
			return state;
	}
};

export const AppContextProvider = ({ children }: AppContextProviderProps) => {
	const [appState, appDispatch] = useReducer(reducer, {
		theme: 'light',
		user: {},
	});
	return (
		<AppContext.Provider value={{ appState, appDispatch }}>
			{children}
		</AppContext.Provider>
	);
};
