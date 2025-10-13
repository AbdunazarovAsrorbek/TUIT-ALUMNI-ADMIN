import { createSlice } from "@reduxjs/toolkit";

import {
    createClubMemberList,
    getClubMemberList,
    updateClubMemberList,
    deleteClubMemberList
} from "./thunk";

export const initialState = {
    clubMember: {
        content: [],
    },
    error: null
};

const ClubMemberSlice = createSlice({
    name: "ClubMember",
    initialState,
    reducers: {},
    extraReducers: (builder) => {



        builder.addCase(getClubMemberList.fulfilled, (state: any, action: any) => {
            state.clubMember.content = action.payload;
        });

        builder.addCase(getClubMemberList.rejected, (state: any, action: any) => {
            state.error = action.payload;
        });



        builder.addCase(createClubMemberList.fulfilled, (state: any, action: any) => {
            if (!Array.isArray(state.clubMember.content)) {
                state.clubMember.content = [];
            }
            console.log("action.payload", action.payload);

            state.clubMember.content.unshift(action.payload);
        });

        builder.addCase(createClubMemberList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });



        builder.addCase(updateClubMemberList.fulfilled, (state: any, action: any) => {
            state.clubMember.content = state.clubMember.content.map((member: any) =>
                member.id === action.payload.id
                    ? { ...member, ...action.payload }
                    : member
            );
        });

        builder.addCase(updateClubMemberList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });



        builder.addCase(deleteClubMemberList.fulfilled, (state: any, action: any) => {
            console.log(action.payload);
            state.clubMember.content = state.clubMember.content.filter(
                (clubMember: any) => clubMember.id !== action.payload
            );
        });

        builder.addCase(deleteClubMemberList.rejected, (state: any, action: any) => {
            state.error = action.payload.error || null;
        });



    },
});

export default ClubMemberSlice.reducer;
