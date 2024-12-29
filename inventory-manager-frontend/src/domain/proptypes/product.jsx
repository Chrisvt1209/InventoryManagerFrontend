import PropTypes from 'prop-types';

export const ProductPropTypes = PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number,
});