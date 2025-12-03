export function loadProgress(matnId) {  
  try {
    const raw = localStorage.getItem(`progress:${matnId}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveProgress(matnId, data) {    
  try {
    localStorage.setItem(`progress:${matnId}`, JSON.stringify(data));
  } catch {
    console.warn("Failed to save progress");
  }
}