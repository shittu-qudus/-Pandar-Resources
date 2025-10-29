import React, { createContext, useContext, useState } from 'react';

const StoreContext = createContext();

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([
    { 
      id: 1, 
      title: "Stylish Hat", 
      distance: 200, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.5, 
      image: require('./assets/store1.png'),
      about: "A trendy hat to complement your outfit.",
      number: "+1234567890",
      web: "www.stylishhat.com",
      gmail: "stylishhat@gmail.com",
      type: 'store'
    },
    { 
      id: 2, 
      title: "Casual Shirt", 
      distance: 99, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.0, 
      image: require('./assets/store2.png'),
      about: "A comfortable shirt for everyday wear.",
      number: "+1234567891",
      web: "www.casualshirt.com",
      gmail: "casualshirt@gmail.com",
      type: 'store'
    },
    { 
      id: 3, 
      title: "Compol", 
      distance: 200.99, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.8, 
      image: require('./assets/store3.png'),
      about: "A stylish compol for modern aesthetics.",
      number: "+1234567892",
      web: "www.compol.com",
      gmail: "compol@gmail.com",
      type: 'store'
    },
    { 
      id: 4, 
      title: "Elegant Dress", 
      distance: 150, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.2, 
      image: require('./assets/store4.png'),
      about: "An elegant dress for special occasions.",
      number: "+1234567893",
      web: "www.elegantdress.com",
      gmail: "elegantdress@gmail.com",
      type: 'store'
    },
    { 
      id: 5, 
      title: "Runnbuv", 
      distance: 300, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.7, 
      image: require('./assets/store5.png'),
      about: "A trendy runnbuv for casual outings.",
      number: "+1234567894",
      web: "www.runnbuv.com",
      gmail: "runnbuv@gmail.com",
      type: 'store'
    },
  ]);

  const [recommendedItems, setRecommendedItems] = useState([
    { 
      id: 1, 
      title: "Elegant", 
      distance: 200, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.5, 
      image: require('./assets/store6.png'),
      about: "Elegant fashion items for sophisticated looks.",
      number: "+1234567895",
      web: "www.elegant.com",
      gmail: "elegant@gmail.com",
      type: 'recommended'
    },
    { 
      id: 2, 
      title: "Lolly", 
      distance: 99, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.0, 
      image: require('./assets/store7.png'),
      about: "Fun and colorful Lolly collections.",
      number: "+1234567896",
      web: "www.lolly.com",
      gmail: "lolly@gmail.com",
      type: 'recommended'
    },
    { 
      id: 3, 
      title: "Combut", 
      distance: 200.99, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.8, 
      image: require('./assets/store8.png'),
      about: "Modern combat style clothing.",
      number: "+1234567897",
      web: "www.combut.com",
      gmail: "combut@gmail.com",
      type: 'recommended'
    },
    { 
      id: 4, 
      title: "Elegs", 
      distance: 150, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.2, 
      image: require('./assets/store9.png'),
      about: "Elegant leggings and accessories.",
      number: "+1234567898",
      web: "www.elegs.com",
      gmail: "elegs@gmail.com",
      type: 'recommended'
    },
    { 
      id: 5, 
      title: "Runnis", 
      distance: 300, 
      activetime: "6:00AM-10:00PM", 
      ratings: 4.7, 
      image: require('./assets/store10.png'),
      about: "Running shoes and sportswear.",
      number: "+1234567899",
      web: "www.runnis.com",
      gmail: "runnis@gmail.com",
      type: 'recommended'
    },
  ]);

  const [favorites, setFavorites] = useState([]);

  // Add item to favorites
  const addToFavorites = (item) => {
    setFavorites(prevFavorites => {
      // Check if item already exists in favorites
      const exists = prevFavorites.some(fav => 
        fav.id === item.id && fav.type === item.type
      );
      
      if (!exists) {
        return [...prevFavorites, { ...item, favoriteId: `${item.type}-${item.id}` }];
      }
      return prevFavorites;
    });
  };

  // Remove item from favorites
  const removeFromFavorites = (favoriteId) => {
    setFavorites(prevFavorites => 
      prevFavorites.filter(fav => fav.favoriteId !== favoriteId)
    );
  };

  // Toggle favorite status
  const toggleFavorite = (item) => {
    const favoriteId = `${item.type}-${item.id}`;
    const isCurrentlyFavorite = favorites.some(fav => fav.favoriteId === favoriteId);
    
    if (isCurrentlyFavorite) {
      removeFromFavorites(favoriteId);
    } else {
      addToFavorites(item);
    }
  };

  // Check if item is favorite
  const isFavorite = (item) => {
    const favoriteId = `${item.type}-${item.id}`;
    return favorites.some(fav => fav.favoriteId === favoriteId);
  };

  // Get all favorites
  const getFavorites = () => {
    return favorites;
  };

  // Clear all favorites
  const clearFavorites = () => {
    setFavorites([]);
  };

  const getStoreById = (id) => {
    return stores.find(store => store.id === id);
  };

  const getRecommendedItemById = (id) => {
    return recommendedItems.find(item => item.id === id);
  };

  const value = {
    stores,
    recommendedItems,
    favorites,
    getStoreById,
    getRecommendedItemById,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    getFavorites,
    clearFavorites,
    setStores,
    setRecommendedItems
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};