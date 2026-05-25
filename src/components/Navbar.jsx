import { Link, useNavigate } from "react-router-dom";

function Navbar() {

    const token = localStorage.getItem("token");

    const role = localStorage.getItem("role");

    const navigate = useNavigate();

    const handleLogout = () => {

        localStorage.removeItem("token");

        localStorage.removeItem("role");

        alert("Logout successful");

        navigate("/login");

        window.location.reload();
    };

    return (
        <div>

            <h2>MAS Ecommerce</h2>

            <Link to="/home">Home</Link>

            <br />

            {
                token && (
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>

                        <br />

                        <Link to="/orders">
                            Orders
                        </Link>

                        <br />
                    </>
                )
            }

            {
                role === "ADMIN" && (
                    <>
                        <Link to="/admin">
                            Admin Dashboard
                        </Link>

                        <br />
                    </>
                )
            }

            {
                !token ? (
                    <>
                        <Link to="/login">
                            Login
                        </Link>

                        <br />

                        <Link to="/signup">
                            Signup
                        </Link>
                    </>
                ) : (
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                )
            }

            <hr />

        </div>
    );
}

export default Navbar;