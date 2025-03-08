// src/components/QuizApp.tsx
import React from 'react';
import { useQuiz } from '../hooks/useQuiz';

const QuizApp: React.FC = () => {
  const {
    currentQuestion,
    userAnswers,
    quizCompleted,
    showAnswer,
    isLastQuestion,
    answerQuestion,
    goToNextQuestion,
    restartQuiz,
    stats
  } = useQuiz();

  // Render quiz results screen
  if (quizCompleted) {
    return (
      <div className="quiz-app">
        <h1>Quiz Results</h1>
        <div className="results">
          <h2>Your Score: {stats.score}%</h2>
          <p>You answered {stats.correctAnswers} out of {stats.totalQuestions} questions correctly.</p>
          
          <div className="stats">
            <div className="stat-item">
              <span className="stat-label">Total Questions:</span>
              <span className="stat-value">{stats.totalQuestions}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Correct Answers:</span>
              <span className="stat-value">{stats.correctAnswers}</span>
            </div>
          </div>
          
          <button type="button" onClick={restartQuiz} className="restart-btn">
            Restart Quiz
          </button>
        </div>
      </div>
    );
  }

  // Render question screen
  return (
    <div className="quiz-app">
      <h1>Quiz App</h1>
      
      <div className="progress">
        Question {currentQuestion.id} of {stats.totalQuestions}
      </div>
      
      <div className="question-card">
        <h2>{currentQuestion.question}</h2>
        
        <div className="options">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              type="button"
              onClick={() => answerQuestion(index)}
              disabled={showAnswer}
              className={`option-btn ${
                showAnswer
                  ? index === currentQuestion.correctAnswer
                    ? 'correct'
                    : index === userAnswers[currentQuestion.id - 1]
                    ? 'incorrect'
                    : ''
                  : ''
              }`}
            >
              {option}
            </button>
          ))}
        </div>
        
        {showAnswer && (
          <div className="feedback">
            {userAnswers[currentQuestion.id - 1] === currentQuestion.correctAnswer ? (
              <p className="correct-feedback">Correct!</p>
            ) : (
              <p className="incorrect-feedback">
                Incorrect. The correct answer is: {currentQuestion.options[currentQuestion.correctAnswer]}
              </p>
            )}
            
            <button type="button" onClick={goToNextQuestion} className="next-btn">
              {isLastQuestion ? 'Finish Quiz' : 'Next Question'}
            </button>
          </div>
        )}
      </div>
      
      <div className="score-display">
        Current Score: {stats.score}%
      </div>
    </div>
  );
};

export default QuizApp;