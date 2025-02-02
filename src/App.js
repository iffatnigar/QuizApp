import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QuizStart from "./components/QuizStart";
import QuizQuestion from "./components/QuizQuestion";
import QuizSummary from "./components/QuizSummary";
import Leaderboard from "./components/Leaderboard";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizStart />} />
        <Route path="/quiz" element={<QuizQuestion />} />
        <Route path="/summary" element={<QuizSummary />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  );
}

export default App;
