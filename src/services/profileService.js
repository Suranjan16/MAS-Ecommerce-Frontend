import axios from "axios";

const API_URL = "http://localhost:8080/profile";

export const getProfile = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const updateProfile = async (profile) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        API_URL,
        profile,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};