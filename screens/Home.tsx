import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, Meal } from './RootStackParams';

type HomeScreenProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen({ route }: { route: RouteProp<RootStackParamList, 'Home'> }) {
    const navigation = useNavigation<HomeScreenProp>();

    // Updated initial meals with the new dishes added to their respective courses
    const initialMeals: Meal[] = [
        { Name: 'Bruschetta Trio', Description: 'Grilled baguette topped with tomato-basil salsa, roasted pepper and feta, and olive tapenade.', Course: 'Starters', Price: 6.99 },
        { Name: 'Shrimp Cocktail', Description: 'Chilled shrimp served with a zesty cocktail sauce.', Course: 'Starters', Price: 10.99 },
        { Name: 'Grilled Salmon', Description: 'Freshly grilled salmon fillet served with a lemon-dill sauce, accompanied by roasted asparagus and wild rice.', Course: 'Mains', Price: 18.99 },
        { Name: 'Beef Tenderloin Steak', Description: 'Juicy grilled beef tenderloin topped with garlic butter.', Course: 'Mains', Price: 24.99 },
        { Name: 'Chocolate Lava Cake', Description: 'Warm, rich chocolate cake with a molten chocolate center, served with vanilla ice cream.', Course: 'Desserts', Price: 7.99 },
        { Name: 'Key Lime Pie', Description: 'Tangy and creamy pie with a graham cracker crust.', Course: 'Desserts', Price: 5.99 }
    ];

    const [meals, setMeals] = useState<Meal[]>(initialMeals);

    // Calculate average prices per course
    const calculateAveragePrice = (course: string) => {
        const courseMeals = meals.filter(meal => meal.Course === course);
        const totalPrice = courseMeals.reduce((sum, meal) => sum + meal.Price, 0);
        return courseMeals.length > 0 ? (totalPrice / courseMeals.length).toFixed(2) : '0.00';
    };

    // Add a new meal
    const addMeal = (newMeal: Meal) => {
        setMeals(prevMeals => [...prevMeals, newMeal]);
    };

    // Remove a meal by index
    const removeMeal = (index: number) => {
        const updatedMeals = meals.filter((_, i) => i !== index);
        setMeals(updatedMeals);
    };

    useEffect(() => {
        if (route.params?.newMeal) {
            addMeal(route.params.newMeal);
        }
    }, [route.params?.newMeal]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Chef's Menu</Text>
            
            {/* Total number of menu items and average prices */}
            <Text>Total Items: {meals.length}</Text>
            <Text>Average Price for Starters: ${calculateAveragePrice('Starters')}</Text>
            <Text>Average Price for Mains: ${calculateAveragePrice('Mains')}</Text>
            <Text>Average Price for Desserts: ${calculateAveragePrice('Desserts')}</Text>

            <Text style={styles.courseTitle}>Menu</Text>
            <FlatList
                data={meals}
                keyExtractor={(item, index) => `${item.Name}-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.mealDetails}>
                        <Text>Name: {item.Name}</Text>
                        <Text>Course: {item.Course}</Text>
                        <Text>Price: ${item.Price.toFixed(2)}</Text>
                        <Button title="Remove" onPress={() => removeMeal(index)} />
                    </View>
                )}
            />

            <Button title="Filter Course" onPress={() => navigation.navigate('AddMeal')} />
            <Button title="Add Meal" onPress={() => navigation.navigate('AddedMeals')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, marginBottom: 16 },
    courseTitle: { fontSize: 20, marginTop: 16, color: 'blue' },
    mealDetails: { padding: 10, marginVertical: 5, borderColor: '#ccc', borderWidth: 1, borderRadius: 8 }
});
