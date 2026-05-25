import axios from "axios";

const API_URL = "http://localhost:8080/payment";

export const createPayment = async (orderId) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/create/${orderId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export const verifyPayment = async (
    orderId,
    razorpayPaymentId,
    razorpayOrderId,
    razorpaySignature
) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/verify`,
        {
            orderId,
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};