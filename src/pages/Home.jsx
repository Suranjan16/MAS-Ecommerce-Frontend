import { useEffect, useState } from "react";

import {
    getProductsWithPagination,
    searchProductsByName,
    getProductsByCategory,
    getProductsByPriceRange,
    getProductsWithSorting
} from "../services/productService";

import { addProductToCart } from "../services/cartService";

function Home() {

    const [products, setProducts] = useState([]);

    const [searchName, setSearchName] = useState("");

    const [category, setCategory] = useState("");

    const [minPrice, setMinPrice] = useState("");

    const [maxPrice, setMaxPrice] = useState("");

    const [sortOption, setSortOption] = useState("");

    const [page, setPage] = useState(0);

    const [totalPages, setTotalPages] = useState(0);

    const size = 5;

    useEffect(() => {
        fetchProducts(page);
    }, [page]);

    const fetchProducts = async (currentPage) => {
        try {

            const data =
                await getProductsWithPagination(
                    currentPage,
                    size
                );

            setProducts(data.content);

            setTotalPages(data.totalPages);

        } catch (error) {

            console.log(error);
        }
    };

    const handleSearch = async () => {
        try {

            if (searchName.trim() === "") {
                fetchProducts(page);
                return;
            }

            const data =
                await searchProductsByName(searchName);

            setProducts(data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleCategoryFilter = async (value) => {

        setCategory(value);

        try {

            if (value === "") {
                fetchProducts(page);
                return;
            }

            const data =
                await getProductsByCategory(value);

            setProducts(data);

        } catch (error) {

            console.log(error);
        }
    };

    const handlePriceFilter = async () => {

        try {

            if (minPrice === "" || maxPrice === "") {

                alert(
                    "Please enter both minimum and maximum price"
                );

                return;
            }

            const data =
                await getProductsByPriceRange(
                    minPrice,
                    maxPrice
                );

            setProducts(data);

        } catch (error) {

            console.log(error);
        }
    };

    const handleSort = async (value) => {

        setSortOption(value);

        try {

            if (value === "") {
                fetchProducts(page);
                return;
            }

            const [sort, direction] =
                value.split("-");

            const data =
                await getProductsWithSorting(
                    sort,
                    direction
                );

            setProducts(data);

        } catch (error) {

            console.log(error);
        }
    };

    const addToCart = async (productId) => {

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
                await addProductToCart(productId, 1);

            alert(response);

        } catch (error) {

            console.log(error);

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
                onChange={(e) =>
                    setSearchName(e.target.value)
                }
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

                    setSortOption("");

                    setPage(0);

                    fetchProducts(0);
                }}
            >
                Clear
            </button>

            <br />
            <br />

            <select
                value={category}
                onChange={(e) =>
                    handleCategoryFilter(
                        e.target.value
                    )
                }
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

            <br />
            <br />

            <select
                value={sortOption}
                onChange={(e) =>
                    handleSort(e.target.value)
                }
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

            <hr />

            {
                products.map((product) => (

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

                        <p>
                            Category:
                            {product.category}
                        </p>

                        <p>
                            Price: ₹{product.price}
                        </p>

                        <p>
                            Stock: {product.quantity}
                        </p>

                        <button
                            onClick={() =>
                                addToCart(product.id)
                            }
                        >
                            Add to Cart
                        </button>

                        <hr />

                    </div>
                ))
            }

            <button
                disabled={page === 0}
                onClick={() =>
                    setPage(page - 1)
                }
            >
                Previous
            </button>

            <span>
                {" "}
                Page {page + 1} of {totalPages}{" "}
            </span>

            <button
                disabled={page === totalPages - 1}
                onClick={() =>
                    setPage(page + 1)
                }
            >
                Next
            </button>

        </div>
    );
}

export default Home;