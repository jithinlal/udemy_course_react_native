import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createAppContainer } from 'react-navigation';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealScreen from '../screens/CategoryMealScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../Constants/Colors';

const MealsNavigator = createStackNavigator(
	{
		Categories: {
			screen: CategoriesScreen,
		},
		CategoryMeals: {
			screen: CategoryMealScreen,
		},
		MealDetail: MealDetailScreen,
	},
	{
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor:
					Platform.OS === 'android' ? Colors.primaryColor : 'white',
			},
			headerTintColor:
				Platform.OS === 'android' ? 'white' : Colors.primaryColor,
		},
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
		screen: FavoritesScreen,
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

export default createAppContainer(MealsFavTabNavigator);
