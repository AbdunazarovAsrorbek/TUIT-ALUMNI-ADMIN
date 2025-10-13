import { createSlice } from "@reduxjs/toolkit";

import { getNewsList, addNewsList, updateNewsList, deleteNewsList, getNewsById } from "./thunk";

export const initialState = {
    newsList: {
        content: []
    },
    news: {},
    errors: {}
};

const NewsSlice = createSlice({
    name: 'News',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getNewsList.fulfilled, (state: any, action: any) => {
            state.newsList = action.payload;
        });
        builder.addCase(getNewsList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addNewsList.fulfilled, (state: any, action: any) => {
            console.log(action.payload)
            state.newsList.content.unshift(action.payload);
        });
        builder.addCase(addNewsList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateNewsList.fulfilled, (state: any, action: any) => {
            state.newsList.content = state.newsList.content.map((color: any) =>
                color.id === action.payload.id
                    ? { ...color, ...action.payload }
                    : color
            );
        });

        builder.addCase(updateNewsList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(deleteNewsList.fulfilled, (state: any, action: any) => {
            state.newsList.content = state.newsList.content.filter(
                (newsList: any) => newsList.id !== action.payload
            );
            console.log(action.payload)
        });
        builder.addCase(deleteNewsList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(getNewsById.fulfilled, (state: any, action: any) => {
            state.news = action.payload;
        });
        builder.addCase(getNewsById.rejected, (state: any, action: any) => {
            state.error = action.payload || null;
        });

    }
});

export default NewsSlice.reducer;