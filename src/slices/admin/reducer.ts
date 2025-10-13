import { createSlice } from "@reduxjs/toolkit";

import { getAdminById, updateAdmin } from "./thunk";

export const initialState = {
    getAdminByIdList: [],
    listAdminById: {},
    errors: {}
};

const AdminSlice = createSlice({
    name: 'Admin',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getAdminById.fulfilled, (state: any, action: any) => {
            console.log(action.payload);
            state.getAdminByIdList = action.payload;
        });

        builder.addCase(getAdminById.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });



    }
});

export default AdminSlice.reducer;