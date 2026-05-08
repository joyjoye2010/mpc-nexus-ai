const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
});

app.post("/ask", async (req, res) => {

  try {

    const userQuestion = req.body.question;

    const completion =
    await client.chat.completions.create({

      model:
"openchat/openchat-7b:free",

      messages: [

        {
          role: "system",
          content:
          "You are MPC Nexus AI, a smart educational assistant for Maths, Physics and Chemistry students."
        },

        {
          role: "user",
          content: userQuestion
        }

      ],

    });

    res.json({
      answer:
      completion.choices[0].message.content
    });

  } catch (error) {

    console.log(error);

    res.json({
      answer:
      "AI error"
    });

  }

});

const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    "🚀 MPC Nexus AI running with OpenRouter"
  );

});