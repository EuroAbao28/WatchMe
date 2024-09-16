import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Watch from "./pages/Watch";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="watch/:id" element={<Watch />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
