import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../services/orderService";

import {
    createPayment,
    verifyPayment
} from "../services/paymentService";

function Checkout() {

    const [paymentMethod, setPaymentMethod] = useState("COD");

    const navigate = useNavigate();

    const handlePlaceOrder = async () => {

        try {

            const orderResponse = await placeOrder(paymentMethod);

            alert(orderResponse.message);

            const orderId = orderResponse.orderId;

            if (paymentMethod === "COD") {

                navigate("/orders");

                return;
            }

            const paymentResponse = await createPayment(orderId);

            const options = {
                key: "rzp_test_Ss7dVslfyOs2t0",
                amount: paymentResponse.amount,
                currency: paymentResponse.currency,
                name: "MAS Ecommerce",
                description: "Order Payment",
                order_id: paymentResponse.orderId,

                handler: async function (response) {

                    console.log(
                        "Razorpay Response:",
                        response
                    );

                    await verifyPayment(
                        orderId,
                        response.razorpay_payment_id,
                        response.razorpay_order_id,
                        response.razorpay_signature
                    );

                    alert("Payment successful");

                    navigate("/orders");
                },

                prefill: {
                    name: "Suranjan",
                    email: "test@example.com"
                },

                theme: {
                    color: "#3399cc"
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {

            console.log("Checkout error:", error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);

            alert("Failed to place order");
        }
    };

    return (
        <div>

            <h1>Checkout</h1>

            <h3>Select Payment Method</h3>

            <label>
                <input
                    type="radio"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) =>
                        setPaymentMethod(e.target.value)
                    }
                />
                Cash on Delivery
            </label>

            <br />

            <label>
                <input
                    type="radio"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={(e) =>
                        setPaymentMethod(e.target.value)
                    }
                />
                Razorpay
            </label>

            <br />
            <br />

            <button onClick={handlePlaceOrder}>
                Place Order
            </button>

        </div>
    );
}

export default Checkout;