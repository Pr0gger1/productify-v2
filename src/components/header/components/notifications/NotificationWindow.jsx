import React from 'react';
import { useSelector } from 'react-redux';

import Popover from '@mui/material/Popover';
import NotificationContainer from '../../../ui/containers/NotificationContainer';
import { mobileSelector } from "../../../../store";

const NotificationWindow = ({ anchor, setAnchor }) => {
    const isMobile = useSelector(mobileSelector);

    const handleClose = () => {
        setAnchor(null);
    };

    return (
        <Popover
            sx={{
                "& .MuiPaper-root": {
                    backgroundColor: "var(--bgColor)",
                    color: "var(--fontColor)",
                    borderRadius: "8px",
                    padding: "1rem",
                    width: isMobile ? "90%" : "35%",
                },
                "& .MuiTypography-root": {
                    fontSize: "18px",
                },
            }}
            PaperProps={{
                style: {
                    backdropFilter: "blur(5px)"
                }
            }}
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
        >
            <NotificationContainer/>
        </Popover>
    );
};

export default NotificationWindow;