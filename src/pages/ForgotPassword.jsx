import { useState } from "react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";

import { forgotPassword } from "../services/authService";

function ForgotPassword() {

    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {

            toast.error(
                "Enter a valid email address"
            );

            return;
        }

        setLoading(true);

        try {

            const message =
                await forgotPassword(email);

            toast.success(message);

            setEmail("");

        } catch (error) {

            console.log(error);

            if (error.response?.data) {

                toast.error(
                    error.response.data
                );

            } else {

                toast.error(
                    "Something went wrong"
                );
            }

        } finally {

            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>

            <div style={cardStyle}>

                <h1 style={titleStyle}>
                    Forgot Password
                </h1>

                <p style={subtitleStyle}>
                    Enter your email to receive a password reset link
                </p>

                <form onSubmit={handleSubmit}>

                    <div style={fieldStyle}>

                        <label style={labelStyle}>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            placeholder="Enter your email"
                            style={inputStyle}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...buttonStyle,
                            opacity: loading ? 0.7 : 1,
                            cursor: loading
                                ? "not-allowed"
                                : "pointer"
                        }}
                    >
                        {
                            loading
                                ? "Sending..."
                                : "Send Reset Link"
                        }
                    </button>

                </form>

                <p style={bottomTextStyle}>

                    Remember your password?{" "}

                    <Link
                        to="/login"
                        style={linkStyle}
                    >
                        Login
                    </Link>

                </p>

            </div>

        </div>
    );
}

const pageStyle = {
    minHeight: "100vh",
    paddingTop: "90px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9fafb"
};

const cardStyle = {
    width: "380px",
    padding: "30px",
    borderRadius: "14px",
    backgroundColor: "white",
    boxShadow: "0 2px 14px rgba(0,0,0,0.12)"
};

const titleStyle = {
    marginBottom: "8px",
    textAlign: "center",
    color: "#111827"
};

const subtitleStyle = {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: "25px"
};

const fieldStyle = {
    marginBottom: "18px"
};

const labelStyle = {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#374151"
};

const inputStyle = {
    width: "100%",
    padding: "11px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "15px",
    boxSizing: "border-box"
};

const buttonStyle = {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
    boxShadow: "0 2px 8px rgba(37,99,235,0.3)"
};

const bottomTextStyle = {
    marginTop: "18px",
    textAlign: "center",
    color: "#6b7280"
};

const linkStyle = {
    color: "#2563eb",
    fontWeight: "bold",
    textDecoration: "none"
};

export default ForgotPassword;