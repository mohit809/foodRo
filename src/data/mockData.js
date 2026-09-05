export const CATEGORIES = [
  { id: 'all', name: 'All Dishes', icon: '🍽️' },
  { id: 'momos', name: 'Momos & Dimsums', icon: '🥟' },
  { id: 'pizza', name: 'Artisan Pizza', icon: '🍕' },
  { id: 'burger', name: 'Burgers', icon: '🍔' },
  { id: 'asian', name: 'Sushi & Asian', icon: '🍣' },
  { id: 'mexican', name: 'Tacos & Bowls', icon: '🌮' },
  { id: 'indian', name: 'Biryani & Curry', icon: '🍛' },
  { id: 'healthy', name: 'Salads & Greens', icon: '🥗' },
  { id: 'dessert', name: 'Desserts & Cakes', icon: '🍰' },
  { id: 'drinks', name: 'Boba & Shakes', icon: '🧋' }
];

export const PROMO_BANNERS = [
  {
    id: 1,
    title: '50% OFF First 3 Orders',
    subtitle: 'Use code FOODRO50 at checkout',
    code: 'FOODRO50',
    tag: 'Limited Time',
    bgColor: 'from-orange-500 to-amber-600',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 2,
    title: 'Himalayan Momos Festival',
    subtitle: 'Steamed, Kurkure & Tandoori with Spicy Red Chutney',
    code: 'MOMOLOV',
    tag: 'Trending Now',
    bgColor: 'from-red-600 to-amber-600',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 3,
    title: 'Free Delivery Weekend',
    subtitle: 'On all orders above threshold with code FREEDEL',
    code: 'FREEDEL',
    tag: 'Weekend Special',
    bgColor: 'from-emerald-600 to-teal-700',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_FOOD_ITEMS = [
  {
    id: 'f-momo1',
    name: 'Darjeeling Steamed Chicken Momos',
    category: 'momos',
    price: 4.50, // ~$389 INR / $4.50 USD
    originalPrice: 6.00,
    rating: 4.9,
    reviewsCount: 680,
    isVeg: false,
    isBestseller: true,
    prepTime: '15-20 mins',
    calories: '320 kcal',
    description: 'Thin-wrapper Himalayan dumplings packed with minced juicy chicken, fresh herbs, ginger, garlic, served with fiery red chili chutney and sesame dip.',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r-momo',
      name: 'The Himalayan Momo Co.',
      rating: 4.9,
      deliveryTime: '20-25 min',
      distance: '1.1 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Regular (8 Pcs)', price: 0 },
        { name: 'Party Platter (16 Pcs)', price: 3.50 }
      ],
      addOns: [
        { name: 'Extra Fiery Red Chutney', price: 0.50 },
        { name: 'Creamy Mayo Garlic Dip', price: 0.75 },
        { name: 'Clear Thukpa Soup Bowl', price: 1.50 }
      ]
    }
  },
  {
    id: 'f-momo2',
    name: 'Crispy Kurkure Paneer Momos',
    category: 'momos',
    price: 4.20,
    originalPrice: 5.50,
    rating: 4.8,
    reviewsCount: 430,
    isVeg: true,
    isBestseller: true,
    prepTime: '15-20 mins',
    calories: '410 kcal',
    description: 'Spiced cottage cheese filling encased in a crunchy cornflake crust, flash-fried to golden perfection, dusted with peri-peri seasoning.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r-momo',
      name: 'The Himalayan Momo Co.',
      rating: 4.9,
      deliveryTime: '20-25 min',
      distance: '1.1 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Regular (6 Pcs)', price: 0 },
        { name: 'Jumbo Box (12 Pcs)', price: 3.20 }
      ],
      addOns: [
        { name: 'Melted Cheese Drizzle', price: 1.00 },
        { name: 'Extra Schezwan Sauce', price: 0.60 }
      ]
    }
  },
  {
    id: 'f-momo3',
    name: 'Tandoori Afghani Malai Momos',
    category: 'momos',
    price: 4.80,
    originalPrice: 6.20,
    rating: 4.9,
    reviewsCount: 512,
    isVeg: true,
    isBestseller: false,
    prepTime: '20-25 mins',
    calories: '460 kcal',
    description: 'Charcoal-grilled clay oven momos marinated in rich cashew paste, cardamom cream, butter and garnished with fresh coriander and onion rings.',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r-momo',
      name: 'The Himalayan Momo Co.',
      rating: 4.9,
      deliveryTime: '20-25 min',
      distance: '1.1 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Standard (8 Pcs)', price: 0 },
        { name: 'Grand Feast (14 Pcs)', price: 3.50 }
      ],
      addOns: [
        { name: 'Mint Coriander Dip', price: 0.50 },
        { name: 'Rumali Roti', price: 1.00 }
      ]
    }
  },
  {
    id: 'f1',
    name: 'Truffle Smash Cheeseburger',
    category: 'burger',
    price: 14.99,
    originalPrice: 18.99,
    rating: 4.9,
    reviewsCount: 428,
    isVeg: false,
    isBestseller: true,
    prepTime: '20-25 mins',
    calories: '680 kcal',
    description: 'Double Angus beef patties, melted aged cheddar, black truffle aioli, caramelized onions on a toasted brioche bun.',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r1',
      name: 'The Burger Forge',
      rating: 4.8,
      deliveryTime: '20-30 min',
      distance: '1.4 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Single Patty', price: 0 },
        { name: 'Double Patty', price: 3.50 },
        { name: 'Triple Monster Patty', price: 6.00 }
      ],
      addOns: [
        { name: 'Crispy Bacon Strips', price: 2.00 },
        { name: 'Extra Cheddar Cheese', price: 1.50 },
        { name: 'Fried Jalapeños', price: 1.00 },
        { name: 'Truffle Dip Sauce', price: 1.75 }
      ]
    }
  },
  {
    id: 'f2',
    name: 'Woodfired Burrata Margherita Pizza',
    category: 'pizza',
    price: 17.50,
    originalPrice: 21.00,
    rating: 4.9,
    reviewsCount: 512,
    isVeg: true,
    isBestseller: true,
    prepTime: '25-30 mins',
    calories: '720 kcal',
    description: 'San Marzano tomato base, creamy whole burrata, fresh basil, extra virgin olive oil on 48-hour fermented sourdough crust.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r2',
      name: 'Napoli Woodfire Co.',
      rating: 4.9,
      deliveryTime: '25-35 min',
      distance: '2.1 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Regular 10"', price: 0 },
        { name: 'Large 14"', price: 4.00 }
      ],
      addOns: [
        { name: 'Extra Fresh Burrata', price: 3.50 },
        { name: 'Truffle Glaze', price: 2.00 },
        { name: 'Kalamata Olives', price: 1.50 },
        { name: 'Hot Honey Drizzle', price: 1.25 }
      ]
    }
  },
  {
    id: 'f3',
    name: 'Spicy Dragon Salmon Roll',
    category: 'asian',
    price: 18.25,
    originalPrice: 22.00,
    rating: 4.8,
    reviewsCount: 310,
    isVeg: false,
    isBestseller: true,
    prepTime: '15-20 mins',
    calories: '450 kcal',
    description: 'Fresh Atlantic salmon, spicy crab meat, cucumber, avocado, tobiko, drizzled with unagi glaze and spicy sriracha mayo.',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r3',
      name: 'Oishii Sushi Lounge',
      rating: 4.8,
      deliveryTime: '20-30 min',
      distance: '3.0 km'
    },
    customizationOptions: {
      sizes: [
        { name: '8 Pieces Roll', price: 0 },
        { name: '12 Pieces Deluxe Roll', price: 5.50 }
      ],
      addOns: [
        { name: 'Extra Wasabi & Ginger', price: 0.75 },
        { name: 'Crunchy Tempura Flakes', price: 1.00 },
        { name: 'Side Miso Soup', price: 3.00 }
      ]
    }
  },
  {
    id: 'f4',
    name: 'Crispy Birria Beef Tacos',
    category: 'mexican',
    price: 15.99,
    originalPrice: 19.00,
    rating: 4.9,
    reviewsCount: 389,
    isVeg: false,
    isBestseller: true,
    prepTime: '20-25 mins',
    calories: '610 kcal',
    description: 'Three slow-cooked shredded beef tacos dipped in rich chili broth, grilled with Oaxaca cheese, cilantro, onions & lime consommé.',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r4',
      name: 'Cantina Del Sol',
      rating: 4.7,
      deliveryTime: '25-35 min',
      distance: '2.5 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Trio (3 Tacos)', price: 0 },
        { name: 'Fiesta Pack (5 Tacos)', price: 6.00 }
      ],
      addOns: [
        { name: 'Fresh Guacamole Bowl', price: 3.50 },
        { name: 'Extra Consommé Broth', price: 2.00 },
        { name: 'Spicy Habanero Salsa', price: 1.00 }
      ]
    }
  },
  {
    id: 'f5',
    name: 'Royal Dum Biryani',
    category: 'indian',
    price: 16.50,
    originalPrice: 20.00,
    rating: 4.9,
    reviewsCount: 620,
    isVeg: false,
    isBestseller: true,
    prepTime: '25-30 mins',
    calories: '750 kcal',
    description: 'Aromatic long-grain basmati rice slow-steamed under dough with tender spiced chicken, saffron, fried onions, served with mint raita.',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r5',
      name: 'Spice Crown Palace',
      rating: 4.9,
      deliveryTime: '30-40 min',
      distance: '3.8 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Regular Portion', price: 0 },
        { name: 'Family Feast Portion', price: 7.00 }
      ],
      addOns: [
        { name: 'Butter Garlic Naan', price: 2.50 },
        { name: 'Extra Mint Raita', price: 1.25 },
        { name: 'Boiled Egg (2pcs)', price: 1.50 },
        { name: 'Gulab Jamun (2pcs)', price: 3.00 }
      ]
    }
  },
  {
    id: 'f6',
    name: 'Avocado & Quinoa Zen Bowl',
    category: 'healthy',
    price: 13.75,
    originalPrice: 16.50,
    rating: 4.7,
    reviewsCount: 215,
    isVeg: true,
    isBestseller: false,
    prepTime: '15-20 mins',
    calories: '420 kcal',
    description: 'Organic red quinoa, ripe Hass avocado, roasted chickpeas, cherry tomatoes, baby spinach, edamame and lemon-tahini dressing.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r6',
      name: 'Green Roots Botanica',
      rating: 4.7,
      deliveryTime: '15-25 min',
      distance: '1.2 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Standard Bowl', price: 0 },
        { name: 'Protein Loaded Jumbo', price: 3.50 }
      ],
      addOns: [
        { name: 'Grilled Herb Tofu', price: 2.50 },
        { name: 'Extra Avocado Half', price: 2.00 },
        { name: 'Toasted Pumpkin Seeds', price: 1.00 }
      ]
    }
  },
  {
    id: 'f7',
    name: 'Molten Belgian Chocolate Lava',
    category: 'dessert',
    price: 8.99,
    originalPrice: 11.00,
    rating: 4.9,
    reviewsCount: 440,
    isVeg: true,
    isBestseller: true,
    prepTime: '12-15 mins',
    calories: '480 kcal',
    description: 'Warm chocolate cake with an oozing liquid 70% dark chocolate center, topped with powdered sugar and vanilla bean gelato.',
    image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r7',
      name: 'Sweet Velvet Bakery',
      rating: 4.9,
      deliveryTime: '15-20 min',
      distance: '1.0 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Single Serving', price: 0 },
        { name: 'Double Indulgence', price: 5.00 }
      ],
      addOns: [
        { name: 'Extra Vanilla Gelato Scoop', price: 2.00 },
        { name: 'Fresh Strawberries', price: 1.50 },
        { name: 'Salted Caramel Drizzle', price: 1.00 }
      ]
    }
  },
  {
    id: 'f8',
    name: 'Brown Sugar Tiger Milk Boba',
    category: 'drinks',
    price: 6.50,
    originalPrice: 8.00,
    rating: 4.8,
    reviewsCount: 375,
    isVeg: true,
    isBestseller: true,
    prepTime: '5-10 mins',
    calories: '310 kcal',
    description: 'Slow-cooked warm brown sugar pearls, fresh organic milk, hand-shaken with caramelized black tea and rich cream foam crown.',
    image: 'https://images.unsplash.com/photo-1558857563-b37cf006a86c?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r8',
      name: 'Boba Cloud Studio',
      rating: 4.8,
      deliveryTime: '15-20 min',
      distance: '0.8 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Regular (500ml)', price: 0 },
        { name: 'Large (700ml)', price: 1.50 }
      ],
      addOns: [
        { name: 'Cheese Foam Topping', price: 1.25 },
        { name: 'Extra Brown Sugar Boba', price: 0.75 },
        { name: 'Egg Pudding', price: 1.00 }
      ]
    }
  },
  {
    id: 'f9',
    name: 'Smoked Pepperoni Supreme Pizza',
    category: 'pizza',
    price: 18.99,
    originalPrice: 23.00,
    rating: 4.8,
    reviewsCount: 470,
    isVeg: false,
    isBestseller: false,
    prepTime: '20-30 mins',
    calories: '810 kcal',
    description: 'Crispy cup-and-char pepperoni, spicy Italian sausage, mozzarella, roasted bell peppers, oregano and crushed garlic crust.',
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=600&auto=format&fit=crop&q=80',
    restaurant: {
      id: 'r2',
      name: 'Napoli Woodfire Co.',
      rating: 4.9,
      deliveryTime: '25-35 min',
      distance: '2.1 km'
    },
    customizationOptions: {
      sizes: [
        { name: 'Regular 10"', price: 0 },
        { name: 'Large 14"', price: 4.50 }
      ],
      addOns: [
        { name: 'Extra Mozzarella', price: 2.00 },
        { name: 'Spicy Chili Flakes Pack', price: 0.50 },
        { name: 'Garlic Butter Crust Dip', price: 1.50 }
      ]
    }
  }
];

