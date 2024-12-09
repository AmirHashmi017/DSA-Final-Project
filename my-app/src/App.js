import React from 'react';
import Sidebar from './components/SideBar';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import { AuthProvider } from './utils/AuthContext';
import { SearchedLocationsProvider } from "./utils/SearchedLocationsContext";
import { LocationsProvider } from './utils/BookMarkedLocationsContext';

const App = () => {
  return (
    <LocationsProvider>
    <SearchedLocationsProvider>
    <AuthProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-4/5">
          <SearchBar />
          <MapView />
        </div>
      </div>
    </AuthProvider>
    </SearchedLocationsProvider>
    </LocationsProvider>
  );
};

export default App;
