import { auth } from '../firebase/config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export const testFirebaseConnection = async () => {
  try {
    console.log('Testing Firebase connection...');
    console.log('Auth object:', auth);
    console.log('Auth app:', auth.app);
    console.log('Auth config:', auth.app.options);
    
    return {
      success: true,
      message: 'Firebase connection successful',
      config: auth.app.options
    };
  } catch (error) {
    console.error('Firebase connection error:', error);
    return {
      success: false,
      message: 'Firebase connection failed',
      error: error.message
    };
  }
};

export const testAdminLogin = async (email, password) => {
  try {
    console.log('Testing admin login...');
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log('Login successful:', userCredential.user);
    
    return {
      success: true,
      message: 'Login successful',
      user: userCredential.user
    };
  } catch (error) {
    console.error('Login error:', error);
    
    let errorMessage = 'Login failed';
    switch (error.code) {
      case 'auth/user-not-found':
        errorMessage = 'User not found. Please create the admin user in Firebase Console.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Wrong password.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format.';
        break;
      case 'auth/too-many-requests':
        errorMessage = 'Too many failed attempts. Try again later.';
        break;
      default:
        errorMessage = `Login error: ${error.message}`;
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error.code
    };
  }
};

// To use these functions, open browser console and run:
// testFirebaseConnection().then(console.log);
// testAdminLogin('admin@phonecase.com', 'admin123456').then(console.log);
