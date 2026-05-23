import { useEffect, useState } from "react";

import {
    getCart,
    removeProductFromCart,
    updateCartQuantity
} from "../services/cartService";

function Cart() {

    const [cart, setCart] = useState(null);

    useEffect(() => {

        fetchCart();

    }, []);

    const fetchCart = async () => {

        try {

            const data = await getCart();

            setCart(data);

        } catch (error) {

            console.log(error);
        }
    };

    const removeItem = async (productId) => {

        try {

            const response =
                await removeProductFromCart(
                    productId
                );

            alert(response);

            fetchCart();

        } catch (error) {

            console.log(error);

            alert("Failed to remove item");
        }
    };

    const updateQuantity = async (
        productId,
        quantity
    ) => {

        try {

            const response =
                await updateCartQuantity(
                    productId,
                    quantity
                );

            alert(response);

            fetchCart();

        } catch (error) {

            console.log(error);

            alert("Failed to update quantity");
        }
    };

    if (!cart) {

        return <h2>Loading Cart...</h2>;
    }

    return (
        <div>

            <h1>My Cart</h1>

            {
                cart.items.map((item) => (

                    <div key={item.productId}>

                        <h3>
                            {item.productName}
                        </h3>

                        <p>
                            Quantity: {item.quantity}
                        </p>

                        <button
                            onClick={() =>
                                updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                )
                            }
                        >
                            +
                        </button>

                        <button
                            disabled={item.quantity <= 1}
                            onClick={() =>
                                updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                )
                            }
                        >
                            -
                        </button>

                        <p>
                            Price: ₹{item.price}
                        </p>

                        <button
                            onClick={() =>
                                removeItem(
                                    item.productId
                                )
                            }
                        >
                            Remove
                        </button>

                        <hr />

                    </div>
                ))
            }

            <h2>
                Total: ₹{cart.totalAmount}
            </h2>

        </div>
    );
}

export default Cart;