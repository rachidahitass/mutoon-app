import { useState, useRef, useEffect } from "react";

export default function useMatnPlayer(audioSrc, syncData) {
  const audioRef = useRef(null);
  const rafRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeLineId, setActiveLineId] = useState(null);
  const [playbackRate, setPlaybackRate] = useState(1);

  // repeat markers
  const [repeatStartId, setRepeatStartId] = useState(null);
  const [repeatEndId, setRepeatEndId] = useState(null);

  const repeatStartRef = useRef(repeatStartId);
  useEffect(() => { repeatStartRef.current = repeatStartId }, [repeatStartId]);

  // Load audio
  useEffect(() => {
    if (!audioSrc) return;
    const aud = new Audio(audioSrc);
    aud.preload = "auto";
    audioRef.current = aud;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onSeeked = () => setCurrentTime(aud.currentTime);
    const onLoaded = () => setDuration(aud.duration || 0);

    aud.addEventListener("play", onPlay);
    aud.addEventListener("pause", onPause);
    aud.addEventListener("seeked", onSeeked);
    aud.addEventListener("loadedmetadata", onLoaded);

    return () => {
      aud.pause();
      aud.removeEventListener("play", onPlay);
      aud.removeEventListener("pause", onPause);
      aud.removeEventListener("seeked", onSeeked);
      aud.removeEventListener("loadedmetadata", onLoaded);
      audioRef.current = null;
    };
  }, [audioSrc]);

  // Update playback rate
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Sync loop - only runs when playing for better performance
  useEffect(() => {
    if (!isPlaying) {
      // Cancel RAF when paused to save battery
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      return;
    }

    const syncLoop = () => {
      const aud = audioRef.current;
      if (!aud) return;
      const t = aud.currentTime;
      setCurrentTime(t);

      // active line
      const active = syncData.find(line => t >= line.start_time && t <= line.end_time);
      if (active) setActiveLineId(active.id);

      // repeat A-B
      if (repeatStartId && repeatEndId) {
        const startLine = syncData.find(l => l.id === repeatStartId);
        const endLine = syncData.find(l => l.id === repeatEndId);
        if (startLine && endLine && t >= endLine.end_time - 0.05) {
          aud.currentTime = startLine.start_time;
        }
      }

      rafRef.current = requestAnimationFrame(syncLoop);
    };
    
    rafRef.current = requestAnimationFrame(syncLoop);
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [syncData, repeatStartId, repeatEndId, isPlaying]);

  // Play / Pause / Seek
  const play = async () => {
    if (!audioRef.current) return;
    try { 
      await audioRef.current.play();
    } catch (e) { 
      console.warn("Playback error", e);
    }
  };
  
  const pause = () => audioRef.current?.pause();
  
  const seek = t => { 
    if (audioRef.current) { 
      audioRef.current.currentTime = t; 
      setCurrentTime(t); 
    } 
  };
  
  const skip = (sec) => {
    if (!audioRef.current) return;
    const newTime = Math.min(Math.max(audioRef.current.currentTime + sec, 0), duration);
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Repeat helpers
  const setRepeatStart = lineId => {
    if (lineId == null) { 
      setRepeatStartId(null); 
      return; 
    }
    setRepeatStartId(lineId);
    setRepeatEndId(prev => (prev != null && lineId >= prev ? null : prev));
  };
  
  const setRepeatEnd = lineId => {
    if (!repeatStartRef.current) return;
    if (lineId <= repeatStartRef.current) return;
    setRepeatEndId(lineId);
  };
  
  const clearRepeat = () => { 
    setRepeatStartId(null); 
    setRepeatEndId(null); 
  };

  return {
    isPlaying, currentTime, duration, activeLineId,
    repeatStartId, repeatEndId,
    play, pause, seek, skip,
    setRepeatStart, setRepeatEnd, clearRepeat,
    playbackRate, setPlaybackRate
  };
}