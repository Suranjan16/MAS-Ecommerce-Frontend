import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { addProduct } from "../services/productService";

function AddProduct() {

    const [name, setName] = useState("");

    const [category, setCategory] = useState("");

    const [price, setPrice] = useState("");

    const [quantity, setQuantity] = useState("");

    const [imageUrl, setImageUrl] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const product = {
                name,
                category,
                price,
                quantity,
                imageUrl
            };

            await addProduct(product);

            alert("Product added successfully");

            navigate("/admin");

        } catch (error) {

            console.log(error);

            alert("Failed to add product");
        }
    };

    return (
        <div>

            <h1>Add Product</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    placeholder="Product Name"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Category"
                    value={category}
                    onChange={(e) =>
                        setCategory(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) =>
                        setPrice(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) =>
                        setQuantity(e.target.value)
                    }
                />

                <br />
                <br />

                <input
                    type="text"
                    placeholder="Image URL"
                    value={imageUrl}
                    onChange={(e) =>
                        setImageUrl(e.target.value)
                    }
                />

                <br />
                <br />

                <button type="submit">
                    Add Product
                </button>

            </form>

        </div>
    );
}

export default AddProduct;