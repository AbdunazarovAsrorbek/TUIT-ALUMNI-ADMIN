import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getMediaList as getMediaListApi,
    addMediaList as addMediaListApi,
    updateMediaList as updateMediaListApi,
    deleteMediaList as deleteMediaListApi
} from '../../helpers/helper'

import { toast } from "react-toastify";

export const getMediaList = createAsyncThunk("Media/getMediaList", async () => {
    try {
        const response = await getMediaListApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const addMediaList = createAsyncThunk("Media/addMediaList", async (media: any) => {
    try {
        const response = await addMediaListApi(media);

        toast.success("Media Added Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Media Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateMediaList = createAsyncThunk("Media/updateMediaList", async (dataArr: any) => {
    try {
        const response = await updateMediaListApi(dataArr);

        console.log(response);
        console.log(response.data);

        toast.success("Media Updated Successfully", { autoClose: 2000 });
        return response
    } catch (error) {
        toast.error("Media Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteMediaList = createAsyncThunk("Media/deleteMediaList", async (mediaId: any) => {
    try {
        const response = await deleteMediaListApi(mediaId);
        console.log(response);
        toast.success("Media Deleted Successfully", { autoClose: 2000 });
        return mediaId;
    } catch (error) {
        toast.error("Media Deleted Failed", { autoClose: 2000 });
        return error;
    }
})
