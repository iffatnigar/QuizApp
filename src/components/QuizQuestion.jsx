import React, { useState, useEffect, useCallback } from "react";
import { fetchQuizData } from "../api";
import { useNavigate } from "react-router-dom";
import { FaClock } from "react-icons/fa";
import correctSound from "../assets/correct.mp3";
import wrongSound from "../assets/wrong.mp3";
import "../styles/QuizQuestion.css";

const QuizQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timer, setTimer] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    async function getData() {
      const data = await fetchQuizData();
      if (data.length > 0) {
        setQuestions(data);
      } else {
        console.error("No questions available");
      }
    }
    getData();
  }, []);

  const nextQuestion = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTimer(30);
    } else {
      saveToLeaderboard(score);
      navigate("/summary", { state: { score, total: questions.length * 10 } });
    }
  }, [currentIndex, questions.length, score, navigate]);

  useEffect(() => {
    if (timer === 0) {
      nextQuestion();
    }
    const countdown = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, [timer, nextQuestion]);

  const playSound = (sound) => {
    const audio = new Audio(sound);
    audio.play();
  };

  const handleAnswer = (answer, correctAnswer) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setScore((prevScore) => prevScore + 10);
      playSound(correctSound);
    } else {
      playSound(wrongSound);
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      nextQuestion();
    }, 800);
  };

  const saveToLeaderboard = (finalScore) => {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    leaderboard.push({ score: finalScore, date: new Date().toLocaleString() });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  };

  if (!questions.length) return <h2>🔄 Loading questions...</h2>;

  return (
    <div className="quiz-container">
      <h3>
        Question {currentIndex + 1} / {questions.length}
      </h3>

      <h2>{questions[currentIndex]?.question || "No question available"}</h2>

      {questions[currentIndex]?.photo_url && (
        <img
          src={questions[currentIndex].photo_url}
          alt="Quiz Question"
          className="quiz-image"
        />
      )}

      <p className="timer">
        <FaClock /> {timer}s
      </p>

      {questions[currentIndex]?.options?.length > 0 ? (
        questions[currentIndex].options.map((option, idx) => (
          <button
            key={idx}
            className={`option-btn ${
              selectedAnswer === option
                ? option === questions[currentIndex].answer
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            onClick={() => handleAnswer(option, questions[currentIndex].answer)}
          >
            {option}
          </button>
        ))
      ) : (
        <p>No options available</p>
      )}

      <button className="skip-btn" onClick={nextQuestion}>
        ⏭ Skip
      </button>
    </div>
  );
};

export default QuizQuestion;
