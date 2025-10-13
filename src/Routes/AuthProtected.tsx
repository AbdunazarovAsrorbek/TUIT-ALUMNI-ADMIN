import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useProfile } from "Common/Hooks/UserHooks";
import { logoutUser } from "slices/thunk";

const AuthProtected = (props: any) => {
  const dispatch = useDispatch<any>();
  const { userProfile, loading } = useProfile();

  useEffect(() => {
    if (userProfile && !loading) {
    } else if (!userProfile && loading) {
      dispatch(logoutUser());
    }
  }, [userProfile, loading, dispatch]);

  if (!userProfile && loading) {
    return (
      <Navigate to={{ pathname: "/login" }} />
    );
  }
  return <>{props.children}</>;
};

export { AuthProtected };