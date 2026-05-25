import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageRenewd from "./pages/HomePageRenewd";
import ProjectsPage from "./pages/ProjectsPage";
import GalleryPage from "./pages/GalleryPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import ComingSoonPage from "./pages/ComingSoonPage";

const devInProgress = import.meta.env.VITE_DEV_IN_PROGRESS === "true";

function App() {
  if (devInProgress) return <ComingSoonPage />;
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePageRenewd />} />
        <Route path="/projektek" element={<ProjectsPage />} />
        <Route path="/galeria" element={<GalleryPage />} />
        <Route path="/galeria/:publicId" element={<AlbumDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
