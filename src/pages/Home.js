import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../firebase/config';
import ProductCard from '../components/ProductCard';
import SearchAndFilter from '../components/SearchAndFilter';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Sparkles, TrendingUp } from 'lucide-react';

// Loading Skeleton Component
const ProductSkeleton = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="card overflow-hidden"
  >
    <div className="animate-pulse">
      <div className="h-48 bg-gray-200 dark:bg-gray-700" />
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
        <div className="flex justify-between items-center">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16" />
          <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  </motion.div>
);

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch products from Firestore
  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const productsData = [];
      querySnapshot.forEach((doc) => {
        productsData.push({ id: doc.id, ...doc.data() });
      });
      setProducts(productsData);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching products:', error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Filter products based on search and category
  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // Get unique categories
  const categories = [...new Set(products.map(product => product.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const statsVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2 mb-4"
          >
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <span className="text-lg text-gray-600 dark:text-gray-400">Loading amazing products...</span>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <ProductSkeleton key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Premium Phone Cases - Protect Your Device</title>
        <meta name="description" content="Discover high-quality phone cases for iPhone, Samsung, OnePlus and more. Shop our curated collection of protective cases." />
      </Helmet>

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Floating Circles */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-primary-200/20 rounded-full blur-sm"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-16 h-16 bg-blue-200/20 rounded-full blur-sm"
          animate={{
            y: [0, 40, 0],
            x: [0, -30, 0],
            scale: [1, 0.8, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-24 h-24 bg-purple-200/20 rounded-full blur-sm"
          animate={{
            y: [0, -50, 0],
            x: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
        />
        
        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/3 right-1/3 w-32 h-32 bg-gradient-to-r from-primary-400/10 to-blue-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-xl"
          animate={{
            scale: [1, 0.7, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6
          }}
        />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-5">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary-600/20 to-transparent"
            animate={{
              x: [0, 100, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-12"
          variants={heroVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="flex items-center justify-center space-x-2 mb-4"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <Sparkles className="h-8 w-8 text-primary-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
              Premium Phone Cases
            </h1>
            <Sparkles className="h-8 w-8 text-primary-600" />
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Protect your device with our curated collection of high-quality phone cases for all major brands.
          </motion.p>

          {/* Stats */}
          <motion.div 
            className="flex justify-center space-x-8 text-center"
            variants={statsVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {products.length} Products Available
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Premium Quality
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            categories={categories}
          />
        </motion.div>

        {/* Results Count */}
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-gray-600 dark:text-gray-400">
            Showing <span className="font-semibold text-primary-600">{filteredProducts.length}</span> of <span className="font-semibold">{products.length}</span> products
          </p>
        </motion.div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-gray-500 dark:text-gray-400 text-lg mb-4">
              No products found matching your criteria.
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="btn-primary"
            >
              Clear Filters
            </motion.button>
          </motion.div>
        ) : (
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ 
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                >
                  <ProductCard product={product} index={index} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Home;
