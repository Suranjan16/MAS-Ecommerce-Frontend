import axios from "axios";

import API_URL from "../config/api";

const PAYMENT_URL = `${API_URL}/payment`;

export const createPayment = async (orderId) => {

    const token =
        localStorage.getItem("token");

    const response = await axios.post(
        `${PAYMENT_URL}/create/${orderId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const verifyPayment = async (
    paymentData
) => {

    const token =
        localStorage.getItem("token");

    const response = await axios.post(
        `${PAYMENT_URL}/verify`,
        paymentData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type":
                    "application/json"
            }
        }
    );

    return response.data;
};