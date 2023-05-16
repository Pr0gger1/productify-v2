import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ITaskNotification} from "../../interfaces/Notification";


function getNotifications(): ITaskNotification[] {
    const notifications: string | null = localStorage.getItem("notifications");
    return notifications ? JSON.parse(notifications) : []
}


const notificationSlice = createSlice({
    name: "notification",
    initialState: {
        notifications: getNotifications()
    },
    reducers: {
        updateNotifications(state, action: PayloadAction<ITaskNotification>) {
            const newNotification: ITaskNotification = action.payload;
            state.notifications.push(newNotification);

            localStorage.setItem("notifications", JSON.stringify(state.notifications));
        },

        deleteNotification(state, action: PayloadAction<string>) {
            const notificationId = action.payload;
            state.notifications = state.notifications.filter(
                (notice: ITaskNotification) => notice.id !== notificationId
            );

            localStorage.setItem("notifications", JSON.stringify(state.notifications))
        },

        clearNotifications(state) {
            state.notifications = [];
            localStorage.removeItem("notifications");
        }
    }
});

export const { updateNotifications,
    deleteNotification,
    clearNotifications } = notificationSlice.actions;
export default notificationSlice.reducer;