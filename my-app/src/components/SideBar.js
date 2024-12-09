import React, { useContext, useState } from 'react';
import ContentSection from './ContentSection';  // Import the new ContentSection component
import { AuthContext } from '../utils/AuthContext';

const Sidebar = () => {
  const { login } = useContext(AuthContext);
  const [activeIcon, setActiveIcon] = useState(null);  // State to track active icon

  // Function to handle icon click
  const handleIconClick = (iconName) => {
    // Toggle the active icon on click
    setActiveIcon(activeIcon === iconName ? null : iconName);
    const loginData = {
      email: 'sher@example.com',
      password: 'password123'
    }
    login(loginData);
  };

  // Function to handle closing of the active icon
  const handleClose = () => {
    setActiveIcon(null);
  };

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
            onClick={() => handleIconClick('recent')}
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
        {/* Show the corresponding div based on active icon */}
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
          <ContentSection
            title="Recent Searches"
            content="Your recent searches will appear here."
            onClose={handleClose}
          />
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
