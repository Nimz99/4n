import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, ShoppingCart, Heart, Eye } from 'lucide-react';

const ProductCard = ({ product, index = 0 }) => {
  const navigate = useNavigate();
  
  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const handleSeeMoreClick = () => {
    navigate(`/product/${product.id}`);
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
      className="card overflow-hidden group cursor-pointer relative"
      style={{ perspective: "1000px" }}
    >
      {/* Animated Background Glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-primary-400/5 to-blue-400/5 rounded-lg opacity-0 group-hover:opacity-100"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-2 right-2 w-1 h-1 bg-primary-400/30 rounded-full"
          animate={{
            y: [0, -10, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }}
        />
        <motion.div
          className="absolute bottom-4 left-3 w-1 h-1 bg-blue-400/30 rounded-full"
          animate={{
            y: [0, 8, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.3
          }}
        />
      </div>
      {/* Product Image */}
      <div className="relative overflow-hidden bg-gray-100 dark:bg-gray-700">
        <motion.img
          variants={imageVariants}
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-contain bg-gray-100 dark:bg-gray-700"
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
        
        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-0 left-0 z-10">
            <div className="relative">
              {/* Starburst Shape */}
              <div className="w-16 h-16 relative">
                <div className="absolute inset-0 bg-red-600 transform rotate-45"></div>
                <div className="absolute inset-0 bg-red-600 transform -rotate-45"></div>
                <div className="absolute inset-0 bg-red-600 transform rotate-90"></div>
                <div className="absolute inset-0 bg-red-600 transform -rotate-90"></div>
                <div className="absolute inset-0 bg-red-600 transform rotate-22.5"></div>
                <div className="absolute inset-0 bg-red-600 transform -rotate-22.5"></div>
                <div className="absolute inset-0 bg-red-600 transform rotate-67.5"></div>
                <div className="absolute inset-0 bg-red-600 transform -rotate-67.5"></div>
                
                {/* Center Circle */}
                <div className="absolute inset-2 bg-red-600 rounded-full"></div>
                
                {/* Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-sm font-bold leading-none">
                    {product.discount}%
                  </span>
                  <span className="text-white text-xs font-bold leading-none">
                    OFF
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
        
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
          className="text-base font-semibold text-gray-900 dark:text-white mb-1 line-clamp-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + index * 0.1 }}
        >
          {product.name}
        </motion.h3>
        
        <motion.p 
          className="text-xs text-gray-600 dark:text-gray-400 mb-2 line-clamp-1"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + index * 0.1 }}
        >
          {product.description}
        </motion.p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {product.discount ? (
              <>
                <motion.span 
                  className="text-lg font-bold text-primary-600 dark:text-primary-400"
                  variants={priceVariants}
                  whileHover="hover"
                >
                  ${(product.price * (1 - product.discount / 100)).toFixed(2)}
                </motion.span>
                <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <motion.span 
                className="text-lg font-bold text-primary-600 dark:text-primary-400"
                variants={priceVariants}
                whileHover="hover"
              >
                ${product.price}
              </motion.span>
            )}
          </div>
          
          <div className="flex space-x-1">
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleSeeMoreClick}
              className="btn-secondary flex items-center space-x-1 relative overflow-hidden text-xs px-2 py-1"
            >
              <Eye className="h-3 w-3" />
              <span>See More</span>
            </motion.button>
            
            <motion.button
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleBuyClick}
              className="btn-primary flex items-center space-x-1 relative overflow-hidden text-xs px-2 py-1"
            >
              <motion.div
                className="absolute inset-0 bg-white/20"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.6 }}
              />
              <ShoppingCart className="h-3 w-3" />
              <span>Buy from Amazon</span>
              <ExternalLink className="h-2 w-2" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
