import React, { createContext, useContext, useState } from 'react';

type Pizza = {
  id: number;
  name: string;
  description: string;
  price: number;
};

type CartItem = Pizza & {
  quantity: number;
  flavour?: string;
  size?: string;
  crust?: string;
  slices?: number;
  toppings?: string[];
  spiceLevel?: string;
};

type AddToCartOptions = {
  flavour: string;
  size: string;
  crust: string;
  slices: number;
  toppings: string[];
  spiceLevel: string;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (pizza: Pizza, options?: AddToCartOptions) => void;
  removeFromCart: (id: string | number) => void;
  increaseQuantity: (id: string | number) => void;
  decreaseQuantity: (id: string | number) => void;
  total: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (
    pizza: Pizza,
    options?: AddToCartOptions
  ) => {
    // Normal Add button
    if (!options) {
      setCart((currentCart) => {
        const existingItem = currentCart.find(
          (item) => item.id === pizza.id && !item.flavour
        );

        if (existingItem) {
          return currentCart.map((item) =>
            item.id === pizza.id && !item.flavour
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item
          );
        }

        return [
          ...currentCart,
          {
            ...pizza,
            quantity: 1,
          },
        ];
      });

      return;
    }

    // Customized pizza
    const customizedPrice =
      pizza.price +
      (options.size === 'Medium' ? 50 : 0) +
      (options.size === 'Large' ? 100 : 0) +
      (options.crust === 'Thin Crust' ? 30 : 0) +
      (options.crust === 'Cheese Burst' ? 60 : 0) +
      options.toppings.length * 20;

    const newItem: CartItem = {
      ...pizza,
      price: customizedPrice,
      quantity: 1,
      flavour: options.flavour,
      size: options.size,
      crust: options.crust,
      slices: options.slices,
      toppings: options.toppings,
      spiceLevel: options.spiceLevel,
    };

    setCart((currentCart) => [
      ...currentCart,
      newItem,
    ]);
  };

  const getItemKey = (item: CartItem) => {
    if (!item.flavour) {
      return String(item.id);
    }

    return `${item.id}-${item.flavour}-${item.size}-${item.crust}-${item.slices}-${item.spiceLevel}-${(item.toppings || []).join('-')}`;
  };

  const increaseQuantity = (id: string | number) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        getItemKey(item) === String(id) ||
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string | number) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          getItemKey(item) === String(id) ||
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string | number) => {
    setCart((currentCart) =>
      currentCart.filter(
        (item) =>
          getItemKey(item) !== String(id) &&
          String(item.id) !== String(id)
      )
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside CartProvider'
    );
  }

  return context;
}