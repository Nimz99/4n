# Phone Case Affiliate Website

A modern affiliate marketing website for phone cases built with React, Firebase, and TailwindCSS.

## Features

- **Frontend (User Side):**
  - Responsive product grid with card design
  - Real-time product loading from Firebase Firestore
  - Search and filter functionality
  - Mobile-friendly design
  - Dark/light theme toggle
  - Smooth animations with Framer Motion

- **Admin Dashboard:**
  - Protected login with Firebase Authentication
  - Add, edit, and delete products
  - Real-time database updates
  - Sample data import functionality

## Tech Stack

- **Frontend:** React 18, TailwindCSS 3.3.0
- **Database:** Firebase Firestore (real-time)
- **Authentication:** Firebase Authentication
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Routing:** React Router DOM
- **SEO:** React Helmet Async

## Setup Instructions

### 1. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable Authentication (Email/Password)
3. Create Firestore Database
4. Create admin user in Authentication
5. Update `src/firebase/config.js` with your Firebase config

### 2. Local Development

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

### 3. Admin Access

- **URL:** `/admin/login`
- **Email:** `admin@phonecase.com`
- **Password:** `admin123456`

## Deployment

### Netlify
1. Connect your GitHub repository
2. Build command: `npm run build`
3. Publish directory: `build`

### Vercel
1. Import your GitHub repository
2. Deploy automatically

### GitHub Pages
1. Enable Pages in repository settings
2. Source: Deploy from branch (main)

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers
├── pages/              # Main page components
├── utils/              # Utility functions
├── firebase/           # Firebase configuration
└── data/               # Sample data
```

## Customization

- **Colors:** Update `tailwind.config.js` primary/secondary colors
- **Products:** Use admin dashboard or modify `src/data/sampleProducts.js`
- **Styling:** Modify TailwindCSS classes in components

## Troubleshooting

- **Admin login not working:** Check Firebase Authentication setup
- **Products not loading:** Verify Firestore database and rules
- **Build errors:** Check Firebase configuration

---

**Last Updated:** December 2024
**Version:** 1.0.0
