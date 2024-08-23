import axios from "axios";

const BASE_URL = "http://localhost:5000/api";

export const fetchQuestions = async () => {
  const response = await axios.get(`${BASE_URL}/get_questions`); 
  return response.data;
};

export const submitFormData = async (formData) => {
  const response = await axios.post(`${BASE_URL}/submit_response`, formData); 
  return response.data;
};
