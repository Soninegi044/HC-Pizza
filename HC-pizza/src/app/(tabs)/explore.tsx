import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Modal,
} from 'react-native';
import { useCart } from '@/context/CartContext';

const pizzas = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza',
    price: 199,
    category: 'Veg',
    popular: true,
  },
  {
    id: 2,
    name: 'Farmhouse Pizza',
    description: 'Fresh vegetables with mozzarella',
    price: 299,
    category: 'Veg',
    popular: true,
  },
  {
    id: 3,
    name: 'Paneer Tikka Pizza',
    description: 'Paneer, onion, capsicum and spices',
    price: 329,
    category: 'Veg',
    popular: true,
  },
  {
    id: 4,
    name: 'Veggie Supreme Pizza',
    description: 'Loaded with fresh vegetables and cheese',
    price: 349,
    category: 'Veg',
    popular: false,
  },
  {
    id: 5,
    name: 'Cheese Burst Pizza',
    description: 'Extra cheesy pizza with cheese-filled crust',
    price: 379,
    category: 'Veg',
    popular: true,
  },
  {
    id: 6,
    name: 'Cheese Corn Pizza',
    description: 'Sweet corn with extra cheese',
    price: 249,
    category: 'Veg',
    popular: false,
  },
  {
    id: 7,
    name: 'Paneer Makhani Pizza',
    description: 'Paneer with rich makhani sauce',
    price: 349,
    category: 'Veg',
    popular: true,
  },
  {
    id: 8,
    name: 'Mexican Green Wave Pizza',
    description: 'Mexican herbs, capsicum and spicy toppings',
    price: 319,
    category: 'Veg',
    popular: false,
  },
  {
    id: 9,
    name: 'Spicy Veg Pizza',
    description: 'Spicy vegetables with mozzarella cheese',
    price: 289,
    category: 'Veg',
    popular: false,
  },
  {
    id: 10,
    name: 'Corn & Capsicum Pizza',
    description: 'Crunchy capsicum and sweet corn',
    price: 269,
    category: 'Veg',
    popular: false,
  },
  {
    id: 11,
    name: 'Garden Fresh Pizza',
    description: 'Fresh onion, tomato, capsicum and corn',
    price: 279,
    category: 'Veg',
    popular: false,
  },
  {
    id: 12,
    name: 'Double Cheese Pizza',
    description: 'Double layer of delicious mozzarella cheese',
    price: 329,
    category: 'Veg',
    popular: true,
  },
  {
    id: 13,
    name: 'Italian Veg Pizza',
    description: 'Italian herbs with fresh vegetables',
    price: 309,
    category: 'Veg',
    popular: false,
  },
  {
    id: 14,
    name: 'Spicy Paneer Pizza',
    description: 'Spicy paneer with onion and capsicum',
    price: 359,
    category: 'Veg',
    popular: true,
  },
  {
    id: 15,
    name: 'Cheesy Veg Supreme',
    description: 'Loaded vegetables with extra cheese',
    price: 369,
    category: 'Veg',
    popular: false,
  },
];

const sizes = ['Small', 'Medium', 'Large'];
const crusts = ['Regular', 'Thin Crust', 'Cheese Burst'];
const sliceOptions = [4, 6, 8];
const flavours = ['Classic', 'Spicy', 'Cheesy'];
const spiceLevels = ['Mild', 'Medium', 'Spicy'];

const toppings = [
  { name: 'Extra Cheese', price: 20 },
  { name: 'Onion', price: 20 },
  { name: 'Capsicum', price: 20 },
  { name: 'Paneer', price: 20 },
];

