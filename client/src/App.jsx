import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Watch from "./pages/Watch";
import { AnimeProvider } from "./contexts/AnimeContext";
import VideoPlayer from "./components/watch/VideoPlayer";
import Category from "./pages/Category";
import Genre from "./pages/Genre";

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
              <Route path=":category" element={<Category />} />
              <Route path="genre/:genre" element={<Genre />} />
            </Route>
          </Routes>
        </Router>
      </AnimeProvider>
    </>
  );
}

export default App;
