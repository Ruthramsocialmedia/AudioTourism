import { useState } from "react";
import { Search, Star, Map, Headphones, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import AudioPlayer from "@/components/AudioPlayer";

interface Tour {
  id: number;
  title: string;
  description: string;
  image: string;
  duration: string;
  rating: number;
  language: string;
  difficulty: string;
  price: string;
  distance: string;
  category: string;
  coordinates?: { lat: number; lng: number }; // 👈 optional
}

interface CategoryScreenProps {
  category: string;
  categoryIcon: string;
}

const CategoryScreen = ({ category, categoryIcon }: CategoryScreenProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [showTourPlayer, setShowTourPlayer] = useState(false);
  const navigate = useNavigate();

  // All tours data - in a real app, this would come from an API
  const allTours: Tour[] = [
    {
      id: 1,
      title: "Ancient Temples of Tamil Nadu",
      description:
        "Explore 1000-year-old architecture and spiritual traditions",
      image:
        "https://travelsetu.com/apps/uploads/new_destinations_photos/destination/2023/12/21/5bbded643474f9e135993944b52d03a1_1000x1000.jpg",
      duration: "2.5 hours",
      rating: 4.8,
      language: "Tamil, English",
      difficulty: "Easy",
      price: "Free",
      distance: "2.3 km",
      category: "temples",
    },
    {
      id: 2,
      title: "Heritage Bazaars & Markets",
      description: "Discover traditional crafts, spices, and local delicacies",
      image:
        "https://images.pexels.com/photos/27650165/pexels-photo-27650165/free-photo-of-rockfort.jpeg",
      duration: "1.5 hours",
      rating: 4.6,
      language: "Hindi, English",
      difficulty: "Easy",
      price: "₹199",
      distance: "0.8 km",
      category: "markets",
    },
    {
      id: 3,
      title: "Desert Fort Chronicles",
      description: "Majestic forts and tales of Rajasthani valor",
      image:
        "https://plus.unsplash.com/premium_photo-1689838027426-bf5cc3a0131f?q=80&w=1974&auto=format&fit=crop",
      duration: "3 hours",
      rating: 4.9,
      language: "Hindi, English",
      difficulty: "Moderate",
      price: "₹299",
      distance: "5.1 km",
      category: "forts",
    },
    {
      id: 4,
      title: "Brahmapureeswarar Temple Walk",
      description: "Spiritual journey through Chola-era architecture",
      image:
        "https://files.yappe.in/place/full/brahmapureeswarar-temple-1573248.webp",
      duration: "3 hours",
      rating: 4.9,
      language: "Tamil, English",
      difficulty: "Moderate",
      price: "₹299",
      distance: "4.2 km",
      category: "temples",
    },
    {
      id: 5,
      title: "Meenakshi Temple Complex",
      description: "Marvel at the intricate sculptures and towering gopurams",
      image:
        "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2070&auto=format&fit=crop",
      duration: "2 hours",
      rating: 4.7,
      language: "Tamil, English",
      difficulty: "Easy",
      price: "₹150",
      distance: "1.5 km",
      category: "temples",
    },
    {
      id: 6,
      title: "Amber Fort Adventure",
      description:
        "Explore the magnificent hilltop fortress and palace complex",
      image:
        "https://images.unsplash.com/photo-1599661046827-dacde6976549?q=80&w=2070&auto=format&fit=crop",
      duration: "3.5 hours",
      rating: 4.8,
      language: "Hindi, English",
      difficulty: "Moderate",
      price: "₹350",
      distance: "3.2 km",
      category: "forts",
    },
    {
      id: 7,
      title: "Chandni Chowk Market Tour",
      description: "Navigate the bustling lanes of Delhi's oldest market",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=2070&auto=format&fit=crop",
      duration: "2 hours",
      rating: 4.5,
      language: "Hindi, English",
      difficulty: "Easy",
      price: "₹250",
      distance: "1.2 km",
      category: "markets",
    },
    {
      id: 8,
      title: "Lodi Gardens Nature Walk",
      description: "Peaceful stroll through historic gardens and monuments",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=2070&auto=format&fit=crop",
      duration: "1.5 hours",
      rating: 4.4,
      language: "Hindi, English",
      difficulty: "Easy",
      price: "Free",
      distance: "2.1 km",
      category: "gardens",
    },
    {
      id: 9,
      title: "National Museum Heritage Tour",
      description: "Journey through India's rich cultural history",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop",
      duration: "2.5 hours",
      rating: 4.6,
      language: "Hindi, English",
      difficulty: "Easy",
      price: "₹200",
      distance: "1.8 km",
      category: "museums",
    },
    {
      id: 10,
      title: "Rural Heritage Village",
      description: "Experience traditional village life and crafts",
      image:
        "https://images.unsplash.com/photo-1566552881560-0be862a7c445?q=80&w=2070&auto=format&fit=crop",
      duration: "4 hours",
      rating: 4.7,
      language: "Hindi, English",
      difficulty: "Moderate",
      price: "₹400",
      distance: "12.5 km",
      category: "villages",
    },
  ];

  // Filter tours by category and search query
  const categoryTours = allTours.filter(
    (tour) =>
      tour.category === category.toLowerCase() &&
      (searchQuery === "" ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.language.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleBack = () => {
    navigate("/discover");
  };

  const handleTourClick = (tour) => {
    setSelectedTour(tour);
    setShowTourPlayer(true);
  };

  const handleCloseTourPlayer = () => {
    setShowTourPlayer(false);
    setSelectedTour(null);
  };

  const handleCloseAudioPlayer = () => {
    setSelectedTour(null);
  };

  if (selectedTour) {
    return <AudioPlayer tour={selectedTour} onClose={handleCloseAudioPlayer} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 top-0 z-40">
        <div className="px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <button
              onClick={handleBack}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{categoryIcon}</span>
              <div>
                <h1 className="text-xl font-serif font-bold text-gray-900">
                  {category}
                </h1>
                <p className="text-sm text-gray-600">
                  {categoryTours.length} tours available
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder={`Search ${category.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 bg-gray-50 border-gray-200"
            />
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-3 text-gray-600 text-sm">
              Found {categoryTours.length} tours for "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Tours List */}
      <div className="px-4 py-6">
        {categoryTours.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No tours found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? "Try adjusting your search"
                : `No ${category.toLowerCase()} tours available`}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {categoryTours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => handleTourClick(tour)}
              >
                <div className="relative">
                  <img
                    src={tour.image}
                    alt={tour.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className="bg-white/90 text-gray-800 hover:bg-white">
                      {tour.distance}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge
                      className={`${
                        tour.price === "Free"
                          ? "bg-emerald-500"
                          : "bg-orange-600"
                      } text-white`}
                    >
                      {tour.price}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif font-semibold text-gray-900 text-lg leading-tight">
                      {tour.title}
                    </h3>
                    <div className="flex items-center ml-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-gray-600 ml-1">
                        {tour.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {tour.description}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <Headphones className="w-4 h-4 mr-1" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center">
                      <Map className="w-4 h-4 mr-1" />
                      <span>{tour.difficulty}</span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Available in: {tour.language}
                      </span>
                      <button className="text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
                        Start Tour →
                        {tour.coordinates && (
                          <button
                            className="text-sm mt-2 text-blue-600 hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/directions", {
                                state: {
                                  destination: tour.coordinates,
                                  tourTitle: tour.title,
                                },
                              });
                            }}
                          >
                            Get Directions →
                          </button>
                        )}
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryScreen;
