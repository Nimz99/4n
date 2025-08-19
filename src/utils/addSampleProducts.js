import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

const sampleProducts = [
  {
    name: "iPhone 14 Pro Max Protective Case",
    description: "Premium protective case with military-grade drop protection and MagSafe compatibility. Features a sleek design with precise cutouts for all ports and buttons.",
    price: 39.99,
    imageUrl: "https://i.imgur.com/8JZqX3L.jpg",
    affiliateLink: "https://amazon.com/iphone-14-pro-max-case",
    category: "iPhone",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Samsung Galaxy S23 Ultra Rugged Case",
    description: "Heavy-duty protective case designed for the Samsung Galaxy S23 Ultra. Includes built-in screen protector and kickstand for hands-free viewing.",
    price: 49.99,
    imageUrl: "https://i.imgur.com/K9mN2pQ.jpg",
    affiliateLink: "https://amazon.com/samsung-s23-ultra-case",
    category: "Samsung",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "OnePlus 11 Clear Protective Case",
    description: "Transparent protective case that showcases your OnePlus 11's design while providing excellent protection. Anti-yellowing technology keeps it crystal clear.",
    price: 29.99,
    imageUrl: "https://i.imgur.com/L5vR8mN.jpg",
    affiliateLink: "https://amazon.com/oneplus-11-case",
    category: "OnePlus",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Google Pixel 7 Pro Minimalist Case",
    description: "Ultra-thin minimalist case for Google Pixel 7 Pro. Provides essential protection without adding bulk, perfect for those who love the phone's original design.",
    price: 24.99,
    imageUrl: "https://i.imgur.com/Q2wX5vR.jpg",
    affiliateLink: "https://amazon.com/google-pixel-7-pro-case",
    category: "Google",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "iPhone 13 Waterproof Case",
    description: "Waterproof protective case for iPhone 13 with IP68 rating. Perfect for outdoor activities, swimming, and extreme sports. Includes lanyard attachment.",
    price: 34.99,
    imageUrl: "https://i.imgur.com/H7mK9pL.jpg",
    affiliateLink: "https://amazon.com/iphone-13-waterproof-case",
    category: "iPhone",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  },
  {
    name: "Samsung Galaxy A54 Wallet Case",
    description: "Premium wallet case for Samsung Galaxy A54 with card slots and magnetic closure. Combines protection with convenience for everyday use.",
    price: 27.99,
    imageUrl: "https://i.imgur.com/N4vR2qM.jpg",
    affiliateLink: "https://amazon.com/samsung-a54-wallet-case",
    category: "Samsung",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
];

export const addSampleProducts = async () => {
  try {
    const productsCollection = collection(db, 'products');
    
    for (const product of sampleProducts) {
      await addDoc(productsCollection, product);
      console.log(`Added product: ${product.name}`);
    }
    
    console.log('All sample products added successfully!');
  } catch (error) {
    console.error('Error adding sample products:', error);
  }
};

// To use this function, call it from your browser console or create a button in admin panel
// Example: addSampleProducts();
