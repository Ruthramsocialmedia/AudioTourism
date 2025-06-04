
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  url: string;
  coverImage: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  playTrack: (track: AudioTrack) => void;
  pauseTrack: () => void;
  resumeTrack: () => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setDuration(track.duration);
    setCurrentTime(0);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    setIsPlaying(true);
  };

  return (
    <AudioContext.Provider value={{
      currentTrack,
      isPlaying,
      currentTime,
      duration,
      volume,
      playTrack,
      pauseTrack,
      resumeTrack,
      setCurrentTime,
      setVolume,
    }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};