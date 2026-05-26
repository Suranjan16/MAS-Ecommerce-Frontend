import { useEffect, useState } from "react";

import {
    getOrders,
    cancelOrder
} from "../services/orderService";

import { toast } from "react-toastify";

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {

        try {

            const data =
                await getOrders();

            setOrders(data);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to load orders"
            );
        }
    };

    const handleCancelOrder = async (
        orderId
    ) => {

        try {

            const response =
                await cancelOrder(orderId);

            toast.success(response);

            fetchOrders();

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to cancel order"
            );
        }
    };

    const getStatusStyle = (status) => {

        switch (status) {

            case "PLACED":
                return {
                    backgroundColor: "#dbeafe",
                    color: "#1d4ed8"
                };

            case "DELIVERED":
                return {
                    backgroundColor: "#dcfce7",
                    color: "#166534"
                };

            case "CANCELLED":
                return {
                    backgroundColor: "#fee2e2",
                    color: "#991b1b"
                };

            default:
                return {
                    backgroundColor: "#f3f4f6",
                    color: "#374151"
                };
        }
    };

    return (
        <div style={pageStyle}>

            <h1 style={titleStyle}>
                My Orders
            </h1>

            {
                orders.length === 0 ? (

                    <div style={emptyOrdersStyle}>

                        <h2>
                            No Orders Found
                        </h2>

                        <p>
                            You have not placed any orders yet.
                        </p>

                    </div>

                ) : (

                    orders.map((order) => (

                        <div
                            key={order.orderId}
                            style={orderCardStyle}
                        >

                            <div style={topSectionStyle}>

                                <div>

                                    <h3 style={orderIdStyle}>
                                        Order #{order.orderId}
                                    </h3>

                                    <p style={dateStyle}>
                                        {
                                            new Date(
                                                order.createdAt
                                            ).toLocaleString()
                                        }
                                    </p>

                                </div>

                                <div
                                    style={{
                                        ...statusStyle,
                                        ...getStatusStyle(
                                            order.status
                                        )
                                    }}
                                >
                                    {order.status}
                                </div>

                            </div>

                            <div style={itemsContainerStyle}>

                                {
                                    order.items?.map(
                                        (
                                            item,
                                            index
                                        ) => (

                                            <div
                                                key={index}
                                                style={itemCardStyle}
                                            >

                                                <img
                                                    src={
                                                        item.imageUrl ||
                                                        "https://placehold.co/100x100"
                                                    }
                                                    alt={
                                                        item.productName
                                                    }
                                                    style={imageStyle}
                                                    onError={(e) => {
                                                        e.target.src =
                                                            "https://placehold.co/100x100";
                                                    }}
                                                />

                                                <div style={itemDetailsStyle}>

                                                    <h4>
                                                        {
                                                            item.productName
                                                        }
                                                    </h4>

                                                    <p>
                                                        Quantity: {
                                                            item.quantity
                                                        }
                                                    </p>

                                                    <p>
                                                        Price: ₹{
                                                            item.price
                                                        }
                                                    </p>

                                                </div>

                                            </div>
                                        )
                                    )
                                }

                            </div>

                            <div style={bottomSectionStyle}>

                                <div>

                                    <p>
                                        Payment Method:
                                        <strong>
                                            {" "}
                                            {
                                                order.paymentMethod
                                            }
                                        </strong>
                                    </p>

                                    <p>
                                        Payment Status:
                                        <strong>
                                            {" "}
                                            {
                                                order.paymentStatus
                                            }
                                        </strong>
                                    </p>

                                </div>

                                <div style={amountSectionStyle}>

                                    <h2>
                                        ₹{
                                            order.totalAmount
                                        }
                                    </h2>

                                    {
                                        order.status !==
                                            "CANCELLED" &&
                                        order.status !==
                                            "DELIVERED" && (

                                            <button
                                                style={cancelButtonStyle}
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
                    ))
                )
            }

        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px",
    backgroundColor: "#f9fafb",
    minHeight: "100vh"
};

const titleStyle = {
    marginBottom: "25px",
    color: "#111827"
};

const orderCardStyle = {
    backgroundColor: "white",
    borderRadius: "14px",
    padding: "25px",
    marginBottom: "25px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
};

const topSectionStyle = {
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
    marginTop: "6px"
};

const statusStyle = {
    padding: "8px 14px",
    borderRadius: "30px",
    fontWeight: "bold",
    fontSize: "14px"
};

const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "25px"
};

const itemCardStyle = {
    display: "flex",
    gap: "16px",
    padding: "15px",
    border: "1px solid #e5e7eb",
    borderRadius: "10px"
};

const imageStyle = {
    width: "90px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "8px"
};

const itemDetailsStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    gap: "6px"
};

const bottomSectionStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px"
};

const amountSectionStyle = {
    textAlign: "right"
};

const cancelButtonStyle = {
    marginTop: "10px",
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
};

const emptyOrdersStyle = {
    textAlign: "center",
    padding: "60px",
    backgroundColor: "white",
    borderRadius: "14px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)"
};

export default Orders;