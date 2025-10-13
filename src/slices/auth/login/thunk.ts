import { login } from "../../../helpers/helper";
import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';
import { logOut as onLogOut } from "../../../helpers/helper";

export const loginUser = (user: any, history: any) => async (dispatch: any) => {
    try {
        let response;
        response = login({
            username: user.email,
            password: user.password,
        });

        let data = await response;
        if (data) {
            localStorage.setItem("authAdmin", JSON.stringify(data));
            dispatch(loginSuccess(data));
            history("/dashboard");
            console.log(data);
        }
    } catch (error) {
        dispatch(apiError(error));
    }
};

export const logoutUser = () => async (dispatch: any) => {
    try {
        await onLogOut();
        localStorage.removeItem("authAdmin");
        dispatch(logoutUserSuccess(true));

    } catch (error) {
        dispatch(apiError(error));
    }
};

export const resetLoginFlag = () => async (dispatch: any) => {
    try {
        const response = dispatch(reset_login_flag());
        return response;

    } catch (error) {
        dispatch(apiError(error));
    }
};