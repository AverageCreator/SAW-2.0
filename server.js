import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1398095259790999624/cEBFYTsfDfveYVclwoq22tXCoJMie0WErkaH0vN_2DbU-JYsp3C6szzFPFPQPKKPbu6D";

app.post("/api/flightlog", async (req, res) => {
  const { content } = req.body;
  if (!content) return res.status(400).json({ error: "Missing content" });

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: `Discord error: ${err}` });
    }

    res.json({ status: "ok" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
