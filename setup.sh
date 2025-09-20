#!/bin/bash

# Profina Setup Script
echo "🚀 Setting up Profina - AI-Powered Resume Builder..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    echo "Visit: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18+ is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js $(node -v) detected"

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed successfully"

# Create .env.local from example.env
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local from example.env..."
    cp example.env .env.local
    echo "✅ .env.local created"
    echo "⚠️  Please update .env.local with your actual environment variables"
else
    echo "✅ .env.local already exists"
fi

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "⚠️  Firebase CLI is not installed."
    echo "To install: npm install -g firebase-tools"
    echo "Then run: firebase login"
else
    echo "✅ Firebase CLI detected"
fi

echo ""
echo "🎉 Setup complete!"
echo ""
echo "Next steps:"
echo "1. Update .env.local with your Firebase and OpenRouter credentials"
echo "2. Run 'firebase login' if you haven't already"
echo "3. Run 'npm run dev' to start the development server"
echo "4. Visit http://localhost:5173 to see your app"
echo ""
echo "For deployment:"
echo "1. Run './deploy-firebase.sh' to deploy to Firebase"
echo "2. Or connect to Vercel for automatic deployments"
