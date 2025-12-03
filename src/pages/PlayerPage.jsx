import { useParams, Link } from "react-router-dom";
import mutoons from "../data/mutoons.json";
import useMatnPlayer from "../hooks/useMatnPlayer.jsx";
import MatnDisplay from "../components/MatnDisplay.jsx";
import PlayerControls from "../components/PlayerControls.jsx";
import { useEffect, useState } from "react";
import { ArrowLeftCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle.jsx";


export default function PlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const matn = mutoons.find(m => m.id === id);

  const [sync, setSync] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Handle invalid matn ID
  if (!matn) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold mb-4 text-gray-800 dark:text-gray-100">المتن غير موجود</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">عذراً، لم نتمكن من العثور على المتن المطلوب</p>
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            <ArrowLeftCircle size={20} />
            العودة للمكتبة
          </Link>
        </div>
      </div>
    );
  }

  // Load JSON sync file with cleanup
  useEffect(() => {
    const abortController = new AbortController();
    setLoading(true);
    setError(null);

    fetch(matn.sync, { signal: abortController.signal })
      .then(res => {
        if (!res.ok) throw new Error('فشل تحميل ملف المزامنة');
        return res.json();
      })
      .then(data => {
        setSync(data);
        setLoading(false);
      })
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error("Failed to load sync file:", err);
          setError(err.message);
          setLoading(false);
        }
      });

    return () => abortController.abort();
  }, [matn]);

  const player = useMatnPlayer(matn.id, matn.audio, sync);
useEffect(() => {
  if (!sync.length) return;

  const saved = localStorage.getItem(`progress:${matn.id}`);
  if (!saved) return;

  try {
    const obj = JSON.parse(saved);

    if (obj.time !== undefined) {
      player.seek(obj.time);
    }

    if (obj.speed !== undefined) {
      player.setPlaybackRate(obj.speed);
    }
  } catch (err) {
    console.error("Failed to restore progress", err);
  }
}, [sync]);


  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">جاري التحميل...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">حدث خطأ</h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            إعادة المحاولة
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Bar */}
      <div className="p-4 bg-white dark:bg-gray-800 shadow-sm z-10">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400 transition"
          >
            <ArrowLeftCircle size={24} />
            <span className="hidden sm:inline">المكتبة</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-100">{matn.title}</h1>
          </div>

          <ThemeToggle />
        </div>
      </div>

      {/* Main Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-4 pb-40">
        <div className="max-w-3xl mx-auto">
          <MatnDisplay
            syncData={sync}
            activeLineId={player.activeLineId}
            repeatStartId={player.repeatStartId}
            repeatEndId={player.repeatEndId}
            onLineClick={(line) => player.seek(line.start_time)}
          />
        </div>
      </div>

      {/* Sticky Player Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t dark:border-gray-700 p-4 shadow-lg z-20">
        <div className="max-w-3xl mx-auto">
          <PlayerControls player={player} />
        </div>
      </div>
    </div>
  );
}