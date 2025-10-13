import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getVacancyList as getVacancyApi,
    addVacancyList as addVacancyListApi,
    updateVacancyList as updateVacancyListApi,
    deleteVacancyList as deleteVacancyListApi,
    getVacancyById as getVacancyByIdApi
} from '../../helpers/helper'

import { toast } from "react-toastify";

export const getVacancyList = createAsyncThunk("Vacancy/getVacancy", async () => {
    try {
        const response = getVacancyApi();

        console.log(response);

        return response;
    } catch (error) {
        return error;
    }
})

export const addVacancyList = createAsyncThunk("Vacancy/addVacancyList", async (vacancy: any) => {
    try {
        const response = addVacancyListApi(vacancy);
        const data = await response;
        toast.success("Vacancy Added Successfully", { autoClose: 2000 });
        return data;
    } catch (error) {
        toast.error("Vacancy Added Failed", { autoClose: 2000 });
        return error;
    }
});

export const updateVacancyList = createAsyncThunk("Vacancy/update", async (dataArr: any) => {
    try {
        const response = updateVacancyListApi(dataArr);
        console.log(dataArr);

        const data = await response;
        toast.success("Vacancy Updated Successfully", { autoClose: 2000 });
        console.log(data);
        return data;
    } catch (error) {
        toast.error("Vacancy Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const deleteVacancyList = createAsyncThunk("Vacancy/deleteVacancyList", async (vacancyId: any) => {
    try {
        await deleteVacancyListApi(vacancyId);
        toast.success("Vacancy Deleted Successfully", { autoClose: 2000 });
        return vacancyId;
    } catch (error) {
        toast.error("Vacancy Deleted Failed", { autoClose: 2000 });
        throw error;
    }
}
);

export const getVacancyById = createAsyncThunk("Vacancy/getVacancyById", async (vacancyById: any) => {
    try {
        const response = getVacancyByIdApi(vacancyById);
        const data = await response;
        return data;
    } catch (error) {
        toast.error("Vacancy Updated Failed", { autoClose: 2000 });
        return error;
    }
})