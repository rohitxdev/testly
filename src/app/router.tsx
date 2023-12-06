import { HomePage, NotFoundPage } from '@pages';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

export const Router = () => {
	const router = createBrowserRouter([
		{ path: '*', element: <NotFoundPage /> },
		{ path: '/', element: <HomePage /> },
	]);

	return <RouterProvider router={router} />;
};
