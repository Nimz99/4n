import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Star, Shield, Zap, Heart, ShoppingCart, ExternalLink } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  // Get additional images from product data or use defaults
  const additionalImages = product?.additionalImages?.filter(img => img) || [
    'https://i.imgur.com/example1.jpg',
    'https://i.imgur.com/example2.jpg',
    'https://i.imgur.com/example3.jpg',
    'https://i.imgur.com/example4.jpg'
  ];



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, 'products', id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        } else {
          console.log('No such product!');
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
        navigate('/');
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleBuyClick = () => {
    window.open(product.affiliateLink, '_blank', 'noopener,noreferrer');
  };

  const handlePreviousImage = () => {
    const allImages = [product.imageUrl, ...additionalImages];
    setSelectedImage(selectedImage === 0 ? allImages.length - 1 : selectedImage - 1);
  };

  const handleNextImage = () => {
    const allImages = [product.imageUrl, ...additionalImages];
    setSelectedImage(selectedImage === allImages.length - 1 ? 0 : selectedImage + 1);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="btn-primary"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{product.name} - Premium Phone Case | Detailed Review</title>
        <meta name="description" content={`Discover why ${product.name} is the best choice. Compare features, see multiple angles, and learn about its superior protection.`} />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Header */}
        <motion.div 
          className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="container mx-auto px-4 py-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Products</span>
            </button>
          </div>
        </motion.div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                                 {/* Main Image */}
                 <div className="relative">
                   <img
                     src={[product.imageUrl, ...additionalImages][selectedImage]}
                     alt={product.name}
                     className="w-full h-96 object-contain bg-gray-100 dark:bg-gray-700"
                     onError={(e) => {
                       e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                     }}
                   />
                   
                   {/* Navigation Arrows */}
                   <motion.button
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={handlePreviousImage}
                     className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                   >
                     <ArrowLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                   </motion.button>
                   
                   <motion.button
                     whileHover={{ scale: 1.1 }}
                     whileTap={{ scale: 0.9 }}
                     onClick={handleNextImage}
                     className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
                   >
                     <ArrowRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                   </motion.button>
                   
                   <div className="absolute top-4 right-4">
                     <motion.button
                       whileHover={{ scale: 1.1 }}
                       whileTap={{ scale: 0.9 }}
                       className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full shadow-lg"
                     >
                       <Heart className="h-5 w-5 text-red-500" />
                     </motion.button>
                   </div>
                 </div>

                {/* Thumbnail Images */}
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {[product.imageUrl, ...additionalImages].map((image, index) => (
                      <motion.button
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                          selectedImage === index 
                            ? 'border-primary-600' 
                            : 'border-gray-200 dark:border-gray-600'
                        }`}
                      >
                                                 <img
                           src={image}
                           alt={`${product.name} view ${index + 1}`}
                           className="w-full h-full object-contain bg-gray-100 dark:bg-gray-700"
                           onError={(e) => {
                             e.target.src = 'https://via.placeholder.com/64x64?text=Image';
                           }}
                         />
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              {/* Product Header */}
              <div>
                <span className="inline-block px-3 py-1 text-sm font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200 rounded-full mb-3">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">4.8 (127 reviews)</span>
                  </div>
                </div>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-6">
                  ${product.price}
                </div>
              </div>

              {/* Key Features */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Why Choose This Case?</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Military-grade drop protection (15ft)</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Zap className="h-5 w-5 text-blue-500" />
                    <span className="text-gray-700 dark:text-gray-300">Ultra-responsive buttons</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Heart className="h-5 w-5 text-red-500" />
                    <span className="text-gray-700 dark:text-gray-300">Premium materials that last</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyClick}
                  className="flex-1 btn-primary flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Buy from Amazon</span>
                  <ExternalLink className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          </div>

                     {/* Product Overview Section */}
           <motion.div
             initial={{ y: 50, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.6 }}
             className="mt-12"
           >
             <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
               <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Product Overview</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Protection Features</h4>
                   <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                     <li>• Military-grade drop protection up to 15 feet</li>
                     <li>• Raised bezel protects camera and screen</li>
                     <li>• Anti-slip grip pattern for secure handling</li>
                     <li>• Shock-absorbing inner core</li>
                   </ul>
                 </div>
                 <div>
                   <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Material Quality</h4>
                   <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                     <li>• Premium TPU outer shell</li>
                     <li>• Polycarbonate inner frame</li>
                     <li>• Scratch-resistant coating</li>
                     <li>• UV-resistant materials</li>
                   </ul>
                 </div>
               </div>
             </div>
           </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
