import React from 'react';
import Sidebar from './components/SideBar';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import { AuthProvider } from './utils/AuthContext';
import { SearchedLocationsProvider } from "./utils/SearchedLocationsContext";
import { LocationsProvider } from './utils/BookMarkedLocationsContext';
import { TopVisitedLocationsProvider } from "./utils/TopVisitedLocationsContext";
import LoginSignupForm from "./components/Auth";

const App = () => {
  return (
    <AuthProvider>
    <LoginSignupForm>
<TopVisitedLocationsProvider>
    <LocationsProvider>
    <SearchedLocationsProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-4/5">
          <SearchBar />
          <MapView />
        </div>
      </div>
    </SearchedLocationsProvider>
    </LocationsProvider>
</TopVisitedLocationsProvider>
    </LoginSignupForm>
    </AuthProvider>
  );
};

export default App;
