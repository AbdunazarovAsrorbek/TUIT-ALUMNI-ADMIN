import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getAlumniList as getAlumniListApi,
    deleteAlumniList as deleteAlumniListApi,
    // getAlumni as getAlumniApi
} from "../../helpers/helper";
import { toast } from "react-toastify";

export const getAlumniList = createAsyncThunk("Alumni/getAlumniList", async (data: any) => {
    try {
        const { alumniData, page } = data;
        const response = await getAlumniListApi(alumniData, page);
        console.log(response);

        return response;
    } catch (error) {
        return error;
    }
});

export const deleteAlumniList = createAsyncThunk("Alumni/deleteAlumniList", async (categoryId: any) => {
    try {
        const response = deleteAlumniListApi(categoryId);
        console.log(response);
        toast.success("Alumni Deleted Successfully", { autoClose: 2000 });
        return categoryId;
    } catch (error) {
        toast.error("Alumni Deleted Failed", { autoClose: 2000 });
        return error;
    }
})

// export const getAlumni = createAsyncThunk("Alumni/getAlumni", async (data: any) => {
//     try {
//         const { alumniDataList, page } = data;
//         const response = await getAlumniApi(alumniDataList, page);

//         console.log(response);
//         console.log(response.data);

//         return response;
//     } catch (error) {
//         return error;
//     }
// });