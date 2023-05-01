import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        notifications: JSON.parse(localStorage.getItem('notifications')) || []
    },
    reducers: {
        updateNotifications(state, action) {
            const newNotification = action.payload.notification;
            state.notifications.push(newNotification);

            localStorage.setItem('notifications', JSON.stringify(state.notifications));
        },

        deleteNotification(state, action) {
            const notificationId = action.payload.id;
            state.notifications = state.notifications.filter(
                notice => notice.id !== notificationId
            );

            localStorage.setItem('notifications', JSON.stringify(state.notifications))
        }
    }
});

export const { updateNotifications, deleteNotification } = notificationSlice.actions;
export default notificationSlice.reducer;