import React from 'react';
import { FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { Platform } from 'react-native';

import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart.action';
import HeaderButton from '../../components/ui/HeaderButton';

const ProductsOverviewScreen = props => {
	const products = useSelector(state => state.products.availableProducts);
	const dispatch = useDispatch();

	return (
		<FlatList
			data={products}
			keyExtractor={item => item.id}
			renderItem={itemData => (
				<ProductItem
					image={itemData.item.imageUrl}
					title={itemData.item.title}
					price={itemData.item.price}
					onViewDetail={() => {
						props.navigation.navigate('ProductDetail', {
							productId: itemData.item.id,
							productTitle: itemData.item.title,
						});
					}}
					onAddToCart={() => {
						dispatch(cartActions.addToCart(itemData.item));
					}}
				/>
			)}
		/>
	);
};

ProductsOverviewScreen.navigationOptions = navData => {
	return {
		headerTitle: 'All Products',
		headerLeft: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
					title='cart'
					onPress={() => {
						navData.navigation.toggleDrawer();
					}}
				></Item>
			</HeaderButtons>
		),
		headerRight: (
			<HeaderButtons HeaderButtonComponent={HeaderButton}>
				<Item
					iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
					title='cart'
					onPress={() => {
						navData.navigation.navigate({
							routeName: 'Cart',
						});
					}}
				></Item>
			</HeaderButtons>
		),
	};
};

export default ProductsOverviewScreen;
