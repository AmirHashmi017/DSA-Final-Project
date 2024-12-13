import React, { useContext } from "react";
import { DeviceLocationHistoryContext } from "../utils/TrackDevicesContext";

const DeviceItem = ({ device, onDelete }) => {
  const { setMobileLocation } = useContext(DeviceLocationHistoryContext);
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md rounded-lg mb-4">
      <div>
        <p className="text-lg font-medium text-gray-800">
          {device?.deviceName}
        </p>
        <p className="text-sm text-gray-500">Latitude: {device?.latitude}</p>
        <p className="text-sm text-gray-500">Longitude: {device?.longitude}</p>
        <p className="text-sm text-gray-400">
          Timestamp: {new Date(device?.timestamp).toLocaleString()}
        </p>
      </div>
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setMobileLocation(device)}
          className="text-blue-500 hover:text-blue-700 focus:outline-none"
          title="Get Directions"
        >
          <i className="fa-solid fa-directions text-lg cursor-pointer"></i>
        </button>
        <button
          onClick={() => onDelete(device)}
          className="text-red-500 hover:text-red-700 focus:outline-none"
          title="Delete Device"
        >
          <i className="fa-solid fa-trash-can text-lg cursor-pointer"></i>
        </button>
      </div>
    </div>
  );
};

export default DeviceItem;
