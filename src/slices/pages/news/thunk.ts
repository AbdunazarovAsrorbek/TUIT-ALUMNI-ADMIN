import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getNewsList as getNewsListApi,
    addNewsList as addNewsListApi,
    updateNewsList as updateNewsListApi,
    deleteNewsList as deleteNewsListApi,
    getNewsById as getNewsByIdApi
} from "../../..//helpers/helper";

import { toast } from "react-toastify";

export const getNewsList = createAsyncThunk("News/getNewsList", async (data: any) => {
    try {
        const { searchData, pagination } = data;
        const response = await getNewsListApi(searchData, pagination);
        return response;
    } catch (error) {
        return error;
    }
});
export const addNewsList = createAsyncThunk("News/addNewsList", async (news: any) => {
    try {
        const response = addNewsListApi(news);
        const data = await response;
        toast.success("News Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("News Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateNewsList = createAsyncThunk("News/update", async (dataArr: any) => {
    try {
        const { formData, id } = dataArr;
        const response = updateNewsListApi(formData, id);
        const data = await response;
        toast.success("News Updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("News Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteNewsList = createAsyncThunk("News/deleteNewsList", async (categoryId: any) => {
    try {
        const response = deleteNewsListApi(categoryId);
        console.log(response);
        toast.success("News Deleted Successfully", { autoClose: 2000 });
        return categoryId;
    } catch (error) {
        toast.error("News Deleted Failed", { autoClose: 2000 });
        return error;
    }
})

export const getNewsById = createAsyncThunk("news/getNewsById", async (id: any) => {
    try {
        const response = getNewsByIdApi(id);
        return response;
    } catch (error) {
        return error;
    }
});
