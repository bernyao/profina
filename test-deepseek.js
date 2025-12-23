// Maintained by benyao
// Test script for DeepSeek Chat v3.1 integration
// Run with: node test-deepseek.js

const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';
const OPENROUTER_API_KEY = process.env.VITE_OPENROUTER_API_KEY; // Set this in your .env file

async function testDeepSeek() {
  if (!OPENROUTER_API_KEY) {
    console.error('❌ VITE_OPENROUTER_API_KEY not found in environment variables');
    console.log('Please set your OpenRouter API key in the .env file');
    return;
  }

  try {
    console.log('🧪 Testing DeepSeek Chat v3.1 integration...');
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "http://localhost:5173",
        "X-Title": "Profina",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "deepseek/deepseek-chat-v3.1:free",
        "messages": [
          {
            "role": "system",
            "content": "You are a professional resume writing assistant. Help improve resume content to make it more professional, impactful, and ATS-friendly."
          },
          {
            "role": "user",
            "content": "Please improve this resume text: 'I worked on a project and helped make it better'"
          }
        ],
        "max_tokens": 200,
        "temperature": 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices[0] && data.choices[0].message) {
      console.log('✅ DeepSeek Chat v3.1 is working correctly!');
      console.log('📝 Original text: "I worked on a project and helped make it better"');
      console.log('✨ Enhanced text:', data.choices[0].message.content.trim());
      console.log('🎯 Model used:', data.model || 'deepseek/deepseek-chat-v3.1:free');
    } else {
      console.error('❌ Unexpected response format:', data);
    }

  } catch (error) {
    console.error('❌ Error testing DeepSeek:', error.message);
    
    if (error.message.includes('401')) {
      console.log('💡 Check your OpenRouter API key in the .env file');
    } else if (error.message.includes('429')) {
      console.log('💡 Rate limit exceeded, try again later');
    } else if (error.message.includes('500')) {
      console.log('💡 Server error, check OpenRouter status');
    }
  }
}

// Run the test
testDeepSeek();
