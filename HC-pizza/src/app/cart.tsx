import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native';
import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const {
    cart,
    total,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const placeOrder = () => {
    alert('Order Placed successfully!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>

      {cart.length === 0 ? (
        <View style={styles.emptyBox}>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>

          <Text style={styles.emptyText}>
            Add your favourite pizza to continue.
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          >
            {cart.map((item) => (
              <View style={styles.card} key={item.id}>
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>

                  <Text style={styles.price}>
                    ₹{item.price}
                  </Text>
                </View>

                <View style={styles.actions}>
                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => decreaseQuantity(item.id)}
                  >
                    <Text style={styles.buttonText}>−</Text>
                  </Pressable>

                  <Text style={styles.quantity}>
                    {item.quantity}
                  </Text>

                  <Pressable
                    style={styles.quantityButton}
                    onPress={() => increaseQuantity(item.id)}
                  >
                    <Text style={styles.buttonText}>+</Text>
                  </Pressable>

                  <Pressable
                    style={styles.removeButton}
                    onPress={() => removeFromCart(item.id)}
                  >
                    <Text style={styles.removeText}>
                      Remove
                    </Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={styles.bottomSection}>
            <View style={styles.totalBox}>
              <Text style={styles.totalText}>Total</Text>

              <Text style={styles.totalPrice}>
                ₹{total}
              </Text>
            </View>

            <Pressable
              style={styles.checkoutButton}
              onPress={() => alert('Order Placed Successfully!')}
            >
              <Text style={styles.checkoutText}>
                Place Order
              </Text>
            </Pressable>
          </View>
        </>
      )}
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
    marginBottom: 20,
  },

  emptyBox: {
    marginTop: 20,
    padding: 25,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
  },

  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  name: {
    fontSize: 17,
    fontWeight: 'bold',
    flex: 1,
  },

  price: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },

  quantityButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#222222',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },

  quantity: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },

  removeButton: {
    marginLeft: 'auto',
  },

  removeText: {
    fontSize: 13,
    textDecorationLine: 'underline',
  },

  bottomSection: {
    paddingTop: 10,
    paddingBottom: 20,
  },

  totalBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#DDDDDD',
  },

  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  totalPrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  checkoutButton: {
    backgroundColor: '#222222',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  checkoutText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
}); 