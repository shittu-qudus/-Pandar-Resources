import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Linking, TouchableOpacity, Dimensions, Alert } from 'react-native';
import { useStore } from '../StoreContext';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

const StoreDetails = ({ route, navigation }) => {
  const { storeId, type } = route.params;
  const { getStoreById, getRecommendedItemById, toggleFavorite, isFavorite } = useStore();
  
  const [activeTab, setActiveTab] = useState('about');

  const store = type === 'recommended' 
    ? getRecommendedItemById(storeId) 
    : getStoreById(storeId);

  // Check if current store is favorite
  const storeIsFavorite = store ? isFavorite(store) : false;

  if (!store) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Store not found</Text>
      </View>
    );
  }

  const handleContact = (type, value) => {
    switch (type) {
      case 'phone':
        Linking.openURL(`tel:${value}`);
        break;
      case 'email':
        Linking.openURL(`mailto:${value}`);
        break;
      case 'website':
        Linking.openURL(`http://${value}`);
        break;
      default:
        break;
    }
  };

  const handleToggleFavorite = () => {
    toggleFavorite(store);
    
    // Optional: Show feedback message
    if (!storeIsFavorite) {
      Alert.alert(
        'Added to Favorites!',
        `${store.title} has been added to your favorites.`,
        [{ text: 'OK' }]
      );
    } else {
      Alert.alert(
        'Removed from Favorites',
        `${store.title} has been removed from your favorites.`,
        [{ text: 'OK' }]
      );
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'about':
        return (
          <View style={styles.tabContent}>
            <Text style={styles.aboutText}>{store.about}</Text>
          </View>
        );
      
      case 'contact':
        return (
          <View style={styles.tabContent}>
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Phone Number:</Text>
              <Text style={styles.contactValue}>{store.number}</Text>
            </View>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Email:</Text>
              <Text style={styles.contactValue}>{store.gmail}</Text>
            </View>
            
            <View style={styles.contactInfo}>
              <Text style={styles.contactLabel}>Website:</Text>
              <Text style={styles.contactValue}>{store.web}</Text>
            </View>
          </View>
        );
      
      case 'reviews':
        return (
          <View style={styles.tabContent}>
            <View style={styles.ratingOverview}>
              <Text style={styles.overallRating}>{store.ratings}</Text>
              <Text style={styles.ratingLabel}>Overall Rating</Text>
              <View style={styles.stars}>
                <Text style={styles.starRating}>⭐ {store.ratings}/5</Text>
              </View>
            </View>
            
            <View style={styles.reviewsList}>
              <Text style={styles.reviewsTitle}>Customer Reviews</Text>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewerName}>Sarah M.</Text>
                <Text style={styles.reviewRating}>⭐ 5.0</Text>
                <Text style={styles.reviewText}>Amazing quality and great prices! Will definitely shop here again.</Text>
              </View>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewerName}>John D.</Text>
                <Text style={styles.reviewRating}>⭐ 4.5</Text>
                <Text style={styles.reviewText}>Good selection of clothes, friendly staff. Recommended!</Text>
              </View>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewerName}>Emma L.</Text>
                <Text style={styles.reviewRating}>⭐ 4.0</Text>
                <Text style={styles.reviewText}>Found some great pieces here. The store is well organized.</Text>
              </View>
              
              <View style={styles.reviewItem}>
                <Text style={styles.reviewerName}>Mike R.</Text>
                <Text style={styles.reviewRating}>⭐ 4.5</Text>
                <Text style={styles.reviewText}>Love the sustainable fashion concept. Great store!</Text>
              </View>
            </View>
          </View>
        );
      
      default:
        return null;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={store.image} style={styles.detailImage} />
          
          <View style={styles.header}>
            <Text style={styles.storeTitle}>{store.title}</Text>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {store.ratings}</Text>
            </View>
          </View>
          
          <View style={styles.distanceTime}>
            <Text style={styles.distance}>{store.distance}km away</Text>
            <Text style={styles.time}>•</Text>
            <Text style={styles.activeTime}>{store.activetime}</Text>
          </View>

          {/* Tab Navigation */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'about' && styles.activeTab]}
              onPress={() => setActiveTab('about')}
            >
              <Text style={[styles.tabText, activeTab === 'about' && styles.activeTabText]}>
                About
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'contact' && styles.activeTab]}
              onPress={() => setActiveTab('contact')}
            >
              <Text style={[styles.tabText, activeTab === 'contact' && styles.activeTabText]}>
                Contact
              </Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
              onPress={() => setActiveTab('reviews')}
            >
              <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>
                Reviews ({store.ratings})
              </Text>
            </TouchableOpacity>
          </View>

          {/* Tab Content */}
          {renderContent()}
        </View>
      </ScrollView>

      {/* Fixed Bottom Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity 
          style={styles.callButton}
          onPress={() => handleContact('phone', store.number)}
        >
          <Ionicons name="call" size={20} color="#fff" />
          <Text style={styles.callButtonText}>Call Now</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[
            styles.favoriteButton,
            storeIsFavorite && styles.favoriteButtonActive
          ]}
          onPress={handleToggleFavorite}
        >
          <Ionicons 
            name={storeIsFavorite ? "heart" : "heart-outline"} 
            size={24} 
            color={storeIsFavorite ? "#FF3B30" : "#666"} 
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingBottom: 100, // Space for fixed action bar
  },
  detailImage: {
    width: '100%',
    height: isTablet ? 300 : isSmallScreen ? 200 : 250,
    resizeMode: 'cover',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  storeTitle: {
    fontSize: isTablet ? 28 : isSmallScreen ? 20 : 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
    marginRight: 12,
  },
  ratingBadge: {
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  ratingText: {
    fontSize: isSmallScreen ? 12 : 14,
    fontWeight: '600',
    color: '#495057',
  },
  distanceTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  distance: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  time: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#6c757d',
    marginHorizontal: 8,
  },
  activeTime: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#6c757d',
    fontWeight: '500',
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginHorizontal: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: isTablet ? 16 : isSmallScreen ? 14 : 15,
    fontWeight: '500',
    color: '#6c757d',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
  tabContent: {
    padding: 20,
    minHeight: 200,
  },
  aboutText: {
    fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
    lineHeight: isTablet ? 28 : isSmallScreen ? 20 : 24,
    color: '#495057',
    textAlign: 'left',
  },
  contactInfo: {
    marginBottom: 20,
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  contactLabel: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#6c757d',
    marginBottom: 4,
    fontWeight: '500',
  },
  contactValue: {
    fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  ratingOverview: {
    alignItems: 'center',
    marginBottom: 30,
    padding: 24,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  overallRating: {
    fontSize: isTablet ? 56 : 48,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  ratingLabel: {
    fontSize: isTablet ? 18 : 16,
    color: '#6c757d',
    marginBottom: 12,
    fontWeight: '500',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starRating: {
    fontSize: isTablet ? 20 : 18,
    color: '#FFD700',
    fontWeight: '600',
  },
  reviewsList: {
    marginTop: 10,
  },
  reviewsTitle: {
    fontSize: isTablet ? 22 : isSmallScreen ? 16 : 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  reviewItem: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  reviewerName: {
    fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  reviewRating: {
    fontSize: isSmallScreen ? 12 : 14,
    color: '#FFD700',
    marginBottom: 8,
    fontWeight: '600',
  },
  reviewText: {
    fontSize: isTablet ? 16 : isSmallScreen ? 12 : 14,
    color: '#495057',
    lineHeight: isTablet ? 24 : isSmallScreen ? 18 : 20,
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#6c757d',
  },
  // New Action Bar Styles
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  callButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    paddingVertical: isSmallScreen ? 14 : 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    shadowColor: '#007AFF',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  callButtonText: {
    color: '#fff',
    fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  favoriteButton: {
    width: isTablet ? 60 : isSmallScreen ? 50 : 56,
    height: isTablet ? 60 : isSmallScreen ? 50 : 56,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e9ecef',
  },

  favoriteButtonActive: {
    backgroundColor: '#FFF0F0',
    borderColor: '#FF3B30',
  },
});

export default StoreDetails;