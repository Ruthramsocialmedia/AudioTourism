// Combined ToursScreen with full tour listing, filtering, and card rendering
import { useState, useEffect } from "react";
import { Plus, Search, Filter, Play, Star, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import AddTourForm from "@/components/Tours/AddTourForm";
import { saveTour, getSavedTours } from "@/utils/tourStorage";
import type { TourFormData, SavedTour } from "@/types/tour";

const ToursScreen = () => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [tours, setTours] = useState<SavedTour[]>([]);
  const [filteredTours, setFilteredTours] = useState<SavedTour[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterVisibility, setFilterVisibility] = useState("all");

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'temples', label: 'Temples 🛕' },
    { value: 'forts', label: 'Forts 🏰' },
    { value: 'markets', label: 'Markets 🛍️' },
    { value: 'museums', label: 'Museums 🏛️' },
    { value: 'villages', label: 'Villages 🏘️' },
    { value: 'beaches', label: 'Beaches 🏖️' },
    { value: 'gardens', label: 'Gardens 🌺' },
    { value: 'monuments', label: 'Monuments 🗿' },
    { value: 'trails', label: 'Trails 🚶' },
    { value: 'nature', label: 'Nature 🏞️' },
    { value: 'others', label: 'Others...' },
  ];

  useEffect(() => {
    const savedTours = getSavedTours();
    setTours(savedTours);
  }, []);

  useEffect(() => {
    let filtered = tours;
    if (searchQuery.trim()) {
      filtered = filtered.filter(tour =>
        tour.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.languages.some(lang => lang.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    if (filterCategory !== 'all') {
      filtered = filtered.filter(tour => tour.category === filterCategory);
    }
    if (filterVisibility !== 'all') {
      filtered = filtered.filter(tour => tour.visibility === filterVisibility);
    }
    setFilteredTours(filtered);
  }, [tours, searchQuery, filterCategory, filterVisibility]);

  const handleTourSubmit = (tourData: TourFormData) => {
    const savedTour = saveTour(tourData);
    setTours(prev => [savedTour, ...prev]);
    setShowAddForm(false);
  };

  const handlePlayTour = (tour: SavedTour) => {
    console.log("Playing tour:", tour);
  };

  const getCategoryEmoji = (category: string) => {
    const map: Record<string, string> = {
      temples: '🛕', forts: '🏰', markets: '🛍️', museums: '🏛️', villages: '🏘️',
      beaches: '🏖️', gardens: '🌺', monuments: '🗿', trails: '🚶', nature: '🏞️', others: '📍'
    };
    return map[category] || '📍';
  };

  const formatDistance = (distance: string) => {
    if (!distance) return '';
    return distance.toLowerCase().includes('km') ? distance : `${distance} km`;
  };

  if (showAddForm) {
    return <AddTourForm onBack={() => setShowAddForm(false)} onSubmit={handleTourSubmit} />;
  }

  return (
    <div className="bg-white pt-4">
      <div className="bg-white border-b p-4">
        <div className="flex flex-col sm:flex-row justify-between">
          <div>
            <h1 className="text-2xl font-bold">Audio Tours</h1>
            <p className="text-sm text-gray-500">Explore places with guided audio tours</p>
          </div>
          <Button onClick={() => setShowAddForm(true)} className="bg-orange-500 text-white">
            <Plus className="w-4 h-4 mr-1" /> Add Tour
          </Button>
        </div>
      </div>

      <div className="bg-white border-b p-4 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search tours..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-4">
        <Select value={filterCategory} onValueChange={setFilterCategory}>
          <SelectTrigger className="w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map(cat => (
              <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={filterVisibility} onValueChange={setFilterVisibility}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Visibility" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="public">Public</SelectItem>
            <SelectItem value="unlisted">Unlisted</SelectItem>
            <SelectItem value="private">Private</SelectItem>
          </SelectContent>
        </Select>
        </div>
      </div>

      <div className="p-4">
        {filteredTours.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No tours found</h2>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTours.map(tour => (
              <Card key={tour.id} className="bg-white rounded-lg hover:shadow-md">
                <div className="relative">
                  {tour.imageUrl ? (
                    <img src={tour.imageUrl} alt={tour.title} className="w-full h-48 object-cover" />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-orange-200 to-yellow-200 flex items-center justify-center">
                      <span className="text-4xl">{getCategoryEmoji(tour.category)}</span>
                    </div>
                  )}
                  {tour.distance && (
                    <Badge className="absolute top-2 left-2 bg-black/70 text-white text-xs">{formatDistance(tour.distance)}</Badge>
                  )}
                  <Badge className="absolute top-2 right-2 bg-green-500 text-white text-xs">{tour.price === 0 ? 'Free' : `$${tour.price}`}</Badge>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg text-gray-900 line-clamp-1">{tour.title}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2 mb-2">{tour.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" /> <span>2.5 hrs</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4" /> <span>Easy</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">Languages: {tour.languages.slice(0, 2).join(', ')}{tour.languages.length > 2 ? ` +${tour.languages.length - 2}` : ''}</div>
                    <Button size="sm" onClick={() => handlePlayTour(tour)} className="bg-orange-500 text-white text-xs">Start Tour →</Button>
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

export default ToursScreen;
