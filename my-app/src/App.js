import React from 'react';
import Sidebar from './components/SideBar';
import SearchBar from './components/SearchBar';
import MapView from './components/MapView';

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col w-4/5">
        <SearchBar />
        <MapView />
      </div>
    </div>
  );
};

export default App;
