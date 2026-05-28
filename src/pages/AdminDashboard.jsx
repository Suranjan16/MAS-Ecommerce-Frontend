import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllProducts, deleteProduct } from "../services/productService";

import { toast } from "react-toastify";

function AdminDashboard() {

    const [products, setProducts] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getAllProducts();

            setProducts(data);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load products");
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) {
            return;
        }

        try {
            await deleteProduct(id);

            toast.success("Product deleted successfully");

            fetchProducts();
        } catch (error) {
            console.log(error);

            toast.error("Failed to delete product");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={headerStyle}>
                <div>
                    <h1 style={titleStyle}>
                        Admin Dashboard
                    </h1>

                    <p style={subtitleStyle}>
                        Manage products and orders
                    </p>
                </div>

                <div style={headerButtonsStyle}>
                    <button
                        style={ordersButtonStyle}
                        onClick={() =>
                            navigate("/admin/orders")
                        }
                    >
                        Manage Orders
                    </button>

                    <button
                        style={addButtonStyle}
                        onClick={() =>
                            navigate("/admin/add-product")
                        }
                    >
                        Add Product
                    </button>
                </div>
            </div>

            <div style={productsGridStyle}>
                {products.map((product) => (
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
                            onError={(e) => {
                                e.target.src =
                                    "https://placehold.co/300x300";
                            }}
                        />

                        <div style={productInfoStyle}>
                            <h3 style={productNameStyle}>
                                {product.name}
                            </h3>

                            <p style={categoryStyle}>
                                {product.category} /{" "}
                                {product.section} /{" "}
                                {product.subCategory}
                            </p>

                            <p style={priceStyle}>
                                ₹{product.price}
                            </p>

                            <p style={stockStyle}>
                                Stock:{" "}
                                {product.quantity}
                            </p>

                            <div style={buttonContainerStyle}>
                                <button
                                    style={
                                        updateButtonStyle
                                    }
                                    onClick={() =>
                                        navigate(
                                            `/admin/update-product/${product.id}`
                                        )
                                    }
                                >
                                    Update
                                </button>

                                <button
                                    style={
                                        deleteButtonStyle
                                    }
                                    onClick={() =>
                                        handleDelete(
                                            product.id
                                        )
                                    }
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px",
    minHeight: "100vh",
    backgroundColor: "#f9fafb"
};

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
};

const titleStyle = {
    margin: 0,
    color: "#111827"
};

const subtitleStyle = {
    color: "#6b7280",
    marginTop: "5px"
};

const headerButtonsStyle = {
    display: "flex",
    gap: "12px"
};

const addButtonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

const ordersButtonStyle = {
    padding: "12px 18px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#111827",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

const productsGridStyle = {
    display: "grid",
    gridTemplateColumns:
        "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "25px"
};

const productCardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const imageStyle = {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    backgroundColor: "#f3f4f6",
    padding: "10px"
};

const productInfoStyle = {
    padding: "18px"
};

const productNameStyle = {
    margin: 0,
    marginBottom: "10px",
    color: "#111827"
};

const categoryStyle = {
    color: "#6b7280",
    marginBottom: "10px",
    fontSize: "14px"
};

const priceStyle = {
    color: "#2563eb",
    fontWeight: "bold",
    fontSize: "20px",
    marginBottom: "10px"
};

const stockStyle = {
    color: "#374151",
    marginBottom: "18px"
};

const buttonContainerStyle = {
    display: "flex",
    gap: "10px"
};

const updateButtonStyle = {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

const deleteButtonStyle = {
    flex: 1,
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#dc2626",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

export default AdminDashboard;