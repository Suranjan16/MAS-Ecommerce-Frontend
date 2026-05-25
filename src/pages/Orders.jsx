import { useEffect, useState } from "react";

import {
    getOrders,
    cancelOrder
} from "../services/orderService";

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const data = await getOrders();
            setOrders(data);
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancelOrder = async (orderId) => {
        try {
            const response = await cancelOrder(orderId);
            alert(response);
            fetchOrders();
        } catch (error) {
            console.log(error);
            alert("Failed to cancel order");
        }
    };

    return (
        <div style={pageStyle}>
            <h1>My Orders</h1>

            {orders.length === 0 ? (
                <div style={emptyOrdersStyle}>
                    <h2>No Orders Found</h2>
                    <p>You have not placed any orders yet.</p>
                </div>
            ) : (
                orders.map((order) => (
                    <div key={order.orderId} style={orderCardStyle}>
                        <h3>Order ID: {order.orderId}</h3>

                        <p>Total Amount: ₹{order.totalAmount}</p>
                        <p>Order Status: {order.status}</p>
                        <p>Payment Method: {order.paymentMethod}</p>
                        <p>Payment Status: {order.paymentStatus}</p>

                        {order.status !== "CANCELLED" &&
                            order.status !== "DELIVERED" && (
                                <button
                                    style={cancelButtonStyle}
                                    onClick={() =>
                                        handleCancelOrder(order.orderId)
                                    }
                                >
                                    Cancel Order
                                </button>
                            )}

                        <hr />
                    </div>
                ))
            )}
        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px"
};

const orderCardStyle = {
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
};

const cancelButtonStyle = {
    padding: "10px 15px",
    border: "none",
    backgroundColor: "#ef4444",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

const emptyOrdersStyle = {
    textAlign: "center",
    padding: "50px",
    backgroundColor: "#f9fafb",
    borderRadius: "12px"
};

export default Orders;