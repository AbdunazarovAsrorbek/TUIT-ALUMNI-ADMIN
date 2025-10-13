import { createSlice } from "@reduxjs/toolkit";

import { getFacultyList, addFacultyList, updateFacultyList, deleteFacultyList } from "./thunk";

export const initialState = {
    facultyList: {
        content: []
    },
    errors: {}
};

const FacultySlice = createSlice({
    name: 'Faculty',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getFacultyList.fulfilled, (state: any, action: any) => {
            console.log(action.payload);

            state.facultyList.content = action.payload;
        });

        builder.addCase(getFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addFacultyList.fulfilled, (state: any, action: any) => {
            console.log(action.payload);

            if (!Array.isArray(state.facultyList.content)) {
                state.facultyList = [];
            }
            state.facultyList.content.unshift(action.payload);
        });

        builder.addCase(addFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateFacultyList.fulfilled, (state: any, action: any) => {
            state.facultyList.content = state.facultyList.content.map((faculty: any) =>
                faculty.id === action.payload.id
                    ? { ...faculty, ...action.payload }
                    : faculty
            );
        });

        builder.addCase(updateFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(deleteFacultyList.fulfilled, (state: any, action: any) => {
            state.facultyList.content = state.facultyList.content.filter(
                (facultyList: any) => facultyList.id !== action.payload
            );
        });
        builder.addCase(deleteFacultyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default FacultySlice.reducer;