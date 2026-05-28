import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import AdminRoute from "./components/AdminRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import UpdateProduct from "./pages/UpdateProduct";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import ProductDetails from "./pages/ProductDetails";
import TrackOrder from "./pages/TrackOrder";

function App() {
    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/profile/update" element={<UpdateProfile />} />
                <Route path="/product/:id" element={<ProductDetails />} />

                <Route
                    path="/admin"
                    element={
                        <AdminRoute>
                            <AdminDashboard />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/add-product"
                    element={
                        <AdminRoute>
                            <AddProduct />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/admin/update-product/:id"
                    element={
                        <AdminRoute>
                            <UpdateProduct />
                        </AdminRoute>
                    }
                />

                <Route
                    path="/track-order/:orderId"
                    element={<TrackOrder />}
                />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={3000}
            />
        </BrowserRouter>
    );
}

export default App;