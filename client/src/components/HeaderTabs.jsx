// src/components/HeaderTabs.tsx
import React from 'react';

const HeaderTabs = () => {
  return (
    <div className="flex justify-between items-center p-4 bg-gray-100">
      <button className="px-4 py-2 text-sm bg-white border rounded-md shadow-sm">Settings</button>
      <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md shadow-sm">Match Commentary</button>
    </div>
  );
};

export default HeaderTabs;
