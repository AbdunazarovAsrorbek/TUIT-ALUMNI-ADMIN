import { createAsyncThunk } from "@reduxjs/toolkit";

import {
    getClubMemberList as getClubMemberListApi,
    updateClubMemberList as updateClubMemberListApi,
    createClubMemberList as createClubMemberListApi,
    deleteClubMemberList as deleteClubMemberListApi,
} from "../../helpers/helper";

import { toast } from "react-toastify";

export const getClubMemberList = createAsyncThunk("ClubMember/getClubMemberList", async () => {
    try {
        const response = await getClubMemberListApi();

        console.log("Apidan kelgan:", response);

        return response;
    } catch (error) {
        return error;
    }
});

export const updateClubMemberList = createAsyncThunk("ClubMember/updateClubMemberList", async (dataArray: any) => {
    try {
        const response = await updateClubMemberListApi(dataArray);

        console.log("update response", response);
        toast.success("Member Update Successfully", { autoClose: 2000 });


        return {
            id: dataArray.id,
            fullName: dataArray.updatedValues.fullName,
            position: dataArray.updatedValues.position
        };
    } catch (error) {
        toast.error("Member Updated Failed", { autoClose: 2000 });
        return error;
    }
});

export const createClubMemberList = createAsyncThunk("ClubMember/createClubMemberList", async (member: any) => {
    try {
        const response = await createClubMemberListApi(member);

        toast.success("Member added!", { autoClose: 2000 });
        
        console.log("createClubMemberList thunk", response);


        return response;
    } catch (error) {
        toast.error("Member Added Failed", { autoClose: 2000 });
        return error;
    }
});


export const deleteClubMemberList = createAsyncThunk("ClubMember/deleteClubMemberList", async (clubMemberId: any) => {
    try {
        const response = deleteClubMemberListApi(clubMemberId);

        console.log("deleteClubMemberList", response);

        toast.success("Member Deleted Successfully", { autoClose: 2000 });

        return clubMemberId;
    } catch (error) {
        toast.error("Member Deleted Failed", { autoClose: 2000 });
        return error;
    }
})
