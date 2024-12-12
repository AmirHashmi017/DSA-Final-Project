import React, { useContext, useState } from 'react';
import {l,setL,SearchedLocationsContext} from '../utils/SearchedLocationsContext';
import { AuthContext } from '../utils/AuthContext';
import { useLocationsContext ,addBookMarkedLocation} from '../utils/BookMarkedLocationsContext';

const SearchBar = () => {
  const recentLocations = ['New York', 'Los Angeles', 'Chicago', 'San Francisco', 'Miami'];
  const { locations, fetchBookMarkedLocations, addBookMarkedLocation, deleteBookMarkedLocation, loading, error } = useLocationsContext();
  const { login } = useContext(AuthContext);
  const { addLocation, fetchLocations, searchedLocations, deleteLocation } = useContext(SearchedLocationsContext);
  const [isFocused, setIsFocused] = useState(false);
  const [sourceLocation, setSourceLocation] = useState('');
  const [destinationLocation, setDestinationLocation] = useState('');
  const [userID] = useState(1); // Replace with dynamic user ID if available
  const [searchQuery, setSearchQuery] = useState('');
  const [locationSelected, setLocationSelected] = useState(null);
  const {l,setL}=useContext(SearchedLocationsContext);
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleSearch = () => {
    setLocationSelected(searchQuery);
  };
  const handleAddBookMarkedLocation = (location) => {
    addBookMarkedLocation(userID, sourceLocation, destinationLocation);
  };
  const handleDirectionClick = () => {
    alert(`Directions to ${locationSelected}`);
    setL(true)
  };

  const handleBookmarkClick = () => {
    alert(`${locationSelected} bookmarked!`);
  };
  const handleFinalSearch = () => {
    addLocation(userID, sourceLocation, destinationLocation);
    alert('Location Searched')

    // setSourceLocation('');
    // setDestinationLocation('');
  };
  const handleCrossClick = () => {
    setLocationSelected(null);
    setSearchQuery('');
    setL(false)
  };
  return (
    <div className="relative">
      {!locationSelected ? (
        <div className="w-1/2 bg-white px-4 py-2 shadow-sm flex items-center rounded-3xl">
          {!l &&
          <>
           <input
            type="text"
            placeholder="Search location..."
            className="flex-grow border border-gray-300 px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300 rounded-l-3xl"
            onFocus={handleFocus}
            onBlur={handleBlur}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
          <button
            className="bg-blue-600 text-white px-4 py-2.5 hover:bg-blue-700 rounded-r-3xl"
            onClick={handleSearch}
            >
            Search
          </button>
            </>
          }
          

          {/* Recent locations dropdown */}
          {isFocused && (
            <div className="absolute top-full left-0 w-1/2 bg-white shadow-lg mt-2 rounded-lg max-h-40 overflow-y-auto z-[9999]">
              <ul className="text-sm">
                {recentLocations.map((location, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => setSearchQuery(location)}
                  >
                    <i className="fa-solid fa-rotate-left pl-2 pr-4"></i>
                    {location}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <div className="fixed w-[30%] pt-32 top-0 left-20 h-screen bg-gray-100 flex flex-col justify-start items-start p-8 z-[9999]">
        <div className=" p-6 ">
        <button
              onClick={handleCrossClick}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600"
            >
              &times;
            </button>
          <h2 className="text-3xl font-bold mb-6">{locationSelected}</h2>
          <div className="flex space-x-4 mb-6">
            <button
              className=" text-blue-600 font-semibold flex flex-col text-center text-sm justify-center items-center w-20  "
              onClick={handleDirectionClick}
            >
                <i className="fa-solid fa-diamond-turn-right text-xl rounded-full px-2.5 py-1.5 mb-1 border-blue-700  border-2"></i>
              Directions
            </button>
            <button
              className= "text-blue-600 font-semibold flex flex-col text-center text-sm justify-center items-center w-20 "
              onClick={handleAddBookMarkedLocation}
            >
                  <i className="fa-solid fa-bookmark text-xl rounded-full px-3 py-1.5 mb-1 border-blue-700 border-2"></i>
              Bookmark
            </button>
            {l && 
         <div className="mb-4 z-[999999] left-24 items-center flex absolute flex-col mt-[35vh] ml-10">
          <input
          type="text"
          placeholder="Source Location"
          value={sourceLocation}
            onChange={(e) => setSourceLocation(e.target.value)}
            className="border p-2 mr-2 my-2"
            />
            <input
            type="text"
            placeholder="Destination Location"
            value={destinationLocation}
            onChange={(e) => setDestinationLocation(e.target.value)}
            className="border p-2 mr-2"
          />
          <button
          onClick={handleFinalSearch}
          className="bg-blue-500 text-white px-12 py-2 rounded my-2"
          >
          Search
          </button>
          </div> 
          }
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SearchBar;
