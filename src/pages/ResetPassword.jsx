import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";

import axios from "axios";
import { toast } from "react-toastify";

import API_URL from "../config/api";

function ResetPassword() {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        if (!token) {
            toast.error("Invalid reset link");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${API_URL}/auth/reset-password`,
                {
                    token,
                    newPassword
                }
            );

            toast.success(response.data);

            setTimeout(() => {
                navigate("/login");
            }, 1500);
        } catch (error) {
            console.log(error);

            if (error.response?.data) {
                toast.error(error.response.data);
            } else {
                toast.error("Failed to reset password");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={pageStyle}>
            <div style={cardStyle}>
                <h1 style={titleStyle}>
                    Reset Password
                </h1>

                <p style={subtitleStyle}>
                    Enter your new password
                </p>

                <form onSubmit={handleResetPassword}>
                    <div style={fieldStyle}>
                        <label style={labelStyle}>
                            New Password
                        </label>

                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                            placeholder="Enter new password"
                            style={inputStyle}
                            required
                        />
                    </div>

                    <div style={fieldStyle}>
                        <label style={labelStyle}>
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            placeholder="Confirm new password"
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
                        {loading
                            ? "Resetting..."
                            : "Reset Password"}
                    </button>
                </form>
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

export default ResetPassword;