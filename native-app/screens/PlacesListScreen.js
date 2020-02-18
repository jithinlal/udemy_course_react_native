import React, { useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';

import * as placesActions from '../store/actions/places.action';

const PlacesListScreen = props => {
	const dispatch = useDispatch();
	const places = useSelector(state => state.places.places);

	useEffect(() => {
		dispatch(placesActions.loadPlaces());
	}, [dispatch]);

	return (
		<FlatList
			data={places}
			keyExtractor={item => item.id}
			renderItem={itemData => (
				<PlaceItem
					image={itemData.item.imageUri}
					title={itemData.item.title}
					address={null}
					onSelect={() => {
						props.navigation.navigate('PlaceDetail', {
							placeTitle: itemData.item.title,
							placeId: itemData.item.id,
						});
					}}
				/>
			)}
		/>
	);
};

PlacesListScreen.navigationOptions = navData => {
	return {
		headerTitle: 'All Places',
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					title='Add place'
					iconName={Platform.OS === 'android' ? 'md-add' : 'ios-add'}
					onPress={() => {
						navData.navigation.navigate('NewPlace');
					}}
				/>
			</HeaderButtons>
		),
	};
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
