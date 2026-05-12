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



/* =========================
   AI QUESTION SOLVER
========================= */

app.post("/ask", async (req, res) => {

  try {

    const userQuestion =
    req.body.question;

    const completion =
    await client.chat.completions.create({

      model:
      "openrouter/free",

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
      "❌ AI error"
    });

  }

});



/* =========================
   AI NOTE SUMMARIZER
========================= */

app.post("/summarize", async (req, res) => {

  try {

    const notes =
    req.body.notes;

    if(!notes){

      return res.json({
        summary:
        "❌ Please enter notes first."
      });

    }

    const completion =
    await client.chat.completions.create({

      model:
      "openrouter/free",

      messages: [

        {
          role: "system",
          content: `
You are an advanced AI study notes summarizer.

Your task:
- Convert long notes into BEAUTIFUL study notes.
- Use proper headings
- Use bullet points
- Use numbered lists
- Highlight important keywords
- Make notes easy for exam revision
- Keep formatting clean and professional
- Add spacing between sections
- Do NOT write long paragraphs
`
        },

        {
          role: "user",
          content: notes
        }

      ],

    });

    res.json({

      summary:
      completion.choices[0]
      .message.content

    });

  } catch (error) {

    console.log(error);

    res.json({

      summary:
      "❌ AI summarizer error"

    });

  }

});



const PORT = 3000;

app.listen(PORT, () => {

  console.log(
    "🚀 MPC Nexus AI running"
  );

});