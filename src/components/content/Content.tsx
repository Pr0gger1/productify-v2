import React, {FC, useEffect} from "react";
import { useMediaQuery } from "react-responsive";


import TaskContainer from "../ui/containers/TaskContainer/TaskContainer";
import ContentTopPanel from "./components/ContentTopPanel";
import FilteredContent from "./components/FilteredContent";
import * as selectors from "../../store";

import styles from "./styles/Content.module.scss";
import {ITaskGroup} from "../../interfaces/TaskData";
import {useAppSelector} from "../../store/store";

const Content: FC = (): JSX.Element => {
    const mobileScreen: boolean =  useMediaQuery({maxWidth: 768});
    const isMobile: boolean = useAppSelector(selectors.mobileSelector) || mobileScreen;
    const selectedGroup: ITaskGroup | null = useAppSelector(selectors.selectedTaskGroupSelector);
    const searchFilter: string = useAppSelector(selectors.filterSelector).searchFilter;

    useEffect((): void => {
         document.title = selectedGroup?.webTitle || "Productify"
    }, [selectedGroup]);

    return (
        <div className={styles.content}
            style={!isMobile ? {width: "100vw"} : {}}
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