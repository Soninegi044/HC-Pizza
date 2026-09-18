import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
} from 'react-native';

const pizzas = [
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic cheese and tomato pizza',
    price: 199,
  },
  {
    id: 2,
    name: 'Farmhouse Pizza',
    description: 'Fresh vegetables with mozzarella',
    price: 299,
  },
  {
    id: 3,
    name: 'Paneer Tikka Pizza',
    description: 'Paneer, onion, capsicum and spices',
    price: 329,
  },
];

export default function HomeScreen() {
  const { addToCart } = useCart();

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logo}>HC PIZZA</Text>

          <Text style={styles.tagline}>
            Fresh. Hot. Delicious.
          </Text>
        </View>

        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🍕</Text>
        </View>
      </View>

      {/* Main Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerSmall}>
            YOUR CRAVINGS
          </Text>

          <Text style={styles.bannerTitle}>
            DELIVERED.
          </Text>

          <Text style={styles.bannerText}>
            Hot & cheesy pizzas made for you
          </Text>

          <Pressable
            style={styles.orderButton}
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.orderButtonText}>
              Order Now
            </Text>

            <Text style={styles.arrow}>
              →
            </Text>
          </Pressable>
        </View>
      </View>

      {/* Offer Card */}
      <View style={styles.offerBox}>
        <View style={styles.offerIcon}>
          <Text style={styles.offerEmoji}>🔥</Text>
        </View>

        <View style={styles.offerInfo}>
          <Text style={styles.offerTitle}>
            Pizza Time!
          </Text>

          <Text style={styles.offerText}>
            Pick your favourite and customize it your way.
          </Text>
        </View>
      </View>

      {/* Popular Section */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>
          Popular Pizzas
        </Text>

        <Pressable
          onPress={() => router.push('/explore')}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </Pressable>
      </View>

      {/* Pizza Cards */}
      {pizzas.map((pizza) => (
        <View
          style={styles.card}
          key={pizza.id}
        >
          <View style={styles.pizzaImageBox}>
            <Text style={styles.pizzaEmoji}>
              🍕
            </Text>
          </View>

          <View style={styles.cardInfo}>
            <Text style={styles.pizzaName}>
              {pizza.name}
            </Text>

            <Text
              style={styles.description}
              numberOfLines={2}
            >
              {pizza.description}
            </Text>

            <Text style={styles.price}>
              ₹{pizza.price}
            </Text>
          </View>

          <Pressable
            style={styles.addButton}
            onPress={() => addToCart(pizza)}
          >
            <Text style={styles.addButtonText}>
              + Add
            </Text>
          </Pressable>
        </View>
      ))}

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF7EF',
    paddingHorizontal: 18,
    paddingTop: 55,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    fontSize: 30,
    fontWeight: '900',
    color: '#D94B22',
    letterSpacing: 1,
  },

  tagline: {
    fontSize: 14,
    color: '#777777',
    marginTop: 3,
  },

  logoCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFE1C7',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoEmoji: {
    fontSize: 26,
  },

  banner: {
    height: 310,
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 18,
    backgroundColor: '#2B1710',
  },

  bannerContent: {
    flex: 1,
    padding: 22,
    justifyContent: 'flex-end',
  },

  bannerSmall: {
    color: '#FFD08A',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
  },

  bannerTitle: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '900',
    marginTop: 2,
  },

  bannerText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },

  orderButton: {
    backgroundColor: '#F47B20',
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 17,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  orderButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 8,
  },

  offerBox: {
    backgroundColor: '#FFE6CF',
    borderRadius: 18,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },

  offerIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  offerEmoji: {
    fontSize: 25,
  },

  offerInfo: {
    flex: 1,
  },

  offerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#A63E19',
  },

  offerText: {
    fontSize: 13,
    color: '#6B5145',
    marginTop: 3,
    lineHeight: 18,
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 23,
    fontWeight: '800',
    color: '#222222',
  },

  viewAll: {
    color: '#D94B22',
    fontSize: 14,
    fontWeight: '700',
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 18,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  pizzaImageBox: {
    width: 68,
    height: 68,
    borderRadius: 16,
    backgroundColor: '#FFF0DF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  pizzaEmoji: {
    fontSize: 38,
  },

  cardInfo: {
    flex: 1,
  },

  pizzaName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#222222',
  },

  description: {
    fontSize: 12,
    color: '#777777',
    marginTop: 4,
    lineHeight: 17,
  },

  price: {
    fontSize: 17,
    fontWeight: '900',
    color: '#D94B22',
    marginTop: 5,
  },

  addButton: {
    backgroundColor: '#D94B22',
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 10,
    marginLeft: 8,
  },

  addButtonText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  bottomSpace: {
    height: 25,
  },
});