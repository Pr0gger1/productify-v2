import React, {FC, useContext, useEffect} from 'react';
import {useAppSelector} from 'store/index';
import { useMediaQuery } from 'react-responsive';
import { mobileSelector } from 'store/selectors';

import LeftSidebar from 'components/sections/sidebars/LeftSidebar';
import RightSidebar from 'components/sections/sidebars/RightSidebar';
import Content from 'components/sections/content';
import TaskGroupContainer from 'components/ui/containers/TaskGroups/TaskGroupContainer';

import styles from 'components/ui/Layout/styles.module.scss';
import {HeaderContext} from 'context/HeaderContext';

const HomePage: FC = (): JSX.Element => {
	const { setShowHeader } = useContext(HeaderContext);
	const mobileScreen: boolean = useMediaQuery({ maxWidth: 768 });
	const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;

	useEffect(() => {
		setShowHeader(true);
	}, []);
	
	if (isMobile) return <TaskGroupContainer/>;

	return (
		<div className={styles.content__wrapper}>
			<LeftSidebar/>
			<Content/>
			<RightSidebar/>
		</div>
	);
};
export default HomePage;