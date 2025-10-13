import { createSlice } from "@reduxjs/toolkit";

import { getMediaCategoryList, addMediaCategoryList, updateMediaCategoryList, deleteMediaCategoryList } from "./thunk";

export const initialState = {
    mediaCategoryList: {
        content: []
    },
    errors: {}
};

const MediaCategorySlice = createSlice({
    name: 'MediaCategory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getMediaCategoryList.fulfilled, (state: any, action: any) => {
            state.mediaCategoryList.content = action.payload;
        });
        builder.addCase(getMediaCategoryList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(addMediaCategoryList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.mediaCategoryList.content)) {
                state.mediaCategoryList = [];
            }
            state.mediaCategoryList.content.unshift(action.payload);
        });
        builder.addCase(addMediaCategoryList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateMediaCategoryList.fulfilled, (state: any, action: any) => {
            state.mediaCategoryList.content = state.mediaCategoryList.content.map((mediaCategory: any) =>
                mediaCategory.id === action.payload.id
                    ? { ...mediaCategory, ...action.payload }
                    : mediaCategory
            );
        });

        builder.addCase(updateMediaCategoryList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(deleteMediaCategoryList.fulfilled, (state: any, action: any) => {
            state.mediaCategoryList.content = state.mediaCategoryList.content.filter(
                (mediaCategoryList: any) => mediaCategoryList.id !== action.payload
            );
        });
        builder.addCase(deleteMediaCategoryList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });
    }
});

export default MediaCategorySlice.reducer;