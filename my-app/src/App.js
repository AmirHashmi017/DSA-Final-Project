import React from 'react';
import Sidebar from './components/SideBar';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';
import { AuthProvider } from './utils/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <div className="flex h-screen">
        <Sidebar />
        <div className="flex flex-col w-4/5">
          <SearchBar />
          <MapView />
        </div>
      </div>
    </AuthProvider>
  );
};

export default App;