export default function ExploreScreen() {
  const { addToCart } = useCart();

  const [selectedCategory, setSelectedCategory] = useState('All');

  const [selectedPizza, setSelectedPizza] = useState<any>(null);
  const [customizeVisible, setCustomizeVisible] = useState(false);

  const [selectedFlavour, setSelectedFlavour] = useState('Classic');
  const [selectedSize, setSelectedSize] = useState('Small');
  const [selectedCrust, setSelectedCrust] = useState('Regular');
  const [selectedSlices, setSelectedSlices] = useState(4);
  const [selectedSpice, setSelectedSpice] = useState('Mild');
  const [selectedToppings, setSelectedToppings] = useState<string[]>([]);

  const filteredPizzas = pizzas.filter((pizza) => {
    if (selectedCategory === 'All') {
      return true;
    }

    if (selectedCategory === 'Veg') {
      return pizza.category === 'Veg';
    }

    if (selectedCategory === 'Popular') {
      return pizza.popular;
    }

    return true;
  });

  const openCustomize = (pizza: any) => {
    setSelectedPizza(pizza);
    setSelectedFlavour('Classic');
    setSelectedSize('Small');
    setSelectedCrust('Regular');
    setSelectedSlices(4);
    setSelectedSpice('Mild');
    setSelectedToppings([]);
    setCustomizeVisible(true);
  };

  const toggleTopping = (topping: string) => {
    if (selectedToppings.includes(topping)) {
      setSelectedToppings(
        selectedToppings.filter((item) => item !== topping)
      );
    } else {
      setSelectedToppings([
        ...selectedToppings,
        topping,
      ]);
    }
  };

  const getCustomizedPrice = () => {
    if (!selectedPizza) {
      return 0;
    }

    let price = selectedPizza.price;

    if (selectedSize === 'Medium') {
      price += 50;
    }

    if (selectedSize === 'Large') {
      price += 100;
    }

    if (selectedCrust === 'Thin Crust') {
      price += 30;
    }

    if (selectedCrust === 'Cheese Burst') {
      price += 60;
    }

    price += selectedToppings.length * 20;

    return price;
  };

  const addCustomizedPizza = () => {
    if (!selectedPizza) {
      return;
    }

    addToCart(selectedPizza, {
      flavour: selectedFlavour,
      size: selectedSize,
      crust: selectedCrust,
      slices: selectedSlices,
      toppings: selectedToppings,
      spiceLevel: selectedSpice,
    });

    setCustomizeVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pizza Menu</Text>

      <Text style={styles.subtitle}>
        Choose your favourite pizza
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterScroll}
        contentContainerStyle={styles.filterContent}
      >
        {['All', 'Veg', 'Popular'].map((category) => (
          <Pressable
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category &&
                styles.activeFilterButton,
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category &&
                  styles.activeFilterText,
              ]}
            >
              {category}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      >
        {filteredPizzas.map((pizza) => (
          <View style={styles.card} key={pizza.id}>
            <View style={styles.cardInfo}>
              <Text style={styles.pizzaName}>
                {pizza.name}
              </Text>

              <Text style={styles.description}>
                {pizza.description}
              </Text>

              <Text style={styles.price}>
                ₹{pizza.price}
              </Text>
            </View>

            <View style={styles.buttonColumn}>
              <Pressable
                style={styles.addButton}
                onPress={() => addToCart(pizza)}
              >
                <Text style={styles.addButtonText}>
                  Add
                </Text>
              </Pressable>

              <Pressable
                style={styles.customizeButton}
                onPress={() => openCustomize(pizza)}
              >
                <Text style={styles.customizeText}>
                  Customize
                </Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={customizeVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() =>
          setCustomizeVisible(false)
        }
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              {selectedPizza && (
                <>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>
                      Customize Pizza
                    </Text>

                    <Pressable
                      onPress={() =>
                        setCustomizeVisible(false)
                      }
                    >
                      <Text style={styles.closeText}>
                        ✕
                      </Text>
                    </Pressable>
                  </View>

                  <Text style={styles.selectedPizzaName}>
                    {selectedPizza.name}
                  </Text>

                  <Text style={styles.basePriceText}>
                    Base Price: ₹{selectedPizza.price}
                  </Text>

                  <Text style={styles.optionTitle}>
                    Flavour
                  </Text>

                  <View style={styles.optionRow}>
                    {flavours.map((flavour) => (
                      <Pressable
                        key={flavour}
                        style={[
                          styles.optionButton,
                          selectedFlavour === flavour &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setSelectedFlavour(flavour)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedFlavour === flavour &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {flavour}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Text style={styles.optionTitle}>
                    Size
                  </Text>

                  <View style={styles.optionRow}>
                    {sizes.map((size) => (
                      <Pressable
                        key={size}
                        style={[
                          styles.optionButton,
                          selectedSize === size &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setSelectedSize(size)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedSize === size &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {size}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Text style={styles.optionTitle}>
                    Crust
                  </Text>

                  <View style={styles.optionRow}>
                    {crusts.map((crust) => (
                      <Pressable
                        key={crust}
                        style={[
                          styles.optionButton,
                          selectedCrust === crust &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setSelectedCrust(crust)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedCrust === crust &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {crust}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Text style={styles.optionTitle}>
                    Number of Slices
                  </Text>

                  <View style={styles.optionRow}>
                    {sliceOptions.map((slice) => (
                      <Pressable
                        key={slice}
                        style={[
                          styles.optionButton,
                          selectedSlices === slice &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setSelectedSlices(slice)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedSlices === slice &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {slice} Slices
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Text style={styles.optionTitle}>
                    Spice Level
                  </Text>

                  <View style={styles.optionRow}>
                    {spiceLevels.map((spice) => (
                      <Pressable
                        key={spice}
                        style={[
                          styles.optionButton,
                          selectedSpice === spice &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          setSelectedSpice(spice)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedSpice === spice &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {spice}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <Text style={styles.optionTitle}>
                    Extra Toppings
                  </Text>

                  <Text style={styles.toppingInfo}>
                    Each extra topping costs ₹20
                  </Text>

                  <View style={styles.optionRow}>
                    {toppings.map((topping) => (
                      <Pressable
                        key={topping.name}
                        style={[
                          styles.optionButton,
                          selectedToppings.includes(
                            topping.name
                          ) &&
                            styles.selectedOption,
                        ]}
                        onPress={() =>
                          toggleTopping(topping.name)
                        }
                      >
                        <Text
                          style={[
                            styles.optionText,
                            selectedToppings.includes(
                              topping.name
                            ) &&
                              styles.selectedOptionText,
                          ]}
                        >
                          {topping.name} +₹{topping.price}
                        </Text>
                      </Pressable>
                    ))}
                  </View>

                  <View style={styles.summaryBox}>
                    <Text style={styles.summaryTitle}>
                      Your Selection
                    </Text>

                    <Text style={styles.summaryText}>
                      Flavour: {selectedFlavour}
                    </Text>

                    <Text style={styles.summaryText}>
                      Size: {selectedSize}
                    </Text>

                    <Text style={styles.summaryText}>
                      Crust: {selectedCrust}
                    </Text>

                    <Text style={styles.summaryText}>
                      Slices: {selectedSlices}
                    </Text>

                    <Text style={styles.summaryText}>
                      Spice: {selectedSpice}
                    </Text>

                    <Text style={styles.summaryText}>
                      Toppings:{' '}
                      {selectedToppings.length > 0
                        ? selectedToppings.join(', ')
                        : 'None'}
                    </Text>

                    <Text style={styles.summaryText}>
                      Extra Topping Charges: ₹
                      {selectedToppings.length * 20}
                    </Text>

                    <View style={styles.priceRow}>
                      <Text style={styles.totalLabel}>
                        Total Pizza Price
                      </Text>

                      <Text style={styles.totalPrice}>
                        ₹{getCustomizedPrice()}
                      </Text>
                    </View>
                  </View>

                  <Pressable
                    style={styles.addCustomizedButton}
                    onPress={addCustomizedPizza}
                  >
                    <Text style={styles.addCustomizedText}>
                      Add Customized Pizza
                    </Text>
                  </Pressable>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 15,
    marginTop: 5,
    color: '#555555',
  },

  filterScroll: {
    marginTop: 20,
    marginBottom: 15,
    minHeight: 50,
  },

  filterContent: {
    paddingVertical: 5,
  },

  filterButton: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
  },

  activeFilterButton: {
    backgroundColor: '#222222',
  },

  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },

  activeFilterText: {
    color: '#FFFFFF',
  },

  list: {
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  cardInfo: {
    flex: 1,
  },

  pizzaName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 13,
    marginTop: 5,
    color: '#555555',
    lineHeight: 18,
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 8,
  },

  buttonColumn: {
    marginLeft: 10,
    alignItems: 'center',
  },

  addButton: {
    backgroundColor: '#222222',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 90,
    alignItems: 'center',
  },

  addButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  customizeButton: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingVertical: 5,
  },

  customizeText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },

  modalContainer: {
    backgroundColor: '#FFF8F2',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
    maxHeight: '90%',
  },

  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  modalTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  closeText: {
    fontSize: 22,
  },

  selectedPizzaName: {
    fontSize: 17,
    marginTop: 8,
    fontWeight: '600',
  },

  basePriceText: {
    fontSize: 14,
    marginTop: 5,
    color: '#555555',
  },

  optionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },

  toppingInfo: {
    fontSize: 13,
    color: '#777777',
    marginBottom: 10,
  },

  optionRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },

  optionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#DDDDDD',
  },

  selectedOption: {
    backgroundColor: '#222222',
    borderColor: '#222222',
  },

  optionText: {
    fontSize: 13,
  },

  selectedOptionText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  summaryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  summaryText: {
    fontSize: 14,
    marginTop: 5,
    color: '#555555',
  },

  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  addCustomizedButton: {
    backgroundColor: '#222222',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },

  addCustomizedText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


