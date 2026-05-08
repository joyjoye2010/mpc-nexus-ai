const express = require("express");
const cors = require("cors");
const Groq = require("groq-sdk");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const groq = new Groq({
apiKey: process.env.GROQ_API_KEY,
});

app.post("/ask", async (req, res) => {

try {

const question = req.body.question;

const completion =
await groq.chat.completions.create({

messages: [

{
role: "system",
content:
"You are MPC Nexus AI, an expert tutor for 11th and 12th MPC students. Explain step-by-step clearly.",
},

{
role: "user",
content: question,
},

],

model: "llama-3.3-70b-versatile",

});

res.json({
answer: completion.choices[0].message.content,
});

} catch (error) {

console.log(error);

res.status(500).json({
answer: "AI Error",
});

}

});

app.listen(3000, () => {
console.log("🚀 MPC Nexus AI running with Groq");
});