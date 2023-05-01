import React from 'react';
import Header from "../../header/Header";
import TaskGroupContainer from "../../ui/containers/TaskGroup/TaskGroupContainer";

import styles from './styles/MobileHomePage.module.scss';

const MobileHomePage = () => {
    return (
         <main className={styles.main__container}>
             <Header/>
             
             <div className={styles.content__wrapper_mobile}>
                <TaskGroupContainer/>
             </div>
        </main>
    );
};

export default MobileHomePage;