import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from "react-responsive";


import TaskContainer from '../ui/containers/TaskContainer/TaskContainer';
import ContentTopPanel from './components/ContentTopPanel';
import FilteredContent from './components/FilteredContent';
import * as selectors from '../../store';

import styles from './styles/Content.module.scss';

const Content = () => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(selectors.mobileSelector) || mobileScreen;
    const selectedGroup = useSelector(selectors.selectedTaskGroupSelector);
    const searchFilter = useSelector(selectors.filterSelector).searchFilter;

    useEffect(() => {
         document.title = selectedGroup.webTitle || 'Productify'
    }, [selectedGroup]);

    return (
        <div className={styles.content}
            style={!isMobile && {width: '100vw'}}
        >
            {
                searchFilter.length
                ? <FilteredContent/>
                :
                <>
                    <ContentTopPanel/>
                    <TaskContainer/>
                </>
            }
        </div>
    );
};

export default Content;