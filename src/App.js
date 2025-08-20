import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';

// Force redeployment - Firebase config updated
function App() {
  return (
    <>
      <Helmet>
        <title>Premium Phone Cases - Protect Your Device</title>
        <meta name="description" content="Discover high-quality phone cases for iPhone, Samsung, OnePlus and more. Shop our curated collection of protective cases." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200 relative">
        {/* Background Animations */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Floating Circles */}
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full opacity-20"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-pink-400 to-red-500 rounded-full opacity-15"
            animate={{
              y: [0, 40, 0],
              x: [0, -30, 0],
              rotate: [0, -180, -360],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-32 left-1/4 w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20"
            animate={{
              y: [0, -20, 0],
              x: [0, 15, 0],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating Emojis */}
          <motion.div
            className="absolute top-16 right-1/4 text-4xl"
            animate={{
              y: [0, -40, 0],
              x: [0, 25, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            📱
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-16 text-3xl"
            animate={{
              y: [0, 30, 0],
              x: [0, -20, 0],
              rotate: [0, -20, 20, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🛡️
          </motion.div>
          <motion.div
            className="absolute bottom-24 right-16 text-5xl"
            animate={{
              y: [0, -25, 0],
              x: [0, 15, 0],
              rotate: [0, 25, -25, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ⭐
          </motion.div>
          <motion.div
            className="absolute top-1/3 left-1/2 text-3xl"
            animate={{
              y: [0, 35, 0],
              x: [0, -30, 0],
              rotate: [0, -30, 30, 0],
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            💎
          </motion.div>
          <motion.div
            className="absolute bottom-1/3 right-1/2 text-4xl"
            animate={{
              y: [0, -30, 0],
              x: [0, 20, 0],
              rotate: [0, 20, -20, 0],
            }}
            transition={{
              duration: 11,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🔥
          </motion.div>
          <motion.div
            className="absolute top-2/3 left-1/4 text-3xl"
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
              rotate: [0, -15, 15, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute bottom-1/2 left-1/3 text-4xl"
            animate={{
              y: [0, -20, 0],
              x: [0, 25, 0],
              rotate: [0, 30, -30, 0],
            }}
            transition={{
              duration: 13,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🎯
          </motion.div>
          <motion.div
            className="absolute top-1/4 right-1/3 text-3xl"
            animate={{
              y: [0, 40, 0],
              x: [0, -25, 0],
              rotate: [0, -25, 25, 0],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🚀
          </motion.div>

          {/* Gradient Orbs */}
          <motion.div
            className="absolute top-1/3 right-1/3 w-40 h-40 bg-gradient-radial from-yellow-200/30 to-transparent rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 left-1/3 w-32 h-32 bg-gradient-radial from-purple-200/40 to-transparent rounded-full"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.7, 0.4],
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Animated Grid */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }} />
          </div>
        </div>

        <Navbar />
        <main className="container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
