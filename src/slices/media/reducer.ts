import { createSlice } from "@reduxjs/toolkit"

import {
    getMediaList,
    addMediaList,
    updateMediaList,
    deleteMediaList
} from "./thunk"

export const initialState = {
    mediaList: {
        content: []
    },
    error: {}
}

const MediaSlice = createSlice({
    name: 'Media',
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        builder.addCase(getMediaList.fulfilled, (state: any, action: any) => {
            state.mediaList.content = action.payload.content;
            console.log(action.payload.content);
            console.log(action.payload);
            
            
        })
        builder.addCase(getMediaList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        })

        builder.addCase(addMediaList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.mediaList.content)) {
                state.mediaList.content = [];
            }
            state.mediaList.content.unshift(action.payload);
        });
        builder.addCase(addMediaList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

        builder.addCase(updateMediaList.fulfilled, (state: any, action: any) => {
            state.mediaList.content = state.mediaList.content.map((media: any) =>
                media.id === action.payload.id
                    ? { ...media, ...action.payload }
                    : media
            );
            console.log(action.payload);

        });
        builder.addCase(updateMediaList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });


        builder.addCase(deleteMediaList.fulfilled, (state: any, action: any) => {
            state.mediaList.content = state.mediaList.content.filter(
                (mediaList: any) => mediaList.id !== action.payload
            );
        });
        builder.addCase(deleteMediaList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });

    },
})

export default MediaSlice.reducer