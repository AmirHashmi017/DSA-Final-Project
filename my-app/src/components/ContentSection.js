
import React from 'react';

const ContentSection = ({ title, content, source, destination, onClose, onDel }) => {
  return (

    <div className='flex flex-row w-full justify-between pb-3 border-y-2'>
      <div className="flex flex-col w-full">
        <div className="flex justify-between w-full items-center py-4">
          <p className="font-semibold">Source: <span className="text-gray-700">{source}</span></p>
        </div>
        <div className="flex justify-between w-full items-center">
          <p className="font-semibold">Destination: <span className="text-gray-700">{destination}</span></p>
        </div>
      </div>
      <div className="flex justify-between  items-center pl-6">
        <i onClick={onDel} className="fa-solid fa-trash-can text-lg cursor-pointer hover:text-red-700"></i>
      </div>
    </div>

  );
};

export default ContentSection;
