import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";
import Layout from "./components/layout/Layout";

const devInProgress = import.meta.env.VITE_DEV_IN_PROGRESS === "true";

function App() {
  if (devInProgress) return <ComingSoonPage />;
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

export default App;
