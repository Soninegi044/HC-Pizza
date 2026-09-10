import { StyleSheet, Text, View, Pressable } from 'react-native';
import { router } from 'expo-router';

export default function OrderSuccessScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.iconBox}>
        <Text style={styles.icon}>✓</Text>
      </View>

      <Text style={styles.title}>Order Confirmed!</Text>

      <Text style={styles.message}>
        Your pizza order has been placed successfully.
      </Text>

      <View style={styles.orderBox}>
        <Text style={styles.orderLabel}>Order ID</Text>
        <Text style={styles.orderId}>#HCP2026</Text>

        <Text style={styles.status}>Preparing your order</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F2',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 25,
  },

  iconBox: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 25,
  },

  icon: {
    color: '#FFFFFF',
    fontSize: 42,
    fontWeight: 'bold',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  message: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    lineHeight: 23,
  },

  orderBox: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginTop: 30,
    alignItems: 'center',
  },

  orderLabel: {
    fontSize: 13,
    marginBottom: 5,
  },

  orderId: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  status: {
    marginTop: 12,
    fontSize: 14,
  },

  button: {
    width: '100%',
    backgroundColor: '#222',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});