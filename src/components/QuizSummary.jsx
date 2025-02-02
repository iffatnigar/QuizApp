import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/QuizSummary.css";

const Summary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total } = location.state || { score: 0, total: 0 };

  return (
    <div className="summary-container">
      <h2>🎉 Quiz Completed!</h2>
      <p className="score-display">
        Your Score: {score} / {total}
      </p>
      <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Home
      </button>
      <button
        className="leaderboard-btn"
        onClick={() => navigate("/leaderboard")}
      >
        🏆 View Leaderboard
      </button>
    </div>
  );
};

export default Summary;
