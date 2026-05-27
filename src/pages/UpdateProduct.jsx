import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getProductById,
    updateProduct
} from "../services/productService";

import { categoryData } from "../constants/categoryData";

import { toast } from "react-toastify";

function UpdateProduct() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        name: "",
        category: "",
        subCategory: "",
        price: "",
        quantity: "",
        imageUrl: ""
    });

    const [section, setSection] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProduct();
    }, []);

    const findSectionBySubCategory = (category, subCategory) => {
        if (!category || !subCategory || !categoryData[category]) {
            return "";
        }

        for (const sectionName of Object.keys(categoryData[category])) {
            if (categoryData[category][sectionName].includes(subCategory)) {
                return sectionName;
            }
        }

        return "";
    };

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);

            setProduct({
                name: data.name || "",
                category: data.category || "",
                subCategory: data.subCategory || "",
                price: data.price || "",
                quantity: data.quantity || "",
                imageUrl: data.imageUrl || ""
            });

            setSection(
                findSectionBySubCategory(
                    data.category,
                    data.subCategory
                )
            );
        } catch (error) {
            console.log(error);
            toast.error("Failed to load product");
        }
    };

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
    };

    const handleCategoryChange = (value) => {
        setProduct({
            ...product,
            category: value,
            subCategory: ""
        });

        setSection("");
    };

    const handleSectionChange = (value) => {
        setSection(value);

        setProduct({
            ...product,
            subCategory: ""
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            await updateProduct(id, {
                ...product,
                section
            });

            toast.success("Product updated successfully");

            navigate("/admin");
        } catch (error) {
            console.log(error);
            toast.error("Failed to update product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>Update Product</h1>

                <p style={subtitleStyle}>
                    Modify product details, stock, price and image
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>Product Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter product name"
                            value={product.name}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Category</label>
                        <select
                            name="category"
                            value={product.category}
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
                            disabled={!product.category}
                        >
                            <option value="">Select Section</option>

                            {product.category &&
                                Object.keys(
                                    categoryData[product.category]
                                ).map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                        </select>
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Sub Category</label>
                        <select
                            name="subCategory"
                            value={product.subCategory}
                            onChange={handleChange}
                            style={inputStyle}
                            required
                            disabled={!section}
                        >
                            <option value="">Select Sub Category</option>

                            {product.category &&
                                section &&
                                categoryData[product.category][section].map(
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
                                name="price"
                                placeholder="Price"
                                value={product.price}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>

                        <div style={fieldStyle}>
                            <label style={labelStyle}>Quantity</label>
                            <input
                                type="number"
                                name="quantity"
                                placeholder="Quantity"
                                value={product.quantity}
                                onChange={handleChange}
                                style={inputStyle}
                                required
                            />
                        </div>
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>Image URL</label>
                        <input
                            type="text"
                            name="imageUrl"
                            placeholder="Paste product image URL"
                            value={product.imageUrl}
                            onChange={handleChange}
                            style={inputStyle}
                        />
                    </div>

                    {product.imageUrl && (
                        <div style={previewBoxStyle}>
                            <p style={previewTextStyle}>Image Preview</p>

                            <img
                                src={product.imageUrl}
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
                        {loading
                            ? "Updating Product..."
                            : "Update Product"}
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

export default UpdateProduct;