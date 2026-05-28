import { useEffect, useState } from "react";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

import { getAdvancedProducts } from "../services/productService";
import { addProductToCart } from "../services/cartService";
import { categoryData } from "../constants/categoryData";

import { toast } from "react-toastify";

function Home() {
    const [products, setProducts] = useState([]);

    const [searchParams] = useSearchParams();
    const searchFromNavbar = searchParams.get("search") || "";

    const [showFilters, setShowFilters] = useState(false);

    const [category, setCategory] = useState("");
    const [section, setSection] = useState("");
    const [subCategory, setSubCategory] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sortOption, setSortOption] = useState("");

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const size = 25;
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, [page, searchFromNavbar]);

    const fetchProducts = async () => {
        try {
            let sort = "id";
            let direction = "asc";

            if (sortOption !== "") {
                [sort, direction] = sortOption.split("-");
            }

            const data = await getAdvancedProducts({
                category,
                section,
                subCategory,
                name: searchFromNavbar,
                minPrice,
                maxPrice,
                page,
                size,
                sort,
                direction
            });

            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load products");
        }
    };

    const handleCategoryChange = (value) => {
        setCategory(value);
        setSection("");
        setSubCategory("");
    };

    const handleSectionChange = (value) => {
        setSection(value);
        setSubCategory("");
    };

    const handleApplyFilters = async () => {
        setPage(0);
        await fetchProducts();
    };

    const handleClearFilters = async () => {
        setCategory("");
        setSection("");
        setSubCategory("");
        setMinPrice("");
        setMaxPrice("");
        setSortOption("");
        setPage(0);

        navigate("/home");

        try {
            const data = await getAdvancedProducts({
                page: 0,
                size
            });

            setProducts(data.content);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load products");
        }
    };

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("Please login first");
            navigate("/login");
            return;
        }

        try {
            const response = await addProductToCart(productId, 1);
            toast.success(response);
        } catch (error) {
            console.log(error);
            toast.error("Failed to add to cart");
        }
    };

    return (
        <div style={pageStyle}>
            <div style={filterHeaderStyle}>
                <button
                    onClick={() => setShowFilters(!showFilters)}
                    style={filterToggleButtonStyle}
                >
                    {showFilters ? "Hide Filters" : "Filter"}
                </button>
            </div>

            {showFilters && (
                <div style={filterPanelStyle}>
                    <select
                        value={category}
                        onChange={(e) =>
                            handleCategoryChange(e.target.value)
                        }
                        style={inputStyle}
                    >
                        <option value="">All Categories</option>

                        {Object.keys(categoryData).map((item) => (
                            <option key={item} value={item}>
                                {item}
                            </option>
                        ))}
                    </select>

                    <select
                        value={section}
                        onChange={(e) =>
                            handleSectionChange(e.target.value)
                        }
                        style={inputStyle}
                        disabled={!category}
                    >
                        <option value="">All Sections</option>

                        {category &&
                            Object.keys(categoryData[category]).map(
                                (item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                )
                            )}
                    </select>

                    <select
                        value={subCategory}
                        onChange={(e) =>
                            setSubCategory(e.target.value)
                        }
                        style={inputStyle}
                        disabled={!section}
                    >
                        <option value="">All Sub Categories</option>

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

                    <input
                        type="number"
                        placeholder="Min Price"
                        value={minPrice}
                        onChange={(e) =>
                            setMinPrice(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <input
                        type="number"
                        placeholder="Max Price"
                        value={maxPrice}
                        onChange={(e) =>
                            setMaxPrice(e.target.value)
                        }
                        style={inputStyle}
                    />

                    <select
                        value={sortOption}
                        onChange={(e) =>
                            setSortOption(e.target.value)
                        }
                        style={inputStyle}
                    >
                        <option value="">Default Sorting</option>
                        <option value="price-asc">Price Low to High</option>
                        <option value="price-desc">Price High to Low</option>
                        <option value="name-asc">Name A-Z</option>
                        <option value="name-desc">Name Z-A</option>
                    </select>

                    <button
                        onClick={handleApplyFilters}
                        style={buttonStyle}
                    >
                        Apply Filter
                    </button>

                    <button
                        onClick={handleClearFilters}
                        style={{
                            ...buttonStyle,
                            backgroundColor: "#6b7280"
                        }}
                    >
                        Clear
                    </button>
                </div>
            )}

            <div style={productsGridStyle}>
                {products.map((product) => (
                    <div key={product.id} style={productCardStyle}>
                        <img
                            src={
                                product.imageUrl ||
                                "https://placehold.co/300x300"
                            }
                            alt={product.name}
                            style={imageStyle}
                            onClick={() =>
                                navigate(`/product/${product.id}`)
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
                                    navigate(`/product/${product.id}`)
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
                                    handleAddToCart(product.id)
                                }
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div style={paginationStyle}>
                <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                    style={{
                        ...buttonStyle,
                        opacity: page === 0 ? 0.6 : 1,
                        cursor:
                            page === 0
                                ? "not-allowed"
                                : "pointer"
                    }}
                >
                    Previous
                </button>

                <span>
                    Page {totalPages === 0 ? 0 : page + 1} of {totalPages}
                </span>

                <button
                    disabled={page >= totalPages - 1}
                    onClick={() => setPage(page + 1)}
                    style={{
                        ...buttonStyle,
                        opacity:
                            page >= totalPages - 1
                                ? 0.6
                                : 1,
                        cursor:
                            page >= totalPages - 1
                                ? "not-allowed"
                                : "pointer"
                    }}
                >
                    Next
                </button>
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

const filterHeaderStyle = {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "15px"
};

const filterToggleButtonStyle = {
    padding: "10px 18px",
    border: "none",
    backgroundColor: "#111827",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold"
};

const filterPanelStyle = {
    display: "flex",
    gap: "12px",
    alignItems: "center",
    flexWrap: "wrap",
    marginBottom: "25px",
    padding: "15px",
    backgroundColor: "#f3f4f6",
    borderRadius: "10px"
};

const inputStyle = {
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "6px"
};

const buttonStyle = {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
};

const productsGridStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(5, 220px)",
    justifyContent: "center",
    gap: "25px"
};

const productCardStyle = {
    backgroundColor: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
};

const imageStyle = {
    width: "220px",
    height: "240px",
    objectFit: "contain",
    backgroundColor: "#f3f4f6",
    cursor: "pointer",
    padding: "10px"
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

const paginationStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    marginTop: "30px"
};

export default Home;