
import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getNotification as getNotificationApi,
    reject as rejectApi,
    accept as acceptApi,
} from "../../helpers/helper";
import { toast } from "react-toastify";

export const getNotification = createAsyncThunk("Notification/getNotification", async (data: any) => {
    try {
        const response = await getNotificationApi(data);
        console.log(response);

        return response;
    } catch (error) {
        return error;
    }
});
export const rejectRequest = createAsyncThunk("Notification/rejectRequest", async (category: any) => {
    try {
        const response = rejectApi(category);
        const data = await response;
        toast.success("Alumni uyushmasiga qabul qilinmadi", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Qo'shishda hatolik yuz berdi", { autoClose: 2000 });
        return error;
    }
});

export const acceptRequest = createAsyncThunk("Notification/acceptRequest", async (id: any) => {
    try {
        console.log("ishladi")
        const response = acceptApi(id);
        const data = await response;
        toast.success("Alumni uyushmasiga qabul qilindi", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Qo'shishda hatolik yuz berdi", { autoClose: 2000 });
        return error;
    }
});


