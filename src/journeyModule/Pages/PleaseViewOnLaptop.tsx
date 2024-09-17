import React from 'react';

const PleaseViewOnLaptop = () => {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="max-w-lg p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-4">
                    Please view on a laptop or a bigger screen
                </h2>
                <p className="text-gray-600">
                    Unfortunately, the current view requires a larger screen size to display properly. Please switch to a device with a larger screen or adjust the resolution.
                </p>
            </div>
        </div>
    );
};

export default PleaseViewOnLaptop;
