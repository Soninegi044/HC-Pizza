import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';
import { useCart } from '@/context/CartContext';

export default function OrderSummaryScreen() {
  const { cart, total } = useCart();

  const placeOrder = () => {
    router.replace('/order-success');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Order Summary</Text>

        <Text style={styles.subtitle}>
          Review your order before placing it
        </Text>

        <View style={styles.orderBox}>
          {cart.map((item, index) => (
            <View
              key={`${item.id}-${index}`}
              style={styles.item}
            >
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>
                  {item.name}
                </Text>

                {item.flavour && (
                  <Text style={styles.detail}>
                    Flavour: {item.flavour}
                  </Text>
                )}

                {item.size && (
                  <Text style={styles.detail}>
                    Size: {item.size}
                  </Text>
                )}

                {item.crust && (
                  <Text style={styles.detail}>
                    Crust: {item.crust}
                  </Text>
                )}

                {item.slices && (
                  <Text style={styles.detail}>
                    Slices: {item.slices}
                  </Text>
                )}

                {item.spiceLevel && (
                  <Text style={styles.detail}>
                    Spice: {item.spiceLevel}
                  </Text>
                )}

                {item.toppings &&
                  item.toppings.length > 0 && (
                    <Text style={styles.detail}>
                      Toppings: {item.toppings.join(', ')}
                    </Text>
                  )}

                <Text style={styles.quantity}>
                  Quantity: {item.quantity}
                </Text>
              </View>

              <Text style={styles.itemPrice}>
                ₹{item.price * item.quantity}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.totalBox}>
          <Text style={styles.totalLabel}>
            Total Amount
          </Text>

          <Text style={styles.totalPrice}>
            ₹{total}
          </Text>
        </View>

        <View style={styles.deliveryBox}>
          <Text style={styles.deliveryTitle}>
            Delivery
          </Text>

          <Text style={styles.deliveryText}>
            Your order will be delivered to the
            address provided.
          </Text>
        </View>

        <Pressable
          style={styles.placeButton}
          onPress={placeOrder}
        >
          <Text style={styles.placeButtonText}>
            Place Order
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
  },

  content: {
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 15,
    color: '#555555',
    marginTop: 5,
    marginBottom: 25,
  },

  orderBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
  },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
  },

  itemInfo: {
    flex: 1,
    paddingRight: 10,
  },

  itemName: {
    fontSize: 17,
    fontWeight: 'bold',
  },

  detail: {
    fontSize: 13,
    color: '#555555',
    marginTop: 4,
  },

  quantity: {
    fontSize: 13,
    marginTop: 7,
    fontWeight: '600',
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  totalBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  totalPrice: {
    fontSize: 22,
    fontWeight: 'bold',
  },

  deliveryBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    marginTop: 15,
  },

  deliveryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  deliveryText: {
    fontSize: 14,
    color: '#555555',
    marginTop: 7,
    lineHeight: 20,
  },

  placeButton: {
    backgroundColor: '#222222',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  placeButtonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});

