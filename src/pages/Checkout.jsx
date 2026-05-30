import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getCart } from "../services/cartService";
import { placeOrder } from "../services/orderService";

import { toast } from "react-toastify";

function Checkout() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(false);

    const [paymentMethod, setPaymentMethod] =
        useState("COD");

    const [fullName, setFullName] =
        useState("");

    const [phone, setPhone] =
        useState("");

    const [address, setAddress] =
        useState("");

    const [city, setCity] =
        useState("");

    const [state, setState] =
        useState("");

    const [pincode, setPincode] =
        useState("");

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

            toast.error("Failed to load cart");
        }
    };

    const handlePlaceOrder = async () => {

        const phoneRegex =
            /^(\+91)?[6-9]\d{9}$/;

        const pincodeRegex =
            /^[1-9][0-9]{5}$/;

        if (!fullName.trim()) {

            toast.error(
                "Full name is required"
            );

            return;
        }

        if (!phone.trim()) {

            toast.error(
                "Phone number is required"
            );

            return;
        }

        if (!phoneRegex.test(phone)) {

            toast.error(
                "Enter a valid Indian phone number"
            );

            return;
        }

        if (!address.trim()) {

            toast.error(
                "Address is required"
            );

            return;
        }

        if (!city.trim()) {

            toast.error(
                "City is required"
            );

            return;
        }

        if (!state.trim()) {

            toast.error(
                "State is required"
            );

            return;
        }

        if (!pincode.trim()) {

            toast.error(
                "Pincode is required"
            );

            return;
        }

        if (!pincodeRegex.test(pincode)) {

            toast.error(
                "Enter a valid 6-digit pincode"
            );

            return;
        }

        try {
            setLoading(true);


            // COD FLOW
            if (paymentMethod === "COD") {

                const response =
                    await placeOrder({
                        paymentMethod: "COD",
                        paymentId: "",
                        fullName,
                        phone,
                        address,
                        city,
                        state,
                        pincode
                    });

                toast.success(response.message);

                navigate("/orders");

                return;
            }

            // RAZORPAY FLOW
            if (paymentMethod === "ONLINE") {

                const options = {

                    key: "rzp_test_Ss7dVslfyOs2t0",

                    amount:
                        cart.totalAmount * 100,

                    currency: "INR",

                    name: "MAS Store",

                    description:
                        "Order Payment",

                    handler: async function (
                        razorpayResponse
                    ) {

                        try {

                            const response =
                                await placeOrder({
                                    paymentMethod:
                                        "ONLINE",

                                    paymentId:
                                        razorpayResponse
                                            .razorpay_payment_id,

                                    fullName,
                                    phone,
                                    address,
                                    city,
                                    state,
                                    pincode
                                });

                            toast.success(
                                response.message
                            );

                            navigate("/orders");

                        } catch (error) {

                            console.log(error);

                            toast.error(
                                "Order placement failed"
                            );
                        }
                    },

                    prefill: {
                        name: fullName,
                        contact: phone
                    },

                    theme: {
                        color: "#2563eb"
                    }
                };

                const razorpay =
                    new window.Razorpay(options);

                razorpay.open();
            }

        } catch (error) {

            console.log(error);

            if (error.response?.data) {

            const errors =
                error.response.data;

            if (
                typeof errors ===
                "object"
            ) {

                Object.values(errors)
                    .forEach(message => {
                        toast.error(message);
                    });

            } else {

                toast.error(errors);
            }

            } else {

            toast.error(
                "Failed to place order"
            );
            }

        } finally {

            setLoading(false);
        }
    };

    if (!cart) {

        return (
            <div style={loadingStyle}>
                Loading...
            </div>
        );
    }

    return (
        <div style={pageStyle}>

            <div style={containerStyle}>

                <div style={leftSectionStyle}>

                    <h1 style={titleStyle}>
                        Checkout
                    </h1>

                    <div style={sectionStyle}>

                        <h2 style={sectionTitleStyle}>
                            Delivery Details
                        </h2>

                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) =>
                                setFullName(
                                    e.target.value
                                )
                            }
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone}
                            onChange={(e) =>
                                setPhone(
                                    e.target.value
                                )
                            }
                            style={inputStyle}
                        />

                        <textarea
                            placeholder="Address"
                            value={address}
                            onChange={(e) =>
                                setAddress(
                                    e.target.value
                                )
                            }
                            style={textareaStyle}
                        />

                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={(e) =>
                                setCity(
                                    e.target.value
                                )
                            }
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={(e) =>
                                setState(
                                    e.target.value
                                )
                            }
                            style={inputStyle}
                        />

                        <input
                            type="text"
                            placeholder="Pincode"
                            value={pincode}
                            onChange={(e) =>
                                setPincode(
                                    e.target.value
                                )
                            }
                            style={inputStyle}
                        />

                    </div>

                    <div style={sectionStyle}>

                        <h2 style={sectionTitleStyle}>
                            Payment Method
                        </h2>

                        <div style={paymentOptionsStyle}>

                            <label
                                style={radioLabelStyle}
                            >

                                <input
                                    type="radio"
                                    value="COD"
                                    checked={
                                        paymentMethod ===
                                        "COD"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                Cash on Delivery

                            </label>

                            <label
                                style={radioLabelStyle}
                            >

                                <input
                                    type="radio"
                                    value="ONLINE"
                                    checked={
                                        paymentMethod ===
                                        "ONLINE"
                                    }
                                    onChange={(e) =>
                                        setPaymentMethod(
                                            e.target.value
                                        )
                                    }
                                />

                                Razorpay

                            </label>

                        </div>

                    </div>

                </div>

                <div style={rightSectionStyle}>

                    <h2 style={summaryTitleStyle}>
                        Order Summary
                    </h2>

                    <div style={itemsContainerStyle}>

                        {
                            cart.items.map(
                                (item) => (

                                    <div
                                        key={
                                            item.productId
                                        }
                                        style={
                                            itemCardStyle
                                        }
                                    >

                                        <img
                                            src={
                                                item.imageUrl
                                            }
                                            alt={
                                                item.productName
                                            }
                                            style={
                                                imageStyle
                                            }
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

                                            <p
                                                style={
                                                    itemTextStyle
                                                }
                                            >
                                                Quantity:
                                                {" "}
                                                {
                                                    item.quantity
                                                }
                                            </p>

                                            <p
                                                style={
                                                    priceStyle
                                                }
                                            >
                                                ₹
                                                {
                                                    item.price
                                                }
                                            </p>

                                        </div>

                                    </div>
                                )
                            )
                        }

                    </div>

                    <div style={totalSectionStyle}>

                        <h2>
                            Total: ₹
                            {
                                cart.totalAmount
                            }
                        </h2>

                    </div>

                    <button
                        onClick={
                            handlePlaceOrder
                        }
                        disabled={loading}
                        style={
                            placeOrderButtonStyle
                        }
                    >

                        {
                            loading
                                ? "Processing..."
                                : "Place Order"
                        }

                    </button>

                </div>

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

const containerStyle = {
    display: "grid",
    gridTemplateColumns:
        "1fr 400px",
    gap: "30px"
};

const leftSectionStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
};

const rightSectionStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    height: "fit-content",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const titleStyle = {
    margin: 0,
    color: "#111827"
};

const sectionStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const sectionTitleStyle = {
    marginTop: 0,
    marginBottom: "20px",
    color: "#111827"
};

const inputStyle = {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border:
        "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box"
};

const textareaStyle = {
    width: "100%",
    minHeight: "100px",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border:
        "1px solid #d1d5db",
    fontSize: "15px",
    resize: "vertical",
    boxSizing: "border-box"
};

const paymentOptionsStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
};

const radioLabelStyle = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "16px"
};

const summaryTitleStyle = {
    marginTop: 0,
    marginBottom: "20px",
    color: "#111827"
};

const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    marginBottom: "20px"
};

const itemCardStyle = {
    display: "flex",
    gap: "15px",
    alignItems: "center",
    padding: "12px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb"
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

const itemTextStyle = {
    margin: "4px 0",
    color: "#6b7280"
};

const priceStyle = {
    marginTop: "8px",
    fontWeight: "bold",
    color: "#2563eb"
};

const totalSectionStyle = {
    borderTop:
        "1px solid #e5e7eb",
    paddingTop: "20px",
    marginBottom: "20px"
};

const placeOrderButtonStyle = {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
};

const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "20px"
};

export default Checkout;