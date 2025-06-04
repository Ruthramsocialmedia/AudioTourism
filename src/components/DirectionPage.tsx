import { useLocation } from "react-router-dom";

const DirectionPage = () => {
  const location = useLocation();
  const { tourTitle, coordinates } = location.state || {};
  const lat = coordinates?.lat || 13.0827;
  const lng = coordinates?.lng || 80.2707;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Route to {tourTitle}</h1>
      <iframe
        width="100%"
        height="500"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCjBl_xeDVO6CTAl9Ab9vjfUUnns8G9v4Y&q=${lat},${lng}&zoom=16`}
      />
    </div>
  );
};

export default DirectionPage;
