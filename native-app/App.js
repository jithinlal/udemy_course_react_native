import React from 'react';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';

import PlaceNavigator from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/places.reducer';
import { init } from './helpers/db';

init()
	.then(() => {
		console.log('DB initialized');
	})
	.catch(err => {
		console.log(err);
		console.log('DB initialization failed');
	});

const rootReducer = combineReducers({
	places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
	return (
		<Provider store={store}>
			<PlaceNavigator />
		</Provider>
	);
}
