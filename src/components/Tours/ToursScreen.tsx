import { useState } from "react";
import { Play, Pause, Star, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import AddTourForm from "@/components/Tours/AddTourForm";
import type { TourFormData } from '../../types/tour';

interface AddTourFormProps {
  onBack: () => void;
  onSubmit: (tourData: TourFormData) => void;
}

const ToursScreen = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState([23]);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTour = () => setShowAddForm(true);
  const handleBackToTours = () => setShowAddForm(false);

  const handleTourSubmit = (tourData: TourFormData) => {
    console.log("New tour created:", tourData);
    setShowAddForm(false);
  };

  const currentTour = {
    title: "Ancient Temples of Tamil Nadu",
    description:
      "Discover the architectural marvels and spiritual significance of ancient Tamil temples",
    totalTracks: 8,
    duration: "2h 30m",
    language: "Tamil",
    narrator: "Dr. Priya Krishnan",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop",
  };

  const tracks = [
    {
      id: 1,
      title: "Welcome to Brihadeeswarar Temple",
      duration: "3:45",
      completed: true,
    },
    {
      id: 2,
      title: "The Great Architecture",
      duration: "5:20",
      completed: true,
    },
    {
      id: 3,
      title: "Spiritual Significance",
      duration: "4:10",
      completed: false,
      playing: true,
    },
    { id: 4, title: "Cultural Practices", duration: "6:30", completed: false },
    { id: 5, title: "Art and Sculptures", duration: "4:45", completed: false },
    { id: 6, title: "Historical Context", duration: "5:15", completed: false },
    { id: 7, title: "Temple Festivals", duration: "3:50", completed: false },
    {
      id: 8,
      title: "Conclusion & Reflection",
      duration: "2:25",
      completed: false,
    },
  ];

  const culturalTips = [
    {
      title: "Temple Etiquette",
      description: "Remove footwear before entering the temple premises",
      icon: "👡",
    },
    {
      title: "Photography",
      description: "Photography may be restricted in certain areas",
      icon: "📸",
    },
    {
      title: "Dress Code",
      description: "Modest clothing covering shoulders and knees preferred",
      icon: "👕",
    },
  ];

  const togglePlayPause = () => setIsPlaying(!isPlaying);

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">Add New Tour</h1>
        </div>
        <AddTourForm 
        onBack={handleBackToTours} onSubmit={handleTourSubmit} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Header with Add Tour Button */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-serif font-bold text-gray-900">
            Audio Tours
          </h1>
          <p className="text-sm text-gray-500">
            Discover amazing places with guided audio tours
          </p>
        </div>
        <Button
          onClick={handleAddTour}
          className="bg-gradient-to-r from-orange-400 to-yellow-400 hover:from-orange-500 hover:to-yellow-500 text-white"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Tour
        </Button>
      </div>

      {/* Current Tour Header */}
      <div className="relative">
        <img
          src={currentTour.image}
          alt={currentTour.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4 text-white">
          <h1 className="text-xl font-serif font-bold mb-1">
            {currentTour.title}
          </h1>
          <div className="flex items-center space-x-4 text-sm">
            <span>{currentTour.duration}</span>
            <span>•</span>
            <span>{currentTour.language}</span>
            <span>•</span>
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
              <span>{currentTour.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Player */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-medium text-gray-900">
              {tracks[currentTrack]?.title}
            </h3>
            <p className="text-sm text-gray-500">
              Narrated by {currentTour.narrator}
            </p>
          </div>
          <Badge
            variant="outline"
            className="text-[10px] sm:text-xs px-2 py-1 rounded-sm text-gray-800 border-gray-300 bg-white shadow-sm"
          >
            {currentTrack + 1} of {currentTour.totalTracks}
          </Badge>
        </div>

        <div className="mb-4">
          <Slider
            value={progress}
            onValueChange={setProgress}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1:23</span>
            <span>{tracks[currentTrack]?.duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentTrack(Math.max(0, currentTrack - 1))}
            disabled={currentTrack === 0}
          >
            ⏮
          </Button>

          <Button
            size="icon"
            onClick={togglePlayPause}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 shadow-lg text-white flex items-center justify-center"
          >
            {isPlaying ? (
              <Pause className="w-6 h-6" />
            ) : (
              <Play className="w-6 h-6 ml-[1px]" />
            )}
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentTrack(Math.min(tracks.length - 1, currentTrack + 1))
            }
            disabled={currentTrack === tracks.length - 1}
          >
            ⏭
          </Button>
        </div>
      </div>

      {/* Track List */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Track List</h2>
        <div className="space-y-2">
          {tracks.map((track, index) => (
            <Card
              key={track.id}
              className={`cursor-pointer transition-all ${
                index === currentTrack
                  ? "ring-2 ring-orange-400 bg-orange-50"
                  : "hover:shadow-md"
              }`}
              onClick={() => setCurrentTrack(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        track.completed
                          ? "bg-emerald-100 text-emerald-600"
                          : track.playing
                          ? "bg-orange-400 text-white"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {track.completed ? (
                        "✓"
                      ) : track.playing ? (
                        <span className="inline-block text-white text-xs translate-x-[1px]">
                          ▶
                        </span>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <div>
                      <h3
                        className={`font-medium ${
                          index === currentTrack
                            ? "text-orange-600"
                            : "text-gray-900"
                        }`}
                      >
                        {track.title}
                      </h3>
                      <p className="text-sm text-gray-500">{track.duration}</p>
                    </div>
                  </div>

                  {index === currentTrack && (
                    <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse" />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Cultural Tips */}
      <div className="px-4 pb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Cultural Tips
        </h2>
        <div className="space-y-3">
          {culturalTips.map((tip, index) => (
            <Card key={index} className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{tip.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {tip.title}
                    </h3>
                    <p className="text-sm text-gray-600">{tip.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToursScreen;
