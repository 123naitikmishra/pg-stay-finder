import { isFirebaseReady } from '../firebase/firebase';
import { initialProperties } from '../data/mockData';

// Initialize mock properties in localStorage
if (!localStorage.getItem('sf_properties')) {
  localStorage.setItem('sf_properties', JSON.stringify(initialProperties));
}

const getMockProperties = () => JSON.parse(localStorage.getItem('sf_properties'));

export const propertyService = {
  getAllProperties: async () => {
    if (isFirebaseReady) {
      // In a real app we'd fetch from Firestore
      // For now, return mock properties to ensure immediate visual success
      return getMockProperties();
    } else {
      return getMockProperties();
    }
  },

  getPropertyById: async (id) => {
    const properties = getMockProperties();
    return properties.find(p => p.id === id) || null;
  },

  addProperty: async (propertyData) => {
    if (isFirebaseReady) {
      // Mock Firestore logic placeholder
      const mockNew = {
        id: `fb-p-${Date.now()}`,
        ...propertyData,
        rating: 5.0,
        reviews: []
      };
      return mockNew;
    } else {
      const properties = getMockProperties();
      const newProperty = {
        id: `mock-p-${Date.now()}`,
        rating: 5.0,
        reviews: [],
        featured: false,
        ...propertyData
      };
      properties.push(newProperty);
      localStorage.setItem('sf_properties', JSON.stringify(properties));
      return newProperty;
    }
  },

  updateProperty: async (id, updatedData) => {
    const properties = getMockProperties();
    const idx = properties.findIndex(p => p.id === id);
    if (idx !== -1) {
      properties[idx] = { ...properties[idx], ...updatedData };
      localStorage.setItem('sf_properties', JSON.stringify(properties));
      return properties[idx];
    }
    throw new Error("Property not found");
  },

  deleteProperty: async (id) => {
    const properties = getMockProperties();
    const filtered = properties.filter(p => p.id !== id);
    localStorage.setItem('sf_properties', JSON.stringify(filtered));
    return true;
  },

  addReview: async (propertyId, review) => {
    const properties = getMockProperties();
    const idx = properties.findIndex(p => p.id === propertyId);
    if (idx !== -1) {
      const targetProperty = properties[idx];
      const newReview = {
        id: `rev-${Date.now()}`,
        date: new Date().toISOString().split('T')[0],
        ...review
      };
      targetProperty.reviews = [newReview, ...targetProperty.reviews];
      // Recalculate average rating
      const sum = targetProperty.reviews.reduce((acc, curr) => acc + curr.rating, 0);
      targetProperty.rating = parseFloat((sum / targetProperty.reviews.length).toFixed(1));
      
      properties[idx] = targetProperty;
      localStorage.setItem('sf_properties', JSON.stringify(properties));
      return targetProperty;
    }
    throw new Error("Property not found");
  },

  deleteReview: async (propertyId, reviewId) => {
    const properties = getMockProperties();
    const idx = properties.findIndex(p => p.id === propertyId);
    if (idx !== -1) {
      const targetProperty = properties[idx];
      targetProperty.reviews = targetProperty.reviews.filter(r => r.id !== reviewId);
      // Recalculate rating
      if (targetProperty.reviews.length > 0) {
        const sum = targetProperty.reviews.reduce((acc, curr) => acc + curr.rating, 0);
        targetProperty.rating = parseFloat((sum / targetProperty.reviews.length).toFixed(1));
      } else {
        targetProperty.rating = 5.0;
      }
      properties[idx] = targetProperty;
      localStorage.setItem('sf_properties', JSON.stringify(properties));
      return targetProperty;
    }
    throw new Error("Property not found");
  }
};
