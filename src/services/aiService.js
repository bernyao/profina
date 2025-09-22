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

// Text improvement patterns for Brain.js fallback (no API calls needed)
const TEXT_IMPROVEMENTS = {
  improve: {
    patterns: [
      { from: /\bI\b/g, to: '' },
      { from: /\bam\b/g, to: 'are' },
      { from: /\bwill\b/gi, to: 'shall' },
      { from: /\bcan\b/gi, to: 'are able to' },
      { from: /\bget\b/gi, to: 'obtain' },
      { from: /\bmake\b/gi, to: 'create' },
      { from: /\bdo\b/gi, to: 'execute' },
      { from: /\bgood\b/gi, to: 'excellent' },
      { from: /\bnice\b/gi, to: 'outstanding' },
      { from: /\bawesome\b/gi, to: 'exceptional' },
      { from: /\bgreat\b/gi, to: 'outstanding' },
      { from: /\bamazing\b/gi, to: 'remarkable' },
      { from: /\bperfect\b/gi, to: 'optimal' },
      { from: /\bfast\b/gi, to: 'efficient' },
      { from: /\beasy\b/gi, to: 'straightforward' },
      { from: /\bexperienced\b/gi, to: 'seasoned professional with extensive experience' },
      { from: /\bgood at\b/gi, to: 'proficient in' },
      { from: /\bworked on\b/gi, to: 'spearheaded' },
      { from: /\bhelped with\b/gi, to: 'collaborated on' },
      { from: /\bmade\b/gi, to: 'developed' },
      { from: /\bdid\b/gi, to: 'executed' },
      { from: /\bbad\b/gi, to: 'challenging' },
      { from: /\bbig\b/gi, to: 'significant' },
      { from: /\bsmall\b/gi, to: 'focused' }
    ],
    prefixes: [
      'Demonstrates strong expertise in',
      'Proven track record of',
      'Skilled professional with experience in',
      'Accomplished individual specializing in',
      'Results-driven professional with expertise in'
    ],
    connectors: [
      'Furthermore,',
      'Additionally,',
      'Moreover,',
      'In addition,',
      'It is important to note that',
      'Notably,',
      'Significantly,'
    ]
  },
  expand: {
    connectors: [
      'Furthermore,',
      'Additionally,',
      'Moreover,',
      'In addition to this,',
      'It is important to note that',
      'This approach ensures that',
      'By implementing this strategy,',
      'This comprehensive solution'
    ],
    details: [
      'which will significantly enhance the overall quality and effectiveness.',
      'providing you with a robust and scalable solution.',
      'ensuring optimal performance and user satisfaction.',
      'delivering measurable results and long-term value.',
      'creating a seamless and professional experience.'
    ]
  },
  shorten: {
    removals: [
      /\s+and\s+also\s+/gi,
      /\s+in\s+order\s+to\s+/gi,
      /\s+so\s+that\s+/gi,
      /\s+due\s+to\s+the\s+fact\s+that\s+/gi,
      /\s+at\s+this\s+point\s+in\s+time\s+/gi,
      /\s+it\s+is\s+important\s+to\s+note\s+that\s+/gi,
      /\s+it\s+should\s+be\s+noted\s+that\s+/gi,
      /\s+it\s+is\s+worth\s+mentioning\s+that\s+/gi,
      /\s+in\s+addition\s+to\s+this\s+/gi,
      /\s+moreover\s+/gi,
      /\s+furthermore\s+/gi
    ],
    replacements: [
      { from: /\s+and\s+also\s+/gi, to: ' and ' },
      { from: /\s+in\s+order\s+to\s+/gi, to: ' to ' },
      { from: /\s+so\s+that\s+/gi, to: ' so ' },
      { from: /\s+very\s+/gi, to: ' ' },
      { from: /\s+really\s+/gi, to: ' ' },
      { from: /\s+quite\s+/gi, to: ' ' },
      { from: /\s+rather\s+/gi, to: ' ' },
      { from: /\s+somewhat\s+/gi, to: ' ' },
      { from: /\s+fairly\s+/gi, to: ' ' },
      { from: /\s+relatively\s+/gi, to: ' ' },
      { from: /\s+approximately\s+/gi, to: ' ~' },
      { from: /\s+about\s+/gi, to: ' ~' },
      { from: /\s+around\s+/gi, to: ' ~' }
    ]
  }
};

// Training data for basic resume suggestions (legacy Brain.js)
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
const AI_MODEL = import.meta.env.VITE_AI_MODEL || 'deepseek/deepseek-chat-v3.1:free';

// AI-powered text enhancement using OpenRouter (only for 'suggest' action)
export const enhanceText = async (text, action = 'improve') => {
  // For simple text improvements, use Brain.js patterns (no API calls)
  if (action === 'improve' || action === 'expand' || action === 'shorten') {
    return {
      success: true,
      enhancedText: improveTextWithBrainJS(text, action)
    };
  }
  
  // For 'suggest' action, use DeepSeek API
  if (action === 'suggest') {
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
      // Fallback to Brain.js patterns
      return {
        success: false,
        fallback: improveTextWithBrainJS(text, 'improve')
      };
    }
  }
  
  // Default fallback
  return {
    success: true,
    enhancedText: improveTextWithBrainJS(text, action)
  };
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

