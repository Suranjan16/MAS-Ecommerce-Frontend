import axios from "axios";

const API_URL = "http://localhost:8080/orders";

export const placeOrder = async (paymentMethod) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        `${API_URL}/place`,
        {
            paymentMethod
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