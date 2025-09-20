import { useEffect, useState } from "react";
import "../CSSpages/Quiz.css"

type Question = {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
};

const Quiz = () => {
  const API_KEY = "https://opentdb.com/api.php?amount=10";
  const [start, setStart] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [timeleft, setTimeLeft] = useState<number>(15);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<
    { question: string; correct: string; selected: string | null }[]
  >([]);

  const handleStart = async () => {
    setStart(true);
    setcurrentQuestionIndex(0);
    setQuestions([]);
    setSelectedAnswer(null);
    setTimeLeft(15);
    setScore(0);
    setAnswers([]);
    try {
      const res = await fetch(API_KEY);
      if (!res.ok) throw new Error(`HTTP error status: ${res.status}`);
      const data = await res.json();
      setQuestions(data.results);
    } catch (err) {
      console.error("failed to fetch questions:", err);
    }
  };

  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setcurrentQuestionIndex(nextIndex);
      setSelectedAnswer(null);
      setTimeLeft(15);
    } else {
      setStart(false);
      setcurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setTimeLeft(15);
    }
  };

  useEffect(() => {
    if (selectedAnswer !== null) return;

    if (!start || questions.length === 0) return;

    if (timeleft === 0) {
      handleNextQuestion();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [start, questions, timeleft, selectedAnswer]);

  let currentQuestion = questions[currentQuestionIndex];
  let options = currentQuestion
    ? [...currentQuestion.incorrect_answers, currentQuestion.correct_answer]
    : [];

  return (
    <div className="quiz-container">
        <h1>Quiz App</h1>
      {!start && answers.length === 0 ? (
        <button onClick={handleStart} className="start-button">
          Start Quiz
        </button>
      ) : !start && answers.length > 0 ? (
        <div className="quiz-summary">
          <h2>Quiz Finished!</h2>
          <p>
            Score: {score} / {questions.length}
          </p>
          <p>Correct Answers: {score}</p>
          <p>Incorrect Answers: {questions.length - score}</p>

          <h3>Review</h3>
          <div className="review-list">
            {answers.map((ans, index) => (
              <div key={index} className="review-item">
                <p>
                  Your Answer:{" "}
                  <span
                    className={
                      ans.selected === ans.correct
                        ? "answer-correct"
                        : "answer-wrong"
                    }
                  >
                    {ans.selected}
                  </span>
                </p>
                {ans.selected !== ans.correct && (
                  <p>
                    Correct Answer:{" "}
                    <span className="answer-correct">{ans.correct}</span>
                  </p>
                )}
              </div>
            ))}
          </div>
          <button onClick={handleStart} className="restart-button">
            Restart Quiz
          </button>
        </div>
      ) : questions.length === 0 ? (
        <p className="loading-text">Loading questions....</p>
      ) : currentQuestion ? (
        <div className="quiz-question-wrapper">
          <div className="progress-bar-bg">
            <div
              className="progress-bar-fill"
              style={{
                width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="question-count">
            Question {currentQuestionIndex + 1} of {questions.length}
          </p>
          <p className="question-text">{currentQuestion.question}</p>
          <p className="time-left">Time left: {timeleft} seconds</p>
          <div className="options-wrapper">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => {
                  setSelectedAnswer(option);

                  if (option === currentQuestion.correct_answer) {
                    setScore((prev) => prev + 1);
                  }

                  setAnswers((prev) => [
                    ...prev,
                    {
                      question: currentQuestion.question,
                      correct: currentQuestion.correct_answer,
                      selected: option,
                    },
                  ]);
                }}
                disabled={!!selectedAnswer}
                className={`option-button ${
                  selectedAnswer === option ? "selected" : ""
                }`}
              >
                {option}
              </button>
            ))}
          </div>
          {selectedAnswer && (
            <div className="next-button-wrapper">
              <button onClick={() => handleNextQuestion()} className="next-button">
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No questions</p>
      )}
    </div>
  );
};
export default Quiz;
