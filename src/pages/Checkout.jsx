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

            const response = await placeOrder(paymentMethod);

            alert(response);

            if (paymentMethod === "COD") {

                navigate("/orders");

                return;
            }

            alert("Order placed. Razorpay payment will be added next.");

            navigate("/orders");

        } catch (error) {

            console.log(error);

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