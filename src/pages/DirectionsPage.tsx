// src/pages/Directions.tsx
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

const DirectionsPage = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const destination = location.state?.destination;
  const tourTitle = location.state?.tourTitle;

  useEffect(() => {
    if (!destination) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const origin = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };

        const map = new google.maps.Map(mapRef.current!, {
          center: origin,
          zoom: 13,
        });

        const directionsService = new google.maps.DirectionsService();
        const directionsRenderer = new google.maps.DirectionsRenderer({ map });

        directionsService.route(
          {
            origin,
            destination,
            travelMode: google.maps.TravelMode.DRIVING,
          },
          (result, status) => {
            if (status === 'OK' && result) {
              directionsRenderer.setDirections(result);
            } else {
              console.error('Error fetching directions', result);
            }
          }
        );
      },
      (error) => {
        console.error('Geolocation error:', error);
      }
    );
  }, [destination]);

  return (
    <div className="p-4 min-h-screen bg-gray-100">
      <div className="text-lg font-semibold mb-4">Directions to {tourTitle}</div>
      <div
        ref={mapRef}
        className="w-full h-[calc(100vh-120px)] rounded-2xl shadow-lg border border-gray-200"
      ></div>
    </div>
  );
};

export default DirectionsPage;
