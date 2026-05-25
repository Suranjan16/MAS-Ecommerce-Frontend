import { useEffect, useState } from "react";

import {
    getAllProducts,
    searchProductsByName,
    getProductsByCategory,
    getProductsByPriceRange
} from "../services/productService";

import { addProductToCart } from "../services/cartService";

function Home() {
    const [products, setProducts] = useState([]);

    const [searchName, setSearchName] = useState("");

    const [category, setCategory] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

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

    const handleCategoryFilter = async (value) => {
        setCategory(value);

        try {
            if (value === "") {
                fetchProducts();
                return;
            }

            const data = await getProductsByCategory(value);

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handlePriceFilter = async () => {
        try {
            if (minPrice === "" || maxPrice === "") {
                alert("Please enter both minimum and maximum price");
                return;
            }

            const data = await getProductsByPriceRange(
                minPrice,
                maxPrice
            );

            setProducts(data);
        } catch (error) {
            console.log(error);
        }
    };

    const addToCart = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            alert("To add product to cart, you have to login first");
            return;
        }

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
                    setCategory("");
                    setMinPrice("");
                    setMaxPrice("");
                    fetchProducts();
                }}
            >
                Clear
            </button>

            <br />
            <br />

            <select
                value={category}
                onChange={(e) =>
                    handleCategoryFilter(e.target.value)
                }
            >
                <option value="">All Categories</option>
                <option value="Mobile">Mobile</option>
                <option value="Laptop">Laptop</option>
                <option value="Electronics">Electronics</option>
                <option value="Fashion">Fashion</option>
            </select>

            <br />
            <br />

            <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) =>
                    setMinPrice(e.target.value)
                }
            />

            <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) =>
                    setMaxPrice(e.target.value)
                }
            />

            <button onClick={handlePriceFilter}>
                Filter Price
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