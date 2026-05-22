import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <h2>MAS Ecommerce</h2>

      <Link to="/home">Home</Link>

      <br />

      <Link to="/login">Login</Link>

      <br />

      <Link to="/signup">Signup</Link>

      <hr />
    </div>
  );
}

export default Navbar;