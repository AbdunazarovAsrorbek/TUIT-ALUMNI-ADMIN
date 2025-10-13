import { createSlice } from "@reduxjs/toolkit";

import { getAlumniList, deleteAlumniList } from "./thunk";

export const initialState = {
    alumniList: {
        content: []
    },
    errors: {}
};

const AlumniSlice = createSlice({
    name: 'Alumni',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAlumniList.fulfilled, (state: any, action: any) => {
            console.log(action.payload)
            state.alumniList = action.payload;
        });
        builder.addCase(getAlumniList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(deleteAlumniList.fulfilled, (state: any, action: any) => {
            state.alumniList.content = state.alumniList.content.filter(
                (alumniList: any) => alumniList.id !== action.payload
            );
            console.log(action.payload)
        });
        builder.addCase(deleteAlumniList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


        // builder.addCase(getAlumni.fulfilled, (state: any, action: any) => {
        //     console.log(action.payload)
        //     state.alumniList = action.payload;
        // });
        // builder.addCase(getAlumni.rejected, (state: any, action: any) => {
        //     state.error = action.payload.error || null;
        // });
    }
});

export default AlumniSlice.reducer;