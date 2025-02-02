import React from "react";
import { useNavigate } from "react-router-dom";
import { FaTrophy, FaTrash } from "react-icons/fa";
import "../styles/Leaderboard.css";

const Leaderboard = () => {
  const navigate = useNavigate();
  const leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];

  const deleteEntry = (index) => {
    let updatedLeaderboard = [...leaderboard];
    updatedLeaderboard.splice(index, 1);
    localStorage.setItem("leaderboard", JSON.stringify(updatedLeaderboard));
    window.location.reload();
  };

  return (
    <div className="leaderboard-container">
      <h2>🏆 Leaderboard</h2>
      {leaderboard.length > 0 ? (
        <ul className="leaderboard-list">
          {leaderboard.map((entry, index) => (
            <li key={index} className="leaderboard-item">
              <FaTrophy className="trophy-icon" /> <strong>Score:</strong>{" "}
              {entry.score} | <span>{entry.date}</span>
              <FaTrash
                className="delete-icon"
                onClick={() => deleteEntry(index)}
              />
            </li>
          ))}
        </ul>
      ) : (
        <p>No scores yet. Play a game!</p>
      )}
      <button className="home-btn" onClick={() => navigate("/")}>
        🏠 Home
      </button>
    </div>
  );
};

export default Leaderboard;
