import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Navigation,
  MapPin,
  Clock,
  Car,
  Bike,
  Footprints,
  Volume2,
  VolumeX,
  LocateIcon,
  Route,
  Zap,
  Search,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import LocationService from "@/services/LocationService";
import GoogleMapsService from "@/services/GoogleMapsService";
import VoiceNavigation from "@/components/VoiceNavigation";
import { useToast } from "@/hooks/use-toast";
import type { LucideIcon } from "lucide-react";
import temple_des from '../Assets/Asset 1.png';
import user_des from '../Assets/Asset 9.png';

interface TravelMode {
  id: string;
  name: string;
  icon: LucideIcon;
  value: string;
}

interface RouteInfo {
  distance: string;
  duration: string;
  steps: google.maps.DirectionsStep[];
}

const Direction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const userMarkerRef = useRef<google.maps.Marker | null>(null);
  const destMarkerRef = useRef<google.maps.Marker | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const placeMarkers = (
    userPos: { lat: number; lng: number },
    destPos: { lat: number; lng: number }
  ) => {
    if (!googleMapRef.current) return;

    userMarkerRef.current?.setMap(null);
    destMarkerRef.current?.setMap(null);

    userMarkerRef.current = new google.maps.Marker({
      position: userPos,
      map: googleMapRef.current,
      label: {
        text: null,
        fontWeight: "bold",
        color: "white",
        fontSize: "14px",
      },
      icon: {
        url: user_des,
      },
      title: "🅰 You are here",
    });

    destMarkerRef.current = new google.maps.Marker({
      position: destPos,
      map: googleMapRef.current,
      label: {
        text: null,
        fontWeight: "bold",
        color: "white",
        fontSize: "14px",
      },
      icon: {
        url: temple_des,
      },
      title: "🅱 Your destination",
    });

    const bounds = new google.maps.LatLngBounds();
    bounds.extend(userPos);
    bounds.extend(destPos);
    googleMapRef.current.fitBounds(bounds);
  };

  const [userLocation, setUserLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [destination, setDestination] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [tourTitle, setTourTitle] = useState<string>("");
  const [selectedTravelMode, setSelectedTravelMode] =
    useState<string>("DRIVING");
  const [routeInfo, setRouteInfo] = useState<RouteInfo | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingRoute, setIsLoadingRoute] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [isNavigationStarted, setIsNavigationStarted] = useState(false);

  const travelModes: TravelMode[] = [
    { id: "driving", name: "Driving", icon: Car, value: "DRIVING" },
    { id: "walking", name: "Walking", icon: Footprints, value: "WALKING" },
    { id: "bicycling", name: "Cycling", icon: Bike, value: "BICYCLING" },
    { id: "transit", name: "Transit", icon: Zap, value: "TRANSIT" },
  ];

  const initializeMap = useCallback(() => {
    if (!mapRef.current) return;

    try {
      const map = new google.maps.Map(mapRef.current, {
        zoom: 15,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      googleMapRef.current = map;
      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        draggable: false,
        suppressMarkers: true, // ✅ hide default A/B markers
      });
      directionsRendererRef.current.setMap(map);

      setMapReady(true); // ✅ mark as ready
    } catch (error) {
      toast({
        title: "Maps Error",
        description:
          "Failed to initialize Google Maps. Please refresh the page.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const getCurrentLocation = useCallback(async () => {
    console.log("📍 getCurrentLocation called");
    setIsLoadingLocation(true);
    try {
      const position = await LocationService.getCurrentPosition();
      console.log("📍 Position:", position);
      setUserLocation(position);

      if (googleMapRef.current) {
        googleMapRef.current.setCenter(position);
      }

      toast({
        title: "Location Found",
        description: "Your current location has been detected.",
      });
    } catch (error) {
      console.error("Error getting location:", error);
      toast({
        title: "Location Required",
        description:
          "Please enable location access or search for your location.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  }, [toast]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]); // ✅ ESLint is happy

  const searchLocation = async () => {
    if (!searchQuery.trim()) return;

    setIsLoadingLocation(true);
    try {
      const position = await GoogleMapsService.geocodeAddress(searchQuery);
      setUserLocation(position);

      if (googleMapRef.current) {
        googleMapRef.current.setCenter(position);
      }

      toast({
        title: "Location Set",
        description: "Your location has been set successfully.",
      });
    } catch (error) {
      console.error("Error searching location:", error);
      toast({
        title: "Search Error",
        description: "Could not find the specified location. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoadingLocation(false);
    }
  };

  const calculateRoute = useCallback(async () => {
    if (
      !userLocation ||
      !destination ||
      !directionsServiceRef.current ||
      !directionsRendererRef.current
    ) {
      return;
    }

    setIsLoadingRoute(true);
    try {
      const request: google.maps.DirectionsRequest = {
        origin: userLocation,
        destination: destination,
        travelMode: selectedTravelMode as google.maps.TravelMode,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false,
      };

      directionsServiceRef.current.route(request, (result, status) => {
        if (status === "OK" && result) {
          directionsRendererRef.current?.setDirections(result);
          const route = result.routes[0];
          const leg = route.legs[0];

          setRouteInfo({
            distance: leg.distance?.text || "",
            duration: leg.duration?.text || "",
            steps: leg.steps || [],
          });

          toast({
            title: "Route Calculated",
            description: `Found route: ${leg.distance?.text} in ${leg.duration?.text}`,
          });
        } else {
          toast({
            title: "Route Error",
            description:
              "Could not calculate route. Please try a different travel mode.",
            variant: "destructive",
          });
        }
        setIsLoadingRoute(false);
      });
    } catch (error) {
      console.error("Error calculating route:", error);
      setIsLoadingRoute(false);
    }
  }, [userLocation, destination, selectedTravelMode, toast]);

  useEffect(() => {
    if (location.state) {
      setTourTitle(location.state.tourTitle || "");
      setDestination(location.state.coordinates || null);
    }
    initializeMap();
  }, [location.state, initializeMap]);

  useEffect(() => {
    if (userLocation && destination && mapReady) {
      placeMarkers(userLocation, destination);
      calculateRoute();
    }
  }, [userLocation, destination, selectedTravelMode, mapReady, calculateRoute]);

  useEffect(() => {
    console.log("✅ userLocation:", userLocation);
    console.log("✅ destination:", destination);
    console.log("✅ mapReady:", mapReady);
  }, [userLocation, destination, mapReady]);

  const startNavigation = () => {
    if (!routeInfo) return;

    setIsNavigationStarted(true);
    toast({
      title: "Navigation Started",
      description: "Turn-by-turn directions are now active.",
    });
  };

  const stopNavigation = () => {
    setIsNavigationStarted(false);
    setIsVoiceEnabled(false);
    toast({
      title: "Navigation Stopped",
      description: "Navigation has been stopped.",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between p-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`p-2 rounded-full ${
              isVoiceEnabled
                ? "bg-orange-100 text-orange-600"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isVoiceEnabled ? (
              <Volume2 className="w-5 h-5" />
            ) : (
              <VolumeX className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white border-b p-4">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">
            Search Your Location
          </span>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Enter your address or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && searchLocation()}
            className="flex-1"
          />
          <Button
            onClick={searchLocation}
            disabled={isLoadingLocation}
            size="sm"
          >
            {isLoadingLocation ? "Searching..." : "Search"}
          </Button>
          <Button
            onClick={getCurrentLocation}
            disabled={isLoadingLocation}
            variant="outline"
            size="sm"
          >
            <LocateIcon className="w-4 h-4" />
          </Button>
        </div>
        {tourTitle && (
          <div className="mt-3 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-600" />
            <span className="text-sm text-gray-600">
              Destination: {tourTitle}
            </span>
          </div>
        )}
      </div>

      {/* Travel Mode Selector */}
      <div className="bg-white border-b p-4">
        <div className="flex gap-2 overflow-x-auto">
          {travelModes.map((mode) => {
            const Icon = mode.icon;
            return (
              <button
                key={mode.id}
                onClick={() => setSelectedTravelMode(mode.value)}
                className={`flex flex-col items-center gap-1 p-3 rounded-lg min-w-[80px] ${
                  selectedTravelMode === mode.value
                    ? "bg-orange-100 text-orange-600 border-2 border-orange-200"
                    : "bg-gray-50 text-gray-600 border-2 border-transparent"
                }`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs font-medium">{mode.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Route Info */}
      {routeInfo && (
        <div className="bg-white border-b p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-gray-900">
                  {routeInfo.distance}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-green-600" />
                <span className="font-medium text-gray-900">
                  {routeInfo.duration}
                </span>
              </div>
            </div>
            {!isNavigationStarted ? (
              <Button
                onClick={startNavigation}
                className="bg-gradient-to-r from-orange-400 to-yellow-400"
              >
                <Navigation className="w-4 h-4 mr-2" />
                Start
              </Button>
            ) : (
              <Button onClick={stopNavigation} variant="destructive">
                Stop
              </Button>
            )}
          </div>
        </div>
      )}

      {/* Loading States */}
      {(isLoadingLocation || isLoadingRoute) && (
        <div className="bg-blue-50 border-b border-blue-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm text-blue-800">
              {isLoadingLocation
                ? "Getting your location..."
                : "Calculating route..."}
            </span>
          </div>
        </div>
      )}

      {/* Map Container */}
      <div className="relative flex-1">
        <div
          ref={mapRef}
          className="w-full h-[calc(100vh-300px)] min-h-[400px]"
        />

        {/* Quick Location Button */}
        <button
          onClick={getCurrentLocation}
          className="absolute bottom-4 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
          disabled={isLoadingLocation}
        >
          <LocateIcon className="w-6 h-6 text-gray-600" />
        </button>
      </div>

      {/* Voice Navigation Component */}
      {isNavigationStarted && routeInfo && (
        <VoiceNavigation
          steps={routeInfo.steps}
          isVoiceEnabled={isVoiceEnabled}
          onNavigationComplete={stopNavigation}
        />
      )}
    </div>
  );
};

export default Direction;