export const INITIAL_RESTAURANTS = [
  {
    id: 'r-momo',
    name: 'The Himalayan Momo Co.',
    cuisine: 'Himalayan, Tibetan, Dimsums',
    rating: 4.9,
    deliveryTime: '20-25 min',
    distance: '1.1 km',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&auto=format&fit=crop&q=80',
    location: 'Little Tibet, High Street'
  },
  {
    id: 'r1',
    name: 'The Burger Forge',
    cuisine: 'Gourmet Burgers, Shakes, Fries',
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '1.4 km',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    location: '44 Gourmet Boulevard'
  },
  {
    id: 'r2',
    name: 'Napoli Woodfire Co.',
    cuisine: 'Italian, Neapolitan Pizza, Pasta',
    rating: 4.9,
    deliveryTime: '25-35 min',
    distance: '2.1 km',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    location: '12 Via Roma Way'
  },
  {
    id: 'r3',
    name: 'Oishii Sushi Lounge',
    cuisine: 'Japanese, Sushi, Ramen',
    rating: 4.8,
    deliveryTime: '20-30 min',
    distance: '3.0 km',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=600&auto=format&fit=crop&q=80',
    location: '88 Sakura Avenue'
  },
  {
    id: 'r5',
    name: 'Spice Crown Palace',
    cuisine: 'North Indian, Mughlai, Biryani',
    rating: 4.9,
    deliveryTime: '30-40 min',
    distance: '3.8 km',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=600&auto=format&fit=crop&q=80',
    location: 'Royal Heritage Plaza'
  }
];

export const VALID_COUPONS = {
  FOODRO50: { code: 'FOODRO50', discountPercent: 50, maxDiscount: 15, minOrder: 15, description: '50% off up to $15 / ₹1200' },
  MOMOLOV: { code: 'MOMOLOV', discountPercent: 30, maxDiscount: 10, minOrder: 10, description: '30% off on all Momos & Dumplings' },
  FREEDEL: { code: 'FREEDEL', freeDelivery: true, minOrder: 12, description: 'Free delivery on your meal' },
  WELCOME10: { code: 'WELCOME10', flatDiscount: 10, minOrder: 25, description: 'Flat $10 / ₹800 off' }
};

export const MOCK_DRIVER = {
  name: 'Marcus Vance',
  phone: '+1 (555) 382-9012',
  vehicle: 'Honda PCX Scooter (Silver)',
  plate: '7RO-982',
  rating: 4.95,
  deliveries: '1,420+',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
};
