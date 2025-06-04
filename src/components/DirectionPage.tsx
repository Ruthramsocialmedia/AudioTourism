import { useLocation, useNavigate } from "react-router-dom";
import {
  MapPin,
  ArrowLeft,
  BusFront,
  Bike,
  Car,
  TrainFront,
  Plane,
  Volume2,
} from "lucide-react";
import { useEffect, useState } from "react";

const GOOGLE_MAPS_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with your actual API key

const DirectionPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tourTitle, coordinates } = location.state || {};
  const destLat = coordinates?.lat || 13.0827;
  const destLng = coordinates?.lng || 80.2707;

  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLng, setUserLng] = useState<number | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLng(position.coords.longitude);
        },
        (error) => {
          console.error("Geolocation error:", error);
          alert("Unable to access your location. Showing default route.");
        }
      );
    }
  }, []);

  const origin = userLat && userLng ? `${userLat},${userLng}` : "My+Location";

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 bg-white shadow border-b">
        <button onClick={() => navigate(-1)} className="mr-3">
          <ArrowLeft className="w-6 h-6 text-orange-600" />
        </button>
        <h1 className="text-lg font-bold text-gray-800">Route to {tourTitle}</h1>
      </div>

      {/* Map */}
      <div className="relative flex-1">
        <iframe
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps/embed/v1/directions?key=AIzaSyCjBl_xeDVO6CTAl9Ab9vjfUUnns8G9v4Y&origin=${origin}&destination=${destLat},${destLng}&mode=driving`}
        />

        {/* Transport Mode Icons */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-4 bg-white px-4 py-2 rounded-full shadow-md z-10 border">
          <Bike className="w-5 h-5 text-orange-600" />
          <Car className="w-5 h-5 text-orange-600" />
          <BusFront className="w-5 h-5 text-orange-600" />
          <TrainFront className="w-5 h-5 text-orange-600" />
          <Plane className="w-5 h-5 text-orange-600" />
        </div>

        {/* Voice Button */}
        <button className="absolute bottom-24 right-4 bg-orange-100 p-3 rounded-full shadow">
          <Volume2 className="w-5 h-5 text-orange-600" />
        </button>
      </div>

      {/* Bottom Info Sheet */}
      <div className="p-4 bg-white border-t shadow-md">
        <div className="flex justify-between mb-2">
          <div>
            <p className="text-sm text-gray-500">Estimated Time</p>
            <p className="font-medium text-gray-900">~15 mins</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Distance</p>
            <p className="font-medium text-gray-900">~3.2 km</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Mode</p>
            <p className="font-medium text-gray-900">Driving</p>
          </div>
        </div>
        <button
          onClick={() => navigate(-1)}
          className="w-full py-3 mt-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold rounded-lg shadow"
        >
          Return to Audio Guide
        </button>
      </div>
    </div>
  );
};

export default DirectionPage;
