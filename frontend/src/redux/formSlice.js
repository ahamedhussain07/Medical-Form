import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  user_details: {
    name: "",
    gender: "",
    mobile_number: "",
    email: "",
    age: "",
    blood_group: "",
    height: "",
    weight: "",
  },
  questions_and_answers: [],
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateUserDetails(state, action) {
      state.user_details = { ...state.user_details, ...action.payload };
    },
    updateAnswer(state, action) {
      const { question_id, answer, other_answer } = action.payload;
      const questionIndex = state.questions_and_answers.findIndex(
        (q) => q.question_id === question_id
      );

      if (questionIndex >= 0) {
        state.questions_and_answers[questionIndex] = {
          ...state.questions_and_answers[questionIndex],
          answer,
          other_answer,
        };
      } else {
        state.questions_and_answers.push({ question_id, answer, other_answer });
      }
    },

    nextPage(state) {
      state.currentPage += 1;
    },
    skipNextQuestion(state) {
      state.currentPage += 2;
    },
    previousPage(state) {
      state.currentPage -= 1;
    },
    getQuestionsSuccess(state, action) {
      state.status = "succeeded";
      state.questions_and_answers = action.payload.map((question) => ({
        question_id: question.question_id,
        question_text: question.question_text,
        answer: "",
        has_other_options: question.has_other_options,
        triggers_next_question: question.triggers_next_question,
        next_question_id: question.next_question_id,
      }));
    },
    getQuestionsFailure(state, action) {
      state.status = "failed";
      state.error = action.payload;
    },
    showQuestion(state, action) {
      const nextQuestionId = action.payload;
      const questionIndex = state.questions_and_answers.findIndex(
        (q) => q.question_id === nextQuestionId
      );

      if (questionIndex >= 0) {
        state.currentPage = questionIndex + 1;
      }
    },
    clearData: () => {
      return initialState;
    },
  },
});

export const {
  updateUserDetails,
  showQuestion,
  skipNextQuestion,
  updateAnswer,
  nextPage,
  previousPage,
  getQuestionsFailure,
  getQuestionsSuccess,
  clearData,
} = formSlice.actions;

export default formSlice.reducer;
