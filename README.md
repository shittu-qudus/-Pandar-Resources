# shopfind – React Native E-Commerce App

**shopfind** is a feature-rich, mobile-first e-commerce application built with **React Native** and **Expo**, showcasing modern design principles and a smooth shopping experience.  
It allows users to **explore stores**, **view product details**, and **manage favorites**, all within a clean, functional, and user-friendly interface.

---

## 📱 Features

- **Store & Product Browsing** – Explore a curated list of stores and their available products.  
- **Interactive Maps & Location** – Discover nearby stores using integrated maps and geolocation.  
- **Favorites Management** – Add or remove items from your personal favorites list with ease.  
- **Modern UI/UX** – A clean, minimal, and intuitive design focused on seamless user experience.  
- **Seamless Navigation** – Built with a combination of Stack and Tab navigation for smooth transitions.  

---

## 🛠️ Tech Stack

| **Category** | **Tools & Libraries** |
|---------------|-----------------------|
| **Framework** | React Native |
| **Development Tool** | Expo Go |
| **Navigation** | React Navigation (Stack & Tabs) |
| **Mapping** | react-native-maps |
| **State Management** | React Hooks (`useState`, `useEffect`) |
| **Language** | JavaScript (JSX) |

---


## 📁 Project Structure

```bash
my-app/
├── assets/                 # Static assets (images, icons)
│   └── home.jpg
│
├── screens/                # Main application screens
│   ├── details.jax         # Product/Store detail screen
│   ├── nearby.jax          # Nearby stores with interactive map
│   ├── webcoms.jax         # Main commerce listing screen
│   └── tabs/               # Bottom/Top tab navigator screens
│       ├── favorites.jax   # User’s favorites list
│       └── stores.jax      # Stores list screen
│
├── router/                 # Navigation configuration
│   ├── buttonhub.jax
│   └── navigator.jax
│
├── StoreControl.jax        # Central logic for store/item management
│
├── App.js                  # Root component
│
├── package.json            # Project dependencies and scripts
│
└── ... (config & environment files)
```
<p align="center">
  <img src="https://github.com/shittu-qudus/-Pandar-Resources/blob/main/assets/welcomepage.png?raw=true" alt="Welcome Screen" width="45%" style="margin: 5px;" />
  <img src="https://github.com/shittu-qudus/-Pandar-Resources/blob/main/assets/storepage.png?raw=true" alt="Store Screen" width="45%" style="margin: 5px;" />
</p>

<p align="center">
  <img src="https://github.com/shittu-qudus/-Pandar-Resources/blob/main/assets/favorite.png?raw=true" alt="Favorites Page" width="45%" style="margin: 5px;" />
  <img src="https://github.com/shittu-qudus/-Pandar-Resources/blob/main/assets/detailspage.png?raw=true" alt="Details Screen" width="45%" style="margin: 5px;" />
</p>

# Getting Started
#
# 🔧 Prerequisites
# Node.js (LTS recommended)
# Expo CLI (npm install -g expo-cli)
# Expo Go app (for iOS or Android)

 # Installation & Running
  git clone [https://github.com/shittu-qudus/-Pandar-Resources]
cd my-app

# Install dependencies
npm install
# Start the development server
npm start
# or
expo start
# Run on your device
Scan the QR code shown in your terminal with the Expo Go app (Android)
Or open with your iOS camera to launch the project

## Key Components & Screens
| **Component**       | **Description**                                     |
| ------------------- | --------------------------------------------------- |
| **App.js**          | Entry point of the app                              |
| **WebcomsScreen**   | Displays list of stores/products                    |
| **FavoritesScreen** | Manage and view favorited items                     |
| **NearbyScreen**    | Interactive map with nearby stores                  |
| **DetailsScreen**   | Product/Store detail page                           |
| **StoreContext**    | Core logic for adding, removing, and fetching items |

## ✨ Core Functionality Demonstrated

- **Dynamic Rendering** – Efficiently lists stores and products with conditional rendering.  
- **CRUD Operations**
  - **Create:** Add items to favorites.  
  - **Delete:** Remove items from favorites.  
- **State Management** – Handled with React Hooks for reactive, real-time UI updates.  
- **Cross-Platform Navigation** – Combines Stack and Tab navigation for seamless transitions between screens.  
- **Third-Party Integration** – Utilizes native APIs such as **Maps** and **Geolocation** for enhanced user experience.

---

##  Future Enhancements

- **User Authentication & Profiles** – Allow users to sign up, log in, and personalize their experience.  
- **Shopping Cart & Checkout Flow** – Enable cart persistence and a streamlined checkout process.  
- **Real Backend/API Integration** – Connect with a real-time backend or cloud API for live data.  
- **Push Notifications for Deals** – Notify users of new offers, discounts, and favorites updates.  
- **Search & Filter for Products** – Improve product discovery and browsing efficiency.

---

##  Developer

**Shittu Qudus Adekunle**  
Frontend Developer | React, React Native, Next.js, TypeScript  

**Email:** [shittuqadekunle@gmail.com](mailto:shittuqadekunle@gmail.com)  
**Portfolio:** [shittuqudus.vercel.app](http://shittuqudus.vercel.app)  
**LinkedIn:** [linkedin.com/in/shittu-qudus-5787762ab](https://www.linkedin.com/in/shittu-qudus-5787762ab/)  
**GitHub:** [github.com/shittu-qudus](https://www.github.com/shittu-qudus)

---

### Built with using React Native and Expo
