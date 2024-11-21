// RootStackParamList.ts
export type RootStackParamList = {
    Home: { meals: Meal[] };
    AddMeal: undefined;
    AddedMeals: { meals: Meal[] };
};

// Navigation Setup (e.g., in App.tsx)
import AddedMealsScreen from './AddedMeals';

<Stack.Screen name="AddedMeals" component={AddedMealsScreen} />
yuikj