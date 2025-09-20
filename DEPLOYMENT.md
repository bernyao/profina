# Profina Deployment Guide

This guide covers deploying Profina to various platforms.

## Prerequisites

- Node.js 18+
- Firebase project
- OpenRouter API key
- Git repository

## Environment Setup

1. **Copy environment file**
   ```bash
   cp example.env .env.local
   ```

2. **Update environment variables in `.env.local`**
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
   VITE_SITE_URL=https://your-domain.com
   VITE_SITE_NAME=Profina
   VITE_CONTACT_EMAIL=your-email@example.com
   ```

## Firebase Setup

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase project**
   ```bash
   firebase init
   ```
   - Select Firestore and Hosting
   - Choose your Firebase project
   - Use existing `firestore.rules` and `firestore.indexes.json`
   - Set public directory to `dist`
   - Configure as single-page app: Yes

4. **Deploy Firestore rules**
   ```bash
   firebase deploy --only firestore:rules
   ```

## Deployment Options

### Option 1: Vercel (Recommended)

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect repository to Vercel
   - Set environment variables in Vercel dashboard

2. **Environment Variables in Vercel**
   ```
   VITE_FIREBASE_API_KEY=your-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=your-firebase-app-id
   VITE_OPENROUTER_API_KEY=your-openrouter-api-key
   VITE_OPENROUTER_API_URL=https://openrouter.ai/api/v1/chat/completions
   VITE_AI_MODEL=sonoma/sonoma-sky-alpha
   VITE_SITE_URL=https://your-vercel-app.vercel.app
   VITE_SITE_NAME=Profina
   VITE_CONTACT_EMAIL=your-email@example.com
   ```

3. **Deploy**
   - Vercel will automatically deploy on every push to main branch

### Option 2: Firebase Hosting

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase**
   ```bash
   firebase deploy
   ```

3. **Or use the deployment script**
   ```bash
   chmod +x deploy-firebase.sh
   ./deploy-firebase.sh
   ```

### Option 3: Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Add environment variables in Netlify dashboard

### Option 4: Manual Deployment

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Upload `dist` folder** to your hosting provider

## Post-Deployment

1. **Test the application**
   - Visit your deployed URL
   - Test user registration and login
   - Test resume creation and PDF export

2. **Configure Firebase Authentication**
   - Enable Email/Password authentication in Firebase Console
   - Add your domain to authorized domains

3. **Set up Firestore Security Rules**
   - Deploy the provided `firestore.rules`
   - Test data access and security

4. **Monitor usage**
   - Check Firebase Console for usage statistics
   - Monitor OpenRouter API usage and costs

## Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (18+ required)
   - Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`

2. **Environment variables not working**
   - Ensure all variables start with `VITE_`
   - Check for typos in variable names
   - Restart development server after changes

3. **Firebase connection issues**
   - Verify Firebase configuration
   - Check if Firebase project is active
   - Ensure Firestore rules are deployed

4. **PDF generation fails**
   - Check browser console for errors
   - Ensure html2canvas and jsPDF are properly installed
   - Test with different browsers

5. **AI features not working**
   - Verify OpenRouter API key
   - Check API key permissions
   - Monitor API usage limits

### Performance Optimization

1. **Enable Firebase caching**
   - Configure appropriate cache headers
   - Use Firebase CDN for static assets

2. **Optimize bundle size**
   - Use dynamic imports for heavy components
   - Implement code splitting

3. **Monitor API usage**
   - Set up OpenRouter usage alerts
   - Implement rate limiting if needed

## Security Considerations

1. **Environment Variables**
   - Never commit `.env.local` to version control
   - Use secure methods to store production secrets

2. **Firebase Security Rules**
   - Regularly review and update Firestore rules
   - Test rules with Firebase Emulator

3. **API Security**
   - Monitor OpenRouter API usage
   - Implement user authentication checks
   - Add rate limiting for AI features

## Monitoring and Analytics

1. **Firebase Analytics**
   - Enable Firebase Analytics
   - Track user engagement and feature usage

2. **Error Monitoring**
   - Set up error tracking (Sentry, Bugsnag)
   - Monitor console errors and user reports

3. **Performance Monitoring**
   - Use Firebase Performance Monitoring
   - Track page load times and user interactions

## Support

For deployment issues:
1. Check the troubleshooting section above
2. Review Firebase and Vercel documentation
3. Check the project's GitHub issues
4. Contact support at your-email@example.com
