import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const getAllProducts = async () => {

    const response = await axios.get(API_URL);

    return response.data;
};

export const addProduct = async (product) => {

    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        product,
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};