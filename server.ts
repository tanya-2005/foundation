import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize file-based DB
const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const SUBMISSIONS_FILE = path.join(DATA_DIR, "submissions.json");
const NEWSLETTER_FILE = path.join(DATA_DIR, "newsletter.json");

if (!fs.existsSync(SUBMISSIONS_FILE)) {
  fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(NEWSLETTER_FILE)) {
  fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify([], null, 2));
}

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const PANKHIE_SYSTEM_INSTRUCTION = `You are Pankhie, the offical AI Social Impact Ambassador for NayePankh Foundation, a non-profit organization (NGO) working in India to uplift underprivileged women and children.
Your voice should be highly empathetic, professional, inspiring, and trustworthy.

Key Information about NayePankh Foundation:
- Founder & Team: Founded with a vision to provide "New Wings" (Naye Pankh) to the dreams of marginal communities.
- Focus Areas: 
  1. Primary Education: Helping slum children get free tutoring, school enrollment supplies, uniforms, and mentorship.
  2. Healthcare Access: Organizing blood donation drives, distributing sanitation and primary health kits to women, and organizing medical camps in rural areas.
  3. Women Empowerment: Offering vocational training (like sewing, digital literacy, and basic craftwork) to marginalized women so they can achieve financial self-reliance.
  4. Environmental Protection: Neighborhood plantation drives, plastic reduction campaigns, and environmental sanitization drives.
  5. Community Development: Providing meals to the homeless, emergency relief kits, and winter blanket distributions.
- Operations: Active in multiple cities across India (primarily Kanpur, Noida, Lucknow, Delhi, Ghaziabad).
- How people can support:
  - Donate: Money goes directly to sponsor child education, health drives, or vocational kits. (e.g. 1000 INR supports educational materials for a child, 1500 INR provides critical healthcare kits).
  - Volunteer: Join on-ground activities, coordinate events, teach children, or help in administrative tasks.
  - Sponsorship / Corporate Partnership: CSR projects, corporate sponsorships of specialized training centers.
  - Internships: 1-month to 3-month digital or on-ground NGO management certificates.

Guidelines for Chatting:
1. Always encourage compassion and civic engagement.
2. Maintain a friendly, non-preachy, supportive tone.
3. Keep answers concise, visually structured (using bullets for readability), and direct.
4. If a user asks about donation packages or volunteering, warmly describe the options and mention they can use the direct sections or forms mapped on this page.
5. Always respond in clean markdown.`;

// API: AI Chatbot endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Invalid or missing messages array." });
    }

    // Format chat biography for @google/genai SDK
    // Each standard message: { role: 'user' | 'model', content: string }
    // Convert to Gemini API Part structure
    const formattedContents = messages.map((m) => {
      return {
        role: m.role === "assistant" ? "model" : m.role,
        parts: [{ text: m.content }],
      };
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction: PANKHIE_SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    const text = response.text || "I am here to help you support our cause! Please let me know how I can guide you today.";
    return res.json({ response: text });
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    return res.status(500).json({
      error: "We encountered an issue connecting with Pankhie. Please try again in a moment.",
      details: error.message,
    });
  }
});

// API: Submit multi-step Contact/Internship/Volunteer inquiries
app.post("/api/submissions", (req, res) => {
  try {
    const submission = req.body;
    
    // Basic verification
    if (!submission.fullName || !submission.email || !submission.interest) {
      return res.status(400).json({ error: "Please provide all required fields: full name, email, and area of interest." });
    }

    // Read existing
    const fileData = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const submissions = JSON.parse(fileData);

    const newEntry = {
      id: "sub_" + Date.now() + "_" + Math.floor(Math.random() * 1000),
      timestamp: new Date().toISOString(),
      ...submission,
    };

    submissions.push(newEntry);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));

    return res.json({
      success: true,
      message: "Thank you! Your inquiries have been received successfully. We will reach back to you within 24-48 business hours.",
      id: newEntry.id,
    });
  } catch (error) {
    console.error("Submissions Error:", error);
    return res.status(500).json({ error: "Could not record inquiry. Please try again." });
  }
});

// API: Get submissions list for real-time dashboard viewing (demonstrates real-time persistence)
app.get("/api/submissions", (req, res) => {
  try {
    const fileData = fs.readFileSync(SUBMISSIONS_FILE, "utf-8");
    const submissions = JSON.parse(fileData);
    // Return recent elements first
    return res.json(submissions.reverse());
  } catch (error) {
    return res.status(500).json({ error: "Failed to read database submissions." });
  }
});

// API: Join Newsletter
app.post("/api/newsletter", (req, res) => {
  try {
    const { email } = req.body;
    if (!email || !email.includes("@")) {
      return res.status(400).json({ error: "Please enter a valid email address." });
    }

    const fileData = fs.readFileSync(NEWSLETTER_FILE, "utf-8");
    const subscribers = JSON.parse(fileData);

    if (subscribers.includes(email)) {
      return res.json({ success: true, message: "You are already subscribed to our monthly updates!", duplicate: true });
    }

    subscribers.push(email);
    fs.writeFileSync(NEWSLETTER_FILE, JSON.stringify(subscribers, null, 2));

    return res.json({
      success: true,
      message: "Success! You have subscribed to NayePankh monthly digest. Stay tuned for dynamic impact reports!",
    });
  } catch (error) {
    return res.status(500).json({ error: "Newsletter sign-up failure. Please try again." });
  }
});

import { createServer as createViteServer } from "vite";

async function runExpress() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[NayePankh Server Ready] listening on port ${PORT}`);
  });
}

runExpress();
