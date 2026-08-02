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

  // AI Panda Launch Advisor & Feedback Endpoints (both alias routes supported)
  const handleAdvisorRequest = async (req: express.Request, res: express.Response) => {
    try {
      const { title, tagline, description, category, userQuery } = req.body || {};
      
      const ai = getAiClient();
      
      const appTitle = title || 'Developer Tool';
      const appTagline = tagline || 'A high-performance developer application';
      const appCategory = category || 'SaaS';
      const appDesc = description || 'Built for developers and makers.';
      const appQuery = userQuery || 'How can I optimize my launch tagline and developer outreach?';

      if (ai) {
        const prompt = `You are "Panda Launch Advisor", the AI product launch coach and feedback expert for Getrefy — a developer product launch community (Product Hunt + Reddit for devs).

Developer's App Details:
- Title: ${appTitle}
- Tagline: ${appTagline}
- Category: ${appCategory}
- Description: ${appDesc}
- Question / Focus: ${appQuery}

Task:
Provide constructive, high-value feedback for the developer in clear Markdown format with bold headings:
1. **Pitch Polish**: Improve their tagline & positioning for developer appeal. Give 2 alternative catchy taglines.
2. **Key Strengths**: Highlight what makes this app stand out to other makers.
3. **Product Hunt & Reddit Launch Tips**: 3 actionable growth/launch ideas.
4. **Target Developer Audience**: Who will love this most and where to reach them.

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
      }

      // Smart structured fallback if GEMINI_API_KEY is not configured in local environment
      const fallbackAdvice = `### 🐼 Panda Launch Advisor Critique for **${appTitle}**

1. **Pitch Polish & Tagline Alternatives**
- **Current**: *"${appTagline}"*
- **Alternative 1 (Developer Focus)**: *"The developer-first ${appCategory} tool that solves workflow friction in 1 click."*
- **Alternative 2 (Benefit-Driven)**: *"Build & launch ${appCategory} faster — zero config, open DX."*

2. **Key Strengths**
- Strong alignment with the **${appCategory}** developer audience.
- Addresses a real pain point: *"${appDesc.slice(0, 100)}..."*

3. **Product Hunt & Reddit Launch Tips**
- **Reddit (r/SideProject & r/webdev)**: Share your build-in-public story, key tech stack choices, and post a live demo or GitHub link.
- **Product Hunt**: Launch at 12:01 AM PST on Tuesday or Wednesday for maximum maker traffic. Prepare 3-5 screenshots showing real product UI.
- **Getrefy Community**: Reply to feedback comments on your Getrefy post to build maker rapport and earn +4 Panda Points per comment.

4. **Target Audience**
- Frontend/Backend Engineers, Solo Founders, and Tech Enthusiasts looking for efficient **${appCategory}** solutions.`;

      return res.json({ advice: fallbackAdvice });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      return res.status(200).json({
        advice: `### 🐼 Panda Launch Advisor Summary\n\nYour product **${req.body?.title || 'Developer App'}** in **${req.body?.category || 'SaaS'}** has great potential!\n\n**Quick Launch Advice:**\n- Focus your tagline on concrete time or friction saved.\n- Include 2-3 real UI screenshots in your launch gallery.\n- Engage actively with comments in the Getrefy feed.`
      });
    }
  };

  app.post('/api/gemini/advisor', handleAdvisorRequest);
  app.post('/api/advisor', handleAdvisorRequest);

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
