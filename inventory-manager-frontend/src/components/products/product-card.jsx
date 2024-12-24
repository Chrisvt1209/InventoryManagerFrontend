export default function ProductCard({product}) {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
            <img src="https://placehold.co/600x400" alt="product image" className="w-full" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">{product.price}</p>
            </div>
        </div>
    );
};