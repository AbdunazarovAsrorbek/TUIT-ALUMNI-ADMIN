import { createSlice } from "@reduxjs/toolkit"

import { getVacancyList, addVacancyList, updateVacancyList, deleteVacancyList, getVacancyById } from "./thunk"

export const initialState = {
    vacancyList: [],
    vacancyListById: {},
    error: {}
}

const VacancySlice = createSlice({
    name: 'Vacancy',
    initialState,
    reducers: {},
    extraReducers: (builder) => {



        builder.addCase(getVacancyList.fulfilled, (state: any, action: any) => {
            state.vacancyList = action.payload;
        })
        builder.addCase(getVacancyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        })



        builder.addCase(addVacancyList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.vacancyList)) {
                state.vacancyList = [];
            }
            state.vacancyList = [action.payload, ...state.vacancyList];
        });
        builder.addCase(addVacancyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });



        builder.addCase(updateVacancyList.fulfilled, (state: any, action: any) => {
            state.vacancyList = state.vacancyList.map((vacancy: any) =>
                vacancy.id === action.payload.id
                    ? { ...vacancy, ...action.payload }
                    : vacancy
            );
            console.log(action.payload);

        });
        builder.addCase(updateVacancyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });



        builder.addCase(deleteVacancyList.fulfilled, (state: any, action: any) => {
            if (Array.isArray(state.vacancyList)) {
                state.vacancyList = state.vacancyList.filter(
                    (vacancy: any) => vacancy.id !== action.payload
                );
            }
        })
        builder.addCase(deleteVacancyList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getVacancyById.fulfilled, (state: any, action: any) => {            
            state.vacancyListById =action.payload
        });
        builder.addCase(getVacancyById.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


    },
})

export default VacancySlice.reducer