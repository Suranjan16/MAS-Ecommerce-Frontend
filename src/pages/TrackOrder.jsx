import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import { getOrderById } from "../services/orderService";

import { toast } from "react-toastify";

function TrackOrder() {

    const { orderId } = useParams();

    const [order, setOrder] = useState(null);

    const orderSteps = [
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

            const data =
                await getOrderById(orderId);

            setOrder(data);

        } catch (error) {

            console.log(error);

            toast.error(
                "Failed to load order details"
            );
        }
    };

    if (!order) {

        return (
            <div style={loadingStyle}>
                Loading...
            </div>
        );
    }

    const currentStepIndex =
        orderSteps.indexOf(order.status);

    return (
        <div style={pageStyle}>

            <div style={containerStyle}>

                <h1 style={titleStyle}>
                    Track Order
                </h1>

                <div style={statusContainerStyle}>

                    <h2 style={statusTitleStyle}>
                        Current Status
                    </h2>

                    <div
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
                    </div>

                    {
                        order.status !==
                        "CANCELLED" ? (

                            <div style={timelineContainerStyle}>

                                {
                                    orderSteps.map(
                                        (
                                            step,
                                            index
                                        ) => (

                                            <div
                                                key={step}
                                                style={timelineStepStyle}
                                            >

                                                <div
                                                    style={{
                                                        ...circleStyle,

                                                        backgroundColor:
                                                            index <=
                                                            currentStepIndex
                                                                ? "#2563eb"
                                                                : "#d1d5db"
                                                    }}
                                                >
                                                    ✓
                                                </div>

                                                <p
                                                    style={{
                                                        ...stepTextStyle,

                                                        color:
                                                            index <=
                                                            currentStepIndex
                                                                ? "#111827"
                                                                : "#9ca3af"
                                                    }}
                                                >
                                                    {
                                                        step.replaceAll(
                                                            "_",
                                                            " "
                                                        )
                                                    }
                                                </p>

                                                {
                                                    index !==
                                                        orderSteps.length -
                                                            1 && (

                                                        <div
                                                            style={{
                                                                ...lineStyle,

                                                                backgroundColor:
                                                                    index <
                                                                    currentStepIndex
                                                                        ? "#2563eb"
                                                                        : "#d1d5db"
                                                            }}
                                                        ></div>
                                                    )
                                                }

                                            </div>
                                        )
                                    )
                                }

                            </div>

                        ) : (

                            <div style={cancelledContainerStyle}>

                                <div
                                    style={cancelledCircleStyle}
                                >
                                    ✕
                                </div>

                                <p
                                    style={
                                        cancelledTextStyle
                                    }
                                >
                                    This order has been
                                    cancelled
                                </p>

                            </div>
                        )
                    }

                </div>

                <div style={sectionStyle}>

                    <h2 style={sectionTitleStyle}>
                        Delivery Address
                    </h2>

                    <p style={textStyle}>
                        {order.fullName}
                    </p>

                    <p style={textStyle}>
                        {order.phone}
                    </p>

                    <p style={textStyle}>
                        {order.address}
                    </p>

                    <p style={textStyle}>
                        {order.city},{" "}
                        {order.state} -{" "}
                        {order.pincode}
                    </p>

                </div>

                <div style={sectionStyle}>

                    <h2 style={sectionTitleStyle}>
                        Ordered Products
                    </h2>

                    <div style={itemsContainerStyle}>

                        {
                            order.items.map(
                                (item, index) => (

                                    <div
                                        key={index}
                                        style={itemCardStyle}
                                    >

                                        <img
                                            src={
                                                item.imageUrl
                                            }
                                            alt={
                                                item.productName
                                            }
                                            style={imageStyle}
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
                                                    textStyle
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

                </div>

                <div style={summaryStyle}>

                    <h2>
                        Total Amount:
                        {" "}
                        ₹
                        {
                            order.totalAmount
                        }
                    </h2>

                    {
                        order.paymentMethod ===
                            "ONLINE" &&
                        order.status !==
                            "CANCELLED" && (

                            <>
                                <p style={textStyle}>
                                    Payment Method:
                                    {" "}
                                    {
                                        order.paymentMethod
                                    }
                                </p>

                                <p style={textStyle}>
                                    Payment Status:
                                    {" "}
                                    {
                                        order.paymentStatus
                                    }
                                </p>
                            </>
                        )
                    }

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
    maxWidth: "900px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "25px"
};

const titleStyle = {
    textAlign: "center",
    color: "#111827"
};

const statusContainerStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const statusTitleStyle = {
    marginBottom: "20px",
    color: "#111827"
};

const statusBadgeStyle = {
    display: "inline-block",
    padding: "12px 24px",
    borderRadius: "999px",
    fontWeight: "bold",
    fontSize: "18px",
    marginBottom: "35px"
};

const timelineContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    position: "relative",
    flexWrap: "wrap"
};

const timelineStepStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    position: "relative"
};

const circleStyle = {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    fontWeight: "bold",
    zIndex: 2
};

const lineStyle = {
    position: "absolute",
    top: "20px",
    left: "50%",
    width: "100%",
    height: "4px",
    zIndex: 1
};

const stepTextStyle = {
    marginTop: "10px",
    fontSize: "14px",
    fontWeight: "600",
    textAlign: "center"
};

const cancelledContainerStyle = {
    marginTop: "20px"
};

const cancelledCircleStyle = {
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    backgroundColor: "#dc2626",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 auto"
};

const cancelledTextStyle = {
    marginTop: "15px",
    color: "#991b1b",
    fontWeight: "bold",
    fontSize: "18px"
};

const sectionStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const sectionTitleStyle = {
    marginBottom: "20px",
    color: "#111827"
};

const itemsContainerStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
};

const itemCardStyle = {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    padding: "14px",
    borderRadius: "12px",
    backgroundColor: "#f9fafb"
};

const imageStyle = {
    width: "100px",
    height: "100px",
    objectFit: "contain",
    backgroundColor: "#f3f4f6",
    borderRadius: "10px",
    padding: "8px"
};

const productNameStyle = {
    margin: 0,
    marginBottom: "10px",
    color: "#111827"
};

const textStyle = {
    margin: "5px 0",
    color: "#4b5563"
};

const priceStyle = {
    marginTop: "8px",
    fontWeight: "bold",
    color: "#2563eb"
};

const summaryStyle = {
    backgroundColor: "white",
    padding: "25px",
    borderRadius: "16px",
    boxShadow:
        "0 2px 12px rgba(0,0,0,0.08)"
};

const loadingStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "20px"
};

export default TrackOrder;