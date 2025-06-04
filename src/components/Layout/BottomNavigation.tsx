import { Map, Headphones, Camera, Settings, Calendar, Route } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
}

interface BottomNavigationProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const BottomNavigation = ({ activeTab, onTabChange }: BottomNavigationProps) => {
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    {
      id: "discover",
      label: "Discover",
      icon: <Map className="w-5 h-5" />,
      path: "/discover",
    },
    {
      id: "tours",
      label: "Tours",
      icon: <Headphones className="w-5 h-5" />,
      path: "/tours",
    },
    {
      id: "journal",
      label: "Journal",
      icon: <Camera className="w-5 h-5" />,
      path: "/journal",
    },
    {
      id: "events",
      label: "Events",
      icon: <Calendar className="w-5 h-5" />,
      path: "/events",
    },
    {
      id: "profile",
      label: "Profile",
      icon: <Settings className="w-5 h-5" />,
      path: "/profile",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            className={`flex flex-col items-center justify-center text-xs ${
              activeTab === item.id ? "text-orange-600" : "text-gray-500"
            }`}
            onClick={() => {
              onTabChange(item.id);
              navigate(item.path);
            }}
          >
            {item.icon}
            <span className="mt-1">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavigation;
 