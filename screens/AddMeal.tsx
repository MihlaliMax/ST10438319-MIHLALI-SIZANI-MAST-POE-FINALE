import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const mealData = {
    Starters: [
        { Name: 'Bruschetta Trio', Description: 'Grilled baguette topped with tomato-basil salsa.', Price: 6.99 },
        { Name: 'Stuffed Mushrooms', Description: 'Mushroom caps filled with a savory blend of cream cheese.', Price: 8.49 },
        { Name: 'Shrimp Cocktail', Description: 'Chilled shrimp served with a zesty cocktail sauce.', Price: 10.99 },
        { Name: 'French Onion Soup', Description: 'Classic beef broth soup with caramelized onions.', Price: 7.50 },
        { Name: 'Caprese Salad', Description: 'Fresh mozzarella, vine-ripened tomatoes, and basil drizzled with balsamic glaze.', Price: 6.50 }
    ],
    Mains: [
        { Name: 'Grilled Salmon', Description: 'Freshly grilled salmon fillet served with a lemon-dill sauce.', Price: 18.99 },
        { Name: 'Beef Tenderloin Steak', Description: 'Juicy grilled beef tenderloin topped with garlic butter.', Price: 24.99 },
        { Name: 'Vegetable Stir-Fry', Description: 'Mixed seasonal vegetables stir-fried with a light ginger-soy sauce.', Price: 13.99 },
        { Name: 'Chicken Parmesan', Description: 'Breaded chicken breast topped with marinara sauce and melted mozzarella with spaghetti.', Price: 15.99 },
        { Name: 'Lamb Chops with Mint Sauce', Description: 'Grilled lamb chops served with a homemade mint sauce, roasted potatoes, and a side of sautéed green beans.', Price: 22.50 }
    ],
    Desserts: [
        { Name: 'Chocolate Lava Cake', Description: 'Warm, rich chocolate cake with a molten chocolate center.', Price: 7.99 },
        { Name: 'Tiramisu', Description: 'Classic Italian dessert layered with coffee-soaked ladyfingers.', Price: 6.99 },
        { Name: 'Key Lime Pie', Description: 'Tangy and creamy pie with a graham cracker crust.', Price: 5.99 },
        { Name: 'Crème Brûlée', Description: 'Silky vanilla custard with a caramelized sugar topping, garnished with fresh berries.', Price: 6.50 },
        { Name: 'Apple Crumble', Description: 'Baked spiced apples with a buttery oat crumble, served warm with vanilla ice cream.', Price: 6.99 }
    ]
};


export default function FilterScreen() {
    const [course, setCourse] = useState('');
    const [mealOptions, setMealOptions] = useState([]);

    const handleCourseChange = (selectedCourse: string) => {
        setCourse(selectedCourse);
        setMealOptions(mealData[selectedCourse] || []); 
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Select a course you want to view.:</Text>
            <Picker selectedValue={course} onValueChange={handleCourseChange} style={styles.picker}>
                <Picker.Item label="Select a Course" value="" />
                <Picker.Item label="Starters" value="Starters" />
                <Picker.Item label="Mains" value="Mains" />
                <Picker.Item label="Desserts" value="Desserts" />
            </Picker>

            {mealOptions.length > 0 && (
                <View>
                    <Text style={styles.label}>Available Meals:</Text>
                    {mealOptions.map((meal, index) => (
                        <View key={index} style={styles.mealOption}>
                            <Text>{meal.Name} - ${meal.Price.toFixed(2)}</Text>
                            <Text>{meal.Description}</Text>
                        </View>
                    ))}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { fontSize: 16, marginBottom: 8 },
    picker: { height: 50, width: 150 },
    mealOption: { marginBottom: 12 }
});
