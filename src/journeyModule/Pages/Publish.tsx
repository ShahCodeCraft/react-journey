import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const Published: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="max-w-4xl w-full bg-white p-8 rounded-lg shadow-xl text-center">
        <CheckCircleIcon className="text-green-500" style={{ fontSize: 60 }} />
        <h1 className="text-3xl font-bold mt-6">Journey published and Running successfully.</h1>
        {/* Updated meaningful message */}
        <p className="mt-4 text-gray-600">
          Congratulations! Your journey has been successfully published and is now running. You can access the journey's details page through the provided link.
        </p>
        <p className="mt-2 text-gray-500">
          For further management and notifications, please visit the <a href="" className="text-blue-500 underline">access and notifications page</a>.
        </p>
      </div>
    </div>
  );
};

export default Published;
