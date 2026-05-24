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
        <div>
            <h1>My Orders</h1>

            {orders.map((order) => (
                <div key={order.orderId}>

                    <h3>
                        Order ID: {order.orderId}
                    </h3>

                    <p>
                        Total Amount: ₹{order.totalAmount}
                    </p>

                    <p>
                        Order Status: {order.status}
                    </p>

                    <p>
                        Payment Method: {order.paymentMethod}
                    </p>

                    <p>
                        Payment Status: {order.paymentStatus}
                    </p>

                    {
                        order.status !== "CANCELLED"
                        && order.status !== "DELIVERED"
                        && (
                            <button
                                onClick={() =>
                                    handleCancelOrder(order.orderId)
                                }
                            >
                                Cancel Order
                            </button>
                        )
                    }

                    <hr />

                </div>
            ))}
        </div>
    );
}

export default Orders;