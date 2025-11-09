import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const app = express();
app.use(cors())
app.use(express.json())

app.get("/", (_, res) => res.send("HRMS API running..."));

// Example route
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  res.json({ message: `Logged in as ${email}` });
});

app.listen(5000, () => console.log("Server running on port 5000"));