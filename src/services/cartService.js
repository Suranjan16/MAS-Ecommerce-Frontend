import axios from "axios";

const API_URL = "http://localhost:8080/cart";

export const addProductToCart = async (productId, quantity = 1) => {
  const token = localStorage.getItem("token");

  console.log("Token from localStorage:", token);

  const response = await axios.post(
    `${API_URL}/add`,
    {
      productId: productId,
      quantity: quantity,
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