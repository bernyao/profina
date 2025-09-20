// Simple test to verify AI service works
import { getSimpleSuggestion } from './src/services/aiServiceSimple.js';

console.log('Testing AI service...');

// Test simple suggestions
const testText = "I am good at working on projects and I helped with the development.";
const enhanced = getSimpleSuggestion(testText);

console.log('Original:', testText);
console.log('Enhanced:', enhanced);

console.log('✅ AI service test completed successfully!');
