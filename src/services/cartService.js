import axios from "axios";

const API_URL = "http://localhost:8080/cart";

export const addProductToCart = async (
  productId,
  quantity = 1
) => {

  const token = localStorage.getItem("token");

  const response = await axios.post(
    `${API_URL}/add`,
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
    API_URL,
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
    `${API_URL}/remove/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

export const updateCartQuantity = async (productId, quantity) => {
  const token = localStorage.getItem("token");

  const response = await axios.put(
    `${API_URL}/update/${productId}?quantity=${quantity}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};