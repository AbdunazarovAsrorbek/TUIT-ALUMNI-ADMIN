import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getFacultyList as getFacultyListApi,
    addFacultyList as addFacultyListApi,
    updateFacultyList as updateFacultyListApi,
    deleteFacultyList as deleteFacultyListApi
} from "../../helpers/helper";
import { toast } from "react-toastify";

export const getFacultyList = createAsyncThunk("Faculty/getFacultyList", async () => {
    try {
        const response = await getFacultyListApi();
        return response;
    } catch (error) {
        return error;
    }
});
export const addFacultyList = createAsyncThunk("Faculty/addFacultyList", async (faculty: any) => {
    try {
        const response = addFacultyListApi(faculty);
        const data = await response;
        toast.success("Faculty Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Faculty Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateFacultyList = createAsyncThunk("Faculty/update", async (dataArr: any) => {
    try {
        const response = updateFacultyListApi(dataArr);
        const data = await response;
        toast.success("Faculty Updated Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Faculty Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteFacultyList = createAsyncThunk("Faculty/deleteFacultyList", async (facultyId: any) => {
    try {
        const response = deleteFacultyListApi(facultyId);
        console.log(response);
        toast.success("Faculty Deleted Successfully", { autoClose: 2000 });
        return facultyId;
    } catch (error) {
        toast.error("Faculty Deleted Failed", { autoClose: 2000 });
        return error;
    }
})
