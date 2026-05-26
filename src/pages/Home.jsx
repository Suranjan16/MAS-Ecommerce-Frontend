import { useEffect, useState } from "react";

import { getAdvancedProducts }
from "../services/productService";

import { addProductToCart }
from "../services/cartService";

function Home() {

    const [products, setProducts] =
        useState([]);

    const [searchName, setSearchName] =
        useState("");

    const [category, setCategory] =
        useState("");

    const [minPrice, setMinPrice] =
        useState("");

    const [maxPrice, setMaxPrice] =
        useState("");

    const [sortOption, setSortOption] =
        useState("");

    const [page, setPage] =
        useState(0);

    const [totalPages, setTotalPages] =
        useState(0);

    const size = 25;

    useEffect(() => {
        fetchProducts();
    }, [
        page,
        category,
        sortOption
    ]);

    const fetchProducts = async () => {

        try {

            let sort = "id";

            let direction = "asc";

            if (sortOption !== "") {

                [sort, direction] =
                    sortOption.split("-");
            }

            const data =
                await getAdvancedProducts({
                    category,
                    name: searchName,
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
        }
    };

    const handleSearch = async () => {

        setPage(0);

        await fetchProducts();
    };

    const handleCategoryFilter = (
        value
    ) => {

        setCategory(value);

        setPage(0);
    };

    const handlePriceFilter =
        async () => {

        if (
            minPrice === ""
            || maxPrice === ""
        ) {

            alert(
                "Please enter both minimum and maximum price"
            );

            return;
        }

        setPage(0);

        await fetchProducts();
    };

    const handleSort = (value) => {

        setSortOption(value);

        setPage(0);
    };

    const handleClear = async () => {

        setSearchName("");

        setCategory("");

        setMinPrice("");

        setMaxPrice("");

        setSortOption("");

        setPage(0);

        const data =
            await getAdvancedProducts({
                page: 0,
                size
            });

        setProducts(data.content);

        setTotalPages(data.totalPages);
    };

    const addToCart = async (
        productId
    ) => {

        const token =
            localStorage.getItem("token");

        if (!token) {

            alert(
                "To add product to cart, you have to login first"
            );

            return;
        }

        try {

            const response =
                await addProductToCart(
                    productId,
                    1
                );

            alert(response);

        } catch (error) {

            console.log(error);

            alert(
                "Add to cart failed"
            );
        }
    };

    return (
        <div
            style={{
                padding: "20px",
                paddingTop: "90px"
            }}
        >

            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "center",
                    flexWrap: "wrap",
                    marginBottom: "25px",
                    padding: "15px",
                    backgroundColor: "#f3f4f6",
                    borderRadius: "10px"
                }}
            >

                <input
                    type="text"
                    placeholder="Search product"
                    value={searchName}
                    onChange={(e) =>
                        setSearchName(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                />

                <button
                    onClick={handleSearch}
                    style={buttonStyle}
                >
                    Search
                </button>

                <select
                    value={category}
                    onChange={(e) =>
                        handleCategoryFilter(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                >
                    <option value="">
                        All Categories
                    </option>

                    <option value="Mobile">
                        Mobile
                    </option>

                    <option value="Laptop">
                        Laptop
                    </option>

                    <option value="Electronics">
                        Electronics
                    </option>

                    <option value="Fashion">
                        Fashion
                    </option>

                </select>

                <input
                    type="number"
                    placeholder="Min Price"
                    value={minPrice}
                    onChange={(e) =>
                        setMinPrice(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                />

                <input
                    type="number"
                    placeholder="Max Price"
                    value={maxPrice}
                    onChange={(e) =>
                        setMaxPrice(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                />

                <button
                    onClick={handlePriceFilter}
                    style={buttonStyle}
                >
                    Filter
                </button>

                <select
                    value={sortOption}
                    onChange={(e) =>
                        handleSort(
                            e.target.value
                        )
                    }
                    style={inputStyle}
                >
                    <option value="">
                        Default Sorting
                    </option>

                    <option value="price-asc">
                        Price Low to High
                    </option>

                    <option value="price-desc">
                        Price High to Low
                    </option>

                    <option value="name-asc">
                        Name A-Z
                    </option>

                    <option value="name-desc">
                        Name Z-A
                    </option>

                </select>

                <button
                    onClick={handleClear}
                    style={{
                        ...buttonStyle,
                        backgroundColor: "#6b7280"
                    }}
                >
                    Clear
                </button>

            </div>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(5, 1fr)",
                    gap: "20px"
                }}
            >

                {
                    products.map(
                        (product) => (

                        <div
                            key={product.id}
                            style={{
                                border:
                                    "1px solid #ccc",
                                padding: "10px",
                                textAlign: "center",
                                minHeight: "380px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                boxShadow:
                                    "0 2px 8px rgba(0,0,0,0.1)"
                            }}
                        >

                            <img
                                src={
                                    product.imageUrl
                                    || "https://placehold.co/200x200"
                                }
                                alt={
                                    product.name
                                }
                                style={{
                                    width: "200px",
                                    height: "200px",
                                    objectFit: "cover",
                                    margin: "0 auto",
                                    borderRadius: "8px"
                                }}
                                onError={(e) => {
                                    e.target.src =
                                    "https://placehold.co/200x200";
                                }}
                            />

                            <h3>
                                {product.name}
                            </h3>

                            <p>
                                Price:
                                {" "}
                                ₹{product.price}
                            </p>

                            <button
                                onClick={() =>
                                    addToCart(
                                        product.id
                                    )
                                }
                                style={buttonStyle}
                            >
                                Add to Cart
                            </button>

                        </div>
                    ))
                }

            </div>

            <br />

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    marginTop: "20px"
                }}
            >

                <button
                    disabled={page === 0}
                    onClick={() =>
                        setPage(page - 1)
                    }
                    style={buttonStyle}
                >
                    Previous
                </button>

                <span>
                    Page
                    {" "}
                    {
                        totalPages === 0
                        ? 0
                        : page + 1
                    }
                    {" "}
                    of
                    {" "}
                    {totalPages}
                </span>

                <button
                    disabled={
                        page >= totalPages - 1
                    }
                    onClick={() =>
                        setPage(page + 1)
                    }
                    style={buttonStyle}
                >
                    Next
                </button>

            </div>

        </div>
    );
}

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
    cursor: "pointer"
};

export default Home;