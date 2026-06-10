import axios from "axios";

import API_URL from "../config/api";

const PRODUCT_URL = `${API_URL}/products`;

export const getAllProducts = async () => {

    const response = await axios.get(
        PRODUCT_URL
    );

    return response.data;
};

export const getProductById = async (
    id
) => {

    const response = await axios.get(
        `${PRODUCT_URL}/${id}`
    );

    return response.data;
};

export const addProduct = async (
    product
) => {

    const token =
        localStorage.getItem("token");

    const response = await axios.post(
        PRODUCT_URL,
        product,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const updateProduct = async (
    id,
    product
) => {

    const token =
        localStorage.getItem("token");

    const response = await axios.put(
        `${PRODUCT_URL}/${id}`,
        product,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
            }
        }
    );

    return response.data;
};

export const deleteProduct = async (
    id
) => {

    const token =
        localStorage.getItem("token");

    const response = await axios.delete(
        `${PRODUCT_URL}/${id}`,
        {
            headers: {
                Authorization:
                    `Bearer ${token}`
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
        `${PRODUCT_URL}/advanced`,
        {
            params: {
                category:
                    category || null,
                section:
                    section || null,
                subCategory:
                    subCategory || null,
                name:
                    name || null,
                minPrice:
                    minPrice || null,
                maxPrice:
                    maxPrice || null,
                page,
                size,
                sort,
                direction
            }
        }
    );

    return response.data;
};