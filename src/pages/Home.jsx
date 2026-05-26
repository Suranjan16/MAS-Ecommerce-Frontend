import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAllProducts } from "../services/productService";

import { addProductToCart } from "../services/cartService";

import { toast } from "react-toastify";

function Home() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {

        try {

            const data =
                await getAllProducts();

            setProducts(data);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to load products"
            );
        }
    };

    const handleAddToCart = async (
        productId
    ) => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            toast.error(
                "Please login first"
            );

            navigate("/login");

            return;
        }

        try {

            const response =
                await addProductToCart(
                    productId,
                    1
                );

            toast.success(response);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to add to cart"
            );
        }
    };

    return (
        <div style={pageStyle}>

            <h1 style={titleStyle}>
                Explore Products
            </h1>

            <div style={productsGridStyle}>

                {
                    products.map(
                        (product) => (

                            <div
                                key={product.id}
                                style={productCardStyle}
                            >

                                <img
                                    src={
                                        product.imageUrl ||
                                        "https://placehold.co/300x300"
                                    }
                                    alt={product.name}
                                    style={imageStyle}
                                    onClick={() =>
                                        navigate(
                                            `/product/${product.id}`
                                        )
                                    }
                                    onError={(e) => {
                                        e.target.src =
                                            "https://placehold.co/300x300";
                                    }}
                                />

                                <div style={productInfoStyle}>

                                    <h3
                                        style={productNameStyle}
                                        onClick={() =>
                                            navigate(
                                                `/product/${product.id}`
                                            )
                                        }
                                    >
                                        {product.name}
                                    </h3>

                                    <p style={priceStyle}>
                                        ₹{product.price}
                                    </p>

                                    <button
                                        style={buttonStyle}
                                        onClick={() =>
                                            handleAddToCart(
                                                product.id
                                            )
                                        }
                                    >
                                        Add to Cart
                                    </button>

                                </div>

                            </div>
                        )
                    )
                }

            </div>

        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
};

const titleStyle = {
    marginBottom: "25px",
    color: "#111827"
};

const productsGridStyle = {
    display: "grid",
    gridTemplateColumns:
        "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "25px"
};

const productCardStyle = {
    backgroundColor: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)",
    transition: "0.3s"
};

const imageStyle = {
    width: "100%",
    height: "240px",
    objectFit: "cover",
    cursor: "pointer"
};

const productInfoStyle = {
    padding: "18px"
};

const productNameStyle = {
    marginBottom: "10px",
    color: "#111827",
    cursor: "pointer"
};

const priceStyle = {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#2563eb",
    marginBottom: "15px"
};

const buttonStyle = {
    width: "100%",
    padding: "11px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#16a34a",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

export default Home;