// App.js

import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  Button, 
  FlatList, 
  StyleSheet, 
  Alert 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function App() {
  
  // Define the structure of each item (if using TypeScript)
  // If using JavaScript, you can remove the type annotations
  // const [items, setItems] = useState<{ Dish: string; Description: string; Price: number; Category: string }[]>([]);
  
  // For JavaScript, initialize items as an empty array
  const [items, setItems] = useState([]);
  const [dish, setDish] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('starters');
  const [error, setError] = useState('');
      
  const handleAddItem = () => {
    // Validate inputs
    if (!dish.trim() || !description.trim() || !price.trim()) {
      setError('Please fill all fields.');
      return;
    }

    // Validate price is a number
    if (isNaN(price)) {
      setError('Price must be a number.');
      return;
    }

    // Create a new item object
    const newItem = {
      id: Date.now().toString(),
      dish: dish.trim(),
      description: description.trim(),
      price: parseFloat(price).toFixed(2),
      category,
    };

    // Update the items list
    setItems([newItem, ...items]);

    // Clear input fields and error
    setDish('');
    setDescription('');
    setPrice('');
    setCategory('starters');
    setError('');
  };

  const handleDeleteItem = (id) => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Delete', 
          style: 'destructive', 
          onPress: () => {
            const updatedItems = items.filter(item => item.id !== id);
            setItems(updatedItems);
          } 
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemHeader}>
        <Text style={styles.itemDish}>{item.dish}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.itemCategory}>{item.category.toUpperCase()}</Text>
      <Button title="Delete" color="#FF6347" onPress={() => handleDeleteItem(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>MENU</Text>
      
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TextInput
        style={styles.input}
        value={dish}
        placeholder="Dish Name"
        onChangeText={setDish}
      />
      <TextInput
        style={styles.input}
        value={description}
        placeholder="Description"
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        value={price}
        placeholder="Price"
        keyboardType='numeric'
        onChangeText={setPrice}
      />
      
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={category}
          onValueChange={(itemValue) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Starters" value="starters" />
          <Picker.Item label="Desserts" value="desserts" />
          <Picker.Item label="Beverages" value="beverages" />
        </Picker>
      </View>
      
      <Button title="ADD" onPress={handleAddItem} />

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={items.length === 0 && styles.emptyList}
        ListEmptyComponent={<Text style={styles.emptyText}>No items added yet.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF8DC', // Cornsilk color for a warm background
  },
  header: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8B4513', // SaddleBrown color for the header
  },
  input: {
    borderWidth: 1,
    borderColor: '#DEB887', // BurlyWood color for input borders
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#FFF',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#DEB887',
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: '#FFF',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  itemContainer: {
    backgroundColor: '#FAF0E6', // Linen color for item background
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 2 }, // For iOS shadow
    shadowOpacity: 0.1, // For iOS shadow
    shadowRadius: 5, // For iOS shadow
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  itemDish: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#8B4513',
  },
  itemPrice: {
    fontSize: 16,
    color: '#8B4513',
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: '#555',
  },
  itemCategory: {
    fontSize: 12,
    marginBottom: 10,
    color: '#8B4513',
  },
  errorText: {
    color: '#FF4500', // OrangeRed color for errors
    marginBottom: 10,
    textAlign: 'center',
  },
  emptyList: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#555',
    fontSize: 16,
  },
});
