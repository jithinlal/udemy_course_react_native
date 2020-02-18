import React, { useEffect, useState } from 'react';
import {
	Platform,
	FlatList,
	ActivityIndicator,
	View,
	Text,
	StyleSheet,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/ui/HeaderButton';
import OrderItem from '../../components/shop/OrderItem';
import * as orderActions from '../../store/actions/orders.action';
import Colors from '../../constants/Colors';

const OrdersScreen = props => {
	const [isLoading, setIsLoading] = useState(false);
	const orders = useSelector(state => state.orders.orders);
	const dispatch = useDispatch();

	useEffect(() => {
		setIsLoading(true);
		dispatch(orderActions.fetchOrders()).then(() => {
			setIsLoading(false);
		});
	}, [dispatch]);

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator
					size='large'
					color={Colors.primary}
				></ActivityIndicator>
			</View>
		);
	}

	if (orders.length === 0) {
		return (
			<View style={styles.centered}>
				<Text>No orders found for this user, add some</Text>
			</View>
		);
	}

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

const styles = StyleSheet.create({
	centered: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default OrdersScreen;
