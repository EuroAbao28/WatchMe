import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Watch from "./pages/Watch";
import { AnimeProvider } from "./contexts/AnimeContext";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <>
      <AnimeProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="watch/:id" element={<Watch />}>
                <Route path=":ep" element={<VideoPlayer />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </AnimeProvider>
    </>
  );
}

export default App;
