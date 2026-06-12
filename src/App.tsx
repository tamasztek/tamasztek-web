import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePageRenewd from "./pages/HomePageRenewd";
import DonatePage from "./pages/DonatePage";
import DonationConfirmationPage from "./pages/DonationConfirmationPage";
import NotFoundPage from "./pages/NotFoundPage";
import ProjectsPage from "./pages/ProjectsPage";
import GalleryPage from "./pages/GalleryPage";
import AlbumDetailPage from "./pages/AlbumDetailPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import DonationModalProvider from "./components/ui/DonationModalProvider";

const devInProgress = import.meta.env.VITE_DEV_IN_PROGRESS === "true";

function App() {
  if (devInProgress) return <ComingSoonPage />;
  return (
    <BrowserRouter>
      <DonationModalProvider>
        <Routes>
          <Route path="/" element={<HomePageRenewd />} />
          <Route path="/adomanyozas" element={<DonatePage />} />
          <Route
            path="/adomanyozas/visszajelzes"
            element={<DonationConfirmationPage />}
          />
          <Route path="/projektek" element={<ProjectsPage />} />
          <Route path="/galeria" element={<GalleryPage />} />
          <Route path="/galeria/:publicId" element={<AlbumDetailPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </DonationModalProvider>
    </BrowserRouter>
  );
}

export default App;
