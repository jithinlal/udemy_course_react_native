import React from 'react';
import { FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import ProductItem from '../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
	const products = useSelector(state => state.products.availableProducts);
	return (
		<FlatList
			data={products}
			keyExtractor={item => item.id}
			renderItem={itemData => (
				<ProductItem
					item={itemData.item}
					onViewDetail={() => {
						props.navigation.navigate({
							routeName: 'ProductDetail',
							params: {
								productId: itemData.item.id,
								productTitle: itemData.item.title,
							},
						});
					}}
					onAddToCart={() => {}}
				/>
			)}
		/>
	);
};

export default ProductsOverviewScreen;
