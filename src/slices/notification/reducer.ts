import { createSlice } from "@reduxjs/toolkit";

import { getNotification, rejectRequest, acceptRequest } from "./thunk";

export const initialState = {
    notification: {
        content: []
    },
    errors: {}
};

const NotificationSlice = createSlice({
    name: 'Notification',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getNotification.fulfilled, (state: any, action: any) => {
            console.log(action.payload);

            state.notification = action.payload;
        });
        builder.addCase(getNotification.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(rejectRequest.fulfilled, (state: any, action: any) => {
            console.log(action.payload)
            state.notification.content.unshift(action.payload);
        });
        builder.addCase(rejectRequest.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(acceptRequest.fulfilled, (state: any, action: any) => {
            state.notification.content = state.notification.content.map((notification: any) =>
                notification.id === action.payload.id
                    ? { ...notification, ...action.payload }
                    : notification
            );
        });

        builder.addCase(acceptRequest.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


    }
});

export default NotificationSlice.reducer;