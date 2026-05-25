import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateProduct
} from "../services/productService";

import { toast } from "react-toastify";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: "",
        quantity: "",
        imageUrl: ""
    });

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            setProduct(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await updateProduct(id, product);

            toast.success("Product updated successfully");

            navigate("/admin");
        } catch (error) {
            console.log(error);

            toast.error("Failed to update product");
        }
    };

    return (
        <div>
            <h1>Update Product</h1>

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={product.name}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={product.category}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    value={product.quantity}
                    onChange={handleChange}
                />

                <br />
                <br />

                <input
                    type="text"
                    name="imageUrl"
                    placeholder="Image URL"
                    value={product.imageUrl || ""}
                    onChange={handleChange}
                />

                <br />
                <br />

                <button type="submit">
                    Update Product
                </button>
            </form>
        </div>
    );
}

export default UpdateProduct;