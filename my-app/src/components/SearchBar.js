import React, { useContext, useState, useRef } from "react";
import {
  l,
  setL,
  SearchedLocationsContext,
} from "../utils/SearchedLocationsContext";
import { AuthContext } from "../utils/AuthContext";
import {
  useLocationsContext,
  addBookMarkedLocation,
} from "../utils/BookMarkedLocationsContext";
import { MapPoints } from "./MapView.js";
import { MapView } from "./MapView.js";
import { pointsData } from "./pointsData.js";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polygon,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "../styles/tailwind.css";
import "leaflet-routing-machine";



const SearchBar = () => {
  const {
    login,
    user,
    source,
    destination,
    setSource,
    setDestination,
    locations,
    setLocations,
    setMST,
    searchMST,
    distances,
  } = useContext(AuthContext);
  const {
    locationsMST,
    fetchBookMarkedLocations,
    addBookMarkedLocation,
    deleteBookMarkedLocation,
    loading,
    error,
  } = useLocationsContext();
  const { addLocation, fetchLocations, searchedLocations, deleteLocation } =
    useContext(SearchedLocationsContext);
  const [additionalDestinations, setAdditionalDestinations] = useState([]);
  const [isMultiRoutingVisible, setIsMultiRoutingVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [sourceLocation, setSourceLocation] = useState("");
  const [destinationLocation, setDestinationLocation] = useState("");
  const userID = user?.userId;
  const [searchQuery, setSearchQuery] = useState("");
  const [locationSelected, setLocationSelected] = useState(null);
  const { l, setL } = useContext(SearchedLocationsContext);
  const mapRef = useRef(null);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleAddDestination = () => {
    if (destinationLocation.trim() !== "") {
      setAdditionalDestinations([
        ...additionalDestinations,
        destinationLocation,
      ]);
      setDestinationLocation(""); // Clear the input field
    }
  };

  const handleSaveRoute = () => {
    const allDestinations = [sourceLocation, ...additionalDestinations];
    setLocations(allDestinations);
    setMST(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsFocused(false);
    }, 200);
  };

  const handleSearch = () => {
    setLocationSelected(searchQuery);
    setDestination(searchQuery);
    setAdditionalDestinations([]);
    setSourceLocation("")
    
  };

  const handleAddBookMarkedLocation = () => {
    alert(`${sourceLocation} => ${destinationLocation} bookmarked!`);
    addBookMarkedLocation(userID, sourceLocation, destinationLocation);
  };

  const handleDirectionClick = () => {
    alert(`Directions to ${locationSelected}`);
    setL(true);
  };

  const handleBookmarkClick = () => {
    alert(`${locationSelected} bookmarked!`);
  };

  const handleFinalSearch = () => {
    addLocation(userID, sourceLocation, destinationLocation);
    setSource(sourceLocation);
    setDestination(destinationLocation);
  };

  const handleCrossClick = () => {
    setLocationSelected(null);
    setSearchQuery("");
    setL(false);
  };

  const handleCloseModal = () => {
    setIsMultiRoutingVisible(false);
  };
  return (
    <div className="relative">
      {!locationSelected ? (
        <div className="w-1/2 bg-white px-4 py-2 shadow-sm flex items-center rounded-3xl">
          {!l && (
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
          )}

          {/* Recent locations dropdown */}
          {isFocused && (
            <div className="absolute top-full left-0 w-1/2 bg-white shadow-lg mt-2 rounded-lg max-h-40 overflow-y-auto z-[9999]">
              <ul className="text-sm">
                {searchedLocations && searchedLocations.length>0 &&[
                  ...new Map(
                    searchedLocations.map((location) => [
                      location.DestinationLocation,
                      location,
                    ])
                  ).values(),
                ].map((location, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                    onClick={() => setSearchQuery(location.DestinationLocation)}
                  >
                    <i className="fa-solid fa-rotate-left pl-2 pr-4"></i>
                    {location.DestinationLocation || "N/A"}
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
            {distances>0 && distances && distances < 10000 && (
              <h2 className="text-4xl font-bold mb-6">
                {distances.toFixed(3) + " meters"}

              </h2>
            )}          
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
                className="text-blue-600 font-semibold flex flex-col text-center text-sm justify-center items-center w-20 "
                onClick={handleAddBookMarkedLocation}
              >
                <i className="fa-solid fa-bookmark text-xl rounded-full px-3 py-1.5 mb-1 border-blue-700 border-2"></i>
                Bookmark
              </button>
              {l && (
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
                    Searching
                  </button>
                  <button
                    onClick={() =>
                      setIsMultiRoutingVisible(!isMultiRoutingVisible)
                    }
                    className="bg-green-500 text-white px-12 py-2 rounded my-2"
                  >
                    Add Multiple Destinations
                  </button>

                  <button
                    onClick={handleCloseModal}
                    className=" text-xl font-bold text-gray-600"
                  >
                    X
                  </button>
                </div>
              )}
              {isMultiRoutingVisible && (
                <div className="mt-4 p-4 border rounded bg-gray-100">
                  <h3 className="text-lg font-bold mb-2">
                    Add Additional Destinations
                  </h3>
                  <input
                    type="text"
                    placeholder="Add Destination"
                    value={destinationLocation}
                    onChange={(e) => setDestinationLocation(e.target.value)}
                    className="border p-2 mr-2 my-2"
                  />
                  <button
                    onClick={handleAddDestination}
                    className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                  >
                    Add
                  </button>
                  <button
                    onClick={handleSaveRoute}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                  >
                    Save Route
                  </button>
                  <ul className="mt-4">
                    {additionalDestinations.map((dest, index) => (
                      <li key={index} className="my-1">
                        {dest}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
