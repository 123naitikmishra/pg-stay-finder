import { createContext, useContext, useState, useEffect } from 'react';
import { propertyService } from '../services/propertyService';
import { useAuth } from './AuthContext';

const PropertyContext = createContext(null);

export const PropertyProvider = ({ children }) => {
  const { currentUser, updateProfile } = useAuth();
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useState({
    city: '',
    area: '',
    type: '',
    budget: '',
  });

  const [activeFilters, setActiveFilters] = useState({
    budget: 50000,
    rating: 0,
    amenities: [],
    availability: false,
    type: '',
  });

  // Fetch properties on mount
  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
      setFilteredProperties(data);
    } catch (error) {
      console.error("Error loading properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Triggered when search parameters or filters change
  useEffect(() => {
    let result = [...properties];

    // Search query matches
    if (searchParams.city) {
      result = result.filter(p => p.city.toLowerCase().includes(searchParams.city.toLowerCase()));
    }
    if (searchParams.area) {
      result = result.filter(p => p.area.toLowerCase().includes(searchParams.area.toLowerCase()));
    }
    if (searchParams.type && searchParams.type !== 'All') {
      result = result.filter(p => p.type.toLowerCase() === searchParams.type.toLowerCase());
    }
    if (searchParams.budget) {
      result = result.filter(p => p.price <= parseInt(searchParams.budget));
    }

    // Filter panel matches
    if (activeFilters.type) {
      result = result.filter(p => p.type.toLowerCase() === activeFilters.type.toLowerCase());
    }
    if (activeFilters.budget) {
      result = result.filter(p => p.price <= activeFilters.budget);
    }
    if (activeFilters.rating > 0) {
      result = result.filter(p => p.rating >= activeFilters.rating);
    }
    if (activeFilters.availability) {
      result = result.filter(p => p.availability === true);
    }
    if (activeFilters.amenities.length > 0) {
      result = result.filter(p => 
        activeFilters.amenities.every(amenity => p.amenities.includes(amenity))
      );
    }

    setFilteredProperties(result);
  }, [properties, searchParams, activeFilters]);

  const toggleFavorite = async (propertyId) => {
    if (!currentUser) return false;
    
    const favorites = currentUser.favorites || [];
    let updatedFavorites;
    if (favorites.includes(propertyId)) {
      updatedFavorites = favorites.filter(id => id !== propertyId);
    } else {
      updatedFavorites = [...favorites, propertyId];
    }
    
    await updateProfile({ favorites: updatedFavorites });
    return true;
  };

  const getFavorites = () => {
    if (!currentUser) return [];
    const favIds = currentUser.favorites || [];
    return properties.filter(p => favIds.includes(p.id));
  };

  const addNewProperty = async (propertyData) => {
    setLoading(true);
    try {
      const added = await propertyService.addProperty({
        ...propertyData,
        host: {
          id: currentUser?.id || "owner1",
          name: currentUser?.name || "Ramesh Kumar",
          phone: currentUser?.phone || "+919876543210",
          whatsapp: currentUser?.phone || "+919876543210",
          avatar: currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
        }
      });
      setProperties(prev => [...prev, added]);
      return added;
    } catch (err) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editProperty = async (id, data) => {
    try {
      const updated = await propertyService.updateProperty(id, data);
      setProperties(prev => prev.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const deleteProperty = async (id) => {
    try {
      await propertyService.deleteProperty(id);
      setProperties(prev => prev.filter(p => p.id !== id));
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const submitReview = async (propertyId, rating, comment) => {
    if (!currentUser) throw new Error("Must be logged in to leave reviews.");
    try {
      const updated = await propertyService.addReview(propertyId, {
        userName: currentUser.name,
        userAvatar: currentUser.avatar,
        rating,
        comment
      });
      setProperties(prev => prev.map(p => p.id === propertyId ? updated : p));
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const removeReview = async (propertyId, reviewId) => {
    try {
      const updated = await propertyService.deleteReview(propertyId, reviewId);
      setProperties(prev => prev.map(p => p.id === propertyId ? updated : p));
      return true;
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  return (
    <PropertyContext.Provider value={{
      properties,
      filteredProperties,
      loading,
      searchParams,
      setSearchParams,
      activeFilters,
      setActiveFilters,
      toggleFavorite,
      getFavorites,
      addNewProperty,
      editProperty,
      deleteProperty,
      submitReview,
      removeReview,
      refreshProperties: fetchProperties
    }}>
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperties = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperties must be used within a PropertyProvider");
  }
  return context;
};
