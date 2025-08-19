// Sample products data for initial setup
// You can use this to populate your Firestore database

export const sampleProducts = [
  {
    name: "iPhone 14 Pro Max Protective Case",
    description: "Premium protective case with military-grade drop protection and MagSafe compatibility. Features a sleek design with precise cutouts for all ports and buttons.",
    price: 39.99,
    imageUrl: "https://i.imgur.com/example1.jpg",
    affiliateLink: "https://amazon.com/iphone-14-pro-max-case",
    category: "iPhone",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Samsung Galaxy S23 Ultra Rugged Case",
    description: "Heavy-duty protective case designed for the Samsung Galaxy S23 Ultra. Includes built-in screen protector and kickstand for hands-free viewing.",
    price: 49.99,
    imageUrl: "https://i.imgur.com/example2.jpg",
    affiliateLink: "https://amazon.com/samsung-s23-ultra-case",
    category: "Samsung",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "OnePlus 11 Clear Protective Case",
    description: "Transparent protective case that showcases your OnePlus 11's design while providing excellent protection. Anti-yellowing technology keeps it crystal clear.",
    price: 29.99,
    imageUrl: "https://i.imgur.com/example3.jpg",
    affiliateLink: "https://amazon.com/oneplus-11-case",
    category: "OnePlus",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Google Pixel 7 Pro Minimalist Case",
    description: "Ultra-thin minimalist case for Google Pixel 7 Pro. Provides essential protection without adding bulk, perfect for those who love the phone's original design.",
    price: 24.99,
    imageUrl: "https://i.imgur.com/example4.jpg",
    affiliateLink: "https://amazon.com/google-pixel-7-pro-case",
    category: "Google",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "iPhone 13 Waterproof Case",
    description: "Waterproof protective case for iPhone 13 with IP68 rating. Perfect for outdoor activities, swimming, and extreme sports. Includes lanyard attachment.",
    price: 34.99,
    imageUrl: "https://i.imgur.com/example5.jpg",
    affiliateLink: "https://amazon.com/iphone-13-waterproof-case",
    category: "iPhone",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Samsung Galaxy A54 Wallet Case",
    description: "Premium wallet case for Samsung Galaxy A54 with card slots and magnetic closure. Combines protection with convenience for everyday use.",
    price: 27.99,
    imageUrl: "https://i.imgur.com/example6.jpg",
    affiliateLink: "https://amazon.com/samsung-a54-wallet-case",
    category: "Samsung",
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

// Instructions for adding sample data to Firestore:
/*
1. Open your Firebase Console
2. Go to Firestore Database
3. Create a collection named 'products'
4. Add documents with the following fields:
   - name (string)
   - description (string)
   - price (number)
   - imageUrl (string)
   - affiliateLink (string)
   - category (string)
   - createdAt (timestamp)
   - updatedAt (timestamp)

You can copy the data from the sampleProducts array above and paste it into your Firestore documents.
*/
