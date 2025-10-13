import {useEffect, useState} from "react";
import {getLoggedInUser} from "../../helpers/api_helper";

const useProfile = () => {
    const userProfileSession = getLoggedInUser();
    const [loading, setLoading] = useState(userProfileSession ? false : true);
    const [userProfile, setUserProfile] = useState(
        userProfileSession ? userProfileSession : null
    );

    useEffect(() => {
        const userProfileSession = getLoggedInUser();
        setUserProfile(userProfileSession ? userProfileSession : null);
    }, []);

    return {userProfile, loading};

};

export {useProfile};

