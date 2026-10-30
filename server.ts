import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(express.json());

// Initialize Gemini Client if API key is present
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// AI Enhancement Endpoint
app.post('/api/ai/enhance', async (req, res) => {
  try {
    const { mode, developerName, role, currentPhilosophy, currentFocus } = req.body;

    if (!ai) {
      // Graceful fallback if no API key configured
      if (mode === 'philosophy') {
        return res.json({
          philosophy:
            'Passionate about transforming mathematical formulations and machine learning algorithms into robust, production-grade intelligent software architectures.',
        });
      } else if (mode === 'taglines') {
        return res.json({
          taglines: [
            'Applied AI & Machine Learning Systems Architect',
            'From Loss Optimization to Scalable Microservices',
            'Bayesian Hyperparameter Tuning & High-Throughput Inference',
            'Bridging Mathematical Theory with Resilient Deployments',
          ],
        });
      } else {
        return res.json({
          focus: 'Intelligent Agentic Workflows, Machine Learning Pipelines & Scalable Backends',
          specialization: 'Model Training, Hyperparameter Tuning & Applied Web Deployments',
        });
      }
    }

    let prompt = '';
    if (mode === 'philosophy') {
      prompt = `You are an expert developer career strategist and AI engineer. 
Write a one-sentence, powerful engineering philosophy for ${developerName || 'Swaroop Khan'}, who is a ${role || 'AI & ML Enthusiast | Developer'}. 
Current philosophy: "${currentPhilosophy || ''}". 
Make it punchy, deeply credible, mathematically grounded, and focused on production systems. Return ONLY the single sentence quote, nothing else.`;
    } else if (mode === 'taglines') {
      prompt = `Generate exactly 4 concise, high-impact typing effect taglines (under 8 words each) for ${developerName || 'Swaroop Khan'}, an Applied AI & ML Developer specializing in model training, Optuna tuning, and intelligent systems.
Format your output as a JSON array of 4 strings: ["line 1", "line 2", "line 3", "line 4"].`;
    } else {
      prompt = `Suggest an elevated Current Focus (under 12 words) and Specialization (under 10 words) for ${developerName || 'Swaroop Khan'}, an applied AI developer. 
Format as JSON: {"focus": "...", "specialization": "..."}`;
    }

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
    );

    const response = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      }),
      timeoutPromise,
    ]);

    const outputText = response.text?.trim() || '';

    if (mode === 'philosophy') {
      const cleaned = outputText.replace(/^["']|["']$/g, '');
      return res.json({ philosophy: cleaned });
    } else if (mode === 'taglines') {
      try {
        const parsed = JSON.parse(outputText.replace(/```json|```/g, '').trim());
        return res.json({ taglines: parsed });
      } catch {
        return res.json({
          taglines: [
            'AI & ML Enthusiast',
            'Building Intelligent Software Systems',
            'From Machine Learning Models to Real-World Applications',
            'Full Stack & Applied AI Developer',
          ],
        });
      }
    } else {
      try {
        const parsed = JSON.parse(outputText.replace(/```json|```/g, '').trim());
        return res.json(parsed);
      } catch {
        return res.json({
          focus: 'Intelligent Agentic Workflows, Machine Learning Pipelines & Scalable Backends',
          specialization: 'Model Training, Hyperparameter Tuning & Applied Web Deployments',
        });
      }
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return res.status(500).json({ error: 'Failed to enhance profile' });
  }
});

// Interactive Terminal AI Query Endpoint
app.post('/api/ai/query', async (req, res) => {
  try {
    const { query } = req.body;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter required' });
    }

    if (!ai) {
      return res.json({
        answer: `Swaroop Khan specializes in applied machine learning, hyperparameter tuning with Optuna, gradient boosted algorithms (XGBoost), and production deployment with Streamlit and Supabase. To your question ("${query}"), Swaroop focuses on empirical validation, cross-entropy minimization, and low-latency serving.`,
      });
    }

    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Gemini API timeout')), 3500)
    );

    const response = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: `You are the terminal assistant for Swaroop Khan, an applied AI and ML developer based in Bangalore, India. 
Context: Swaroop works on model training, Optuna hyperparameter tuning, Scikit-Learn, XGBoost, Pandas, Imbalanced-Learn, Streamlit, Supabase, and building intelligent software systems.
Answer the following visitor query in 2-3 concise, technical sentences: "${query}"`,
      }),
      timeoutPromise,
    ]);

    return res.json({ answer: response.text?.trim() || '' });
  } catch (error) {
    console.error('Error handling terminal query:', error);
    return res.json({
      answer: 'Swaroop Khan is an Applied AI & ML Developer focused on bridging mathematical formulations with resilient production infrastructure.',
    });
  }
});

// Mount Vite or static files
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
