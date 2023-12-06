export const apiRoutes = {
	'/': '/',
	auth: {
		signUp: '/auth/sign-up',
		logIn: '/auth/log-in',
		refreshAccessToken: '/auth/refresh-token',
	},
} as const;
