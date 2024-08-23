import db from "./connectDB.js";

export const getAllQuestions = async (req, res) => {
  try {
    const [rows] = await db.promise().query(
      `SELECT question_id, question_text, has_other_options, triggers_next_question, next_question_id 
       FROM questions 
       ORDER BY arrangment`
    );

    res
      .status(rows.length === 0 ? 400 : 200)
      .json({ status: rows.length !== 0, data: rows });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ status: false, message: "SERVER ERROR" });
  }
};

export const submitResponse = async (req, res) => {
  try {
    const {
      name,
      gender,
      mobile_number,
      email,
      age,
      blood_group,
      height,
      weight,
      questions,
    } = req.body;


    // insert the user
    const [result] = await db.promise().query(
      `
      INSERT INTO users (name, gender, mobile_number, email, age, blood_group, height, weight)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [name, gender, mobile_number, email, age, blood_group, height, weight]
    );

    const user_id = result.insertId;

    // insert the response and response item

    const [response_result] = await db.promise().query(
      `
      INSERT INTO responses (user_id)
      VALUES (?)
    `,
      [user_id]
    );

    const response_id = response_result.insertId;

    let overall_mark = 0;

    for (let item of questions) {
      if(item.answer) {

      

      const [rows] = await db.promise().query(
        `SELECT * 
            FROM questions 
            WHERE question_id = ? AND positive_response = ?`,
        [item.question_id, item.answer]
      );

      // check the if answer match positive response
      if (rows.length > 0) {
        overall_mark++;
      }

      await db.promise().query(
        `
            INSERT INTO response_item (response_id, question_id, selected_answer, other_response)
            VALUES (?, ?, ?, ?)
          `,
        [
          response_id,
          item.question_id,
          item.answer,
          item.other_answer ? item.other_answer : null,
        ]
      );
    }
    }

    // Fetch the result from the averages table based on the overall_mark
    const [average_rows] = await db.promise().query(
      `
        SELECT result
        FROM averages
        WHERE ? BETWEEN min_positive_responses AND max_positive_responses
      `,
      [overall_mark]
    );

    const result_value = average_rows[0].result;

    // Update the responses table with the result
    await db.promise().query(
      `
        UPDATE responses
        SET average_value = ?
        WHERE response_id = ?
      `,
      [result_value, response_id]
    );

    res.status(201).json({
      status: true,
      message: "Response submitted successfully",
    });
  } catch (error) {
    console.error("Error at submitting:", error);
    res.status(500).json({ status: false, message: "SERVER ERROR" });
  }
};
