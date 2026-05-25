import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getCart,
    removeProductFromCart,
    updateCartQuantity
} from "../services/cartService";

import { toast } from "react-toastify";

function Cart() {
    const [cart, setCart] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const data = await getCart();
            setCart(data);
        } catch (error) {
            console.log(error);
        }
    };

    const removeItem = async (productId) => {
        try {
            const response =
                await removeProductFromCart(productId);

            toast.success(response);

            fetchCart();
        } catch (error) {
            console.log(error);

            toast.error("Failed to remove item");
        }
    };

    const updateQuantity = async (
        productId,
        quantity
    ) => {
        try {
            const response =
                await updateCartQuantity(
                    productId,
                    quantity
                );

            toast.success(response);

            fetchCart();
        } catch (error) {
            console.log(error);

            toast.error("Failed to update quantity");
        }
    };

    if (!cart) {
        return (
            <div style={pageStyle}>
                <h2>Loading Cart...</h2>
            </div>
        );
    }

    if (cart.items.length === 0) {
        return (
            <div style={pageStyle}>
                <h1>My Cart</h1>

                <div style={emptyCartStyle}>
                    <h2>Your cart is empty</h2>

                    <p>
                        Add some products to your cart to continue shopping.
                    </p>

                    <button
                        style={checkoutButtonStyle}
                        onClick={() => navigate("/home")}
                    >
                        Continue Shopping
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={pageStyle}>
            <h1>My Cart</h1>

            <div style={cartLayoutStyle}>
                <div style={itemsContainerStyle}>
                    {cart.items.map((item) => (
                        <div
                            key={item.productId}
                            style={cartItemStyle}
                        >
                            <img
                                src={
                                    item.imageUrl ||
                                    "https://placehold.co/150x150"
                                }
                                alt={item.productName}
                                style={imageStyle}
                                onError={(e) => {
                                    e.target.src =
                                        "https://placehold.co/150x150";
                                }}
                            />

                            <div style={itemDetailsStyle}>
                                <h3>{item.productName}</h3>

                                <p>Price: ₹{item.price}</p>

                                <div style={quantityBoxStyle}>
                                    <button
                                        disabled={item.quantity <= 1}
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.quantity - 1
                                            )
                                        }
                                        style={quantityButtonStyle}
                                    >
                                        -
                                    </button>

                                    <span style={quantityTextStyle}>
                                        {item.quantity}
                                    </span>

                                    <button
                                        onClick={() =>
                                            updateQuantity(
                                                item.productId,
                                                item.quantity + 1
                                            )
                                        }
                                        style={quantityButtonStyle}
                                    >
                                        +
                                    </button>
                                </div>

                                <button
                                    onClick={() =>
                                        removeItem(item.productId)
                                    }
                                    style={removeButtonStyle}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={summaryStyle}>
                    <h2>Order Summary</h2>

                    <p>Items: {cart.items.length}</p>

                    <h3>Total: ₹{cart.totalAmount}</h3>

                    <button
                        onClick={() => navigate("/checkout")}
                        style={checkoutButtonStyle}
                    >
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px"
};

const cartLayoutStyle = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "25px",
    alignItems: "flex-start"
};

const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
};

const cartItemStyle = {
    display: "flex",
    gap: "20px",
    padding: "15px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const imageStyle = {
    width: "150px",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px"
};

const itemDetailsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
};

const quantityBoxStyle = {
    display: "flex",
    alignItems: "center",
    gap: "12px"
};

const quantityButtonStyle = {
    padding: "6px 12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

const quantityTextStyle = {
    fontWeight: "bold",
    fontSize: "18px"
};

const removeButtonStyle = {
    width: "100px",
    padding: "8px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

const summaryStyle = {
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#f9fafb",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
};

const checkoutButtonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
};

const emptyCartStyle = {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9fafb",
    borderRadius: "10px"
};

export default Cart;