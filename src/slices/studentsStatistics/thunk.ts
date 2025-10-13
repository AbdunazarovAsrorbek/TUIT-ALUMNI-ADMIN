import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getStudentList as getStudentListApi,
} from "../../helpers/helper";

export const getStudentList = createAsyncThunk("Student/getStudentList", async () => {
    try {
        const response = await getStudentListApi();
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx",response.data);
        console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxx",response);

        return response;
    } catch (error) {
        return error;
    }
});


