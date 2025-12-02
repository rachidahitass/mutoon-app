import { useState, useEffect } from "react";
import { Play, Pause, Flag, RotateCcw, RotateCw } from "lucide-react";

export default function PlayerControls({ player }) {
  if (!player) return null;
  
  const { isPlaying, play, pause, currentTime, duration, seek, skip,
          repeatStartId, repeatEndId, setRepeatStart, setRepeatEnd, clearRepeat,
          activeLineId, playbackRate, setPlaybackRate } = player;

  const toggleSpeed = () => {
    const speeds = [0.75, 1, 1.25, 1.5]; // More intuitive order
    const idx = speeds.indexOf(playbackRate);
    const next = speeds[(idx + 1) % speeds.length];
    setPlaybackRate(next);
  };

  const [localTime, setLocalTime] = useState(0);
  useEffect(() => { setLocalTime(currentTime) }, [currentTime]);

  const fmt = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow space-y-4">
      {/* Repeat + Play */}
      <div className="flex justify-center gap-4 items-center">
        {/* Speed */}
        <button 
          onClick={toggleSpeed} 
          className="text-xs font-bold px-3 py-2 bg-gray-200 dark:bg-gray-700 dark:text-gray-100 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          aria-label={`سرعة التشغيل: ${playbackRate}x`}
        >
          {playbackRate}x
        </button>

        <button 
          onClick={() => setRepeatStart(activeLineId)}
          className={`p-2 rounded transition ${repeatStartId ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"}`}
          aria-label="تحديد بداية التكرار"
        >
          <Flag size={18} />
        </button>
        
        <button 
          onClick={() => skip(-5)} 
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label="الرجوع 5 ثوان"
        >
          <RotateCcw size={20} />
        </button>

        <button 
          onClick={isPlaying ? pause : play}
          className="p-3 rounded-full bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg transition transform hover:scale-105"
          aria-label={isPlaying ? "إيقاف مؤقت" : "تشغيل"}
        >
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>

        <button 
          onClick={() => skip(5)} 
          className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition"
          aria-label="التقدم 5 ثوان"
        >
          <RotateCw size={20} />
        </button>

        <button 
          onClick={() => setRepeatEnd(activeLineId)}
          className={`p-2 rounded transition ${repeatEndId ? "bg-red-600 text-white hover:bg-red-700" : "bg-gray-300 dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-400 dark:hover:bg-gray-600"}`}
          aria-label="تحديد نهاية التكرار"
        >
          <Flag size={18} />
        </button>
      </div>

      {/* Reset Repeat */}
      {(repeatStartId || repeatEndId) &&
        <div className="flex justify-center">
          <button 
            onClick={clearRepeat} 
            className="px-4 py-1 bg-gray-500 dark:bg-gray-600 text-white rounded text-sm hover:bg-gray-600 dark:hover:bg-gray-500 transition"
          >
            إلغاء التكرار
          </button>
        </div>
      }

      {/* Seek Bar */}
      <div>
        <input 
          type="range" 
          min={0} 
          max={duration || 0} 
          value={localTime}
          onChange={e => { const t = Number(e.target.value); setLocalTime(t); seek(t); }}
          className="w-full accent-indigo-600 cursor-pointer"
          aria-label="شريط التقدم"
        />
      </div>

      {/* Time Display */}
      <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
        <span>{fmt(localTime)}</span>
        <span>{duration ? fmt(duration) : "0:00"}</span>
      </div>

      {/* Repeat Range Display */}
      {(repeatStartId || repeatEndId) &&
        <div className="text-center text-xs text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950 rounded p-2">
          {repeatStartId && `البداية: ${repeatStartId}`}
          {repeatEndId && ` ← النهاية: ${repeatEndId}`}
        </div>
      }
    </div>
  );
}
