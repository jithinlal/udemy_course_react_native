import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../Components/HeaderButton';
import CategoriesScreen from '../screens/CategoriesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../Constants/Colors';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white',
	},
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
};

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
			navigationOptions: navData => ({
				headerLeft: () => (
					<HeaderButtons HeaderButtonComponent={HeaderButton}>
						<Item
							title='Menu'
							iconName='ios-menu'
							onPress={() => {
								navData.navigation.toggleDrawer();
							}}
						></Item>
					</HeaderButtons>
				),
			}),
		},
		CategoryMeals: {
			screen: CategoryMealScreen,
		},
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const favNavigator = createStackNavigator(
	{
		Favorites: {
			screen: FavoritesScreen,
			navigationOptions: navData => ({
				headerTitle: 'Your favorites',
				headerLeft: () => (
					<HeaderButtons HeaderButtonComponent={HeaderButton}>
						<Item
							title='Menu'
							iconName='ios-menu'
							onPress={() => {
								navData.navigation.toggleDrawer();
							}}
						></Item>
					</HeaderButtons>
				),
			}),
		},
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return (
					<Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
				);
			},
			tabBarColor: Colors.primaryColor,
		},
	},
	Favorites: {
		screen: favNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor,
		},
	},
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeColor: 'white',
				shifting: true,
		  })
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					activeColor: 'white',
				},
		  });

const FiltersNavigator = createStackNavigator({
	Filters: {
		screen: FiltersScreen,
		navigationOptions: navData => ({
			headerTitle: 'Filter Meals',
			headerLeft: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title='Menu'
						iconName='ios-menu'
						onPress={() => {
							navData.navigation.toggleDrawer();
						}}
					></Item>
				</HeaderButtons>
			),
		}),
	},
});

const MainNavigator = createDrawerNavigator({
	MealsFavs: MealsFavTabNavigator,
	Filters: FiltersNavigator,
});

export default createAppContainer(MainNavigator);
