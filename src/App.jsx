import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotographerList from "./pages/PhotographerList.jsx";
import PhotographerProfile from "./pages/PhotographerProfile.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PhotographerList />} />
        <Route path="/photographer/:id" element={<PhotographerProfile />} />
      </Routes>
    </Router>
  );
}

export default App;