// Brain.js powered text improvement (no API calls needed)
const improveTextWithBrainJS = (text, action) => {
  const improvements = TEXT_IMPROVEMENTS[action];
  if (!improvements) return text;

  let improvedText = text;

  switch (action) {
    case 'improve':
      const originalText = improvedText;
      
      // Apply pattern replacements more carefully
      improvements.patterns.forEach(pattern => {
        improvedText = improvedText.replace(pattern.from, pattern.to);
      });
      
      // Clean up any double spaces or awkward phrases
      improvedText = improvedText.replace(/\s+/g, ' ').trim();
      
      // Fix common grammar issues
      improvedText = improvedText.replace(/\bwe we\b/gi, 'We');
      improvedText = improvedText.replace(/\bour team are\b/gi, 'We are');
      improvedText = improvedText.replace(/\bwe are a professional team\b/gi, 'We are a professional team');
      
      // If no patterns were applied, ensure we still make some improvements
      if (improvedText === originalText) {
        // Make the text more professional even if no patterns matched
        improvedText = improvedText.replace(/\bwe\b/gi, 'our team');
        improvedText = improvedText.replace(/\bi\b/g, 'we');
        improvedText = improvedText.replace(/\bam\b/g, 'are');
        
        // Add professional language
        if (improvedText.length < 80) {
          const randomPrefix = improvements.prefixes[Math.floor(Math.random() * improvements.prefixes.length)];
          improvedText = `${randomPrefix} ${improvedText.toLowerCase()}`;
        } else {
          const randomConnector = improvements.connectors[Math.floor(Math.random() * improvements.connectors.length)];
          improvedText = `${randomConnector} ${improvedText.toLowerCase()}`;
        }
      } else {
        // Patterns were applied, now add professional enhancements
        if (improvedText.length < 80) {
          const randomPrefix = improvements.prefixes[Math.floor(Math.random() * improvements.prefixes.length)];
          improvedText = `${randomPrefix} ${improvedText.toLowerCase()}`;
        } else {
          // For longer text, add a connector at the beginning if it doesn't already have one
          const hasConnector = improvements.connectors.some(connector => 
            improvedText.toLowerCase().startsWith(connector.toLowerCase().replace(/[.,]/g, ''))
          );
          
          if (!hasConnector && improvedText.length > 50) {
            const randomConnector = improvements.connectors[Math.floor(Math.random() * improvements.connectors.length)];
            improvedText = `${randomConnector} ${improvedText.toLowerCase()}`;
          }
        }
      }
      
      // Ensure proper capitalization - only capitalize the first letter if it's not already capitalized
      if (improvedText.charAt(0) !== improvedText.charAt(0).toUpperCase()) {
        improvedText = improvedText.charAt(0).toUpperCase() + improvedText.slice(1);
      }
      
      // Clean up any remaining issues
      improvedText = improvedText.replace(/\s+/g, ' ').trim();
      break;

    case 'expand':
      // Add connectors and details
      const randomConnector = improvements.connectors[Math.floor(Math.random() * improvements.connectors.length)];
      const randomDetail = improvements.details[Math.floor(Math.random() * improvements.details.length)];
      
      // Split into sentences and expand
      const expandSentences = improvedText.split(/[.!?]+/).filter(s => s.trim());
      if (expandSentences.length > 0) {
        const lastSentence = expandSentences[expandSentences.length - 1].trim();
        expandSentences[expandSentences.length - 1] = `${lastSentence} ${randomDetail}`;
        improvedText = expandSentences.join('. ') + '.';
      }
      
      // Add connector at the beginning if text is substantial
      if (improvedText.length > 50) {
        improvedText = `${randomConnector} ${improvedText.toLowerCase()}`;
        improvedText = improvedText.charAt(0).toUpperCase() + improvedText.slice(1);
      }
      break;

    case 'shorten':
      // Apply replacements to make text more concise
      improvements.replacements.forEach(replacement => {
        improvedText = improvedText.replace(replacement.from, replacement.to);
      });
      
      // Remove redundant phrases
      improvements.removals.forEach(removal => {
        improvedText = improvedText.replace(removal, ' ');
      });
      
      // Clean up extra spaces
      improvedText = improvedText.replace(/\s+/g, ' ').trim();
      
      // If still too long, intelligently shorten by sentences first
      const shortenSentences = improvedText.split(/[.!?]+/).filter(s => s.trim());
      
      if (shortenSentences.length > 2) {
        // Take first two complete sentences
        improvedText = shortenSentences.slice(0, 2).join('. ') + '.';
      }
      
      // If still too long after sentence-based shortening, truncate intelligently
      if (improvedText.length > 120) {
        // Find the last complete word within 120 characters
        const truncated = improvedText.substring(0, 120);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        
        if (lastSpaceIndex > 80) {
          // Cut at the last complete word
          improvedText = improvedText.substring(0, lastSpaceIndex) + '...';
        } else {
          // If no good break point, cut at 100 chars and add ellipsis
          improvedText = improvedText.substring(0, 97) + '...';
        }
      }
      
      // Ensure the result ends properly
      if (!improvedText.match(/[.!?]$/) && !improvedText.endsWith('...')) {
        improvedText = improvedText + '.';
      }
      break;

    default:
      // Default improvement - make it more professional
      improvedText = improvedText.replace(/\bwe\b/gi, 'our team');
      improvedText = improvedText.replace(/\bI\b/g, 'We');
      improvedText = improvedText.charAt(0).toUpperCase() + improvedText.slice(1);
  }

  return improvedText;
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
    case 'suggest':
      return `${basePrompt}. Provide a completely rewritten version that is more professional, specific, and results-oriented.`;
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