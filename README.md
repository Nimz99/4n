# Phone Case Affiliate Website

A modern, responsive affiliate marketing website for phone cases built with React, TailwindCSS, and Firebase. Features a beautiful frontend for customers and a comprehensive admin dashboard for product management.

## 🚀 Features

### Frontend (Customer Side)
- **Responsive Product Grid**: Beautiful card-based layout that works on all devices
- **Real-time Updates**: Products update instantly when modified in admin
- **Search & Filter**: Find products by name, description, or category
- **Category Filtering**: Filter by iPhone, Samsung, OnePlus, Google, and more
- **Smooth Animations**: Framer Motion animations for enhanced UX
- **Dark/Light Theme**: Toggle between themes with persistent preference
- **SEO Optimized**: Meta tags and structured data for better search visibility
- **Mobile-First Design**: Optimized for mobile devices

### Admin Dashboard
- **Secure Authentication**: Firebase Auth with email/password login
- **Product Management**: Add, edit, and delete products
- **Real-time Sync**: Changes appear instantly on the frontend
- **Image Support**: Imgur URL integration for product images
- **Affiliate Links**: Direct integration with affiliate marketing links
- **Category Management**: Organize products by phone brands
- **Responsive Table**: Clean table view with edit/delete actions

### Technical Features
- **Firebase Firestore**: Real-time database for products
- **Firebase Auth**: Secure admin authentication
- **React Router**: Client-side routing
- **TailwindCSS**: Utility-first CSS framework
- **Framer Motion**: Smooth animations and transitions
- **React Helmet**: SEO meta tag management
- **Lucide React**: Beautiful icons

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Firebase account

### 1. Clone and Install Dependencies
```bash
git clone <repository-url>
cd phone-case-affiliate
npm install
```

### 2. Firebase Setup

1. **Create a Firebase Project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Firestore Database
   - Enable Authentication (Email/Password)

2. **Configure Firestore**:
   - Create a collection named `products`
   - Set up security rules (see below)

3. **Update Firebase Config**:
   - Replace the Firebase config in `src/firebase/config.js` with your project details:
   ```javascript
   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };
   ```

### 3. Firestore Security Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow public read access to products
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Create Admin User
1. Go to Firebase Console > Authentication
2. Add a new user with email and password
3. Use these credentials to log into the admin dashboard

### 5. Start Development Server
```bash
npm start
```

The app will be available at `http://localhost:3000`

## 📱 Usage

### For Customers
1. Visit the homepage to browse all phone cases
2. Use the search bar to find specific products
3. Filter by category (iPhone, Samsung, etc.)
4. Click "Buy Now" to visit the affiliate link
5. Toggle between light/dark themes

### For Admins
1. Navigate to `/admin/login`
2. Sign in with your Firebase credentials
3. Add new products with:
   - Product name and description
   - Price
   - Imgur image URL
   - Affiliate link
   - Category
4. Edit or delete existing products
5. All changes appear instantly on the frontend

## 🚀 Deployment

### Deploy to Netlify
1. Build the project: `npm run build`
2. Connect your GitHub repository to Netlify
3. Set build command: `npm run build`
4. Set publish directory: `build`

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

### Deploy to Firebase Hosting
1. Install Firebase CLI: `npm i -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## 📁 Project Structure
```
src/
├── components/          # Reusable components
│   ├── Navbar.js       # Navigation bar
│   ├── ProductCard.js  # Product display card
│   ├── SearchAndFilter.js # Search and filter controls
│   └── ProtectedRoute.js # Auth protection
├── contexts/           # React contexts
│   ├── AuthContext.js  # Authentication state
│   └── ThemeContext.js # Theme management
├── firebase/           # Firebase configuration
│   └── config.js       # Firebase setup
├── pages/              # Page components
│   ├── Home.js         # Main product listing
│   ├── AdminLogin.js   # Admin authentication
│   └── AdminDashboard.js # Product management
├── App.js              # Main app component
└── index.js            # App entry point
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update `src/index.css` for custom styles
- Use TailwindCSS classes for responsive design

### Adding Categories
1. Update the category options in `AdminDashboard.js`
2. Add new category buttons in `SearchAndFilter.js`

### SEO Optimization
- Update meta tags in `public/index.html`
- Modify page titles and descriptions in each component
- Add structured data for better search results

## 🔧 Troubleshooting

### Common Issues
1. **Firebase Connection**: Ensure your Firebase config is correct
2. **Authentication**: Check if admin user exists in Firebase Auth
3. **Images**: Verify Imgur URLs are accessible
4. **Build Errors**: Clear node_modules and reinstall dependencies

### Performance Tips
- Optimize images before uploading to Imgur
- Use appropriate image sizes for product cards
- Implement pagination for large product catalogs
- Enable Firebase caching for better performance

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For support or questions, please open an issue in the repository or contact the development team.

---

**Built with ❤️ using React, TailwindCSS, and Firebase**
