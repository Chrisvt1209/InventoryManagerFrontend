import { ProductPropTypes } from "../../domain/proptypes/product";

export default function ProductCard({ product }) {
    return (
        <div className="max-w-md mx-auto rounded-md overflow-hidden shadow-md hover:shadow-lg">
            <img className="w-full" src="https://placehold.co/600x400" width="600" height="400" alt="product image" />
            <div className="py-4">
                <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                <span className="font-bold text-lg">{product.price}</span>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: ProductPropTypes.isRequired,
}