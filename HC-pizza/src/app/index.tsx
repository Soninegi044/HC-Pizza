import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

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
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        <View style={styles.header}>
          <Text style={styles.logo}>HC Pizza</Text>
          <Text style={styles.tagline}>
            Fresh pizza. Made for you.
          </Text>
        </View>

        <View style={styles.banner}>
          <Text style={styles.bannerSmall}>SPECIAL OFFER</Text>

          <Text style={styles.bannerTitle}>
            Craving Pizza?
          </Text>

          <Text style={styles.bannerText}>
            Choose your favourite pizza and get it delivered fresh and hot.
          </Text>

          <Pressable
            style={styles.orderButton}
            onPress={() => router.push('/explore')}
          >
            <Text style={styles.orderButtonText}>
              Order Now
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Popular Pizzas
          </Text>

          <Pressable onPress={() => router.push('/explore')}>
            <Text style={styles.viewAll}>
              View All
            </Text>
          </Pressable>
        </View>

        {pizzas.map((pizza) => (
          <View style={styles.card} key={pizza.id}>

            <View style={styles.pizzaImage}>
              <Text style={styles.pizzaEmoji}>🍕</Text>
            </View>

            <View style={styles.cardContent}>
              <Text style={styles.pizzaName}>
                {pizza.name}
              </Text>

              <Text style={styles.description}>
                {pizza.description}
              </Text>

              <View style={styles.bottomRow}>
                <Text style={styles.price}>
                  ₹{pizza.price}
                </Text>

                <Pressable
                  style={styles.addButton}
                  onPress={() => addToCart(pizza)}
                >
                  <Text style={styles.addButtonText}>
                    Add
                  </Text>
                </Pressable>
              </View>
            </View>

          </View>
        ))}

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>
            Why HC Pizza?
          </Text>

          <Text style={styles.infoText}>
            Fresh ingredients • Quick ordering • Easy cart management
          </Text>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },

  scrollContent: {
    paddingBottom: 30,
  },

  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 22,
  },

  logo: {
    fontSize: 34,
    fontWeight: 'bold',
  },

  tagline: {
    fontSize: 15,
    marginTop: 5,
  },

  banner: {
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 20,
    backgroundColor: '#FFE0C2',
  },

  bannerSmall: {
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
  },

  bannerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 6,
  },

  bannerText: {
    fontSize: 15,
    marginTop: 8,
    lineHeight: 22,
  },

  orderButton: {
    marginTop: 18,
    alignSelf: 'flex-start',
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 10,
    backgroundColor: '#222',
  },

  orderButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  viewAll: {
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
  },

  pizzaImage: {
    width: 90,
    height: 90,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5E5D5',
  },

  pizzaEmoji: {
    fontSize: 48,
  },

  cardContent: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'space-between',
  },

  pizzaName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  description: {
    fontSize: 13,
    marginTop: 5,
    lineHeight: 18,
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
    paddingHorizontal: 18,
    paddingVertical: 7,
    borderRadius: 8,
    backgroundColor: '#222',
  },

  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },

  infoBox: {
    marginHorizontal: 20,
    marginTop: 10,
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#fff',
  },

  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  infoText: {
    fontSize: 13,
    marginTop: 7,
    lineHeight: 20,
  },
});