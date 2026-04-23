import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ComingSoonPage from "./pages/ComingSoonPage";
import Layout from "./components/layout/Layout";

const devInProgress = import.meta.env.VITE_DEV_IN_PROGRESS === "true";

function App() {
  if (devInProgress) return <ComingSoonPage />;
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projektek" element={<ProjectsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
