import { useState, useEffect } from 'react';
import { backendApi } from "../../utils/backend-api.jsx";
import ProductCard from './product-card';

export default function ProductList() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        backendApi.get('/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    return (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
            {products.map(product => (
                <ProductCard className="h-32 rounded-lg bg-gray-200" key={product.id} product={product} />
            ))}
        </div>
    );
}