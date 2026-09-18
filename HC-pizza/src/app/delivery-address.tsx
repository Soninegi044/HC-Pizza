import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Pressable,
  ScrollView,
} from 'react-native';
import { router } from 'expo-router';

export default function DeliveryAddressScreen() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [pincode, setPincode] = useState('');

  const continueToOrder = () => {
    if (
      !name ||
      !phone ||
      !address ||
      !city ||
      !pincode
    ) {
      return;
    }

    router.push('/order-summary');
  };

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.title}>Delivery Address</Text>

        <Text style={styles.subtitle}>
          Enter your delivery details
        </Text>

        <View style={styles.formBox}>
          <Text style={styles.label}>Full Name</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Phone Number</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />

          <Text style={styles.label}>Delivery Address</Text>

          <TextInput
            style={[styles.input, styles.addressInput]}
            placeholder="House no., street, area"
            multiline
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>City</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter city"
            value={city}
            onChangeText={setCity}
          />

          <Text style={styles.label}>Pincode</Text>

          <TextInput
            style={styles.input}
            placeholder="Enter pincode"
            keyboardType="number-pad"
            value={pincode}
            onChangeText={setPincode}
          />
        </View>

        <Pressable
          style={styles.continueButton}
          onPress={continueToOrder}
        >
          <Text style={styles.continueText}>
            Continue
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

  formBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 7,
    marginTop: 12,
  },

  input: {
    backgroundColor: '#F7F7F7',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
  },

  addressInput: {
    height: 90,
    textAlignVertical: 'top',
  },

  continueButton: {
    backgroundColor: '#222222',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },

  continueText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },
});