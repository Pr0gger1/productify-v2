import React from "react";
import Popover from "@mui/material/Popover";
import SettingsContainer from "../../../ui/containers/SettingsContainer";
import IWindowAnchor from "../../../../interfaces/Window";


const SettingsWindow = ({ anchor, setAnchor }: IWindowAnchor): JSX.Element => {
    const settingsHandleClose = (): void => {
        setAnchor(null);
    }

    return (
        <Popover
            sx={{
                "& .MuiPaper-root": {
                    color: "var(--fontColor)",
                    borderRadius: "0.5rem",
                    padding: "1rem",
                },
                "& .MuiTypography-root": {
                    fontSize: "18px",
                },
            }}
            PaperProps={{
                style: {
                    backgroundColor: "var(--bgColorFirst)",
                    backdropFilter: "blur(5px)"
                }
            }}
            
            open={Boolean(anchor)}
            anchorEl={anchor}
            onClose={settingsHandleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "center",
            }}
        >
            <SettingsContainer/>
        </Popover>
    );
};

export default SettingsWindow;