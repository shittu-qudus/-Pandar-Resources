import React, { useState, useEffect, useMemo } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Image, 
  TextInput, 
  ActivityIndicator, 
  Button,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform
} from "react-native";
import * as Location from 'expo-location';
import { useStore } from "../StoreContext";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const isTablet = screenWidth >= 768;
const isSmallScreen = screenWidth < 375;

export default function Home({ navigation }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [geolocationAvailable, setGeolocationAvailable] = useState(true);
    
    const { stores, recommendedItems } = useStore();

    useEffect(() => {
        getCurrentLocation();
    }, []);

    const reverseGeocode = async (latitude, longitude) => {
        try {
            const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
                latitude,
                longitude
            });

            if (reverseGeocodedAddress.length > 0) {
                const address = reverseGeocodedAddress[0];
                let formattedAddress = '';
                
                if (address.street && address.streetNumber) {
                    formattedAddress += `${address.street} ${address.streetNumber}`;
                } else if (address.street) {
                    formattedAddress += address.street;
                }
                
                if (address.city) {
                    if (formattedAddress) formattedAddress += ', ';
                    formattedAddress += address.city;
                }
                
                if (address.region) {
                    if (formattedAddress) formattedAddress += ', ';
                    formattedAddress += address.region;
                }
                
                if (address.country) {
                    if (formattedAddress) formattedAddress += ', ';
                    formattedAddress += address.country;
                }

                return formattedAddress || 'Unknown location';
            }
            return 'Unknown location';
        } catch (error) {
            console.warn('Reverse geocoding error:', error);
            return null;
        }
    };

    const getCurrentLocation = async () => {
        setLoading(true);
        setError(null);
        setAddress(null);

        try {
            let { status } = await Location.requestForegroundPermissionsAsync();
            
            if (status !== 'granted') {
                setError('Location permission denied');
                setLoading(false);
                return;
            }

            let location = await Location.getCurrentPositionAsync({
                accuracy: Location.Accuracy.High,
                timeout: 15000,
            });
            
            const { latitude, longitude } = location.coords;
            
            setLocation({
                latitude,
                longitude,
                accuracy: location.coords.accuracy,
            });

            const locationAddress = await reverseGeocode(latitude, longitude);
            setAddress(locationAddress);
            
            setLoading(false);
            
        } catch (error) {
            let errorMessage = "Failed to get location";
            
            if (error.code === 'E_LOCATION_PERMISSION_DENIED') {
                errorMessage = "Location permission denied";
            } else if (error.code === 'E_LOCATION_UNAVAILABLE') {
                errorMessage = "Location unavailable";
            } else if (error.code === 'E_LOCATION_TIMEOUT') {
                errorMessage = "Location request timed out";
            }
            
            setError(errorMessage);
            setLoading(false);
        }
    };

    const formatLocation = () => {
        if (loading) return "Getting location...";
        if (error) return error;
        if (address) {
            // Truncate long addresses for small screens
            if (isSmallScreen && address.length > 30) {
                return `📍 ${address.substring(0, 30)}...`;
            }
            return `📍 ${address}`;
        }
        if (location) {
            return "📍 Getting address...";
        }
        return "Location not available";
    };

    const filteredItems = useMemo(() => 
        stores.filter(item => 
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        ), [stores, searchQuery]
    );

    function handleSearch(val) {
        setSearchQuery(val);
    }

    const handleStorePress = (storeId, type = 'store') => {
        navigation.navigate('StoreDetails', { storeId, type });
    };

    const renderStoreItem = ({ item, type = 'store' }) => (
        <TouchableOpacity 
            style={styles.itemContainer}
            onPress={() => handleStorePress(item.id, type)}
        >
            <View style={styles.imageContainer}>
                <Image 
                    source={item.image} 
                    style={styles.itemImage} 
                    resizeMode="cover"
                />
                <View style={styles.titleDistanceContainer}>
                    <Text style={styles.itemTitle} numberOfLines={1}>
                        {item.title}
                    </Text>
                    <Text style={styles.itemDistance}>{item.distance}km</Text>
                </View>
                <Text style={styles.itemActiveTime} numberOfLines={1}>
                    {item.activetime}
                </Text>
                <Text style={styles.itemRatings}>⭐ {item.ratings}</Text>
            </View>
        </TouchableOpacity>
    );

    const keyExtractor = (item) => item.id.toString();

    return (
        <ScrollView 
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollViewContent}
        >
            <View style={styles.container}>
                <Text style={styles.title}>Shop</Text>
                
                {/* Location Display */}
                <View style={styles.locationContainer}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="small" color="#007AFF" />
                            <Text style={styles.loadingText}>Getting your location...</Text>
                        </View>
                    ) : error ? (
                        <View style={styles.errorContainer}>
                            <Text style={styles.locationError}>{formatLocation()}</Text>
                            {geolocationAvailable && (
                                <Button 
                                    title="Retry Location" 
                                    onPress={getCurrentLocation} 
                                    color="#007AFF"
                                />
                            )}
                        </View>
                    ) : (
                        <View style={styles.addressContainer}>
                            <Text 
                                style={styles.location} 
                                onPress={() => navigation.navigate('Nearby')}
                                numberOfLines={2}
                            >
                                {formatLocation()}
                            </Text>
                            {location && !address && (
                                <ActivityIndicator size="small" color="#007AFF" style={styles.addressLoading} />
                            )}
                        </View>
                    )}
                </View>
                
                {/* Search Input */}
                <TextInput
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                    placeholder=" 🔍 Search for products or stores"
                    placeholderTextColor="#999"
                />
                
                {/* Hero Image */}
                <Image 
                    source={require('../assets/store.jpg')} 
                    style={styles.heroImage} 
                    resizeMode="cover"
                />
                
                {/* Nearby Stores Section */}
                <Text style={styles.sectionTitle}>Nearby Stores</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={filteredItems} 
                    keyExtractor={keyExtractor}
                    renderItem={({ item }) => renderStoreItem({ item, type: 'store' })}
                    contentContainerStyle={styles.flatListContent}
                />
                
                {/* Recommended for You Section */}
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendedItems} 
                    keyExtractor={keyExtractor}
                    renderItem={({ item }) => renderStoreItem({ item, type: 'recommended' })}
                    contentContainerStyle={styles.flatListContent}
                />

                {/* Trending Now Section */}
                <Text style={styles.sectionTitle}>Trending Now</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={stores} 
                    keyExtractor={keyExtractor}
                    renderItem={({ item }) => renderStoreItem({ item, type: 'store' })}
                    contentContainerStyle={styles.flatListContent}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    container: {
        flex: 1,
        paddingHorizontal: isSmallScreen ? 12 : isTablet ? 24 : 16,
        paddingVertical: isSmallScreen ? 8 : 16,
    },
    title: {
        fontSize: isTablet ? 32 : isSmallScreen ? 20 : 24,
        fontWeight: 'bold',
        marginBottom: isSmallScreen ? 8 : 12,
        textAlign: 'center',
        color: '#1a1a1a',
    },
    locationContainer: {
        marginBottom: isSmallScreen ? 12 : 16,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingText: {
        marginLeft: 10,
        color: '#666',
        fontSize: isSmallScreen ? 12 : 14,
    },
    errorContainer: {
        alignItems: 'flex-start',
    },
    locationError: {
        color: '#ff3b30',
        marginBottom: 10,
        fontSize: isSmallScreen ? 12 : 14,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    location: {
        fontSize: isSmallScreen ? 13 : isTablet ? 18 : 15,
        color: '#007AFF',
        textAlign: 'center',
        flexShrink: 1,
    },
    addressLoading: {
        marginLeft: 10,
    },
    searchInput: {
        height: isTablet ? 65 : isSmallScreen ? 60 : 48,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderRadius: isTablet ? 30 : 32,
        paddingHorizontal: isTablet ? 20 : 16,
        marginBottom: isTablet ? 24 : 20,
        backgroundColor: '#f9f9f9',
        fontSize: isTablet ? 18 : isSmallScreen ? 14 : 16,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
            },
            android: {
                elevation: 2,
            },
        }),
    },
    heroImage: {
        width: '100%',
        height: isTablet ? 200 : isSmallScreen ? 190 : 190,
        borderRadius: isTablet ? 16 : 12,
        marginBottom: isTablet ? 24 : 20,
    },
    sectionTitle: {
        fontSize: isTablet ? 24 : isSmallScreen ? 16 : 20,
        fontWeight: 'bold',
        marginVertical: isTablet ? 16 : isSmallScreen ? 8 : 12,
        color: '#1a1a1a',
        marginLeft: isSmallScreen ? 4 : 0,
    },
    flatListContent: {
        paddingVertical: 8,
        paddingHorizontal: 4,
    },
    itemContainer: {
        marginRight: isTablet ? 20 : isSmallScreen ? 10 : 15,
        marginBottom: 8,
    },
    imageContainer: {
        width: isTablet ? 280 : isSmallScreen ? 160 : 200,
        backgroundColor: '#fff',
        borderRadius: isTablet ? 16 : 12,
        padding: isTablet ? 16 : 12,
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.15,
                shadowRadius: 6,
            },
            android: {
                elevation: 4,
            },
        }),
        borderWidth: 1,
        borderColor: '#f0f0f0',
    },
    itemImage: {
        width: '100%',
        height: isTablet ? 150 : isSmallScreen ? 90 : 120,
        borderRadius: isTablet ? 12 : 8,
        marginBottom: isTablet ? 12 : 8,
    },
    titleDistanceContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: isSmallScreen ? 3 : 5,
    },
    itemTitle: {
        fontSize: isTablet ? 20 : isSmallScreen ? 13 : 16,
        fontWeight: 'bold',
        flex: 1,
        marginRight: 8,
        color: '#1a1a1a',
    },
    itemDistance: {
        fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12,
        color: '#007AFF',
        fontWeight: '600'
    },
    itemActiveTime: {
        fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12,
        color: '#666',
        marginBottom: isSmallScreen ? 3 : 5,
    },
    itemRatings: {
        fontSize: isTablet ? 16 : isSmallScreen ? 10 : 12,
        color: '#666',
        fontWeight: '500',
    },
});