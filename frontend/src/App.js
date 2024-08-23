import { useEffect } from "react";
import { useDispatch } from "react-redux";

import "./App.css";
import MultiStepForm from "./components/MultiStepForm";
import { fetchQuestions } from "./api/questionAPI";
import { getQuestionsSuccess, getQuestionsFailure } from "./redux/formSlice";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetchQuestions();
        dispatch(getQuestionsSuccess(response.data));
      } catch (error) {
        dispatch(getQuestionsFailure(error.message));
      }
    };

    loadQuestions();
  }, [dispatch]);
  return (
    <div className="container">
      <h1 className="text-light mb-3">Medical Form</h1>
      <div className="form-box">
        <MultiStepForm />
      </div>
    </div>
  );
};

export default App;
