import { useState } from "react";

import {
    useNavigate,
    Link
} from "react-router-dom";

import {
    registerUser
} from "../services/authService";

import { toast } from "react-toastify";

function Signup() {

    const [name, setName] =
        useState("");

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const navigate =
        useNavigate();

    const handleSignup =
        async (e) => {

        e.preventDefault();

        try {

            await registerUser({
                name,
                email,
                password
            });

            toast.success("Signup successful");

            navigate("/login");

        } catch (error) {

            console.log(error);

            toast.success("Signup failed");
        }
    };

    return (
        <div style={pageStyle}>

            <div style={cardStyle}>

                <h1 style={titleStyle}>
                    Signup
                </h1>

                <p style={subtitleStyle}>
                    Create your MAS account
                </p>

                <form
                    onSubmit={
                        handleSignup
                    }
                >

                    <div style={fieldStyle}>

                        <label style={labelStyle}>
                            Name
                        </label>

                        <input
                            type="text"
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your name"
                            style={inputStyle}
                            required
                        />

                    </div>

                    <div style={fieldStyle}>

                        <label style={labelStyle}>
                            Email
                        </label>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your email"
                            style={inputStyle}
                            required
                        />

                    </div>

                    <div style={fieldStyle}>

                        <label style={labelStyle}>
                            Password
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                            placeholder="Enter your password"
                            style={inputStyle}
                            required
                        />

                    </div>

                    <button
                        type="submit"
                        style={buttonStyle}
                    >
                        Signup
                    </button>

                </form>

                <p style={bottomTextStyle}>

                    Already have an account?{" "}

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
    boxShadow:
        "0 2px 14px rgba(0,0,0,0.12)"
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
    cursor: "pointer"
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

export default Signup;