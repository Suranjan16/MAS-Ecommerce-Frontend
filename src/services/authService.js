import axios from "axios";
import API_URL from "../config/api";

const AUTH_URL = `${API_URL}/auth`;

export const loginUser = async (
email,
password
) => {

    const response =
        await axios.post(
            `${AUTH_URL}/login`,
            {
                email,
                password
            }
        );

    return response.data;

    };

export const registerUser = async (
user
) => {

    const response =
        await axios.post(
            `${AUTH_URL}/signup`,
            user
        );

    return response.data;

    };

export const forgotPassword = async (email) => {

    const response =
        await axios.post(
            `${AUTH_URL}/forgot-password`,
            { email }
        );

    return response.data;

    };

export const resetPassword = async (
token,
newPassword
) => {


    const response =
        await axios.post(
            `${AUTH_URL}/reset-password`,
            {
                token,
                newPassword
            }
        );

    return response.data;

    };
