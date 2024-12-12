import React, { useContext, useState } from 'react';
import ContentSection from './ContentSection';
import { AuthContext } from '../utils/AuthContext';
import { SearchedLocationsContext, SearchedLocationsProvider,l,setL } from '../utils/SearchedLocationsContext';
import { useLocationsContext } from '../utils/BookMarkedLocationsContext';
import { TopVisitedLocationsProvider } from "../utils/TopVisitedLocationsContext";
import TopVisitedLocations from "./TopVisitedLocations";

const Sidebar = () => {
  const { locations, fetchBookMarkedLocations, addBookMarkedLocation, deleteBookMarkedLocation, loading, error } = useLocationsContext();
  const { login } = useContext(AuthContext);
  const { addLocation, fetchLocations, searchedLocations, deleteLocation } = useContext(SearchedLocationsContext);
  const [activeIcon, setActiveIcon] = useState(null);
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [userID] = useState(1); // Replace with dynamic user ID if available
  const {l,setL}=useContext(SearchedLocationsContext)
  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
  };

  const handleClose = () => {
    setActiveIcon(null);
  };

 
  const handleRemoveLocation = (location) => {
    deleteLocation(location.UserID, location.SourceLocation, location.DestinationLocation);
  };
  const handleRemoveBookMarkedLocation = (location) => {
    deleteBookMarkedLocation(userID, location.SourceLocation, location.DestinationLocation);
  };
  
  const handleFetch = () => {
    handleIconClick("recent")
    fetchLocations(userID)
  }
  const handleBookMarkFetch = () => {
    handleIconClick("saved")
    fetchBookMarkedLocations(userID)
  }



  return (
    <div className="flex h-screen max-h-screen">
      {/* Sidebar */}
      <div className="w-fit bg-gray-100 p-4 shadow-lg h-full z-[99999] max-h-screen">
        <h2 className="text-2xl font-bold mb-14 text-center">
          <i className="fa-solid fa-home"></i>
        </h2>
        <ul className="h-[75vh]">
          {/* Saved Icon */}
          <li
            className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col justify-center items-center text-center mb-5"
            onClick={() => handleBookMarkFetch()}

          >
            <div>
              <i className="fa-regular fa-bookmark text-xl"></i>
              <div className='text-sm'>Saved</div>
            </div>
          </li>

          {/* Top Visited Icon */}
          <li
            className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col justify-center items-center text-center mb-5"
            onClick={() => handleIconClick('topVisited')}
          >
            <div>
              <i className="fa-solid fa-circle-info text-xl"></i>
              <div className='text-sm'>Top Visited</div>
            </div>
          </li>

          {/* Recent Icon */}
          <li
            className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col justify-center items-center text-center mb-5"
            onClick={() => handleFetch('recent')}
          >
            <div>
              <i className="fa-solid fa-rotate-left text-xl"></i>
              <div className='text-sm'>Recent</div>
            </div>
          </li>

          {/* Devices Icon */}
          <li
            className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col justify-center items-center text-center mb-5"
            onClick={() => handleIconClick('devices')}
          >
            <div>
              <i className="fa-solid fa-house-laptop text-xl"></i>
              <div className='text-sm'>Devices</div>
            </div>
          </li>
        </ul>

        {/* Log Out Button */}
        <div className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col text-center mb-5 items-end justify-end " onClick={() => handleIconClick(null)}>
          <div>
            <i className="fa-solid fa-arrow-right-from-bracket text-xl rotate-180"></i>
            <div className='text-sm'>Log Out</div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow absolute z-[999999] left-24 ">

     
        {activeIcon &&
          <div className="w-full h-full h bg-white p-6 shadow-lg rounded-lg ">
            <div className="flex justify-between items-center flex-row">
              <h3 className="text-xl font-semibold mb-4">sdfsdf</h3>
              <button onClick={handleClose} className="text-xl text-gray-500 hover:text-red-600">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>

            {/* side-ba */}



            {/* Display Content Sections */}
            {activeIcon === 'saved' && (
              locations && locations.length > 0 ? (
                locations.map((location, index) => (
                  <ContentSection
                    key={index}
                    title={`Saved Locations`}
                    source={location.SourceLocation || "N/A"}
                    destination={location.DestinationLocation || "N/A"}
                    onDel={() => handleRemoveBookMarkedLocation(location)}
                  />
                ))
              ) : (
                <ContentSection
                  title="Saved Locations"
                  source="Your saved items will appear here."
                  destination="Your saved items will appear here."
                  onClose={handleClose}
                />
              )
            )}
            {activeIcon === 'topVisited' && (
              // <ContentSection
              //   title="Top Visited Locations"
              //   content="Your top visited locations will appear here."
              //   onClose={handleClose}
              // />
              <TopVisitedLocations userId={userID} />
            )}
            {activeIcon === 'recent' && (
              searchedLocations && searchedLocations.length > 0 ? (
                searchedLocations.map((location, index) => (
                  <ContentSection
                    key={index}
                    title={`Recent Searches`}
                    source={location.SourceLocation || "N/A"}
                    destination={location.DestinationLocation || "N/A"}
                    onDel={() => handleRemoveLocation(location)}
                  />
                ))
              ) : (
                <ContentSection
                  title="Recent Locations"
                  source="Your saved items will appear here."
                  destination="Your saved items will appear here."
                  onClose={handleClose}
                />
              )
            )}
            {activeIcon === 'devices' && (
              <ContentSection
                title="Devices"
                content="Your devices will appear here."
                onClose={handleClose}
              />
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default Sidebar;