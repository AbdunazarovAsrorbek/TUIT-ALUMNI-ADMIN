import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getAdminById as getAdminByIdApi,
    updateAdmin as updateAdminApi
} from "../../helpers/helper";

export const getAdminById = createAsyncThunk("Admin/getAdminById", async () => {
    try {
        const response = await getAdminByIdApi();
        console.log(response);
        return response;
    } catch (error) {
        return error;
    }
});

export const updateAdmin = createAsyncThunk("Admin/updateAdmin", async (data: any) => {
    try {
        const response = await updateAdminApi(data)

        console.log(response);
        console.log(response.data);

        return response
    } catch (error) {
        return error
    }
})