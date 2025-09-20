# Profina - AI-Powered Résumé Builder

Profina is a modern, AI-powered resume builder that helps professionals create stunning resumes with intelligent suggestions and professional templates.

## Features

### 🎯 Core Features
- **AI-Powered Editing**: Get intelligent suggestions to improve your resume content
- **Professional Templates**: Choose from Modern, Classic, and Minimal designs
- **Real-time Preview**: See your resume as you build it
- **PDF Export**: Download your resume as a high-quality PDF
- **Auto-save**: Your progress is automatically saved to the cloud
- **Responsive Design**: Works perfectly on all devices

### 🤖 AI Capabilities
- **Text Enhancement**: Improve, expand, or shorten your content
- **Professional Summary Generation**: AI-generated compelling summaries
- **ATS Optimization**: Ensure your resume passes Applicant Tracking Systems
- **Smart Suggestions**: Get contextual recommendations for better content

### 📄 Resume Templates
1. **Modern**: Clean, contemporary design perfect for tech and creative professionals
2. **Classic**: Traditional layout ideal for corporate and business environments  
3. **Minimal**: Simple, elegant design that lets your experience speak for itself

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Plain CSS with custom design system
- **Backend**: Firebase (Authentication, Firestore)
- **AI Services**: OpenRouter API with Sonoma Sky Alpha model
- **AI Enhancement**: Brain.js for lightweight suggestions
- **PDF Generation**: React-PDF
- **Rich Text Editing**: Tiptap
- **Routing**: React Router DOM

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Firebase project
- OpenRouter API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd profina
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp example.env .env.local
   ```
   
   Fill in your environment variables in `.env.local`:
   ```env
   # Firebase Configuration
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-firebase-app-id

   # OpenRouter Configuration
   VITE_OPENROUTER_API_KEY=your-openrouter-api-key
   VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
   VITE_AI_MODEL=sonoma/sonoma-sky-alpha

   # Site Configuration
   VITE_SITE_URL=http://localhost:5173
   VITE_SITE_NAME=Profina
   VITE_CONTACT_EMAIL=your-contact-email@example.com
   ```

4. **Firebase Setup**
   - Create a Firebase project
   - Enable Authentication (Email/Password)
   - Create a Firestore database
   - Deploy the Firestore rules:
     ```bash
     firebase deploy --only firestore:rules
     ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## Project Structure

```
src/
├── components/
│   ├── templates/          # Resume templates
│   │   ├── ModernTemplate.jsx
│   │   ├── ClassicTemplate.jsx
│   │   └── MinimalTemplate.jsx
│   ├── LandingPage.jsx     # Landing page
│   ├── Dashboard.jsx       # User dashboard
│   ├── ResumeBuilder.jsx   # Main resume builder
│   ├── ResumeForm.jsx      # Resume input form
│   ├── TemplateSelector.jsx # Template selection
│   └── ResumePreview.jsx   # Resume preview & PDF export
├── contexts/
│   └── AuthContext.jsx     # Authentication context
├── firebase/
│   ├── config.js          # Firebase configuration
│   ├── auth.js            # Authentication functions
│   └── resumes.js         # Resume CRUD operations
├── services/
│   └── aiService.js       # AI integration service
├── App.jsx                # Main app component
├── App.css                # Global styles
└── main.jsx               # App entry point
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_FIREBASE_API_KEY` | Firebase API key | Yes |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | Yes |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID | Yes |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket | Yes |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID | Yes |
| `VITE_FIREBASE_APP_ID` | Firebase app ID | Yes |
| `VITE_OPENROUTER_API_KEY` | OpenRouter API key | Yes |
| `VITE_OPENROUTER_API_URL` | OpenRouter API endpoint | Yes |
| `VITE_AI_MODEL` | AI model to use | Yes |
| `VITE_SITE_URL` | Site URL for OpenRouter | No |
| `VITE_SITE_NAME` | Site name for OpenRouter | No |
| `VITE_CONTACT_EMAIL` | Contact email | No |

## Deployment

### Vercel (Recommended)

1. **Connect your repository to Vercel**
2. **Set environment variables** in Vercel dashboard
3. **Deploy** - Vercel will automatically build and deploy

### Firebase Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

## Features in Detail

### AI-Powered Resume Enhancement
- **Smart Text Improvement**: Uses OpenRouter API with Sonoma Sky Alpha model
- **Fallback System**: Brain.js provides lightweight suggestions when AI is unavailable
- **Context-Aware**: Different enhancement types (improve, expand, shorten, rephrase)
- **Professional Summary Generation**: AI creates compelling summaries from resume data

### Resume Templates
All templates are:
- **ATS-Friendly**: Optimized for Applicant Tracking Systems
- **Mobile Responsive**: Look great on all devices
- **Print-Ready**: High-quality PDF export
- **Customizable**: Easy to modify and extend

### User Experience
- **Intuitive Interface**: Clean, modern design with light blue and white theme
- **Real-time Preview**: See changes instantly
- **Auto-save**: Never lose your work
- **Step-by-step Process**: Guided resume creation
- **Professional Results**: Industry-standard resume formats

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [your-contact-email@example.com](mailto:your-contact-email@example.com) or create an issue in the repository.

## Acknowledgments

- **OpenRouter** for AI API services
- **Firebase** for backend infrastructure
- **React** for the frontend framework
- **Tiptap** for rich text editing
- **React-PDF** for PDF generation