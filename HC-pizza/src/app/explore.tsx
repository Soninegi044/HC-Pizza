import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

const menu = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic tomato sauce and mozzarella',
    price: 199,
    category: 'Veg',
    popular: true,
  },
  {
    id: 2,
    name: 'Farmhouse Pizza',
    description: 'Onion, capsicum, tomato and cheese',
    price: 299,
    category: 'Veg',
    popular: true,
  },
  {
    id: 3,
    name: 'Paneer Tikka Pizza',
    description: 'Spicy paneer, onion and capsicum',
    price: 329,
    category: 'Veg',
    popular: true,
  },
  {
    id: 4,
    name: 'Veggie Supreme',
    description: 'Loaded with fresh vegetables and cheese',
    price: 349,
    category: 'Veg',
    popular: false,
  },
  {
    id: 5,
    name: 'Cheese Burst Pizza',
    description: 'Extra cheese with a creamy cheese base',
    price: 379,
    category: 'Veg',
    popular: false,
  },
];

export default function ExploreScreen() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredMenu = menu.filter((pizza) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Veg') return pizza.category === 'Veg';
    if (selectedCategory === 'Popular') return pizza.popular;

    return true;
  });

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Pizza Menu</Text>

          <Text style={styles.subtitle}>
            Find your favourite pizza
          </Text>
        </View>

        <View style={styles.categoryContainer}>
          {['All', 'Veg', 'Popular'].map((category) => {
            const selected = selectedCategory === category;

            return (
              <Pressable
                key={category}
                onPress={() => setSelectedCategory(category)}
                style={[
                  styles.category,
                  selected && styles.categoryActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selected && styles.categoryActiveText,
                  ]}
                >
                  {category}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text style={styles.resultText}>
          {filteredMenu.length} pizzas available
        </Text>

        {filteredMenu.map((pizza) => (
          <View style={styles.card} key={pizza.id}>
            <View style={styles.imageBox}>
              <Text style={styles.pizzaEmoji}>🍕</Text>
            </View>

            <View style={styles.details}>
              <Text style={styles.name}>
                {pizza.name}
              </Text>

              <Text style={styles.description}>
                {pizza.description}
              </Text>

              {pizza.popular && (
                <Text style={styles.popularLabel}>
                  Popular choice
                </Text>
              )}

              <View style={styles.bottomRow}>
                <Text style={styles.price}>
                  ₹{pizza.price}
                </Text>

                <Pressable
                  style={styles.addButton}
                  onPress={() => addToCart(pizza)}
                >
                  <Text style={styles.addText}>
                    Add
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        ))}

        {filteredMenu.length === 0 && (
          <View style={styles.noResult}>
            <Text style={styles.noResultTitle}>
              No pizzas found
            </Text>

            <Text style={styles.noResultText}>
              Try another category.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    paddingHorizontal: 20,
  },

  scrollContent: {
    paddingTop: 55,
    paddingBottom: 30,
  },

  header: {
    marginBottom: 20,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 5,
  },

  categoryContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 12,
  },

  category: {
    paddingHorizontal: 19,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },

  categoryActive: {
    backgroundColor: '#222222',
  },

  categoryText: {
    fontWeight: '600',
  },

  categoryActiveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  resultText: {
    fontSize: 13,
    marginBottom: 14,
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 15,
  },

  imageBox: {
    width: 92,
    height: 92,
    borderRadius: 15,
    backgroundColor: '#F5E5D5',
    justifyContent: 'center',
    alignItems: 'center',
  },

  pizzaEmoji: {
    fontSize: 46,
  },

  details: {
    flex: 1,
    marginLeft: 14,
  },

  name: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 13,
    marginTop: 5,
    lineHeight: 18,
  },

  popularLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 6,
  },

  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  addButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 19,
    paddingVertical: 8,
    borderRadius: 9,
  },

  addText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  noResult: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 25,
    alignItems: 'center',
    marginTop: 10,
  },

  noResultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  noResultText: {
    marginTop: 6,
    fontSize: 14,
  },
});