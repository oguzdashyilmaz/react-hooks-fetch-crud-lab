import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then(r => r.json())
      .then(questions => {
        setQuestions(questions);
      });
  }, [])

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, { method: "DELETE" })
      .then(r => r.json())
      .then(() => {
        const updatedQuestions = questions.filter(q => q.id !== id);
        setQuestions(updatedQuestions)
      });

    function handleAnswerChange(id, correctIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ correctIndex }),
      })
        .then(r => r.json())
        .thn(updatedQuestions => {
          const updatedQuestions = questions.map(question => {
            if (question.id === updatedQuestions.id) return updatedQuestions;
            return question;
          });
          setQuestions(updateQuestions);
        });
    }

    const questionItems = questions.map(question => {
      <QuestionItem key={question.id} question={question}
        onDeleteClick={handleDeleteClick} onAnswerChange={handleAnswerChange} />
    });

    return (
      <section>
        <h1>Quiz Questions</h1>
        <ul>{questionItems}</ul>
      </section>
    );
  }
}

export default QuestionList;