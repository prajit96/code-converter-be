import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { generateContent } from 'gemini-js'; // Import the generateContent function

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.status(200).send('Welcome to Code-Converter');
});

app.post('/convert', async (req, res) => {
  const { code, targetLanguage } = req.body;

  try {
    const prompt = `Convert the following code from its original language to ${targetLanguage}:\n\n${code}`;
    const convertedCode = await generateContent(process.env.GEMINI_API_KEY, prompt);
    res.status(200).send({ msg: convertedCode });
  } catch (error) {
    console.error('Error converting code:', error);
    res.status(500).send({ error: 'Failed to convert code' });
  }
});

app.post('/debug', async (req, res) => {
  const { code } = req.body;

  try {
    const prompt = `Debug the following code:\n\n${code}`;
    const debugOutput = await generateContent(process.env.GEMINI_API_KEY, prompt);
    res.status(200).send({ msg: debugOutput });
  } catch (error) {
    console.error('Error debugging code:', error);
    res.status(500).send({ error: 'Failed to debug code' });
  }
});

app.post('/qualitycheck', async (req, res) => {
  const { code } = req.body;

  try {
    const prompt = `Please do the quality check of the following code. Provide feedback on:
      1. Code Consistency (naming conventions, duplication, formatting)
      2. Code Performance (optimized algorithms, data structures)
      3. Code Documentation (comments, docstrings)
      4. Error Handling
      Score each criteria out of 100%.

      **Code:**
      ${code}`;
    const qualityCheckOutput = await generateContent(process.env.GEMINI_API_KEY, prompt);
    res.status(200).send({ msg: qualityCheckOutput });
  } catch (error) {
    console.error('Error performing quality check:', error);
    res.status(500).send({ error: 'Failed to perform quality check' });
  }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is live at Port ${PORT}`);
});
