import axios from "axios";

import API_URL from "../config/api";

const CART_URL = `${API_URL}/cart`;

export const addProductToCart = async (productId,quantity = 1) => {

        const token = localStorage.getItem("token");

        const response = await axios.post(
        `${CART_URL}/add`,
        {
        productId,
        quantity,
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

export const getCart = async () => {

const token = localStorage.getItem("token");

const response = await axios.get(
CART_URL,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

export const removeProductFromCart = async (productId) => {

const token = localStorage.getItem("token");

const response = await axios.delete(
`${CART_URL}/remove/${productId}`,
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};

export const updateCartQuantity = async (
productId,
quantity
) => {

const token = localStorage.getItem("token");

const response = await axios.put(
`${CART_URL}/update/${productId}?quantity=${quantity}`,
{},
{
headers: {
Authorization: `Bearer ${token}`,
},
}
);

return response.data;
};
