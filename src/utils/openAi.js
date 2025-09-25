import {groqKey} from "../utils/constants"

import axios from "axios";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_API_KEY = groqKey; 

export const getGroqResponse = async (query) => {
  try {
    if (!query || typeof query !== "string" || query.trim() === "") {
      throw new Error("Invalid query: must be a non-empty string.");
    }

    const response = await axios.post(
      GROQ_API_URL,
      {
        model: "llama-3.1-8b-instant",
        messages: [
          { role: "system", content: "You are a helpful movie recommendation assistant." },
          { role: "user", content: query }
        ],
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`,
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (err) {
    console.error("Groq API Error:", err.response?.data || err.message);
    return null;
  }
};

