import { useEffect, useState } from 'react';

export function useViewport() {
	const [innerHeight, setInnerHeight] = useState(window.innerHeight);
	const [innerWidth, setInnerWidth] = useState(window.innerWidth);

	const onResize = () => {
		setInnerHeight(window.innerHeight);
		setInnerWidth(window.innerWidth);
	};

	useEffect(() => {
		window.addEventListener('resize', onResize);

		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	return { vh: innerHeight, vw: innerWidth };
}
