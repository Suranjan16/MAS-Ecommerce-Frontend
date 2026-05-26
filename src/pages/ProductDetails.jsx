import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getProductById } from "../services/productService";
import { addProductToCart } from "../services/cartService";

import { toast } from "react-toastify";

function ProductDetails() {
    const { id } = useParams();

    const navigate = useNavigate();

    const [product, setProduct] = useState(null);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);

            setProduct(data);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load product");
        }
    };

    const addToCart = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("To add product to cart, you have to login first");
            navigate("/login");
            return;
        }

        setLoading(true);

        try {
            const response = await addProductToCart(product.id, 1);

            toast.success(response);
        } catch (error) {
            console.log(error);

            toast.error("Add to cart failed");
        } finally {
            setLoading(false);
        }
    };

    if (!product) {
        return (
            <div style={pageStyle}>
                <h2>Loading product...</h2>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <div style={detailsCardStyle}>
                <div style={imageSectionStyle}>
                    <img
                        src={
                            product.imageUrl ||
                            "https://placehold.co/450x450"
                        }
                        alt={product.name}
                        style={productImageStyle}
                        onError={(e) => {
                            e.target.src =
                                "https://placehold.co/450x450";
                        }}
                    />
                </div>

                <div style={infoSectionStyle}>
                    <h1 style={productNameStyle}>
                        {product.name}
                    </h1>

                    <p style={categoryStyle}>
                        Category: {product.category}
                    </p>

                    <h2 style={priceStyle}>
                        ₹{product.price}
                    </h2>

                    <p
                        style={{
                            ...stockStyle,
                            color:
                                product.quantity > 0
                                    ? "#16a34a"
                                    : "#dc2626"
                        }}
                    >
                        {product.quantity > 0
                            ? `In Stock: ${product.quantity}`
                            : "Out of Stock"}
                    </p>

                    <p style={descriptionStyle}>
                        This product is available on MAS. Add it to your cart
                        and complete your order securely.
                    </p>

                    <button
                        onClick={addToCart}
                        disabled={loading || product.quantity <= 0}
                        style={{
                            ...addButtonStyle,
                            opacity:
                                loading || product.quantity <= 0
                                    ? 0.7
                                    : 1,
                            cursor:
                                loading || product.quantity <= 0
                                    ? "not-allowed"
                                    : "pointer"
                        }}
                    >
                        {loading
                            ? "Adding..."
                            : product.quantity <= 0
                                ? "Out of Stock"
                                : "Add to Cart"}
                    </button>

                    <button
                        onClick={() => navigate("/home")}
                        style={backButtonStyle}
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    padding: "100px 30px 30px",
    backgroundColor: "#f9fafb"
};

const detailsCardStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "35px",
    backgroundColor: "white",
    padding: "35px",
    borderRadius: "16px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.12)"
};

const imageSectionStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const productImageStyle = {
    width: "100%",
    maxWidth: "430px",
    height: "430px",
    objectFit: "cover",
    borderRadius: "14px"
};

const infoSectionStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
};

const productNameStyle = {
    marginBottom: "10px",
    color: "#111827"
};

const categoryStyle = {
    color: "#6b7280",
    marginBottom: "15px"
};

const priceStyle = {
    color: "#2563eb",
    marginBottom: "15px"
};

const stockStyle = {
    fontWeight: "bold",
    marginBottom: "20px"
};

const descriptionStyle = {
    color: "#4b5563",
    lineHeight: "1.6",
    marginBottom: "25px"
};

const addButtonStyle = {
    width: "100%",
    padding: "13px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#16a34a",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold"
};

const backButtonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    backgroundColor: "white",
    color: "#374151",
    fontWeight: "bold",
    cursor: "pointer"
};

export default ProductDetails;