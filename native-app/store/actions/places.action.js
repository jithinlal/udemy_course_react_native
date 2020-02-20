import * as FileSystem from 'expo-file-system';
import { insertPlace, fetchPlaces } from '../../helpers/db';
import { GOOGLE_MAPS_API } from '../../config';

export const ADD_PLACE = 'ADD_PLACE';
export const SET_PLACES = 'SET_PLACES';

export const addPlace = (title, image, location) => {
	return async (dispatch, getState) => {
		try {
			const response = await fetch(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${GOOGLE_MAPS_API}`
			);

			if (!response.ok) {
				throw new Error('Something went wrong');
			}

			const resData = response.json();

			// const address = resData.results[0].formatted_address;
			const address = 'Some random place';
			const fileName = image.split('/').pop();
			const newPath = FileSystem.documentDirectory + fileName;
			await FileSystem.moveAsync({
				from: image,
				to: newPath,
			});
			const dbResult = await insertPlace(
				title,
				newPath,
				address,
				location.lat,
				location.lng
			);

			dispatch({
				type: ADD_PLACE,
				placeData: {
					id: dbResult.insertId,
					title,
					newPath,
					address,
					coords: { lat: location.lat, lng: location.lng },
				},
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
