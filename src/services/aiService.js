// AI Service with OpenRouter and Brain.js integration
// Brain.js will be initialized lazily
let brain = null;
let net = null;
let brainInitialized = false;

// Initialize Brain.js lazily
const initializeBrain = async () => {
  if (brainInitialized) return;
  
  try {
    // Use dynamic import for Brain.js in ESM environment
    const brainModule = await import('brain.js');
    brain = brainModule.default || brainModule;
    net = new brain.recurrent.LSTM();
    
    // Train the network
    net.train(trainingData);
    brainInitialized = true;
    console.log('Brain.js initialized successfully');
  } catch (error) {
    console.warn('Brain.js not available, using fallback suggestions:', error);
    brain = null;
    net = null;
    brainInitialized = true; // Mark as initialized to avoid retrying
  }
};

// Training data for basic resume suggestions
const trainingData = [
  { input: "experienced", output: "seasoned professional with extensive experience" },
  { input: "good at", output: "proficient in" },
  { input: "worked on", output: "spearheaded" },
  { input: "helped with", output: "collaborated on" },
  { input: "made", output: "developed" },
  { input: "did", output: "executed" },
  { input: "good", output: "excellent" },
  { input: "bad", output: "challenging" },
  { input: "big", output: "significant" },
  { input: "small", output: "focused" }
];

// OpenRouter API service
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const AI_MODEL = import.meta.env.VITE_AI_MODEL || 'sonoma/sonoma-sky-alpha';

// AI-powered text enhancement using OpenRouter
export const enhanceText = async (text, action = 'improve') => {
  try {
    const prompt = getPromptForAction(text, action);
    
    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
        'X-Title': import.meta.env.VITE_SITE_NAME || 'Profina'
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writing assistant. Help improve resume content to make it more professional, impactful, and ATS-friendly. Always maintain the original meaning while enhancing the language.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 500,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    const enhancedText = data.choices[0]?.message?.content?.trim();

    if (enhancedText) {
      return {
        success: true,
        enhancedText: enhancedText
      };
    } else {
      throw new Error('No enhanced text received from API');
    }
  } catch (error) {
    console.error('OpenRouter API error:', error);
    // Fallback to Brain.js or simple replacements
    const fallback = await getBrainSuggestion(text);
    return {
      success: false,
      fallback: fallback
    };
  }
};

// Generate resume summary using OpenRouter
export const generateResumeSummary = async (resumeData) => {
  try {
    const prompt = `Create a professional summary for a resume based on the following information:
    
    Name: ${resumeData.name || 'Not provided'}
    Title: ${resumeData.title || 'Not provided'}
    Summary: ${resumeData.summary || 'Not provided'}
    Experience: ${resumeData.experience?.map(exp => `${exp.title} at ${exp.company} - ${exp.description}`).join(', ') || 'None'}
    Education: ${resumeData.education?.map(edu => `${edu.degree} from ${edu.school}`).join(', ') || 'None'}
    Skills: ${resumeData.skills?.join(', ') || 'None'}
    
    Create a compelling 3-4 sentence professional summary that highlights the candidate's key strengths and experience.`;

    const response = await fetch(OPENROUTER_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': import.meta.env.VITE_SITE_URL || 'http://localhost:5173',
        'X-Title': import.meta.env.VITE_SITE_NAME || 'Profina'
      },
      body: JSON.stringify({
        model: AI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Create compelling, ATS-friendly professional summaries that highlight key achievements and skills.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 300,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      let errorMessage = `HTTP ${response.status}`;
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorData.message || errorMessage;
      } catch (e) {
        // If we can't parse the error response, use the status text
        errorMessage = response.statusText || errorMessage;
      }
      console.error('OpenRouter API error:', errorMessage);
      return { success: false, error: errorMessage, fallback: generateFallbackSummary(resumeData) };
    }

    const data = await response.json();
    const summary = data.choices?.[0]?.message?.content?.trim();
    
    if (!summary) {
      console.error('No summary received from OpenRouter API');
      return { success: false, error: 'No summary received from API', fallback: generateFallbackSummary(resumeData) };
    }
    
    return { success: true, summary };
  } catch (error) {
    console.error('Error generating summary with OpenRouter:', error);
    return { success: false, error: error.message, fallback: generateFallbackSummary(resumeData) };
  }
};

// Get Brain.js suggestion as fallback
export const getBrainSuggestion = async (text) => {
  await initializeBrain();
  
  if (!net) {
    // Fallback to simple word replacements
    return text
      .replace(/\bexperienced\b/gi, 'seasoned professional with extensive experience')
      .replace(/\bgood at\b/gi, 'proficient in')
      .replace(/\bworked on\b/gi, 'spearheaded')
      .replace(/\bhelped with\b/gi, 'collaborated on')
      .replace(/\bmade\b/gi, 'developed')
      .replace(/\bdid\b/gi, 'executed')
      .replace(/\bgood\b/gi, 'excellent')
      .replace(/\bbad\b/gi, 'challenging')
      .replace(/\bbig\b/gi, 'significant')
      .replace(/\bsmall\b/gi, 'focused');
  }

  try {
    const words = text.toLowerCase().split(' ');
    const enhancedWords = words.map(word => {
      const suggestion = net.run(word);
      return suggestion || word;
    });
    return enhancedWords.join(' ');
  } catch (error) {
    console.warn("Brain.js suggestion failed:", error);
    // Fallback to simple word replacements
    return text
      .replace(/\bexperienced\b/gi, 'seasoned professional with extensive experience')
      .replace(/\bgood at\b/gi, 'proficient in')
      .replace(/\bworked on\b/gi, 'spearheaded')
      .replace(/\bhelped with\b/gi, 'collaborated on')
      .replace(/\bmade\b/gi, 'developed')
      .replace(/\bdid\b/gi, 'executed')
      .replace(/\bgood\b/gi, 'excellent')
      .replace(/\bbad\b/gi, 'challenging')
      .replace(/\bbig\b/gi, 'significant')
      .replace(/\bsmall\b/gi, 'focused');
  }
};

// Helper function to get appropriate prompt for different actions
const getPromptForAction = (text, action) => {
  const basePrompt = `Please ${action} the following resume content to make it more professional and impactful: "${text}"`;
  
  switch (action) {
    case 'improve':
      return `${basePrompt}. Make it more professional, specific, and results-oriented.`;
    case 'expand':
      return `${basePrompt}. Expand on the details while maintaining conciseness.`;
    case 'shorten':
      return `${basePrompt}. Make it more concise while keeping the key information.`;
    case 'rephrase':
      return `${basePrompt}. Rephrase it with different wording while keeping the same meaning.`;
    default:
      return basePrompt;
  }
};

// Generate fallback summary when AI is not available
const generateFallbackSummary = (resumeData) => {
  const name = resumeData.name || 'Professional';
  const title = resumeData.title || 'Professional';
  const experienceCount = resumeData.experience?.length || 0;
  const skills = resumeData.skills?.slice(0, 3).join(', ') || 'various skills';
  
  return `Experienced ${title} with ${experienceCount} years of professional experience. Skilled in ${skills}. Proven track record of delivering results and driving success in challenging environments.`;
};