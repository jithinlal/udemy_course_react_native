import React from 'react';
import { combineReducers, createStore } from 'redux';
import { Provider } from 'react-redux';

import productsReducer from './store/reducers/products.reducers';
import ShopNavigation from './navigation/ShopNavigator';

const rootReducer = combineReducers({
	products: productsReducer,
});

const store = createStore(rootReducer);

export default function App() {
	return (
		<Provider store={store}>
			<ShopNavigation />
		</Provider>
	);
}
