#!/bin/bash

# Profina Firebase Deployment Script
echo "🚀 Deploying Profina to Firebase..."

# Check if Firebase CLI is installed
if ! command -v firebase &> /dev/null; then
    echo "❌ Firebase CLI is not installed. Please install it first:"
    echo "npm install -g firebase-tools"
    exit 1
fi

# Check if user is logged in
if ! firebase projects:list &> /dev/null; then
    echo "❌ Please login to Firebase first:"
    echo "firebase login"
    exit 1
fi

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please fix the errors and try again."
    exit 1
fi

# Deploy Firestore rules
echo "📋 Deploying Firestore rules..."
firebase deploy --only firestore:rules

if [ $? -ne 0 ]; then
    echo "❌ Firestore rules deployment failed."
    exit 1
fi

# Deploy to Firebase Hosting
echo "🌐 Deploying to Firebase Hosting..."
firebase deploy --only hosting

if [ $? -eq 0 ]; then
    echo "✅ Deployment successful!"
    echo "🎉 Profina is now live!"
else
    echo "❌ Hosting deployment failed."
    exit 1
fi
