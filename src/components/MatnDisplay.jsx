import { useRef, useEffect } from "react";

export default function MatnDisplay({ syncData, activeLineId, repeatStartId, repeatEndId, onLineClick }) {
  const lineRefs = useRef({});
  
  useEffect(() => {
    if (activeLineId) {
      const activeLine = lineRefs.current[activeLineId];
      if (activeLine) {
        activeLine.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, [activeLineId]);

  return (
    <div className="space-y-2">
      {syncData.map(line => {
        const isActive = line.id === activeLineId;
        const inRepeat = repeatStartId && repeatEndId && line.id >= repeatStartId && line.id <= repeatEndId;
        return (
          <p
            key={line.id}
            ref={(el) => (lineRefs.current[line.id] = el)}
            onClick={() => onLineClick?.(line)}
            className={`cursor-pointer font-amiri text-2xl p-3 rounded-lg transition-all duration-300 
              ${isActive ? "bg-indigo-200 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-100 font-bold scale-[1.05] shadow-md" : ""}
              ${inRepeat && !isActive ? "bg-indigo-50 dark:bg-indigo-950" : ""}
              ${!isActive && !inRepeat ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" : ""}
            `}
          >
            {line.text}
          </p>
        );
      })}
    </div>
  );
}
