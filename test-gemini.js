import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = 'AIzaSyA33M28TPoUC0_q9UcqtUyBFY8fQhAEuNk';

console.log('Testing different Gemini models...');

const genAI = new GoogleGenerativeAI(API_KEY);

const modelsToTry = [
  'gemini-pro',
  'gemini-1.5-pro',
  'gemini-1.0-pro',
];

for (const modelName of modelsToTry) {
  console.log(`\nTrying ${modelName}...`);
  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent('Say hello');
    console.log(`✅ ${modelName} works!`);
    console.log('Response:', result.response.text());
    break;
  } catch (error) {
    console.log(`❌ ${modelName} failed:`, error.message.split('\n')[0]);
  }
}
