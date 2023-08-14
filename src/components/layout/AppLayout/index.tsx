import React, {ReactNode, useState} from 'react';
import Header from 'components/sections/header';
import { HeaderContext } from 'context/HeaderContext';
import styles from './styles.module.scss';

interface AppProviderProps {
	children: ReactNode;
}

const AppLayout = ({ children }: AppProviderProps) => {
	const [showHeader, setShowHeader] = useState(true);
	return (
		<HeaderContext.Provider value={{ showHeader, setShowHeader }}>
			<main className={ styles.main__container}>
				{ showHeader && <Header/> }
				{ children }
			</main>
		</HeaderContext.Provider>
	);
};


export default AppLayout;