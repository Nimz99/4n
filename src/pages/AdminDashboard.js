import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit, Trash2, X, Save, Loader2, AlertCircle, Database } from 'lucide-react';
import { addSampleProducts } from '../utils/addSampleProducts';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    affiliateLink: '',
    category: '',
    discount: '',
    additionalImages: ['', '', '', ''],
    comparisonData: {
      dropProtection: { ourCase: '15ft', competitor1: '10ft', competitor2: '12ft', competitor3: '8ft' },
      materialQuality: { ourCase: 'Premium TPU + Polycarbonate', competitor1: 'Basic TPU', competitor2: 'Silicone', competitor3: 'Plastic' },
      gripTexture: { ourCase: 'Anti-slip Pattern', competitor1: 'Smooth', competitor2: 'Basic Texture', competitor3: 'None' },
      cameraProtection: { ourCase: 'Raised Bezel', competitor1: 'Flush', competitor2: 'Slight Raise', competitor3: 'None' },
      warranty: { ourCase: '2 Years', competitor1: '1 Year', competitor2: '6 Months', competitor3: 'None' }
    }
  });
  const [error, setError] = useState('');

  // Fetch products from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (querySnapshot) => {
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

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      imageUrl: '',
      affiliateLink: '',
      category: '',
      discount: '',
      additionalImages: ['', '', '', ''],
      comparisonData: {
        dropProtection: { ourCase: '15ft', competitor1: '10ft', competitor2: '12ft', competitor3: '8ft' },
        materialQuality: { ourCase: 'Premium TPU + Polycarbonate', competitor1: 'Basic TPU', competitor2: 'Silicone', competitor3: 'Plastic' },
        gripTexture: { ourCase: 'Anti-slip Pattern', competitor1: 'Smooth', competitor2: 'Basic Texture', competitor3: 'None' },
        cameraProtection: { ourCase: 'Raised Bezel', competitor1: 'Flush', competitor2: 'Slight Raise', competitor3: 'None' },
        warranty: { ourCase: '2 Years', competitor1: '1 Year', competitor2: '6 Months', competitor3: 'None' }
      }
    });
    setEditingProduct(null);
    setShowAddForm(false);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.price || !formData.imageUrl || !formData.affiliateLink || !formData.category) {
      setError('Please fill in all fields');
      return;
    }

    try {
      setError('');
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        createdAt: editingProduct ? formData.createdAt : serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      if (editingProduct) {
        await updateDoc(doc(db, 'products', editingProduct.id), productData);
      } else {
        await addDoc(collection(db, 'products'), productData);
      }
      
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      setError('Failed to save product. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      affiliateLink: product.affiliateLink,
      category: product.category,
      discount: product.discount || '',
      createdAt: product.createdAt,
      additionalImages: product.additionalImages || ['', '', '', ''],
      comparisonData: product.comparisonData || {
        dropProtection: { ourCase: '15ft', competitor1: '10ft', competitor2: '12ft', competitor3: '8ft' },
        materialQuality: { ourCase: 'Premium TPU + Polycarbonate', competitor1: 'Basic TPU', competitor2: 'Silicone', competitor3: 'Plastic' },
        gripTexture: { ourCase: 'Anti-slip Pattern', competitor1: 'Smooth', competitor2: 'Basic Texture', competitor3: 'None' },
        cameraProtection: { ourCase: 'Raised Bezel', competitor1: 'Flush', competitor2: 'Slight Raise', competitor3: 'None' },
        warranty: { ourCase: '2 Years', competitor1: '1 Year', competitor2: '6 Months', competitor3: 'None' }
      }
    });
    setShowAddForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteDoc(doc(db, 'products', productId));
      } catch (error) {
        console.error('Error deleting product:', error);
        setError('Failed to delete product. Please try again.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdditionalImageChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      additionalImages: prev.additionalImages.map((img, i) => i === index ? value : img)
    }));
  };

  const handleComparisonChange = (feature, field, value) => {
    setFormData(prev => ({
      ...prev,
      comparisonData: {
        ...prev.comparisonData,
        [feature]: {
          ...prev.comparisonData[feature],
          [field]: value
        }
      }
    }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
          <span className="text-lg text-gray-600 dark:text-gray-400">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard - Phone Case Affiliate</title>
        <meta name="description" content="Admin dashboard for managing phone case products" />
      </Helmet>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your phone case products</p>
          </div>
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={async () => {
                if (window.confirm('Add sample products to your database?')) {
                  await addSampleProducts();
                }
              }}
              className="btn-secondary flex items-center space-x-2"
            >
              <Database className="h-5 w-5" />
              <span>Add Sample Data</span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="btn-primary flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>Add Product</span>
            </motion.button>
          </div>
        </div>

        {/* Add/Edit Form Modal */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <button
                      onClick={resetForm}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>

                  {error && (
                    <div className="flex items-center space-x-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg mb-4">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                      <span className="text-sm text-red-700 dark:text-red-400">{error}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Product Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="iPhone 14 Pro Case"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Category
                        </label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleInputChange}
                          className="input-field"
                          required
                        >
                          <option value="">Select Category</option>
                          <option value="iPhone">iPhone</option>
                          <option value="Samsung">Samsung</option>
                          <option value="OnePlus">OnePlus</option>
                          <option value="Google">Google</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Description
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        className="input-field"
                        rows="3"
                        placeholder="Describe the product features..."
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          value={formData.price}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="29.99"
                          step="0.01"
                          min="0"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Discount (%)
                        </label>
                        <input
                          type="number"
                          name="discount"
                          value={formData.discount}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="20"
                          step="1"
                          min="0"
                          max="100"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Image URL (Imgur)
                        </label>
                        <input
                          type="url"
                          name="imageUrl"
                          value={formData.imageUrl}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="https://i.imgur.com/example.jpg"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Affiliate Link
                        </label>
                        <input
                          type="url"
                          name="affiliateLink"
                          value={formData.affiliateLink}
                          onChange={handleInputChange}
                          className="input-field"
                          placeholder="https://amazon.com/affiliate-link"
                          required
                        />
                      </div>
                    </div>



                    {/* Additional Images Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Product Images</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Add up to 4 additional images for the product detail page (Imgur URLs)
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.additionalImages.map((image, index) => (
                          <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                              Additional Image {index + 1}
                            </label>
                            <input
                              type="url"
                              value={image}
                              onChange={(e) => handleAdditionalImageChange(index, e.target.value)}
                              className="input-field"
                              placeholder={`https://i.imgur.com/additional${index + 1}.jpg`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Comparison Data Section */}
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparison Data</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Set up comparison data to show why your case is better than competitors
                      </p>
                      
                      <div className="space-y-6">
                        {Object.entries(formData.comparisonData).map(([feature, data]) => (
                          <div key={feature} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                            <h4 className="font-medium text-gray-900 dark:text-white mb-3 capitalize">
                              {feature.replace(/([A-Z])/g, ' $1').trim()}
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Our Case
                                </label>
                                <input
                                  type="text"
                                  value={data.ourCase}
                                  onChange={(e) => handleComparisonChange(feature, 'ourCase', e.target.value)}
                                  className="input-field text-sm"
                                  placeholder="Our value"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Competitor 1
                                </label>
                                <input
                                  type="text"
                                  value={data.competitor1}
                                  onChange={(e) => handleComparisonChange(feature, 'competitor1', e.target.value)}
                                  className="input-field text-sm"
                                  placeholder="Competitor value"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Competitor 2
                                </label>
                                <input
                                  type="text"
                                  value={data.competitor2}
                                  onChange={(e) => handleComparisonChange(feature, 'competitor2', e.target.value)}
                                  className="input-field text-sm"
                                  placeholder="Competitor value"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                                  Competitor 3
                                </label>
                                <input
                                  type="text"
                                  value={data.competitor3}
                                  onChange={(e) => handleComparisonChange(feature, 'competitor3', e.target.value)}
                                  className="input-field text-sm"
                                  placeholder="Competitor value"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                      <button
                        type="button"
                        onClick={resetForm}
                        className="btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-primary flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{editingProduct ? 'Update' : 'Add'} Product</span>
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Products Table */}
        <div className="card overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Products ({products.length})
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {products.map((product) => (
                  <motion.tr
                    key={product.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                                                 <img
                           src={product.imageUrl}
                           alt={product.name}
                           className="h-12 w-12 rounded-lg object-contain bg-gray-100 dark:bg-gray-700 mr-4"
                           onError={(e) => {
                             e.target.src = 'https://via.placeholder.com/48x48?text=Image';
                           }}
                         />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {product.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                            {product.description}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${product.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleEdit(product)}
                          className="text-primary-600 dark:text-primary-400 hover:text-primary-900 dark:hover:text-primary-300"
                        >
                          <Edit className="h-4 w-4" />
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleDelete(product.id)}
                          className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                        >
                          <Trash2 className="h-4 w-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {products.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 dark:text-gray-400 text-lg">
                No products found. Add your first product to get started.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
