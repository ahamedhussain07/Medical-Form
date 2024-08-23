import express from "express";
import cors from 'cors';
import bodyParser from "body-parser";

import "./connectDB.js";
import { getAllQuestions, submitResponse } from "./controller.js";

const app = express();

app.use(cors()); 

app.use(bodyParser.json());

app.get("/api/get_questions", getAllQuestions);

app.post("/api/submit_response", submitResponse);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
