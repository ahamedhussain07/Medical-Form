import { useSelector, useDispatch } from "react-redux";
import { nextPage, previousPage } from "../redux/formSlice";
import UserForm from "./UserForm";
import QuestionForm from "./QuestionForm";

const MultiStepForm = () => {
  const dispatch = useDispatch();
  const { currentPage, questions_and_answers } = useSelector(
    (state) => state.form
  );

  const handleNext = () => {
    dispatch(nextPage());
  };

  const handlePrevious = () => {
    dispatch(previousPage());
  };

  const renderPage = () => {
    if (currentPage === 1) {
      return <UserForm onNext={handleNext} />;
    } else {
      return (
        <QuestionForm
          question={questions_and_answers[currentPage - 2]}
          onNext={handleNext}
          onPrevious={handlePrevious}
          currentPage={currentPage}
          isLastPage={currentPage === questions_and_answers.length + 1}
        />
      );
    }
  };

  return <div>{renderPage()}</div>;
};

export default MultiStepForm;
