import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getMediaCategoryList as getMediaCategoryListApi,
    addMediaCategoryList as addMediaCategoryListApi,
    updateMediaCategoryList as updateMediaCategoryListApi,
    deleteMediaCategoryList as deleteMediaCategoryListApi
} from "../../helpers/helper";
import { toast } from "react-toastify";

export const getMediaCategoryList = createAsyncThunk("MediaCategory/getMediaCategoryList", async () => {
    try {
        const response = await getMediaCategoryListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addMediaCategoryList = createAsyncThunk("MediaCategory/addMediaCategoryList", async (mediaCategory: any) => {
    try {
        const response = addMediaCategoryListApi(mediaCategory);
        const data = await response;
        toast.success("Media Category Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Media Category Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateMediaCategoryList = createAsyncThunk("MediaCategory/update", async (dataArr: any) => {
    try {
        const response = updateMediaCategoryListApi(dataArr);
        const data = await response;
        toast.success("Media Category Updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Media Category Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteMediaCategoryList = createAsyncThunk("MediaCategory/deleteMediaCategoryList", async (mediaCategoryId: any) => {
    try {
        const response = deleteMediaCategoryListApi(mediaCategoryId);
        console.log(response);
        toast.success("Media Category Deleted Successfully", { autoClose: 2000 });
        return mediaCategoryId;
    } catch (error) {
        toast.error("Media Category Deleted Failed", { autoClose: 2000 });
        return error;
    }
})
