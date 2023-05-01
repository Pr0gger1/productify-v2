import React, {useContext} from 'react';
import { useDispatch } from "react-redux";
import { deleteTaskAsync } from "../../../store/reducers/TaskSlice";

import { Tooltip } from "@mui/material";
import DeleteSweepTwoToneIcon from '@mui/icons-material/DeleteSweepTwoTone';
import {SnackbarContext, snackbarTypes} from "../../../context/SnackbarContext";

const DeleteTaskButton = ({ selectedTask }) => {
    const { setMessage, setType, setHideDuration, setOpen } = useContext(SnackbarContext);
    const dispatch = useDispatch();

    const onDeleteTask = () => {
        dispatch(deleteTaskAsync(selectedTask.id));
        setMessage('Задача удалена');
        setType(snackbarTypes.success);
        setHideDuration(2000)
        setOpen(true);
    }

    return (
        <Tooltip title="Удалить задачу">
            <DeleteSweepTwoToneIcon
                onClick={onDeleteTask}
                sx={{
                    fontSize: 24,
                    color: '#ff554b',
                    backgroundColor: 'var(--bgColorFirst)',
                    borderRadius: '0.5rem',
                    padding: 1
                }}
            />
        </Tooltip>
    );
};

export default DeleteTaskButton;