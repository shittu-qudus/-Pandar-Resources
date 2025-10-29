import AppNavigator from './routes/navigator';
import React from 'react';
import { StoreProvider, useStore } from './StoreContext';
export default function App() {
  return <StoreProvider>
    <AppNavigator />
  </StoreProvider>;
}