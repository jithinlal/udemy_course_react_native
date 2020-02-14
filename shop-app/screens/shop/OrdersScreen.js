import React from 'react';
import { Platform, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';

const OrdersScreen = props => {
	const orders = useSelector(state => state.orders.orders);

	return (
		<FlatList
			data={orders}
			keyExtractor={item => item.id}
			renderItem={itemData => <OrderItem item={itemData.item} />}
		/>
	);
};

OrdersScreen.navigationOptions = navData => {
	return {
		headerTitle: 'Your orders',
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
	};
};

export default OrdersScreen;
