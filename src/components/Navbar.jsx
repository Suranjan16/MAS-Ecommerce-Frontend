import { Link, useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Navbar() {

    const navigate = useNavigate();

    const token =
        localStorage.getItem("token");

    const role =
        localStorage.getItem("role");

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        toast.success(
            "Logout successful"
        );

        navigate("/login");

        window.location.reload();
    };

    return (
        <nav style={navbarStyle}>

            <div style={logoStyle}>

                <Link
                    to="/home"
                    style={logoLinkStyle}
                >
                    MAS
                </Link>

            </div>

            <div style={navLinksStyle}>

                <Link
                    to="/home"
                    style={linkStyle}
                >
                    Home
                </Link>

                {
                    token && (

                        <Link
                            to="/cart"
                            style={linkStyle}
                        >
                            Cart
                        </Link>
                    )
                }

                {
                    token && (

                        <Link
                            to="/orders"
                            style={linkStyle}
                        >
                            Orders
                        </Link>
                    )
                }

                {
                    role === "ADMIN" && (

                        <Link
                            to="/admin"
                            style={linkStyle}
                        >
                            Admin
                        </Link>
                    )
                }

                {
                    token && (

                        <Link
                            to="/profile"
                            style={profileStyle}
                        >
                            Profile
                        </Link>
                    )
                }

                {
                    !token ? (

                        <>
                            <Link
                                to="/login"
                                style={linkStyle}
                            >
                                Login
                            </Link>

                            <Link
                                to="/signup"
                                style={signupButtonStyle}
                            >
                                Signup
                            </Link>
                        </>

                    ) : (

                        <button
                            onClick={handleLogout}
                            style={logoutButtonStyle}
                        >
                            Logout
                        </button>
                    )
                }

            </div>

        </nav>
    );
}

const navbarStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "70px",
    backgroundColor: "#111827",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 30px",
    zIndex: 1000,
    boxShadow:
        "0 2px 10px rgba(0,0,0,0.12)"
};

const logoStyle = {
    display: "flex",
    alignItems: "center"
};

const logoLinkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "28px",
    fontWeight: "bold",
    letterSpacing: "1px"
};

const navLinksStyle = {
    display: "flex",
    alignItems: "center",
    gap: "18px"
};

const linkStyle = {
    color: "#e5e7eb",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "15px"
};

const profileStyle = {
    padding: "10px 14px",
    borderRadius: "50px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "14px"
};

const signupButtonStyle = {
    padding: "10px 16px",
    borderRadius: "8px",
    backgroundColor: "#2563eb",
    color: "white",
    textDecoration: "none",
    fontWeight: "bold"
};

const logoutButtonStyle = {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#ef4444",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer"
};

export default Navbar;