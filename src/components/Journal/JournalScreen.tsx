
import { useState, useRef } from 'react';
import { Camera, Mic, Star, Share, StopCircle, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const JournalScreen = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { toast } = useToast();

  const journalEntries = [
    {
      id: 1,
      title: "Brihadeeswarar Temple Visit",
      location: "Thanjavur, Tamil Nadu",
      date: "Today, 2:30 PM",
      image: "https://images.unsplash.com/photo-1466442929976-97f336a657be?w=400&h=300&fit=crop",
      audioCaption: "The intricate carvings on the temple walls tell stories of ancient devotion...",
      rating: 5,
      tags: ["Temple", "Architecture", "Spiritual"]
    },
    {
      id: 2,
      title: "Spice Market Discovery",
      location: "Old Delhi",
      date: "Yesterday, 11:45 AM",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?w=400&h=300&fit=crop",
      audioCaption: "The aroma of cardamom and cinnamon fills the air as vendors call out...",
      rating: 4,
      tags: ["Market", "Spices", "Culture"]
    },
    {
      id: 3,
      title: "Desert Fort Sunset",
      location: "Jaisalmer, Rajasthan",
      date: "2 days ago, 6:15 PM",
      image: "https://images.unsplash.com/photo-1469041797191-50ace28483c3?w=400&h=300&fit=crop",
      audioCaption: "Golden hour transforms the sandstone walls into pure magic...",
      rating: 5,
      tags: ["Fort", "Sunset", "Desert"]
    }
  ];

  const handlePhotoCapture = async () => {
    try {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhoto(e.target?.result as string);
        toast({
          title: "Photo Captured!",
          description: "Your photo has been saved to your journey.",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        setAudioBlob(blob);
        toast({
          title: "Recording Complete!",
          description: "Your voice note has been saved.",
        });
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      toast({
        title: "Microphone Error",
        description: "Unable to access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsRecording(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const playRecording = () => {
    if (audioBlob) {
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.play();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hidden file input for photo capture */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4">
        <h1 className="text-2xl font-serif font-bold text-deep-blue mb-2">
          My Journey
        </h1>
        <p className="text-gray-600 text-sm">
          Capture and share your cultural discoveries
        </p>
      </div>

      {/* Quick Capture */}
      <div className="p-4">
        <Card className="bg-gradient-to-r from-saffron to-gold text-white">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Quick Capture</h2>
            <div className="flex space-x-4 mb-4">
              <Button
                size="lg"
                onClick={handlePhotoCapture}
                className="flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                <Camera className="w-5 h-5 mr-2" />
                Photo
              </Button>
              <Button
                size="lg"
                onClick={toggleRecording}
                className={`flex-1 ${
                  isRecording
                    ? 'bg-red-500 hover:bg-red-600 animate-pulse-glow'
                    : 'bg-white/20 hover:bg-white/30'
                } text-white border-white/30`}
              >
                {isRecording ? (
                  <>
                    <StopCircle className="w-5 h-5 mr-2" />
                    Stop Recording
                  </>
                ) : (
                  <>
                    <Mic className="w-5 h-5 mr-2" />
                    Voice Note
                  </>
                )}
              </Button>
            </div>
            
            {/* Preview captured content - Fixed positioning */}
            {(capturedPhoto || audioBlob) && (
              <div className="mt-4 p-4 bg-white/10 rounded-lg border border-white/20">
                <p className="text-sm font-medium mb-3 text-white">Recent Capture:</p>
                <div className="flex flex-col space-y-3">
                  {capturedPhoto && (
                    <div className="flex items-center space-x-3">
                      <img 
                        src={capturedPhoto} 
                        alt="Captured" 
                        className="w-16 h-16 object-cover rounded-lg border-2 border-white/30"
                      />
                      <span className="text-sm text-white/90">Photo captured</span>
                    </div>
                  )}
                  {audioBlob && (
                    <div className="flex items-center space-x-3">
                      <Button
                        size="sm"
                        onClick={playRecording}
                        className="bg-white/20 hover:bg-white/30 text-white border border-white/30"
                      >
                        <Play className="w-4 h-4 mr-1" />
                        Play Recording
                      </Button>
                      <span className="text-sm text-white/90">Voice note ready</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Journal Entries */}
      <div className="px-4 pb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Recent Entries</h2>
          <Button variant="ghost" size="sm" className="text-saffron">
            Export All
          </Button>
        </div>
        
        <div className="space-y-4">
          {journalEntries.map((entry) => (
            <Card key={entry.id} className="overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="relative">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div className="flex items-center text-white">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < entry.rating ? 'text-yellow-400 fill-current' : 'text-white/50'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              
              <CardContent className="p-4">
                <div className="mb-3">
                  <h3 className="font-serif font-semibold text-gray-900 text-lg mb-1">
                    {entry.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <span>{entry.location}</span>
                    <span className="mx-2">•</span>
                    <span>{entry.date}</span>
                  </div>
                </div>
                
                {/* Audio Caption */}
                <div className="bg-gray-50 rounded-lg p-3 mb-3">
                  <div className="flex items-center mb-2">
                    <div className="w-6 h-6 bg-saffron rounded-full flex items-center justify-center mr-2">
                      <span className="text-white text-xs">🎤</span>
                    </div>
                    <span className="text-sm font-medium text-gray-700">Voice Caption</span>
                  </div>
                  <p className="text-sm text-gray-600 italic">
                    "{entry.audioCaption}"
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0 h-auto text-saffron">
                    Play Recording →
                  </Button>
                </div>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {entry.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="px-4 pb-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Share Your Journey</h3>
            <p className="text-sm text-gray-600 mb-3">
              Transform your journal into a beautiful story to share with others
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline">
                Create Podcast
              </Button>
              <Button size="sm" variant="outline">
                Digital Postcard
              </Button>
              <Button size="sm" className="gradient-saffron text-white">
                Share Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default JournalScreen;
