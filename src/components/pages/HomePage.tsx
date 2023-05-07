import React from "react";
import { useMediaQuery } from "react-responsive";

import LeftSidebar from "../sidebars/LeftSidebar";
import Header from "../header/Header";
import Content from "../content/Content";
import RightSidebar from "../sidebars/RightSidebar";
import MobileHomePage from "./mobile/MobileHomePage";
import styles from "./styles/HomePage.module.scss";
import {mobileSelector} from "../../store";
import {useAppSelector} from "../../store/store";

const HomePage = () => {
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