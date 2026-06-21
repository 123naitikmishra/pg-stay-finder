import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';
import { isFirebaseReady, auth } from '../firebase/firebase';
import { initialUsers } from '../data/mockData';

// Initialize mock users in localStorage if not present
if (!localStorage.getItem('sf_users')) {
  localStorage.setItem('sf_users', JSON.stringify(initialUsers));
}

// Helper to get mock users
const getMockUsers = () => JSON.parse(localStorage.getItem('sf_users'));

// Mock current user listener callbacks
const authListeners = new Set();
let mockCurrentUser = JSON.parse(localStorage.getItem('sf_current_user')) || null;

const triggerListeners = (user) => {
  mockCurrentUser = user;
  if (user) {
    localStorage.setItem('sf_current_user', JSON.stringify(user));
  } else {
    localStorage.removeItem('sf_current_user');
  }
  authListeners.forEach(callback => callback(user));
};

export const authService = {
  login: async (email, password) => {
    if (isFirebaseReady) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      // In a real app we'd fetch profile from firestore; for now return userCredential.user
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName || email.split('@')[0],
        role: "User", // default
      };
    } else {
      // Mock Login
      const users = getMockUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        throw new Error("User not found. Try user@example.com, owner@example.com or admin@example.com");
      }
      // Simulate password check (any password works in mock mode for ease of evaluation)
      triggerListeners(user);
      return user;
    }
  },

  register: async (email, password, name, role = "User") => {
    if (isFirebaseReady) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      return {
        id: userCredential.user.uid,
        email,
        name,
        role
      };
    } else {
      // Mock Register
      const users = getMockUsers();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        throw new Error("Email already registered.");
      }
      const newUser = {
        id: `mock-u-${Date.now()}`,
        email,
        name,
        role,
        favorites: [],
        phone: "+919999999999",
        avatar: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`
      };
      users.push(newUser);
      localStorage.setItem('sf_users', JSON.stringify(users));
      triggerListeners(newUser);
      return newUser;
    }
  },

  loginWithGoogle: async () => {
    if (isFirebaseReady) {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return {
        id: userCredential.user.uid,
        email: userCredential.user.email,
        name: userCredential.user.displayName,
        role: "User",
      };
    } else {
      // Mock Google Login
      const googleUser = {
        id: "mock-google-user",
        email: "google.user@example.com",
        name: "Google Explorer",
        role: "User",
        favorites: [],
        phone: "+918888888888",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80"
      };
      const users = getMockUsers();
      if (!users.some(u => u.email === googleUser.email)) {
        users.push(googleUser);
        localStorage.setItem('sf_users', JSON.stringify(users));
      }
      triggerListeners(googleUser);
      return googleUser;
    }
  },

  logout: async () => {
    if (isFirebaseReady) {
      await signOut(auth);
    } else {
      triggerListeners(null);
    }
  },

  onAuthStateChanged: (callback) => {
    if (isFirebaseReady) {
      return auth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          callback({
            id: firebaseUser.uid,
            email: firebaseUser.email,
            name: firebaseUser.displayName || firebaseUser.email.split('@')[0],
            role: "User"
          });
        } else {
          callback(null);
        }
      });
    } else {
      // Add to mock listeners
      authListeners.add(callback);
      // Trigger initial callback with current value
      callback(mockCurrentUser);
      // Return unsubscribe function
      return () => {
        authListeners.delete(callback);
      };
    }
  },

  updateProfile: async (userId, profileData) => {
    if (isFirebaseReady) {
      // Mock/Firebase Integration placeholder
      return profileData;
    } else {
      const users = getMockUsers();
      const idx = users.findIndex(u => u.id === userId);
      if (idx !== -1) {
        users[idx] = { ...users[idx], ...profileData };
        localStorage.setItem('sf_users', JSON.stringify(users));
        if (mockCurrentUser && mockCurrentUser.id === userId) {
          triggerListeners(users[idx]);
        }
        return users[idx];
      }
      throw new Error("User not found");
    }
  }
};
