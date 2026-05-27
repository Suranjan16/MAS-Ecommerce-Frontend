import axios from "axios";

const API_URL = "http://localhost:8080/products";

export const getAllProducts = async () => {
    const response = await axios.get(API_URL);

    return response.data;
};

export const getProductById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);

    return response.data;
};

export const addProduct = async (product) => {
    const token = localStorage.getItem("token");

    const response = await axios.post(
        API_URL,
        product,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateProduct = async (id, product) => {
    const token = localStorage.getItem("token");

    const response = await axios.put(
        `${API_URL}/${id}`,
        product,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteProduct = async (id) => {
    const token = localStorage.getItem("token");

    const response = await axios.delete(
        `${API_URL}/${id}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const getAdvancedProducts = async ({
    category = "",
    section = "",
    subCategory = "",
    name = "",
    minPrice = "",
    maxPrice = "",
    page = 0,
    size = 25,
    sort = "id",
    direction = "asc"
}) => {
    const response = await axios.get(
        `${API_URL}/advanced`,
        {
            params: {
                category: category || null,
                section: section || null,
                subCategory: subCategory || null,
                name: name || null,
                minPrice: minPrice || null,
                maxPrice: maxPrice || null,
                page,
                size,
                sort,
                direction
            }
        }
    );

    return response.data;
};