import React, {FC} from "react";
import {useAppSelector} from "../../store/store";
import { useMediaQuery } from "react-responsive";
import { mobileSelector } from "../../store";

import LeftSidebar from "../sidebars/LeftSidebar";
import Header from "../header/Header";
import Content from "../content/Content";
import RightSidebar from "../sidebars/RightSidebar";
import MobileHomePage from "./mobile/MobileHomePage";

import styles from "./styles/HomePage.module.scss";

const HomePage: FC = (): JSX.Element => {
    const mobileScreen: boolean = useMediaQuery({maxWidth: 768});
    const isMobile: boolean = useAppSelector(mobileSelector) || mobileScreen;

    if (isMobile)
        return <MobileHomePage/>

    return (
        <main className={styles.main__container}>
            <Header/>
            <div className={styles.content__wrapper}>
                <LeftSidebar/>
                <Content/>
                <RightSidebar/>
            </div>
        </main>
    )
}
export default HomePage;