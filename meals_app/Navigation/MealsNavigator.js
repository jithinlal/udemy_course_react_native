import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { Platform, Text } from 'react-native';
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
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
		fontWeight: undefined,
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
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
				) : (
					'Meals'
				),
		},
	},
	Favorites: {
		screen: favNavigator,
		navigationOptions: {
			tabBarIcon: tabInfo => {
				return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === 'android' ? (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
				) : (
					'Favorites'
				),
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
					labelStyle: {
						fontFamily: 'open-sans-bold',
					},
					activeColor: 'white',
				},
		  });

const FiltersNavigator = createStackNavigator(
	{
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
	},
	{
		defaultNavigationOptions: defaultStackNavOptions,
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealsFavs: {
			screen: MealsFavTabNavigator,
			navigationOptions: {
				drawerLabel: 'Meals',
			},
		},
		Filters: FiltersNavigator,
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: 'open-sans-bold',
			},
		},
	}
);

export default createAppContainer(MainNavigator);
