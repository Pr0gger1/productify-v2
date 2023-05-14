import React, {FC} from "react";
import { useMediaQuery } from "react-responsive";

import TaskGroupMenuContainer from "../../ui/contextMenu/task_page/TaskGroupMenuContainer";
import BackButton from "../../ui/button/BackButton";

import { DateFormatter } from "../../../utils/DateFormatter";
import * as selectors from "../../../store";

import "../../ui/animations/ContextMenu/ContextMenuPageAnimation.scss";
import styles from "../styles/ContentTopPanel.module.scss";
import {ITaskGroup} from "../../../interfaces/TaskData";
import {useAppSelector} from "../../../store/store";

const ContentTopPanel: FC = (): JSX.Element => {
    const mobileScreen: boolean =  useMediaQuery({maxWidth: 768});
    const isMobile: boolean = useAppSelector(selectors.mobileSelector) || mobileScreen;

    const selectedTaskGroup: ITaskGroup | null = useAppSelector(selectors.selectedTaskGroupSelector);


    return (
        <section className={styles.content__top_panel}>
            {
                isMobile &&
                <div style={{
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <BackButton to="/"/>
                    <TaskGroupMenuContainer />
                </div>
            }

            <div className={styles.top_panel__left}>
                <div className={styles.task_list__title}>
                    <span>
                        { selectedTaskGroup?.pageTitle }
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