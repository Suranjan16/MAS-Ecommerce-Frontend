import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Navbar() {

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        toast.success("Logout successful");

        navigate("/login");

        window.location.reload();
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 30px",
                backgroundColor: "#111827",
                color: "white",
                position: "sticky",
                top: 0,
                zIndex: 1000
            }}
        >

            <h2
                style={{
                    margin: 0
                }}
            >
                MAS
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                }}
            >

                <Link
                    to="/home"
                    style={linkStyle}
                >
                    Home
                </Link>

                {
                    token && (
                        <>
                            <Link
                                to="/cart"
                                style={linkStyle}
                            >
                                Cart
                            </Link>

                            <Link
                                to="/orders"
                                style={linkStyle}
                            >
                                Orders
                            </Link>
                        </>
                    )
                }

                {
                    role === "ADMIN" && (
                        <Link
                            to="/admin"
                            style={linkStyle}
                        >
                            Admin Dashboard
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
                                style={linkStyle}
                            >
                                Signup
                            </Link>
                        </>
                    ) : (
                        <button
                            onClick={handleLogout}
                            style={{
                                padding: "8px 14px",
                                border: "none",
                                backgroundColor: "#ef4444",
                                color: "white",
                                borderRadius: "6px",
                                cursor: "pointer"
                            }}
                        >
                            Logout
                        </button>
                    )
                }

            </div>

        </div>
    );
}

const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontWeight: "500"
};

export default Navbar;