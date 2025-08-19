import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShoppingCart, Heart } from 'lucide-react';

const ProductCard = ({ product, index = 0 }) => {
  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9,
      rotateX: -15
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    hover: {
      y: -10,
      scale: 1.02,
      rotateY: 2,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const imageVariants = {
    hover: {
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.3)",
      transition: {
        duration: 0.2,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1
      }
    }
  };

  const priceVariants = {
    hover: {
      scale: 1.1,
      color: "#2563eb",
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className="card overflow-hidden group cursor-pointer"
      style={{ perspective: "1000px" }}
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        <motion.img
          variants={imageVariants}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
          }}
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Floating Action Button */}
        <motion.button
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg"
          whileHover={{ scale: 1.1, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.2 }}
        >
          <Heart className="h-4 w-4 text-red-500" />
        </motion.button>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <motion.div 
          className="mb-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full">
            {product.category}
          </span>
        </motion.div>
        
        <motion.h3 
          className="text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {product.name}
        </motion.h3>
        
        <motion.p 
          className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {product.description}
        </motion.p>
        
        <div className="flex items-center justify-between">
          <motion.span 
            className="text-xl font-bold text-primary-600 dark:text-primary-400"
            variants={priceVariants}
            whileHover="hover"
          >
            ${product.price}
          </motion.span>
          
          <motion.button
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            onClick={handleBuyClick}
            className="btn-primary flex items-center space-x-2 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.6 }}
            />
            <ShoppingCart className="h-4 w-4" />
            <span>Buy Now</span>
            <ExternalLink className="h-3 w-3" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
