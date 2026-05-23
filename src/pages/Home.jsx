import { useEffect, useState } from "react";

import { getAllProducts } from "../services/productService";

function Home() {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetchProducts();

    }, []);

    const fetchProducts = async () => {

        try {

            const data = await getAllProducts();

            setProducts(data);

        } catch (error) {

            console.log(error);
        }
    };

    return (
        <div>

            <h1>MAS Ecommerce</h1>

            <h2>Products</h2>

            {
                products.map((product) => (

                    <div key={product.id}>

                        <h3>{product.name}</h3>

                        <p>Price: ₹{product.price}</p>

                        <hr />

                    </div>
                ))
            }

        </div>
    );
}

export default Home;