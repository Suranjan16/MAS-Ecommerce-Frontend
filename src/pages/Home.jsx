import { useEffect, useState } from "react";

import {
    getAllProducts,
    searchProductsByName
} from "../services/productService";

import { addProductToCart } from "../services/cartService";

function Home() {
    const [products, setProducts] = useState([]);

    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {
            if (searchName.trim() === "") {
                fetchProducts();
                return;
            }

            const data = await searchProductsByName(searchName);

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (productId) => {
        try {
            const response = await addProductToCart(productId, 1);

            alert(response);
        } catch (error) {
            console.log("Add to cart error:", error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);

            alert("Add to cart failed");
        }
    };

    return (
        <div>
            <h1>MAS Ecommerce</h1>

            <h2>Products</h2>

            <input
                type="text"
                placeholder="Search product by name"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
            />

            <button onClick={handleSearch}>
                Search
            </button>

            <button
                onClick={() => {
                    setSearchName("");
                    fetchProducts();
                }}
            >
                Clear
            </button>

            <hr />

            {products.map((product) => (
                <div key={product.id}>
                    <img
                        src={
                            product.imageUrl ||
                            "https://placehold.co/200x200"
                        }
                        alt={product.name}
                        width="200"
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/200x200";
                        }}
                    />

                    <h3>{product.name}</h3>

                    <p>Category: {product.category}</p>

                    <p>Price: ₹{product.price}</p>

                    <p>Stock: {product.quantity}</p>

                    <button
                        onClick={() =>
                            addToCart(product.id)
                        }
                    >
                        Add to Cart
                    </button>

                    <hr />
                </div>
            ))}
        </div>
    );
}

export default Home;