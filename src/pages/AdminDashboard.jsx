import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import { getAllProducts } from "../services/productService";

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

    return (
        <div>

            <h1>Admin Dashboard</h1>

            <button
                onClick={() =>
                    navigate("/admin/add-product")
                }
            >
                Add Product
            </button>

            <h2>All Products</h2>

            {
                products.map((product) => (

                    <div key={product.id}>

                        <img
                            src={
                                product.imageUrl
                                || "https://placehold.co/150x150"
                            }
                            alt={product.name}
                            width="150"
                            onError={(e) => {
                                e.target.src =
                                    "https://placehold.co/150x150";
                            }}
                        />

                        <h3>{product.name}</h3>

                        <p>Category: {product.category}</p>

                        <p>Price: ₹{product.price}</p>

                        <p>Stock: {product.quantity}</p>

                        <button>
                            Edit
                        </button>

                        <button>
                            Delete
                        </button>

                        <hr />

                    </div>
                ))
            }

        </div>
    );
}

export default AdminDashboard;