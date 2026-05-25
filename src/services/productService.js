import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductById = async (productId) => {
    const response = await axios.get(`${API_URL}/${productId}`);
    return response.data;
};

export const addProduct = async (product) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(API_URL, product, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

export const updateProduct = async (productId, product) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${productId}`,
        product,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const deleteProduct = async (productId) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(`${API_URL}/${productId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};