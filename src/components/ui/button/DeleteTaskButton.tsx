import React, {FC, useContext} from "react";
import { deleteTaskAsync } from "../../../store/reducers/TaskSlice";

import { Tooltip } from "@mui/material";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import {SnackbarContext} from "../../../context/SnackbarContext";
import {ITask} from "../../../interfaces/TaskData";
import {useAppDispatch} from "../../../store/store";

interface DeleteTaskButtonProps {
    selectedTask: ITask
}

const DeleteTaskButton: FC<DeleteTaskButtonProps> = ({ selectedTask }): JSX.Element => {
    const { setMessage, setType, setHideDuration, setOpen } = useContext(SnackbarContext);
    const dispatch = useAppDispatch();

    const onDeleteTask = (): void => {
        dispatch(deleteTaskAsync(selectedTask.id));
        setMessage("Задача удалена");
        setType("success");
        setHideDuration(2000)
        setOpen(true);
    }

    return (
        <Tooltip title="Удалить задачу">
            <DeleteSweepTwoToneIcon
                onClick={onDeleteTask}
                sx={{
                    fontSize: 24,
                    color: "#ff554b",
                    backgroundColor: "var(--bgColorFirst)",
                    borderRadius: "0.5rem",
                    padding: 1
                }}
            />
        </Tooltip>
    );
};

export default DeleteTaskButton;