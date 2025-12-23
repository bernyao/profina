// Maintained by benyao
// Simple AI service without Brain.js dependency
// This is a fallback version that provides basic text enhancement

// OpenRouter API service
const OPENROUTER_API_URL = import.meta.env.VITE_OPENROUTER_API_URL;
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const AI_MODEL = import.meta.env.VITE_AI_MODEL || 'meta-llama/llama-3.3-8b-instruct:free';

// Simple word replacement suggestions
const wordReplacements = {
  'experienced': 'seasoned professional with extensive experience',
  'good at': 'proficient in',
  'worked on': 'spearheaded',
  'helped with': 'collaborated on',
  'made': 'developed',
  'did': 'executed',
  'good': 'excellent',
  'bad': 'challenging',
  'big': 'significant',
  'small': 'focused',
  'helped': 'assisted',
  'worked': 'collaborated',
  'used': 'utilized',
  'made sure': 'ensured',
  'got': 'obtained',
  'tried': 'attempted',
  'wanted': 'sought',
  'needed': 'required',
  'found': 'discovered'
};

// AI-powered text enhancement using OpenRouter (only for 'suggest' action)
export const enhanceText = async (text, action = 'improve') => {
  // For simple text improvements, use local patterns (no API calls)
  if (action === 'improve' || action === 'expand' || action === 'shorten') {
    return {
      success: true,
      enhancedText: getSimpleSuggestion(text, action)
    };
  }
  
  // For 'suggest' action, use Llama 3 API
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
      return {
        success: true,
        enhancedText: data.choices[0].message.content.trim()
      };
    } catch (error) {
      console.error('AI enhancement error:', error);
      return {
        success: false,
        error: error.message,
        fallback: getSimpleSuggestion(text, 'improve')
      };
    }
  }
  
  // Default fallback
  return {
    success: true,
    enhancedText: getSimpleSuggestion(text, action)
  };
};

// Get simple suggestion as fallback
export const getSimpleSuggestion = (text, action = 'improve') => {
  let enhancedText = text;
  
  // Apply word replacements
  Object.entries(wordReplacements).forEach(([original, replacement]) => {
    const regex = new RegExp(`\\b${original}\\b`, 'gi');
    enhancedText = enhancedText.replace(regex, replacement);
  });
  
  // Add some basic improvements
  enhancedText = enhancedText
    .replace(/\bI\b/g, '') // Remove "I" statements
    .replace(/\bmy\b/g, '') // Remove "my" statements
    .replace(/\bme\b/g, '') // Remove "me" statements
    .replace(/\s+/g, ' ') // Clean up extra spaces
    .trim();
  
  // Handle different actions
  switch (action) {
    case 'expand':
      // Add connectors and details for expansion
      const connectors = ['Furthermore,', 'Additionally,', 'Moreover,', 'In addition,'];
      const details = [
        'which significantly enhances the overall effectiveness.',
        'providing robust and scalable solutions.',
        'ensuring optimal performance and satisfaction.',
        'delivering measurable results and long-term value.'
      ];
      
      const randomConnector = connectors[Math.floor(Math.random() * connectors.length)];
      const randomDetail = details[Math.floor(Math.random() * details.length)];
      
      enhancedText = `${randomConnector} ${enhancedText.toLowerCase()} ${randomDetail}`;
      break;
      
    case 'shorten':
      // Make text more concise
      enhancedText = enhancedText
        .replace(/\s+and\s+also\s+/gi, ' and ')
        .replace(/\s+in\s+order\s+to\s+/gi, ' to ')
        .replace(/\s+so\s+that\s+/gi, ' so ')
        .replace(/\s+very\s+/gi, ' ')
        .replace(/\s+really\s+/gi, ' ')
        .replace(/\s+quite\s+/gi, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      
      // If still too long, truncate intelligently
      if (enhancedText.length > 120) {
        const truncated = enhancedText.substring(0, 120);
        const lastSpaceIndex = truncated.lastIndexOf(' ');
        
        if (lastSpaceIndex > 80) {
          enhancedText = enhancedText.substring(0, lastSpaceIndex) + '...';
        } else {
          enhancedText = enhancedText.substring(0, 97) + '...';
        }
      }
      break;
      
    case 'improve':
    default:
      // Default improvements already applied above
      break;
  }
  
  // Ensure proper capitalization
  if (enhancedText.charAt(0) !== enhancedText.charAt(0).toUpperCase()) {
    enhancedText = enhancedText.charAt(0).toUpperCase() + enhancedText.slice(1);
  }
  
  return enhancedText;
};

// Generate prompt based on action type
const getPromptForAction = (text, action) => {
  const basePrompt = `Please ${action} the following resume text to make it more professional and impactful:`;
  
  switch (action) {
    case 'expand':
      return `${basePrompt} "${text}"\n\nMake it more detailed and comprehensive while maintaining professionalism.`;
    case 'shorten':
      return `${basePrompt} "${text}"\n\nMake it more concise and to the point while keeping the key information.`;
    case 'suggest':
      return `${basePrompt} "${text}"\n\nProvide a completely rewritten version that is more professional, specific, and results-oriented.`;
    case 'rephrase':
      return `${basePrompt} "${text}"\n\nRephrase it with different wording while maintaining the same meaning.`;
    case 'improve':
    default:
      return `${basePrompt} "${text}"\n\nImprove the language, make it more professional, and ensure it's ATS-friendly.`;
  }
};

// Generate resume summary using AI
export const generateResumeSummary = async (resumeData) => {
  try {
    const prompt = `Based on the following resume information, write a compelling professional summary (2-3 sentences) that highlights the candidate's strengths and value proposition. Do not include any preamble like "Here is a professional summary" - just provide the summary directly:
    
    Name: ${resumeData.name || 'N/A'}
    Title: ${resumeData.title || 'N/A'}
    Experience: ${resumeData.experience?.map(exp => `${exp.position} at ${exp.company} (${exp.duration})`).join(', ') || 'N/A'}
    Skills: ${resumeData.skills?.join(', ') || 'N/A'}
    Education: ${resumeData.education?.map(edu => `${edu.degree} from ${edu.institution}`).join(', ') || 'N/A'}`;

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
            content: 'You are a professional resume writer. Create compelling, ATS-friendly professional summaries that highlight a candidate\'s value proposition.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      success: true,
      summary: data.choices[0].message.content.trim()
    };
  } catch (error) {
    console.error('AI summary generation error:', error);
    return {
      success: false,
      error: error.message,
      fallback: generateFallbackSummary(resumeData)
    };
  }
};

// Generate fallback summary
const generateFallbackSummary = (resumeData) => {
  const name = resumeData.name || 'Professional';
  const title = resumeData.title || 'Professional';
  const experienceCount = resumeData.experience?.length || 0;
  const skillsCount = resumeData.skills?.length || 0;
  
  if (experienceCount > 0 && skillsCount > 0) {
    return `${name} is a ${title} with ${experienceCount} years of experience. Skilled in ${skillsCount} key areas with a proven track record of delivering results.`;
  } else if (experienceCount > 0) {
    return `${name} is a ${title} with ${experienceCount} years of experience and a proven track record of delivering results.`;
  } else if (skillsCount > 0) {
    return `${name} is a ${title} skilled in ${skillsCount} key areas with a proven track record of delivering results.`;
  } else {
    return `${name} is a ${title} with a proven track record of delivering results.`;
  }
};
