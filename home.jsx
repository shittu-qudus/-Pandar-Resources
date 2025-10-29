import React, { useState, useEffect } from "react";
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
  TouchableOpacity
} from "react-native";
import * as Location from 'expo-location';
import { useStore } from "./StoreContext";
import { Ionicons } from '@expo/vector-icons';

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
            return `📍 ${address}`;
        }
        if (location) {
            return "📍 Getting address...";
        }
        return "Location not available";
    };

    const filteredItems = stores.filter(item => 
        item.title.toLowerCase().includes(searchQuery.toLowerCase())
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
            <View style={styles.Imagecontainer}>
                <Image source={item.image} style={styles.itemImage} />
                <View style={styles.titanddist}>
                    <Text style={styles.ImageText}>{item.title}</Text>
                    <Text style={styles.ImageDistance}>{item.distance}km</Text>
                </View>
                
                <Text style={styles.ImageActiveTime}> {item.activetime}</Text>
                <Text style={styles.ImageRatings}>⭐ {item.ratings}</Text>
            </View>
        </TouchableOpacity>
    )

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.title}>Fashion finds on a Budget</Text>
                
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
                            <Text style={styles.location} onPress={() => navigation.navigate('Nearby')}>
                                {formatLocation()}
                            </Text>
                            {location && !address && (
                                <ActivityIndicator size="small" color="#007AFF" style={styles.addressLoading} />
                            )}
                        </View>
                    )}
                </View>

                <TextInput
                    value={searchQuery}
                    onChangeText={handleSearch}
                    style={styles.searchInput}
                    placeholder=" 🔍Search for products or stores"
                />
                
                <Text style={styles.sectionTitle}>Nearby Stores</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={filteredItems} 
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderStoreItem({ item, type: 'store' })}
                />
                
                <Text style={styles.sectionTitle}>Recommended for You</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={recommendedItems} 
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderStoreItem({ item, type: 'recommended' })}
                />

                <Text style={styles.sectionTitle}>Trending Now</Text>
                <FlatList
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={stores} 
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => renderStoreItem({ item, type: 'store' })}
                />
            </View>
        </ScrollView>
    );
}

// Your existing styles remain the same...
const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    locationContainer: {
        marginBottom: 15,
    },
    loadingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    loadingText: {
        marginLeft: 10,
        color: '#666',
    },
    errorContainer: {
        alignItems: 'flex-start',
    },
    locationError: {
        color: 'red',
        marginBottom: 10,
    },
    addressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        fontSize: 16,
        color: '#007AFF',
    },
    addressLoading: {
        marginLeft: 10,
    },
    searchInput: {
        height: 40,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 20,
        backgroundColor: '#f9f9f9',
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    itemContainer: {
        marginRight: 15,
    },
    Imagecontainer: {
        width: 200,
        backgroundColor: '#f8f8f8',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    itemImage: {
        width: '100%',
        height: 120,
        borderRadius: 8,
        marginBottom: 8,
    },
    titanddist: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 5,
    },
    ImageText: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
    },
    ImageDistance: {
        fontSize: 12,
        color: '#007AFF',
        fontWeight: '600',
    },
    ImageActiveTime: {
        fontSize: 12,
        color: '#666',
        marginBottom: 5,
    },
    ImageRatings: {
        fontSize: 12,
        color: '#666',
    },
});