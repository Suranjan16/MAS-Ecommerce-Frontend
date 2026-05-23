import { useEffect, useState } from "react";

import { getOrders } from "../services/orderService";

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

    return (
        <div>

            <h1>My Orders</h1>

            {
                orders.map((order) => (

                    <div key={order.id}>

                        <h3>
                            Order ID: {order.id}
                        </h3>

                        <p>
                            Total Amount: ₹
                            {order.totalAmount}
                        </p>

                        <p>
                            Payment Method:
                            {order.paymentMethod}
                        </p>

                        <p>
                            Payment Status:
                            {order.paymentStatus}
                        </p>

                        <p>
                            Order Status:
                            {order.orderStatus}
                        </p>

                        <hr />

                    </div>
                ))
            }

        </div>
    );
}

export default Orders;