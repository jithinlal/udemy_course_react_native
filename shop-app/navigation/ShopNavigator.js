import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { Platform } from 'react-native';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import Colors from '../constants/Colors';

const productsNavigator = createStackNavigator(
	{
		ProductsOverview: {
			screen: ProductsOverviewScreen,
			navigationOptions: {
				headerTitle: 'All Products',
			},
		},
		ProductDetail: {
			screen: ProductDetailScreen,
		},
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
			},
			headerTitleStyle: { fontFamily: 'open-sans-bold' },
			headerBackTitleStyle: { fontFamily: 'open-sans' },
			headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
		},
	}
);

export default createAppContainer(productsNavigator);
