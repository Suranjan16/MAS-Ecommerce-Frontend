import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";

import { toast } from "react-toastify";

function TrackOrder() {
    const { orderId } = useParams();

    const navigate = useNavigate();

    const [order, setOrder] = useState(null);

    const trackingSteps = [
        "PLACED",
        "CONFIRMED",
        "SHIPPED",
        "OUT_FOR_DELIVERY",
        "DELIVERED"
    ];

    useEffect(() => {
        fetchOrder();
    }, []);

    const fetchOrder = async () => {
        try {
            const data = await getOrderById(orderId);

            setOrder(data);
        } catch (error) {
            console.log(error);

            toast.error("Failed to load order tracking");
        }
    };

    const getCurrentStepIndex = () => {
        if (!order) {
            return -1;
        }

        if (order.status === "CANCELLED") {
            return -1;
        }

        return trackingSteps.indexOf(order.status);
    };

    if (!order) {
        return (
            <div style={pageStyle}>
                <h2>Loading order tracking...</h2>
            </div>
        );
    }

    const currentStepIndex = getCurrentStepIndex();

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>
                    Track Order #{order.orderId}
                </h1>

                <p style={subtitleStyle}>
                    Current Status:{" "}
                    <strong>{order.status}</strong>
                </p>

                {order.status === "CANCELLED" ? (
                    <div style={cancelledBoxStyle}>
                        This order has been cancelled.
                    </div>
                ) : (
                    <div style={timelineStyle}>
                        {trackingSteps.map((step, index) => (
                            <div key={step} style={stepRowStyle}>
                                <div
                                    style={{
                                        ...circleStyle,
                                        backgroundColor:
                                            index <= currentStepIndex
                                                ? "#16a34a"
                                                : "#d1d5db"
                                    }}
                                >
                                    {index <= currentStepIndex
                                        ? "✓"
                                        : index + 1}
                                </div>

                                <div style={stepContentStyle}>
                                    <h3 style={stepTitleStyle}>
                                        {step.replaceAll("_", " ")}
                                    </h3>

                                    <p style={stepTextStyle}>
                                        {index <= currentStepIndex
                                            ? "Completed"
                                            : "Pending"}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                <div style={itemsSectionStyle}>
                    <h2>Ordered Items</h2>

                    {order.items.map((item, index) => (
                        <div key={index} style={itemCardStyle}>
                            <img
                                src={
                                    item.imageUrl ||
                                    "https://placehold.co/100x100"
                                }
                                alt={item.productName}
                                style={imageStyle}
                                onError={(e) => {
                                    e.target.src =
                                        "https://placehold.co/100x100";
                                }}
                            />

                            <div>
                                <h3 style={itemNameStyle}>
                                    {item.productName}
                                </h3>

                                <p>Quantity: {item.quantity}</p>

                                <p>Price: ₹{item.price}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate("/orders")}
                    style={backButtonStyle}
                >
                    Back to Orders
                </button>
            </div>
        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    padding: "100px 20px 30px",
    backgroundColor: "#f9fafb"
};

const cardStyle = {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 2px 14px rgba(0,0,0,0.12)"
};

const titleStyle = {
    textAlign: "center",
    color: "#111827",
    marginBottom: "10px"
};

const subtitleStyle = {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "30px"
};

const timelineStyle = {
    marginBottom: "30px"
};

const stepRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "22px"
};

const circleStyle = {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold"
};

const stepContentStyle = {
    flex: 1
};

const stepTitleStyle = {
    margin: 0,
    color: "#111827"
};

const stepTextStyle = {
    marginTop: "5px",
    color: "#6b7280"
};

const cancelledBoxStyle = {
    padding: "18px",
    backgroundColor: "#fee2e2",
    color: "#991b1b",
    borderRadius: "10px",
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: "30px"
};

const itemsSectionStyle = {
    borderTop: "1px solid #e5e7eb",
    paddingTop: "20px"
};

const itemCardStyle = {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "14px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb",
    marginBottom: "12px"
};

const imageStyle = {
    width: "90px",
    height: "90px",
    objectFit: "contain",
    backgroundColor: "#f3f4f6",
    borderRadius: "8px",
    padding: "8px"
};

const itemNameStyle = {
    margin: 0,
    color: "#111827"
};

const backButtonStyle = {
    width: "100%",
    padding: "12px",
    marginTop: "20px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

export default TrackOrder;