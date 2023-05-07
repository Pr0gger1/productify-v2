import React from "react";
import { useNavigate } from "react-router-dom";
import IconButton from "./IconButton";

import WestRoundedIcon from "@mui/icons-material/WestRounded";

const BackButton = ({ to = "/" }) => {
    const navigate = useNavigate();

    return (
        <IconButton
            onClick={() => navigate(to)}
        >
            <WestRoundedIcon/>
        </IconButton>
    );
};

export default BackButton;