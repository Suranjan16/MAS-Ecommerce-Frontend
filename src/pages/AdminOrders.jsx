import { useEffect, useState } from "react";

import {
    getAllOrdersForAdmin,
    updateOrderStatus
} from "../services/orderService";

import { toast } from "react-toastify";

function AdminOrders() {

    const [orders, setOrders] = useState([]);

    const orderStatuses = [
        "PLACED",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED",
        "CANCELLED"
    ];

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getAllOrdersForAdmin();

            setOrders(data);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load orders");
        }
    };

    const handleStatusUpdate = async (
        orderId,
        status
    ) => {
        try {
            await updateOrderStatus(
                orderId,
                status
            );

            toast.success(
                "Order status updated successfully"
            );

            fetchOrders();
        } catch (error) {
            console.log(error);

            toast.error(
                "Failed to update order status"
            );
        }
    };

    return (
        <div style={pageStyle}>
            <h1 style={titleStyle}>
                Manage Orders
            </h1>

            <div style={ordersContainerStyle}>
                {orders.map((order) => (
                    <div
                        key={order.orderId}
                        style={orderCardStyle}
                    >
                        <div style={headerStyle}>
                            <div>
                                <h2 style={orderIdStyle}>
                                    Order #
                                    {order.orderId}
                                </h2>

                                <p style={dateStyle}>
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleString()}
                                </p>
                            </div>

                            <div>
                                <span
                                    style={{
                                        ...statusBadgeStyle,
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
                            {order.items.map(
                                (item, index) => (
                                    <div
                                        key={index}
                                        style={
                                            itemCardStyle
                                        }
                                    >
                                        <img
                                            src={
                                                item.imageUrl ||
                                                "https://placehold.co/100x100"
                                            }
                                            alt={
                                                item.productName
                                            }
                                            style={
                                                imageStyle
                                            }
                                            onError={(
                                                e
                                            ) => {
                                                e.target.src =
                                                    "https://placehold.co/100x100";
                                            }}
                                        />

                                        <div>
                                            <h3
                                                style={
                                                    productNameStyle
                                                }
                                            >
                                                {
                                                    item.productName
                                                }
                                            </h3>

                                            <p>
                                                Quantity:{" "}
                                                {
                                                    item.quantity
                                                }
                                            </p>

                                            <p>
                                                ₹
                                                {
                                                    item.price
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )
                            )}
                        </div>

                        <div style={footerStyle}>
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
                                        paymentStyle
                                    }
                                >
                                    Status:{" "}
                                    {
                                        order.paymentStatus
                                    }
                                </p>
                            </div>

                            <div
                                style={
                                    updateSectionStyle
                                }
                            >
                                <select
                                    value={
                                        order.status
                                    }
                                    onChange={(e) =>
                                        handleStatusUpdate(
                                            order.orderId,
                                            e.target
                                                .value
                                        )
                                    }
                                    style={
                                        selectStyle
                                    }
                                >
                                    {orderStatuses.map(
                                        (
                                            status
                                        ) => (
                                            <option
                                                key={
                                                    status
                                                }
                                                value={
                                                    status
                                                }
                                            >
                                                {status.replaceAll(
                                                    "_",
                                                    " "
                                                )}
                                            </option>
                                        )
                                    )}
                                </select>

                                <h2
                                    style={
                                        totalStyle
                                    }
                                >
                                    ₹
                                    {
                                        order.totalAmount
                                    }
                                </h2>
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

const titleStyle = {
    textAlign: "center",
    marginBottom: "30px",
    color: "#111827"
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
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const headerStyle = {
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

const statusBadgeStyle = {
    padding: "8px 14px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "14px"
};

const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px"
};

const itemCardStyle = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    padding: "14px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px"
};

const imageStyle = {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    padding: "8px"
};

const productNameStyle = {
    margin: 0,
    marginBottom: "8px",
    color: "#111827"
};

const footerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px"
};

const paymentStyle = {
    margin: "4px 0",
    color: "#374151"
};

const updateSectionStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    gap: "12px"
};

const selectStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontWeight: "600"
};

const totalStyle = {
    margin: 0,
    color: "#111827"
};

export default AdminOrders;