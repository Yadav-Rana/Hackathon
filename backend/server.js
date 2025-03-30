const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const {GoogleGenerativeAI} = require("@google/generative-ai");

dotenv.config();

const app = express();

// Initialize Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/gifty")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Routes
app.get("/", (req, res) => {
  res.json({message: "Welcome to Gifty API"});
});

// Gift Recommendation Route
app.post("/api/recommendations", async (req, res) => {
  try {
    const {age, hobbies, interests, occasion, budget, relation} = req.body;

    // Create a prompt for the Gemini API
    const prompt = `Generate a JSON response with 5 gift recommendations. Format the response EXACTLY as shown, with no additional text:
{
  "recommendations": [
    {
      "name": "Gift Name",
      "description": "Brief description",
      "price": "$XX.XX",
      "reason": "Why this gift is suitable",
      "purchaseLink": "https://www.amazon.com/example"
    }
  ]
}

Use these details for the recommendations:
- Age: ${age}
- Hobbies: ${hobbies}
- Interests: ${interests}
- Occasion: ${occasion}
- Relationship: ${relation}
- Budget: $${budget}

Rules:
1. All gifts must be under $${budget}
2. Include both physical items and experiences
3. All prices must use $XX.XX format
4. Use real store links (Amazon, Etsy, etc.)
5. Use the given contexts for the recommendations
6. Use Relationship between the giver and the reciever for the recommendations
7. CRITICAL: Response must be valid JSON`;

    // Get the Gemini model
    const model = genAI.getGenerativeModel({model: "gemini-2.0-flash"});

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();

    try {
      // Clean the response text to ensure valid JSON
      text = text.trim();
      if (text.startsWith("```json")) {
        text = text.replace(/```json\n?/, "").replace(/```$/, "");
      }
      if (text.startsWith("```")) {
        text = text.replace(/```\n?/, "").replace(/```$/, "");
      }

      // Parse the JSON response
      const recommendations = JSON.parse(text);

      console.log(recommendations);

      // Validate the response structure
      if (
        !recommendations.recommendations ||
        !Array.isArray(recommendations.recommendations)
      ) {
        throw new Error("Invalid response structure");
      }

      res.json(recommendations);
    } catch (parseError) {
      console.error("Error parsing Gemini response. Raw text:", text);
      res.status(500).json({
        error: "Failed to parse recommendations",
        details: "The AI response was not in the expected format",
      });
    }
  } catch (error) {
    console.error("Error generating recommendations:", error);
    res.status(500).json({
      error: "Failed to generate recommendations",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
