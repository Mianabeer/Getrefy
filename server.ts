import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json({ limit: '10mb' }));

  // Initialize Gemini AI Client lazily or safely
  const getAiClient = () => {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    return new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  };

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'Getrefy API' });
  });

  // AI Panda Launch Advisor & Feedback Endpoint
  app.post('/api/gemini/advisor', async (req, res) => {
    try {
      const { title, tagline, description, category, userQuery } = req.body;
      
      const ai = getAiClient();
      if (!ai) {
        return res.status(500).json({
          error: 'GEMINI_API_KEY is not configured in secrets.',
          fallback: true
        });
      }

      const prompt = `You are "Panda Launch Advisor", the AI product launch coach and feedback expert for Getrefy — a developer product launch community (Product Hunt + Reddit for devs).

Developer's App Details:
- Title: ${title || 'N/A'}
- Tagline: ${tagline || 'N/A'}
- Category: ${category || 'N/A'}
- Description: ${description || 'N/A'}
- Question / Focus: ${userQuery || 'Give a constructive critique, tagline polish, and 3 high-impact launch tips.'}

Task:
Provide constructive, high-value feedback for the developer in clear Markdown format with bold headings:
1. **Pitch Polish**: Improve their tagline & positioning for developer appeal.
2. **Key Strengths**: Highlight what makes this app stand out to other makers.
3. **Product Hunt & Reddit Launch Tips**: 3 actionable growth/launch ideas.
4. **Target Developer Audience**: Who will love this most.

Keep the tone encouraging, sharp, developer-friendly, and concise.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
        },
      });

      const replyText = response.text || 'Great product concept! Here is your AI launch optimization breakdown.';
      return res.json({ advice: replyText });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(500).json({
        error: err?.message || 'Failed to generate AI launch advice.',
      });
    }
  });

  // Vite middleware in development
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static assets
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Getrefy Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
