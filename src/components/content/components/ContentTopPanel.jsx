import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import TaskGroupMenuContainer from '../../ui/contextMenu/task_page/TaskGroupMenuContainer';
import BackButton from "../../ui/button/BackButton";

import { DateFormatter } from '../../../utils/DateFormatter';
import * as selectors from "../../../store";

import '../../ui/animations/ContextMenu/ContextMenuPageAnimation.scss';
import styles from '../styles/ContentTopPanel.module.scss';

const ContentTopPanel = () => {
    const mobileScreen =  useMediaQuery({maxWidth: 768});
    const isMobile = useSelector(selectors.mobileSelector) || mobileScreen;

    const selectedTaskGroup = useSelector(selectors.selectedTaskGroupSelector);


    return (
        <section className={styles.content__top_panel}>
            {
                isMobile &&
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <BackButton to='/'/>
                    <TaskGroupMenuContainer />
                </div>
            }

            <div className={styles.top_panel__left}>
                <div className={styles.task_list__title}>
                    <span>
                        { selectedTaskGroup.pageTitle }
                        <span className={styles.day_of_week__title}>
                            { new DateFormatter().getDayOfWeek() }
                        </span>
                    </span>
                </div>

                <span className={styles.date__title}>
                    {new DateFormatter().getFullDate()}
                </span>
            </div>

            {
                !mobileScreen &&
                <TaskGroupMenuContainer/>
            }
        </section>
    );
};

export default ContentTopPanel;