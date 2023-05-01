import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logoutHandler } from '../../../store/reducers/AuthSlice';

import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import VpnKeyTwoToneIcon from '@mui/icons-material/VpnKeyTwoTone';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import PersonOffOutlinedIcon from '@mui/icons-material/PersonOffOutlined';
import FaceRoundedIcon from '@mui/icons-material/FaceRounded';
import BadgeRoundedIcon from '@mui/icons-material/BadgeRounded';

import TabPanel from "../Tab/TabPanel/TabPanel";
import DeleteUserDialog from "../Dialogs/DeleteUserDialog/DeleteUserDialog";
import EditAvatarDialog from "../Dialogs/EditAvatarDialog";
import EditUsernameDialog from "../Dialogs/EditUsernameDialog";

import { StyledTab, StyledTabs } from "../Tab/Tab";

import styles from './styles/SettingsContainer.module.scss';


const settingsTabValues = {
    accountActions: 'account_actions',
    accountPersonalization: 'account_personalization'
}

const SettingsContainer = () => {
    const dispatch = useDispatch();
    const [tabValue, setTabValue] = useState(0);
    const [delUserDialogOpen, setDelUserDialogOpen] = useState(false);
    const [editNameDialogOpen, setEditNameDialogOpen] = useState(false);
    const [editAvatarDialogOpen, setEditAvatarDialogOpen] = useState(false);

    const onTabChange = (event, newValue) => {
        setTabValue(newValue)
    }

    return (
        <div className={styles.settings__container}>
            <StyledTabs
                orientation='horizontal'
                variant='scrollable'
                scrollButtons='auto'
                value={tabValue}
                onChange={onTabChange}
                sx={{
                    color: 'var(--fontColor)'
                }}
            >
                <StyledTab
                    label='Действия с аккаунтом'
                    icon={<VpnKeyTwoToneIcon sx={{color: '#D1C343'}}/>}
                    id={settingsTabValues.accountActions}
                />

                <StyledTab
                    label='Настройки аккаунта'
                    icon={<ManageAccountsTwoToneIcon sx={{color: '#2C7ECB'}}/>}
                    id={settingsTabValues.accountPersonalization}
                >
                </StyledTab>
            </StyledTabs>
            <TabPanel
                index={0}
                value={tabValue}
            >
                <button
                    className={[styles.settings__btn, styles.logout].join(' ')}
                    onClick={() => dispatch(logoutHandler())}
                >
                    <LogoutRoundedIcon/>
                    <span>Выйти</span>
                </button>

                <button
                    className={[styles.settings__btn, styles.delete_account].join(' ')}
                    onClick={() => setDelUserDialogOpen(true)}
                >
                    <PersonOffOutlinedIcon sx={{color: '#9C50EE'}}/>
                    Удалить аккаунт
                </button>
            </TabPanel>

            <TabPanel
                index={1}
                value={tabValue}
            >
                <button
                    className={styles.settings__btn}
                    onClick={() => setEditAvatarDialogOpen(true)}
                >
                    <FaceRoundedIcon sx={{color: '#15B77E'}}/>
                    Изменить аватар
                </button>

                <button
                    className={styles.settings__btn}
                    onClick={() => setEditNameDialogOpen(true)}
                >
                    <BadgeRoundedIcon sx={{color: '#FF825E'}}/>
                    Изменить никнейм
                </button>
            </TabPanel>
            
            <DeleteUserDialog
                open={delUserDialogOpen}
                setOpen={setDelUserDialogOpen}
            />

            <EditUsernameDialog
                open={editNameDialogOpen}
                setOpen={setEditNameDialogOpen}
            />
            <EditAvatarDialog
                dialogOpen={editAvatarDialogOpen}
                setDialogOpen={setEditAvatarDialogOpen}
            />
        </div>
    );
};

export default SettingsContainer;