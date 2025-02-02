import React from "react";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import "../styles/QuizStart.css";

const QuizStart = () => {
  const navigate = useNavigate();

  return (
    <div className="quiz-start">
      <div className="quiz-container">
        <h1>🎯 Welcome to the Ultimate Quiz!</h1>
        <p>Test your knowledge and earn your place on the leaderboard!</p>
        <button className="start-btn" onClick={() => navigate("/quiz")}>
          <FaPlay /> Start Quiz
        </button>
      </div>
    </div>
  );
};

export default QuizStart;
