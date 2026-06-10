import axios from "axios";

import API_URL from "../config/api";

const PROFILE_URL = `${API_URL}/profile`;

export const getProfile = async () => {

    const token =
        localStorage.getItem("token");

    const response = await axios.get(
        PROFILE_URL,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateProfile = async (
    profile
) => {

    const token =
        localStorage.getItem("token");

    const response = await axios.put(
        PROFILE_URL,
        profile,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`,
                "Content-Type":
                    "application/json"
            }
        }
    );

    return response.data;
};