// Simple test to verify Gemini API key works
import { GoogleGenerativeAI } from '@google/generative-ai';

// Get API key from environment
const apiKey = process.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.error('❌ ERROR: VITE_GEMINI_API_KEY not found in environment variables');
  console.error('Make sure you have a .env file with your API key');
  process.exit(1);
}

console.log('✅ API Key found:', apiKey.substring(0, 10) + '...');

// Initialize Gemini
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-exp' });

console.log('🔄 Testing Gemini API connection...\n');

try {
  // Simple test prompt
  const result = await model.generateContent('Say "API is working!" in one sentence.');
  const response = result.response.text();
  
  console.log('✅ SUCCESS! Gemini API is working!');
  console.log('📝 Response:', response);
  console.log('\n✨ Your API key is configured correctly!');
  console.log('The issue is likely in the application code, not the API key.\n');
  
} catch (error) {
  console.error('❌ ERROR: API call failed');
  console.error('Error details:', error.message);
  
  if (error.message.includes('API_KEY_INVALID')) {
    console.error('\n🔑 Your API key is invalid. Please:');
    console.error('1. Go to https://makersuite.google.com/app/apikey');
    console.error('2. Create a new API key');
    console.error('3. Update your .env file\n');
  } else if (error.message.includes('quota')) {
    console.error('\n⚠️  You may have hit API rate limits. Wait a minute and try again.\n');
  } else {
    console.error('\n🌐 This might be a network issue. Check your internet connection.\n');
  }
  
  process.exit(1);
}
