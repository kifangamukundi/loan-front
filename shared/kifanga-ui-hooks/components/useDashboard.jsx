import React, { useState } from 'react';

function useDashboard(config) {
  const { initialDashboard, dashboardItems, dashboardComponents } = config;
  const [currentDashboard, setCurrentDashboard] = useState(initialDashboard);


  const setDashboard = (dashboard) => {
    setCurrentDashboard(dashboard);
  };

  const DashboardMenu = () => (
    <div className="p-4">
      
    </div>
  );

  return { currentDashboard, setDashboard, DashboardMenu };
}

export default useDashboard;