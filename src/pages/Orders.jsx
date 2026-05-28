import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getOrders,
    cancelOrder
} from "../services/orderService";

import { toast } from "react-toastify";

function Orders() {
    const [orders, setOrders] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();

            setOrders(data);
        } catch (error) {
            console.log(error);
            toast.error("Failed to load orders");
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            await cancelOrder(orderId);

            toast.success("Order cancelled successfully");

            fetchOrders();
        } catch (error) {
            console.log(error);
            toast.error("Failed to cancel order");
        }
    };

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>My Orders</h1>

            {orders.length === 0 ? (
                <div style={emptyContainerStyle}>
                    <h2>No orders found</h2>

                    <p>
                        Start shopping to see your orders here.
                    </p>
                </div>
            ) : (
                <div style={ordersContainerStyle}>
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            style={orderCardStyle}
                        >
                            <div style={orderHeaderStyle}>
                                <div>
                                    <h2 style={orderIdStyle}>
                                        Order #{order.orderId}
                                    </h2>

                                    <p style={dateStyle}>
                                        {new Date(
                                            order.createdAt
                                        ).toLocaleString()}
                                    </p>
                                </div>

                                <div style={statusContainerStyle}>
                                    <span
                                        style={{
                                            ...statusStyle,
                                            backgroundColor:
                                                order.status ===
                                                "DELIVERED"
                                                    ? "#dcfce7"
                                                    : order.status ===
                                                      "CANCELLED"
                                                    ? "#fee2e2"
                                                    : "#dbeafe",
                                            color:
                                                order.status ===
                                                "DELIVERED"
                                                    ? "#166534"
                                                    : order.status ===
                                                      "CANCELLED"
                                                    ? "#991b1b"
                                                    : "#1d4ed8"
                                        }}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                            </div>

                            <div style={itemsContainerStyle}>
                                {order.items.map((item, index) => (
                                    <div
                                        key={index}
                                        style={itemCardStyle}
                                    >
                                        <img
                                            src={
                                                item.imageUrl ||
                                                "https://placehold.co/120x120"
                                            }
                                            alt={item.productName}
                                            style={productImageStyle}
                                            onError={(e) => {
                                                e.target.src =
                                                    "https://placehold.co/120x120";
                                            }}
                                        />

                                        <div
                                            style={itemInfoStyle}
                                        >
                                            <h3
                                                style={
                                                    productNameStyle
                                                }
                                            >
                                                {
                                                    item.productName
                                                }
                                            </h3>

                                            <p
                                                style={
                                                    itemTextStyle
                                                }
                                            >
                                                Quantity:{" "}
                                                {
                                                    item.quantity
                                                }
                                            </p>

                                            <p
                                                style={
                                                    itemPriceStyle
                                                }
                                            >
                                                ₹{item.price}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div style={footerStyle}>
                                {
                                    order.status !==
                                        "CANCELLED" && (
                                        <div>
                                            <p
                                                style={
                                                    paymentStyle
                                                }
                                            >
                                                Payment:{" "}
                                                {
                                                    order.paymentMethod
                                                }
                                            </p>

                                            <p
                                                style={
                                                    paymentStatusStyle
                                                }
                                            >
                                                Payment Status:{" "}
                                                {
                                                    order.paymentStatus
                                                }
                                            </p>
                                        </div>
                                    )
                                }

                                <div style={rightSectionStyle}>
                                    <h2 style={totalStyle}>
                                        ₹
                                        {
                                            order.totalAmount
                                        }
                                    </h2>

                                    <div>
                                        {
                                            order.status !==
                                                "CANCELLED" && (
                                                <button
                                                    style={
                                                        trackButtonStyle
                                                    }
                                                    onClick={() =>
                                                        navigate(
                                                            `/track-order/${order.orderId}`
                                                        )
                                                    }
                                                >
                                                    Track Order
                                                </button>
                                            )
                                        }

                                        {
                                            ![
                                                "CANCELLED",
                                                "DELIVERED"
                                            ].includes(
                                                order.status
                                            ) && (
                                                <button
                                                    style={
                                                        cancelButtonStyle
                                                    }
                                                    onClick={() =>
                                                        handleCancelOrder(
                                                            order.orderId
                                                        )
                                                    }
                                                >
                                                    Cancel Order
                                                </button>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px",
    minHeight: "100vh",
    backgroundColor: "#f9fafb"
};

const titleStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#111827"
};

const emptyContainerStyle = {
    textAlign: "center",
    marginTop: "80px",
    color: "#6b7280"
};

const ordersContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
};

const orderCardStyle = {
    backgroundColor: "white",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
};

const orderHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
};

const orderIdStyle = {
    margin: 0,
    color: "#111827"
};

const dateStyle = {
    color: "#6b7280",
    marginTop: "5px"
};

const statusContainerStyle = {
    display: "flex",
    alignItems: "center"
};

const statusStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "14px"
};

const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginBottom: "20px"
};

const itemCardStyle = {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    padding: "14px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb"
};

const productImageStyle = {
    width: "110px",
    height: "110px",
    objectFit: "contain",
    backgroundColor: "#f3f4f6",
    borderRadius: "10px",
    padding: "8px"
};

const itemInfoStyle = {
    flex: 1
};

const productNameStyle = {
    margin: 0,
    marginBottom: "10px",
    color: "#111827"
};

const itemTextStyle = {
    margin: "4px 0",
    color: "#6b7280"
};

const itemPriceStyle = {
    marginTop: "10px",
    fontWeight: "bold",
    color: "#2563eb",
    fontSize: "17px"
};

const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px"
};

const paymentStyle = {
    margin: "5px 0",
    color: "#374151"
};

const paymentStatusStyle = {
    margin: "5px 0",
    color: "#374151"
};

const rightSectionStyle = {
    textAlign: "right"
};

const totalStyle = {
    color: "#111827",
    marginBottom: "15px"
};

const trackButtonStyle = {
    marginRight: "10px",
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

const cancelButtonStyle = {
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#dc2626",
    color: "white",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

export default Orders;