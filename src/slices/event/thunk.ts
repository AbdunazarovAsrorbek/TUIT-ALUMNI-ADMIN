import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getEventList as getEventApi,
    addEventList as addEventListApi,
    updateEventList as updateEventListApi,
    deleteEventList as deleteEventListApi,
    getEventById as getEventByIdApi,
} from '../../helpers/helper'

import { toast } from "react-toastify";

export const getEventList = createAsyncThunk("Event/getEvent", async () => {
    try {
        const response = await getEventApi();
        return response;
    } catch (error) {
        return error;
    }
})

export const addEventList = createAsyncThunk("Event/addEventList", async (event: any) => {
    try {
        const response = addEventListApi(event);
        const data = await response;
        toast.success("Event Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Event Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateEventList = createAsyncThunk("Event/update", async (dataArr: any) => {
    try {
        const response = await updateEventListApi(dataArr);
        toast.success("Event Updated Successfully", { autoClose: 2000 });
        return response;
    } catch (error) {
        toast.error("Event Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteEventList = createAsyncThunk("Event/deleteEventList", async (eventId: any) => {
    try {
        const response = deleteEventListApi(eventId);
        console.log(response);
        toast.success("Event Deleted Successfully", { autoClose: 2000 });
        return eventId;
    }
    catch (error) {
        toast.error("Event Deleted Failed", { autoClose: 2000 });
        return error;
    }
});

export const getEventById = createAsyncThunk("Event/getEventById", async (eventById: any) => {
    try {
        const response = getEventByIdApi(eventById);
        const data = await response;

        console.log("thunk getEventById", data);

        return data;
    } catch (error) {
        return error;
    }
})