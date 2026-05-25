import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const getProductsWithPagination = async (
    page,
    size,
    sort = "id",
    direction = "asc"
) => {
    const response = await axios.get(
        `${API_URL}/page?page=${page}&size=${size}&sort=${sort}&direction=${direction}`
    );

    return response.data;
};

export const searchProductsByName = async (name) => {
    const response = await axios.get(
        `${API_URL}/search/${encodeURIComponent(name)}`
    );

    return response.data;
};

export const getProductsByCategory = async (category) => {
    const response = await axios.get(
        `${API_URL}/category/${encodeURIComponent(category)}`
    );

    return response.data;
};

export const getProductsByPriceRange = async (
    minPrice,
    maxPrice
) => {
    const response = await axios.get(
        `${API_URL}/filter?minPrice=${minPrice}&maxPrice=${maxPrice}`
    );

    return response.data;
};

export const getProductsWithSorting = async (
    sort,
    direction
) => {
    const response = await axios.get(
        `${API_URL}/page?page=0&size=100&sort=${sort}&direction=${direction}`
    );

    return response.data.content;
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