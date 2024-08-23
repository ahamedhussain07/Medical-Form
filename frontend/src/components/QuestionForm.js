import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { submitFormData } from "../api/questionAPI";
import { updateAnswer, skipNextQuestion, nextPage } from "../redux/formSlice";
import CustomRadio from "./CustomRadio";

const QuestionForm = ({ question, onPrevious, isLastPage }) => {
  const dispatch = useDispatch();
  const { questions_and_answers, user_details } = useSelector(
    (state) => state.form
  );

  const currentQuestion = questions_and_answers.find(
    (q) => q.question_id === question.question_id
  );

  const [answer, setAnswer] = useState(
    currentQuestion ? currentQuestion.answer : ""
  );
  const [otherAnswer, setOtherAnswer] = useState(
    currentQuestion ? currentQuestion.other_answer : ""
  );

  useEffect(() => {
    if (currentQuestion) {
      setAnswer(currentQuestion.answer);
      setOtherAnswer(currentQuestion.other_answer || "");
    }
  }, [currentQuestion]);

  const handleChange = (e) => {
    const selectedAnswer = e.target.value;
    setAnswer(selectedAnswer);
    if (selectedAnswer !== "other") {
      setOtherAnswer("");
    }
  };

  const handleOtherChange = (e) => {
    setOtherAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      updateAnswer({
        question_id: question.question_id,
        answer,
        other_answer: question.has_other_options ? otherAnswer : null,
      })
    );

    if (isLastPage) {
      return submitForm();
    }

    if (question.triggers_next_question) {
      const shouldShowNextQuestion = question.triggers_next_question === answer;
      if (shouldShowNextQuestion) {
        dispatch(nextPage());
      } else {
        dispatch(skipNextQuestion());
      }
    } else {
      dispatch(nextPage());
    }
  };

  const submitForm = async () => {
    const data = {
      ...user_details,
      questions: questions_and_answers,
    };
    try {
      await submitFormData(data);

      alert("Form Submitted");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="fs-5 text-light fw-semibold mb-1">
        {question.question_text}
      </div>
      <div className="ms-1">
        <CustomRadio
          value="yes"
          checked={answer === "yes"}
          onChange={handleChange}
          label={"Yes"}
        />

        <CustomRadio
          value="no"
          checked={answer === "no"}
          onChange={handleChange}
          label={"No"}
        />

        {question.has_other_options === 1 && (
          <>
            <CustomRadio
              value="other"
              checked={answer === "other"}
              onChange={handleChange}
              label={"Other"}
            />

            {answer === "other" && (
              <input
                className="form-control my-2"
                type="text"
                name="other_answer"
                placeholder="Please specify"
                value={otherAnswer}
                required
                onChange={handleOtherChange}
              />
            )}
          </>
        )}
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button
          type="button"
          onClick={onPrevious}
          className="btn btn-warning btn-sm"
        >
          Previous
        </button>
        <button className="btn btn-primary btn-sm" type="submit">
          {isLastPage ? "Submit" : "Next"}
        </button>
      </div>
    </form>
  );
};

export default QuestionForm;
