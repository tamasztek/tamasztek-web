import HomePage from "./pages/HomePage";
import ComingSoonPage from "./pages/ComingSoonPage";

const devInProgress = import.meta.env.VITE_DEV_IN_PROGRESS === "true";

function App() {
  return devInProgress ? <ComingSoonPage /> : <HomePage />;
}

export default App;
