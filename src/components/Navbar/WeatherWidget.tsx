// src/components/WeatherWidget.jsx

import { useState } from 'react';
import '../../assets/css/Weather.css'

const WeatherWidget = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleWeather = () => setIsOpen(!isOpen);

    return (
        <div className="weather-container" onClick={toggleWeather}>
            <div className="weather-button bg-blue-300 text-sm rounded-md p-2 shadow flex items-center cursor-pointer">
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 15a4 4 0 018 0h6a4 4 0 110 8H9a4 4 0 01-6-3.74L3 19m0-4a4 4 0 00-1 7.74M12 9V4m0 0L8.5 7M12 4l3.5 3"
                    />
                </svg>
                <span>23°C</span>
            </div>
            {isOpen && (
                <div className="weather-details bg-white rounded-lg shadow-lg p-4 mt-1 absolute right-0 text-gray-800">
                    <h3 className="text-lg font-bold text-center mb-2">Guntur, IN</h3>
                    <div className="flex flex-col items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.894 6.166a.75.75 0 0 0-1.06-1.06l-1.591 1.59a.75.75 0 1 0 1.06 1.061l1.591-1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.834 18.894a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 1 0-1.061 1.06l1.59 1.591ZM12 18a.75.75 0 0 1 .75.75V21a.75.75 0 0 1-1.5 0v-2.25A.75.75 0 0 1 12 18ZM7.758 17.303a.75.75 0 0 0-1.061-1.06l-1.591 1.59a.75.75 0 0 0 1.06 1.061l1.591-1.59ZM6 12a.75.75 0 0 1-.75.75H3a.75.75 0 0 1 0-1.5h2.25A.75.75 0 0 1 6 12ZM6.697 7.757a.75.75 0 0 0 1.06-1.06l-1.59-1.591a.75.75 0 0 0-1.061 1.06l1.59 1.591Z" />
                        </svg>

                        <p className="text-sm"><strong>Condition:</strong> Sunny</p>
                    </div>
                    <div className="mt-4 px-4 py-2 bg-gray-100 rounded text-sm">
                        <p><strong>Sowing Advice:</strong> Ideal conditions to sow seeds.</p>
                        <p><strong>Rain Probability:</strong> 20% chance of rain.</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default WeatherWidget;



