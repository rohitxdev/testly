import { ReactComponent as ReactLogo } from '@assets/icons/react.svg';

import styles from './home.module.scss';

export const HomePage = () => {
	return (
		<div className={styles.homePage}>
			<h2>Hi there! 👋👀</h2>
			<ReactLogo height={200} width={200} className={styles.reactLogo} />
		</div>
	);
};
