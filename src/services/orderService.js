import axios from "axios";

const API_URL = "http://localhost:8080/orders";

export const placeOrder = async (orderData) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/place`,
        orderData,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const getOrders = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const getOrderById = async (orderId) => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/${orderId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getAllOrdersForAdmin = async () => {
    const token = localStorage.getItem("token");

    const response = await axios.get(
        `${API_URL}/admin/all`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateOrderStatus = async (
    orderId,
    status
) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/admin/${orderId}/status`,
        {},
        {
            params: {
                status
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const cancelOrder = async (orderId) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/cancel/${orderId}`,
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};