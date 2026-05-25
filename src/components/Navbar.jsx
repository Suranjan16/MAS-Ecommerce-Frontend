import { Link } from "react-router-dom";

function Navbar() {
    const role = localStorage.getItem("role");

    return (
        <div>
            <h2>MAS Ecommerce</h2>

            <Link to="/home">Home</Link>
            <br />

            <Link to="/cart">Cart</Link>
            <br />

            <Link to="/orders">Orders</Link>
            <br />

            {role === "ADMIN" && (
                <>
                    <Link to="/admin">Admin Dashboard</Link>
                    <br />
                </>
            )}

            <Link to="/login">Login</Link>
            <br />

            <Link to="/signup">Signup</Link>

            <hr />
        </div>
    );
}

export default Navbar;