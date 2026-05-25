import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllProducts,
    deleteProduct
} from "../services/productService";

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
        }
    };

    const handleDelete = async (productId) => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmDelete) return;

        try {
            const response = await deleteProduct(productId);
            alert(response);
            fetchProducts();
        } catch (error) {
            console.log(error);
            alert("This product cannot be deleted because it is linked to cart or orders");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={headerStyle}>
                <div>
                    <h1 style={titleStyle}>Admin Dashboard</h1>
                    <p style={subtitleStyle}>
                        Manage products, stock, pricing and images
                    </p>
                </div>

                <button
                    onClick={() => navigate("/admin/add-product")}
                    style={addButtonStyle}
                >
                    + Add Product
                </button>
            </div>

            <div style={tableContainerStyle}>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            <th style={thStyle}>Image</th>
                            <th style={thStyle}>Product</th>
                            <th style={thStyle}>Category</th>
                            <th style={thStyle}>Price</th>
                            <th style={thStyle}>Stock</th>
                            <th style={thStyle}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td style={tdStyle}>
                                    <img
                                        src={
                                            product.imageUrl ||
                                            "https://placehold.co/80x80"
                                        }
                                        alt={product.name}
                                        style={imageStyle}
                                        onError={(e) => {
                                            e.target.src =
                                                "https://placehold.co/80x80";
                                        }}
                                    />
                                </td>

                                <td style={tdStyle}>
                                    <strong>{product.name}</strong>
                                </td>

                                <td style={tdStyle}>
                                    {product.category}
                                </td>

                                <td style={tdStyle}>
                                    ₹{product.price}
                                </td>

                                <td style={tdStyle}>
                                    <span
                                        style={{
                                            ...stockBadgeStyle,
                                            backgroundColor:
                                                product.quantity > 0
                                                    ? "#dcfce7"
                                                    : "#fee2e2",
                                            color:
                                                product.quantity > 0
                                                    ? "#166534"
                                                    : "#991b1b"
                                        }}
                                    >
                                        {product.quantity}
                                    </span>
                                </td>

                                <td style={tdStyle}>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/admin/update-product/${product.id}`
                                            )
                                        }
                                        style={editButtonStyle}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleDelete(product.id)
                                        }
                                        style={deleteButtonStyle}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

const headerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
};

const titleStyle = {
    margin: 0,
    color: "#111827"
};

const subtitleStyle = {
    color: "#6b7280",
    marginTop: "6px"
};

const addButtonStyle = {
    padding: "12px 18px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

const tableContainerStyle = {
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    overflow: "hidden"
};

const tableStyle = {
    width: "100%",
    borderCollapse: "collapse"
};

const thStyle = {
    textAlign: "left",
    padding: "15px",
    backgroundColor: "#111827",
    color: "white"
};

const tdStyle = {
    padding: "15px",
    borderBottom: "1px solid #e5e7eb",
    verticalAlign: "middle"
};

const imageStyle = {
    width: "70px",
    height: "70px",
    objectFit: "cover",
    borderRadius: "8px"
};

const stockBadgeStyle = {
    padding: "6px 12px",
    borderRadius: "20px",
    fontWeight: "bold"
};

const editButtonStyle = {
    padding: "8px 12px",
    marginRight: "8px",
    border: "none",
    backgroundColor: "#f59e0b",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

const deleteButtonStyle = {
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

export default AdminDashboard;