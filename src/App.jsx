import { BrowserRouter, Routes, Route } from "react-router-dom";
import LibraryPage from "./pages/LibraryPage";
import PlayerPage from "./pages/PlayerPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LibraryPage />} />
        <Route path="/matn/:id" element={<PlayerPage />} />
      </Routes>
    </BrowserRouter>
  );
}
