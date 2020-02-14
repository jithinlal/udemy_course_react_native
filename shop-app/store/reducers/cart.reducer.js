import { ADD_TO_CART, REMOVE_FROM_CART } from '../actions/cart.action';
import { ADD_ORDER } from '../actions/orders.action';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products.action';

const initialState = {
	items: {},
	totalAmount: 0,
};

export default (state = initialState, action) => {
	switch (action.type) {
		case ADD_TO_CART:
			const addedProduct = action.product;
			const prodPrice = addedProduct.price;
			const prodTitle = addedProduct.title;

			let updatedOrNewCartItem;
			if (state.items[addedProduct.id]) {
				updatedOrNewCartItem = new CartItem(
					state.items[addedProduct.id].quantity + 1,
					prodPrice,
					prodTitle,
					state.items[addedProduct.id].sum + prodPrice
				);
			} else {
				updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
			}

			return {
				...state,
				items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
				totalAmount: state.totalAmount + prodPrice,
			};
			break;

		case REMOVE_FROM_CART:
			const selectedCartItem = state.items[action.productId];
			const currentQty = selectedCartItem.quantity;
			let updatedCartItems;
			if (currentQty > 1) {
				const updatedCartItem = new CartItem(
					selectedCartItem.quantity - 1,
					selectedCartItem.productPrice,
					selectedCartItem.productTitle,
					selectedCartItem.sum - selectedCartItem.productPrice
				);

				updatedCartItems = {
					...state.items,
					[action.productId]: updatedCartItem,
				};
			} else {
				updatedCartItems = { ...state.items };
				delete updatedCartItems[action.productId];
			}

			return {
				...state,
				items: updatedCartItems,
				totalAmount: state.totalAmount - selectedCartItem.productPrice,
			};
			break;

		/* important concept in redux
		 * every action can be seen by every reducer
		 * it is the reducers job to differentiate btw
		 * what can be taken and what not to be taken
		 */
		case ADD_ORDER:
			return initialState;
			break;
		case DELETE_PRODUCT:
			if (!state.items[action.pid]) {
				return state;
			}
			const updatedItems = { ...state.items };
			const itemTotal = state.items[action.pid].sum;
			delete updatedItems[action.pid];
			return {
				...state,
				items: updatedItems,
				totalAmount: state.totalAmount - itemTotal,
			};
			break;
		default:
			break;
	}
	return state;
};
