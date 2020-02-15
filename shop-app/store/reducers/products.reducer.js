import PRODUCTS from '../../data/dummy-data';
import {
	DELETE_PRODUCT,
	CREATE_PRODUCT,
	UPDATE_PRODUCT,
} from '../actions/products.action';
import Product from '../../models/product';

const initialState = {
	availableProducts: PRODUCTS,
	userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1'),
};

export default (state = initialState, action) => {
	switch (action.type) {
		case CREATE_PRODUCT:
			const newProduct = new Product(
				new Date().toString(),
				'u1',
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				action.productData.price
			);
			return {
				...state,
				availableProducts: state.availableProducts.concat(newProduct),
				userProducts: state.userProducts.concat(newProduct),
			};
			break;
		case UPDATE_PRODUCT:
			const productIndex = state.userProducts.findIndex(
				prod => prod.id === action.productId
			);
			const availableProductIndex = state.availableProducts.findIndex(
				prod => prod.id === action.productId
			);
			const updatedProduct = new Product(
				action.productId,
				state.userProducts[productIndex].ownerId,
				action.productData.title,
				action.productData.imageUrl,
				action.productData.description,
				state.userProducts[productIndex].price
			);

			const updatedUserProducts = [...state.userProducts];
			updatedUserProducts[productIndex] = updatedProduct;
			const updatedAvailableProducts = [...state.availableProducts];
			updatedAvailableProducts[availableProductIndex] = updatedProduct;

			return {
				...state,
				availableProducts: updatedAvailableProducts,
				userProducts: updatedUserProducts,
			};
			break;
		case DELETE_PRODUCT:
			return {
				...state,
				userProducts: state.userProducts.filter(
					product => product.id !== action.pid
				),
				availableProducts: state.availableProducts.filter(
					product => product.id !== action.pid
				),
			};
			break;
		default:
			break;
	}
	return state;
};