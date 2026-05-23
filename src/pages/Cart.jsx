import { useEffect, useState } from "react";

import { getCart } from "../services/cartService";

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

    if (!cart) {
        return <h2>Loading Cart...</h2>;
    }

    return (
        <div>

            <h1>My Cart</h1>

            {
                cart.items.map((item) => (

                    <div key={item.id}>

                        <h3>
                            {item.productName}
                        </h3>

                        <p>
                            Quantity: {item.quantity}
                        </p>

                        <p>
                            Price: ₹{item.price}
                        </p>

                        <hr />

                    </div>
                ))
            }

            <h2>
                Total: ₹{cart.totalPrice}
            </h2>

        </div>
    );
}

export default Cart;