import { createSlice } from "@reduxjs/toolkit"

import { getEventList, addEventList, updateEventList, deleteEventList, getEventById } from "./thunk"

export const initialState = {
    eventList: [],
    eventListById: {},
    error: {}
}

const EventSlice = createSlice({
    name: 'Event',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getEventList.fulfilled, (state: any, action: any) => {
            state.eventList = action.payload
        })
        builder.addCase(getEventList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        })

        builder.addCase(addEventList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.eventList)) {
                state.eventList = [];
            }
            state.eventList = [action.payload, ...state.eventList];
        });
        builder.addCase(addEventList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateEventList.fulfilled, (state: any, action: any) => {
            state.eventList = state.eventList.map((event: any) =>
                event.id === action.payload.id
                    ? { ...event, ...action.payload }
                    : event
            );
            console.log("reducer updateEventList", action.payload);

        });
        builder.addCase(updateEventList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


        builder.addCase(deleteEventList.fulfilled, (state: any, action: any) => {
            state.eventList = state.eventList.filter(
                (eventList: any) => eventList.id !== action.payload
            );
        });

        builder.addCase(deleteEventList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getEventById.fulfilled, (state: any, action: any) => {
            state.eventListById = action.payload;
            console.log("reducer getEventById", action.payload);
        });
        builder.addCase(getEventById.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


    },
})

export default EventSlice.reducer