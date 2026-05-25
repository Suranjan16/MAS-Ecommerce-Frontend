import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { placeOrder } from "../services/orderService";

import {
    createPayment,
    verifyPayment
} from "../services/paymentService";

function Checkout() {

    const [paymentMethod, setPaymentMethod] = useState("COD");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handlePlaceOrder = async () => {
        setLoading(true);

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
                name: "MAS",
                description: "Order Payment",
                order_id: paymentResponse.orderId,

                handler: async function (response) {
                    console.log("Razorpay Response:", response);

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
                    color: "#2563eb"
                }
            };

            const razorpay = new window.Razorpay(options);

            razorpay.open();

        } catch (error) {
            console.log("Checkout error:", error);
            console.log("Status:", error.response?.status);
            console.log("Data:", error.response?.data);

            alert("Failed to place order");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>

            <div style={checkoutCardStyle}>

                <h1 style={titleStyle}>
                    Checkout
                </h1>

                <p style={subtitleStyle}>
                    Choose your payment method and place your order securely.
                </p>

                <div style={sectionStyle}>
                    <h3>
                        Payment Method
                    </h3>

                    <label style={optionStyle}>
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

                    <label style={optionStyle}>
                        <input
                            type="radio"
                            value="RAZORPAY"
                            checked={paymentMethod === "RAZORPAY"}
                            onChange={(e) =>
                                setPaymentMethod(e.target.value)
                            }
                        />
                        Razorpay Online Payment
                    </label>
                </div>

                <div style={infoBoxStyle}>
                    {
                        paymentMethod === "COD"
                            ? "Pay when your order is delivered."
                            : "You will be redirected to Razorpay secure payment gateway."
                    }
                </div>

                <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    style={{
                        ...placeOrderButtonStyle,
                        opacity: loading ? 0.7 : 1,
                        cursor: loading ? "not-allowed" : "pointer"
                    }}
                >
                    {
                        loading
                            ? "Processing..."
                            : "Place Order"
                    }
                </button>

                <button
                    onClick={() => navigate("/cart")}
                    style={backButtonStyle}
                >
                    Back to Cart
                </button>

            </div>

        </div>
    );
}

const pageStyle = {
    padding: "20px",
    paddingTop: "90px",
    display: "flex",
    justifyContent: "center"
};

const checkoutCardStyle = {
    width: "450px",
    padding: "25px",
    borderRadius: "12px",
    backgroundColor: "white",
    boxShadow: "0 2px 12px rgba(0,0,0,0.12)"
};

const titleStyle = {
    marginBottom: "5px"
};

const subtitleStyle = {
    color: "#6b7280",
    marginBottom: "25px"
};

const sectionStyle = {
    marginBottom: "20px"
};

const optionStyle = {
    display: "block",
    padding: "12px",
    marginBottom: "10px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    cursor: "pointer"
};

const infoBoxStyle = {
    padding: "12px",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    marginBottom: "20px",
    color: "#374151"
};

const placeOrderButtonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    backgroundColor: "#16a34a",
    color: "white",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold"
};

const backButtonStyle = {
    width: "100%",
    padding: "10px",
    marginTop: "12px",
    border: "1px solid #ccc",
    backgroundColor: "white",
    color: "#374151",
    borderRadius: "8px",
    cursor: "pointer"
};

export default Checkout;