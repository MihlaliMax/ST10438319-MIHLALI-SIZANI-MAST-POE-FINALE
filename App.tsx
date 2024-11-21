import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/Home'; // Import HomeScreen
import AddMealScreen from './screens/AddMeal'; // Import AddMealScreen
import AddedMealsScreen from './screens/AddedMeals'; // Import AddedMealsScreen

import { RootStackParamList } from './screens/RootStackParams';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddMeal" component={AddMealScreen} />
        <Stack.Screen name="AddedMeals" component={AddedMealsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}ggu
