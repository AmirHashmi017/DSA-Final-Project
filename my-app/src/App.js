import React from "react";
import Sidebar from "./components/SideBar";
import SearchBar from "./components/SearchBar";
import MapView from "./components/MapView";
import { AuthProvider } from "./utils/AuthContext";
import { SearchedLocationsProvider } from "./utils/SearchedLocationsContext";
import { LocationsProvider } from "./utils/BookMarkedLocationsContext";
import { TopVisitedLocationsProvider } from "./utils/TopVisitedLocationsContext";
import LoginSignupForm from "./components/Auth";
import { DeviceLocationHistoryProvider } from "./utils/TrackDevicesContext";

const App = () => {
  return (
    <AuthProvider>
      <DeviceLocationHistoryProvider>
        <TopVisitedLocationsProvider>
          <LocationsProvider>
            <SearchedLocationsProvider>
              <div className="flex h-screen">
                <Sidebar />
                <div className="flex flex-col w-4/5">
                  <LoginSignupForm></LoginSignupForm>
                  <SearchBar />
                  <MapView />
                </div>
              </div>
            </SearchedLocationsProvider>
          </LocationsProvider>
        </TopVisitedLocationsProvider>
      </DeviceLocationHistoryProvider>
    </AuthProvider>
  );
};


export default App;
