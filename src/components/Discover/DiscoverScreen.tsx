import { useState } from "react";
import { Search, Star, Map, Headphones, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import "./DiscoverScreen.css";
import AudioPlayer from "@/components/AudioPlayer";
import { Tour } from "@/types/types";
import Song2Play from "../../Assets/chillout-7-1350.mp3";

const DiscoverScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedTour, setSelectedTour] = useState<Tour | null>(null);
  const [filters, setFilters] = useState({
    distance: false,
    rating: false,
    popularity: false,
  });
  const navigate = useNavigate();

  const featuredTours = [
    {
      id: 1,
      title: "Srirangam Temple - Trichy",
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
      audioUrl: Song2Play,
    },
    {
      id: 2,
      title: "Heritage ",
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
  ];

  const categories = [
    { name: "Temples", icon: "🏛️", count: 47, path: "/temples" },
    { name: "Forts", icon: "🏰", count: 23, path: "/forts" },
    { name: "Markets", icon: "🛍️", count: 31, path: "/markets" },
    { name: "Gardens", icon: "🌺", count: 18, path: "/gardens" },
    { name: "Museums", icon: "🏛️", count: 12, path: "/museums" },
    { name: "Villages", icon: "🏘️", count: 29, path: "/villages" },
  ];

  const filteredTours = featuredTours
    .filter((tour) => {
      const matchesSearch =
        searchQuery === "" ||
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.language.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesSearch;
    })
    .sort((a, b) => {
      if (filters.distance) {
        return parseFloat(a.distance) - parseFloat(b.distance);
      }
      if (filters.rating) {
        return b.rating - a.rating;
      }
      if (filters.popularity) {
        return b.rating - a.rating; // Using rating as popularity metric
      }
      return 0;
    });

  const handleFilterChange = (filterType: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: !prev[filterType as keyof typeof prev],
    }));
  };

  const clearFilters = () => {
    setFilters({
      distance: false,
      rating: false,
      popularity: false,
    });
  };

  const handleCategoryClick = (path: string) => {
    navigate(path);
  };

  const handleCloseAudioPlayer = () => {
    setSelectedTour(null);
  };

  if (selectedTour) {
    return <AudioPlayer tour={selectedTour} onClose={handleCloseAudioPlayer} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header with Search */}
      <div className="bg-white image_bg relative border-b border-gray-200 top-0 z-40">
        <div className="absolute inset-0 bg-black/40 z-0" />
        <div className="px-4 glass-card-discover relative z-10 py-14">
          <div className="mb-4">
            <h1 className="text-2xl text-white font-serif font-bold">
              Discover Heritage
            </h1>
            <p className="text-sm text-white">
              Find amazing audio tours near you
            </p>
          </div>

          {/* Search Bar with Filter Icon */}
          <div className="relative flex items-center justify-center gap-0.5">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search temples, forts, markets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 search-div bg-gray-50 border-gray-200"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-3.5 filter-div rounded-md transition-colors ${
                showFilters
                  ? "bg-orange-100 text-orange-600"
                  : "bg-gray-100 hover:bg-gray-200 text-gray-600"
              }`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>

            {/* Filter Dropdown */}
            {showFilters && (
              <div className="absolute top-full mt-2 right-0 w-64 bg-white rounded-lg shadow-lg p-4 z-50 border border-gray-200">
                <div className="flex justify-between items-center mb-3">
                  <div className="font-medium text-gray-900">Filter Tours</div>
                  <button
                    onClick={clearFilters}
                    className="text-xs text-orange-600 hover:text-orange-700"
                  >
                    Clear All
                  </button>
                </div>

                <div className="space-y-3">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-3 rounded text-orange-600 focus:ring-orange-500"
                      checked={filters.distance}
                      onChange={() => handleFilterChange("distance")}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">
                        Sort by Distance
                      </div>
                      <div className="text-xs text-gray-500">
                        Nearest locations first
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-3 rounded text-orange-600 focus:ring-orange-500"
                      checked={filters.rating}
                      onChange={() => handleFilterChange("rating")}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">
                        Sort by Rating
                      </div>
                      <div className="text-xs text-gray-500">
                        Highest rated first
                      </div>
                    </div>
                  </label>

                  <label className="flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="mr-3 rounded text-orange-600 focus:ring-orange-500"
                      checked={filters.popularity}
                      onChange={() => handleFilterChange("popularity")}
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-700">
                        Sort by Popularity
                      </div>
                      <div className="text-xs text-gray-500">
                        Most popular tours
                      </div>
                    </div>
                  </label>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button
                    onClick={() => setShowFilters(false)}
                    className="w-full py-2 bg-orange-600 text-white rounded-md text-sm font-medium hover:bg-orange-700 transition-colors"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Search Results Info */}
          {searchQuery && (
            <div className="mt-3 text-white text-sm">
              Found {filteredTours.length} tours for "{searchQuery}"
            </div>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 py-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Explore by Category
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => handleCategoryClick(category.path)}
            >
              <CardContent className="p-4 text-center">
                <div className="text-2xl mb-2">{category.icon}</div>
                <h3 className="font-medium text-sm text-gray-900">
                  {category.name}
                </h3>
                <p className="text-xs text-gray-500">{category.count} tours</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Tours */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">
            {searchQuery ? "Search Results" : "Featured Tours"}
          </h2>
          {!searchQuery && (
            <button className="text-orange-600 text-sm font-medium hover:text-orange-700 transition-colors">
              View All
            </button>
          )}
        </div>

        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">
              <Search className="w-12 h-12 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">
              No tours found
            </h3>
            <p className="text-gray-500">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredTours.map((tour) => (
              <Card
                key={tour.id}
                className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() => setSelectedTour(tour)} // <-- This is missing in your code
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

export default DiscoverScreen;
