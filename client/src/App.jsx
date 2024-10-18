import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Watch from "./pages/Watch";
import { AnimeProvider } from "./contexts/AnimeContext";
import VideoPlayer from "./components/watch/VideoPlayer";
import Category from "./pages/Category";
import Genre from "./pages/Genre";
import Search from "./pages/Search";
import { UtilityProvider } from "./contexts/UtilityContext";

function App() {
  return (
    <>
      <UtilityProvider>
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
                <Route path="search" element={<Search />} />
              </Route>
            </Routes>
          </Router>
        </AnimeProvider>
      </UtilityProvider>
    </>
  );
}

export default App;
