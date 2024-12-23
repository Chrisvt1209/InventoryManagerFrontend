import { useState, useEffect } from 'react';
import { backendApi } from '../utils/backend-api.jsx';
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {products.map(product => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}