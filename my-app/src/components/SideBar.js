import React, { useContext, useState } from 'react';
import ContentSection from './ContentSection';
import { AuthContext } from '../utils/AuthContext';
import { SearchedLocationsContext, SearchedLocationsProvider }  from '../utils/SearchedLocationsContext';

const Sidebar = () => {
  const { login } = useContext(AuthContext);
const { addLocation,fetchLocations,searchedLocations,deleteLocation } = useContext(SearchedLocationsContext);
  const [activeIcon, setActiveIcon] = useState(null);
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [userID] = useState(1); // Replace with dynamic user ID if available

  const handleIconClick = (iconName) => {
    setActiveIcon(activeIcon === iconName ? null : iconName);
  };

  const handleClose = () => {
    setActiveIcon(null);
  };

  const handleSearch = () => {
    addLocation(userID, sourceLocation, destinationLocation);
  // setSourceLocation('');
  // setDestinationLocation('');
  };
  const handleRemoveLocation = (location) => {
    deleteLocation(location.UserID, location.SourceLocation, location.DestinationLocation);
  };
  const handleFetch=()=>{
    handleIconClick("recent")
    fetchLocations(userID)
  }



  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-fit bg-gray-100 p-4 shadow-lg h-full z-[99999]">
        <h2 className="text-2xl font-bold mb-14 text-center">
          <i className="fa-solid fa-home"></i>
        </h2>
        <ul className="">
          {/* Saved Icon */}
          <li
            className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col justify-center items-center text-center mb-5"
            onClick={() => handleIconClick('saved')}

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
        <div className="cursor-pointer text-gray-500 hover:text-blue-600 flex flex-col text-center mb-5 items-end justify-end mt-[480px]" onClick={() => handleIconClick(null)}>
          <div>
            <i className="fa-solid fa-arrow-right-from-bracket text-xl rotate-180"></i>
            <div className='text-sm'>Log Out</div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-grow absolute h-full  z-[9999] left-24">

        <div className="mb-4">
          <input
            type="text"
            placeholder="Source Location"
            value={sourceLocation}
            onChange={(e) => setSourceLocation(e.target.value)}
            className="border p-2 mr-2"
          />
          <input
            type="text"
            placeholder="Destination Location"
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Search
          </button>
        </div>

        {/* Display Content Sections */}
        {activeIcon === 'saved' && (
          <ContentSection
            title="Saved Locations"
            source="Your saved items will appear here."
            destination="Your saved items will appear here."
            onClose={handleClose}
          />
        )}
        {activeIcon === 'topVisited' && (
          <ContentSection
            title="Top Visited Locations"
            content="Your top visited locations will appear here."
            onClose={handleClose}
          />
        )}
   {activeIcon === 'recent' && (
  searchedLocations && searchedLocations.length > 0 ? (
    searchedLocations.map((location, index) => (
      <ContentSection
        key={index}
        title={`Recent Searches`}
        source={location.SourceLocation || "N/A"} // Fallback if undefined
        destination={location.DestinationLocation || "N/A"} // Fallback if undefined
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
    </div>
  );
};

export default Sidebar;
