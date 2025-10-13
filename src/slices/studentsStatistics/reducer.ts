import { createSlice } from "@reduxjs/toolkit";

import { getStudentList } from "./thunk";

export const initialState = {
    studentList: {
        content: []
    },
    errors: {}
};

const StudentSlice = createSlice({
    name: 'Student',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getStudentList.fulfilled, (state: any, action: any) => {
            console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx",action.payload);

            state.studentList = action.payload;
        });
        builder.addCase(getStudentList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

    }
});

export default StudentSlice.reducer;