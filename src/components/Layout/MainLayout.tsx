// src/components/Layout/MainLayout.tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BottomNavigation from "./BottomNavigation";

const HIDE_NAV_ROUTES = ['/audio', '/map']; // nav-hidden pages

const MainLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discover');

  // Sync tab from current route
  useEffect(() => {
    if (location.pathname.startsWith('/discover')) setActiveTab('discover');
    else if (location.pathname.startsWith('/tours')) setActiveTab('tours');
    else if (location.pathname.startsWith('/journal')) setActiveTab('journal');
    else if (location.pathname.startsWith('/events')) setActiveTab('events');
    else if (location.pathname.startsWith('/profile')) setActiveTab('profile');
  }, [location.pathname]);

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    navigate(`/${tabId}`);
  };

  const hideNav = HIDE_NAV_ROUTES.includes(location.pathname);

  return (
    <div className="relative min-h-screen pb-16">
      <Outlet />
      {!hideNav && (
        <BottomNavigation activeTab={activeTab} onTabChange={handleTabChange} />
      )}
    </div>
  );
};

export default MainLayout;
