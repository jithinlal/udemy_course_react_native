import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';
import Colors from '../../constants/Colors';

const ProductItem = props => {
	return (
		// a card type list item
		<View style={styles.product}>
			<View style={styles.imageContainer}>
				<Image style={styles.image} source={{ uri: props.item.imageUrl }} />
			</View>
			<View style={styles.detail}>
				<Text style={styles.title}>{props.item.title}</Text>
				<Text style={styles.price}>${props.item.price.toFixed(2)}</Text>
			</View>
			<View style={styles.actions}>
				<Button
					color={Colors.primary}
					title='View Details'
					onPress={props.onViewDetail}
				></Button>
				<Button
					color={Colors.primary}
					title='To Cart'
					onPress={props.onAddToCart}
				></Button>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	product: {
		shadowColor: 'black',
		shadowOpacity: 0.26,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 8,
		elevation: 5, // elevation is required for android to show the shadow feature
		borderRadius: 10,
		backgroundColor: 'white',
		height: 300,
		margin: 20,
	},
	imageContainer: {
		width: '100%',
		height: '60%',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		overflow: 'hidden', // for the image to not overflow the container
	},
	image: {
		width: '100%',
		height: '60%',
	},
	detail: {
		alignItems: 'center',
		height: '15%',
		padding: 10,
	},
	title: {
		fontSize: 18,
		marginVertical: 4,
	},
	price: {
		fontSize: 14,
		color: '#888',
	},
	actions: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '25%',
		paddingHorizontal: 20,
	},
});

export default ProductItem;
