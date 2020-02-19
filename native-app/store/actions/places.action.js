import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
	return async (dispatch, getState) => {
		const fileName = image.split('/').pop();
		const newPath = FileSystem.documentDirectory + fileName;

		try {
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
			const dbResult = await insertPlace(title, newPath, 'address', 1.1, 2.2);

			dispatch({
				type: ADD_PLACE,
				placeData: { id: dbResult.insertId, title, newPath },
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};

export const loadPlaces = () => {
	return async (dispatch, getState) => {
		try {
			const dbResult = await fetchPlaces();

			// console.log(dbResult);
			dispatch({
				type: SET_PLACES,
				places: dbResult.rows._array,
			});
		} catch (error) {
			console.log(error);
			throw error;
		}
	};
};
