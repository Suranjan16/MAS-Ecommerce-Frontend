import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addProduct } from "../services/productService";
import { categoryData } from "../constants/categoryData";

import { toast } from "react-toastify";

function AddProduct() {
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [section, setSection] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleCategoryChange = (value) => {
        setCategory(value);
        setSection("");
        setSubCategory("");
    };

    const handleSectionChange = (value) => {
        setSection(value);
        setSubCategory("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            const product = {
                name,
                category,
                section,
                subCategory,
                price,
                quantity,
                imageUrl
            };
            await addProduct(product);

            toast.success("Product added successfully");

            navigate("/admin");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>Add Product</h1>

                <p style={subtitleStyle}>
                    Add a new product to your store
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Product Name</label>
                        <input
                            type="text"
                            placeholder="Enter product name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Category</label>
                        <select
                            value={category}
                            onChange={(e) =>
                                handleCategoryChange(e.target.value)
                            }
                            style={inputStyle}
                            required
                        >
                            <option value="">Select Category</option>

                            {Object.keys(categoryData).map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Section</label>
                        <select
                            value={section}
                            onChange={(e) =>
                                handleSectionChange(e.target.value)
                            }
                            style={inputStyle}
                            required
                            disabled={!category}
                        >
                            <option value="">Select Section</option>

                            {category &&
                                Object.keys(categoryData[category]).map(
                                    (item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    )
                                )}
                        </select>
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Sub Category</label>
                        <select
                            value={subCategory}
                            onChange={(e) =>
                                setSubCategory(e.target.value)
                            }
                            style={inputStyle}
                            required
                            disabled={!section}
                        >
                            <option value="">Select Sub Category</option>

                            {category &&
                                section &&
                                categoryData[category][section].map(
                                    (item) => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    )
                                )}
                        </select>
                    </div>

                    <div style={rowStyle}>
                        <div style={fieldStyle}>
                            <label style={labelStyle}>Price</label>
                            <input
                                type="number"
                                placeholder="Price"
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value)
                                }
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Quantity</label>
                            <input
                                type="number"
                                placeholder="Quantity"
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(e.target.value)
                                }
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Image URL</label>
                        <input
                            type="text"
                            placeholder="Paste product image URL"
                            value={imageUrl}
                            onChange={(e) =>
                                setImageUrl(e.target.value)
                            }
                            style={inputStyle}
                        />
                    </div>

                    {imageUrl && (
                        <div style={previewBoxStyle}>
                            <p style={previewTextStyle}>
                                Image Preview
                            </p>

                            <img
                                src={imageUrl}
                                alt="Product preview"
                                style={previewImageStyle}
                                onError={(e) => {
                                    e.target.src =
                                        "https://placehold.co/200x200";
                                }}
                            />
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate("/admin")}
                        style={backButtonStyle}
                    >
                        Back to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px",
    minHeight: "100vh",
    backgroundColor: "#f9fafb",
    display: "flex",
    justifyContent: "center"
};

const cardStyle = {
    width: "520px",
    padding: "30px",
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.12)"
};

const titleStyle = {
    margin: 0,
    color: "#111827",
    textAlign: "center"
};

const subtitleStyle = {
    color: "#6b7280",
    textAlign: "center",
    marginBottom: "25px"
};

const fieldStyle = {
    width: "100%",
    marginBottom: "18px"
};

const rowStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px"
};

const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#374151"
};

const inputStyle = {
    width: "100%",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "15px",
    boxSizing: "border-box"
};

const previewBoxStyle = {
    marginBottom: "18px",
    padding: "15px",
    backgroundColor: "#f3f4f6",
    borderRadius: "10px",
    textAlign: "center"
};

const previewTextStyle = {
    marginTop: 0,
    color: "#374151",
    fontWeight: "600"
};

const previewImageStyle = {
    width: "180px",
    height: "180px",
    objectFit: "cover",
    borderRadius: "10px"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold"
};

const backButtonStyle = {
    width: "100%",
    padding: "11px",
    marginTop: "12px",
    border: "1px solid #d1d5db",
    backgroundColor: "white",
    color: "#374151",
    borderRadius: "8px",
    cursor: "pointer"
};

export default AddProduct;