import { useState, useEffect, useRef } from "react";
import {
  ArrowLeft,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Download,
  MapPin,
  ChevronUp,
  Globe,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";

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
  coordinates?: { lat: number; lng: number };
  fullDescription?: string;
  highlights?: string[];
  audioUrl?: string;
}

interface AudioPlayerProps {
  tour: Tour;
  onClose: () => void;
}

const AudioPlayer = ({ tour, onClose }: AudioPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showBottomSheet, setShowBottomSheet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const audioRef = useRef<HTMLAudioElement>(null);

  const goToDirectionPage = () => {
    navigate("/direction", {
      state: {
        tourTitle: tour.title,
        coordinates: tour.coordinates,
      },
    });
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handleLoadStart = () => {
      setIsLoading(true);
    };

    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("loadstart", handleLoadStart);

    return () => {
      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("loadstart", handleLoadStart);
    };
  }, []);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
      setIsPlaying(false);
    }
  };

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = value[0];
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const languages = ["English", "Tamil", "Hindi"];

  return (
    <div className="inset-0 pb-10 bg-white z-50 flex flex-col">
      <ScrollToTop />
      <audio ref={audioRef} src={tour.audioUrl} preload="metadata" />

      {/* Header */}
      <div className="relative">
        <img src={tour.image} alt={tour.title} className="w-full h-80 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60" />

        <button
          onClick={onClose}
          className="absolute top-6 left-4 p-2 bg-black/30 rounded-full backdrop-blur-sm"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>

        <button className="absolute top-6 right-4 p-2 bg-black/30 rounded-full backdrop-blur-sm">
          <Download className="w-6 h-6 text-white" />
        </button>

        <div className="absolute bottom-6 left-4 right-4">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-orange-600 text-white">{tour.price}</Badge>
            <Badge className="bg-white/20 text-white backdrop-blur-sm">{tour.difficulty}</Badge>
          </div>
          <h1 className="text-2xl font-serif font-bold text-white mb-2">{tour.title}</h1>
          <p className="text-white/90 text-sm">{tour.duration} • {tour.distance} away</p>
        </div>
      </div>

      {/* Language Selector */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Globe className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-900">Select Language</span>
        </div>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                selectedLanguage === lang ? "bg-orange-600 text-white" : "bg-gray-100 text-gray-700"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      {/* Audio Controls */}
      <div className="px-4 py-6 flex-1">
        <div className="mb-6">
          <Slider
            value={[currentTime]}
            onValueChange={handleSeek}
            max={duration || 100}
            step={1}
            disabled={!duration}
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center justify-center gap-6 mt-4">
            <button onClick={() => handleSeek([Math.max(0, currentTime - 10)])}>
              <SkipBack className="w-6 h-6 text-gray-700" />
            </button>
            <button
              onClick={togglePlayPause}
              disabled={isLoading}
              className="w-16 h-16 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 shadow-lg text-white flex items-center justify-center"
            >
              {isLoading ? (
                <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : isPlaying ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8" />
              )}
            </button>
            <button onClick={() => handleSeek([Math.min(duration, currentTime + 10)])}>
              <SkipForward className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Map Preview */}
        <div className="mb-4 rounded-lg overflow-hidden shadow">
          <iframe
            title={`Map of ${tour.title}`}
            width="100%"
            height="200"
            loading="lazy"
            style={{ border: 0 }}
            className="rounded-md"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyCjBl_xeDVO6CTAl9Ab9vjfUUnns8G9v4Y&q=${encodeURIComponent(
              tour.title
            )}&zoom=15`}
          />
        </div>

        {/* Get Directions */}
        <div className="px-4 mt-5">
          <button
            onClick={goToDirectionPage}
            className="w-full bg-gradient-to-r from-orange-400 to-yellow-400 text-white py-3 rounded-lg font-medium flex items-center justify-center gap-2"
          >
            <MapPin className="w-5 h-5" />
            Get Directions
          </button>
        </div>
      </div>

      {/* Bottom Sheet */}
      <div className="px-4">
        <button
          onClick={() => setShowBottomSheet(true)}
          className="w-full flex items-center justify-center gap-2 py-3 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronUp className="w-5 h-5" />
          <span className="font-medium">More Details</span>
        </button>
      </div>

      {showBottomSheet && (
  <div
    className="fixed inset-0 bg-black/50 z-50"
    onClick={() => setShowBottomSheet(false)}
  >
    <div
      className="absolute bottom-0 left-0 right-0 bg-white pb-20 rounded-t-2xl max-h-[80vh] overflow-y-auto animate-slide-in-up"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="p-4">
        {/* Handle */}
        <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6" />

        <h2 className="text-xl font-serif font-bold text-gray-900 mb-4">
          About This Tour
        </h2>

        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">
              Description
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {tour.fullDescription ||
                tour.description +
                  " This immersive audio experience will take you through centuries of rich cultural heritage, with detailed explanations of architectural marvels, historical significance, and local traditions. Perfect for history enthusiasts and cultural explorers."}
            </p>
          </div>

          {/* Tour Highlights */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Tour Highlights
            </h3>
            <div className="space-y-2">
              {(
                tour.highlights || [
                  "Expert narration by local historians",
                  "High-quality audio with ambient sounds",
                  "Interactive map with GPS guidance",
                  "Offline listening capability",
                  "Cultural context and traditions",
                ]
              ).map((highlight, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-600">{highlight}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tour Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Duration</div>
              <div className="font-semibold text-gray-900">{tour.duration}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Difficulty</div>
              <div className="font-semibold text-gray-900">{tour.difficulty}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Distance</div>
              <div className="font-semibold text-gray-900">{tour.distance}</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <div className="text-sm text-gray-500">Languages</div>
              <div className="font-semibold text-gray-900">{tour.language}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default AudioPlayer;