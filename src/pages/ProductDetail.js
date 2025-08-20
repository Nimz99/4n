import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, Star, Shield, Zap, Heart, ShoppingCart, ExternalLink, Check, X } from 'lucide-react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('overview');

  // Get additional images from product data or use defaults
  const additionalImages = product?.additionalImages?.filter(img => img) || [
    'https://i.imgur.com/example1.jpg',
    'https://i.imgur.com/example2.jpg',
    'https://i.imgur.com/example3.jpg',
    'https://i.imgur.com/example4.jpg'
  ];

  // Get comparison data from product or use defaults
  const getComparisonData = () => {
    if (product?.comparisonData) {
      return Object.entries(product.comparisonData).map(([feature, data]) => ({
        feature: feature.replace(/([A-Z])/g, ' $1').trim(),
        ourCase: data.ourCase,
        competitor1: data.competitor1,
        competitor2: data.competitor2,
        competitor3: data.competitor3
      }));
    }
    
    // Default comparison data
    return [
      {
        feature: 'Drop Protection',
        ourCase: '15ft',
        competitor1: '10ft',
        competitor2: '12ft',
        competitor3: '8ft'
      },
      {
        feature: 'Material Quality',
        ourCase: 'Premium TPU + Polycarbonate',
        competitor1: 'Basic TPU',
        competitor2: 'Silicone',
        competitor3: 'Plastic'
      },
      {
        feature: 'Grip Texture',
        ourCase: 'Anti-slip Pattern',
        competitor1: 'Smooth',
        competitor2: 'Basic Texture',
        competitor3: 'None'
      },
      {
        feature: 'Camera Protection',
        ourCase: 'Raised Bezel',
        competitor1: 'Flush',
        competitor2: 'Slight Raise',
        competitor3: 'None'
      },
      {
        feature: 'Warranty',
        ourCase: '2 Years',
        competitor1: '1 Year',
        competitor2: '6 Months',
        competitor3: 'None'
      }
    ];
  };

  const comparisonData = getComparisonData();

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
                     src={product.imageUrl}
                     alt={product.name}
                     className="w-full h-96 object-contain bg-gray-100 dark:bg-gray-700"
                     onError={(e) => {
                       e.target.src = 'https://via.placeholder.com/600x400?text=Image+Not+Found';
                     }}
                   />
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

          {/* Tabs */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg">
              {/* Tab Navigation */}
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'comparison', label: 'Comparison' },
                    { id: 'reviews', label: 'Reviews' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                        activeTab === tab.id
                          ? 'border-primary-600 text-primary-600 dark:text-primary-400'
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                <AnimatePresence mode="wait">
                  {activeTab === 'overview' && (
                    <motion.div
                      key="overview"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Product Overview</h3>
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
                    </motion.div>
                  )}

                  {activeTab === 'comparison' && (
                    <motion.div
                      key="comparison"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Comparison with Other Cases</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700">
                              <th className="text-left py-3 font-semibold text-gray-900 dark:text-white">Feature</th>
                              <th className="text-center py-3 font-semibold text-primary-600 dark:text-primary-400">Our Case</th>
                              <th className="text-center py-3 font-semibold text-gray-600 dark:text-gray-400">Competitor 1</th>
                              <th className="text-center py-3 font-semibold text-gray-600 dark:text-gray-400">Competitor 2</th>
                              <th className="text-center py-3 font-semibold text-gray-600 dark:text-gray-400">Competitor 3</th>
                            </tr>
                          </thead>
                          <tbody>
                            {comparisonData.map((row, index) => (
                              <tr key={index} className="border-b border-gray-100 dark:border-gray-800">
                                <td className="py-3 font-medium text-gray-900 dark:text-white">{row.feature}</td>
                                <td className="py-3 text-center">
                                  <div className="flex items-center justify-center space-x-1">
                                    <Check className="h-4 w-4 text-green-500" />
                                    <span className="text-primary-600 dark:text-primary-400 font-medium">{row.ourCase}</span>
                                  </div>
                                </td>
                                <td className="py-3 text-center text-gray-600 dark:text-gray-400">{row.competitor1}</td>
                                <td className="py-3 text-center text-gray-600 dark:text-gray-400">{row.competitor2}</td>
                                <td className="py-3 text-center text-gray-600 dark:text-gray-400">{row.competitor3}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'reviews' && (
                    <motion.div
                      key="reviews"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                    >
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Customer Reviews</h3>
                      <div className="space-y-4">
                        {[
                          {
                            name: "Sarah M.",
                            rating: 5,
                            date: "2 days ago",
                            comment: "Excellent protection! Dropped my phone twice and no damage at all. The grip is perfect."
                          },
                          {
                            name: "Mike R.",
                            rating: 5,
                            date: "1 week ago",
                            comment: "Best case I've ever owned. Premium feel and great button responsiveness."
                          },
                          {
                            name: "Lisa K.",
                            rating: 4,
                            date: "2 weeks ago",
                            comment: "Great case, fits perfectly. Only giving 4 stars because it's a bit pricey."
                          }
                        ].map((review, index) => (
                          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-2">
                                <span className="font-medium text-gray-900 dark:text-white">{review.name}</span>
                                <div className="flex items-center space-x-1">
                                  {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                                  ))}
                                </div>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-gray-600 dark:text-gray-300">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
