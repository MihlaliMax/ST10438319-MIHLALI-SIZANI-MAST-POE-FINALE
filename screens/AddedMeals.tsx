import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, TextInput } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Meal } from './RootStackParams';

export default function AddedMealsScreen() {
    const [addedMeals, setAddedMeals] = useState<Meal[]>([]); // Initialize with an empty array
    const [newMeal, setNewMeal] = useState<Meal>({ Name: '', Description: '', Course: '', Price: 0 });

    const addMeal = () => {
        setAddedMeals([...addedMeals, newMeal]);
        setNewMeal({ Name: '', Description: '', Course: '', Price: 0 });
    };

    const removeMeal = (index: number) => {
        const updatedMeals = addedMeals.filter((_, i) => i !== index);
        setAddedMeals(updatedMeals);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Added Meals</Text>
            <FlatList
                data={addedMeals}
                keyExtractor={(item, index) => `${item.Name}-${index}`}
                renderItem={({ item, index }) => (
                    <View style={styles.mealDetails}>
                        <Text>Name: {item.Name}</Text>
                        <Text>Description: {item.Description}</Text>
                        <Text>Course: {item.Course}</Text>
                        <Text>Price: ${item.Price.toFixed(2)}</Text>
                        <Button title="Remove" onPress={() => removeMeal(index)} />
                    </View>
                )}
            />
            <TextInput placeholder="Name" value={newMeal.Name} onChangeText={(text) => setNewMeal({ ...newMeal, Name: text })} style={styles.input} />
            <TextInput placeholder="Description" value={newMeal.Description} onChangeText={(text) => setNewMeal({ ...newMeal, Description: text })} style={styles.input} />
            <TextInput placeholder="Course" value={newMeal.Course} onChangeText={(text) => setNewMeal({ ...newMeal, Course: text })} style={styles.input} />
            <TextInput placeholder="Price" value={String(newMeal.Price)} onChangeText={(text) => setNewMeal({ ...newMeal, Price: parseFloat(text) })} style={styles.input} />
            <Button title="Add New Meal" onPress={addMeal} />
        </View>
    );
}


const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { fontSize: 24, marginBottom: 16 },
    mealDetails: { padding: 10, marginVertical: 5, borderColor: '#ccc', borderWidth: 1, borderRadius: 8 },
    input: { borderWidth: 1, padding: 8, marginBottom: 12 }
});
