import React from 'react';
import { TouchableOpacity, View, StyleSheet, Image, Text } from 'react-native';

import { MAPS_API } from '../config';

const MapPreview = props => {
	let imagePreviewUrl;

	if (props.location) {
		imagePreviewUrl = `https://image.maps.ls.hereapi.com/mia/1.6/mapview?apiKey=${MAPS_API}&lat=${props.location.lat}&lon=${props.location.lng}&vt=0&z=14`;
	}
	return (
		<TouchableOpacity
			onPress={props.onPress}
			style={{ ...styles.mapPreview, ...props.style }}
		>
			{props.location ? (
				<Image source={{ uri: imagePreviewUrl }} style={styles.mapImage} />
			) : (
				props.children
			)}
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	mapPreview: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	mapImage: {
		width: '100%',
		height: '100%',
	},
});

export default MapPreview;
