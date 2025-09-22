import { 
  doc, 
  setDoc, 
  getDoc, 
  updateDoc, 
  collection, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  increment
} from 'firebase/firestore';
import { db } from './config';

// Superuser email - this should be set in environment variables in production
const SUPERUSER_EMAIL = import.meta.env.VITE_FIREBASE_SUPERUSER_EMAIL;

// Resume limits from environment variables
const FREE_RESUMES_LIMIT = parseInt(import.meta.env.VITE_MAX_RESUMES_FREE) || 10;
const PREMIUM_RESUMES_LIMIT = parseInt(import.meta.env.VITE_MAX_RESUMES_PREMIUM) || -1; // -1 means unlimited

// Check if user is superuser
export const isSuperuser = (user) => {
  return user && user.email === SUPERUSER_EMAIL;
};

// Get user subscription data
export const getUserSubscription = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    const initialSubscription = {
      plan: 'free',
      status: 'active',
      resumesUsed: 0,
      resumesLimit: FREE_RESUMES_LIMIT,
      subscriptionDate: null,
      nextBillingDate: null,
      paystackCustomerId: null,
      paystackSubscriptionId: null,
      createdAt: serverTimestamp()
    };
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // If no subscription data exists, initialize it
      if (!userData.subscription) {
        await updateDoc(userRef, {
          subscription: initialSubscription
        });
        
        return initialSubscription;
      }
      
      return {
        plan: userData.subscription.plan || 'free',
        status: userData.subscription.status || 'active',
        resumesUsed: userData.subscription.resumesUsed || 0,
        resumesLimit: userData.subscription.resumesLimit || FREE_RESUMES_LIMIT,
        subscriptionDate: userData.subscription.subscriptionDate || null,
        nextBillingDate: userData.subscription.nextBillingDate || null,
        paystackCustomerId: userData.subscription.paystackCustomerId || null,
        paystackSubscriptionId: userData.subscription.paystackSubscriptionId || null
      };
    } else {
      // User document doesn't exist, create it with initial subscription
      await setDoc(userRef, {
        subscription: initialSubscription,
        createdAt: serverTimestamp()
      });
      
      return initialSubscription;
    }
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
};

// Update user subscription
export const updateUserSubscription = async (userId, subscriptionData) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // First check if the user document exists
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create the user document with the subscription data
      await setDoc(userRef, {
        subscription: {
          ...subscriptionData,
          updatedAt: serverTimestamp()
        },
        createdAt: serverTimestamp()
      });
    } else {
      // Update existing document
      await updateDoc(userRef, {
        subscription: {
          ...subscriptionData,
          updatedAt: serverTimestamp()
        }
      });
    }
  } catch (error) {
    console.error('Error updating user subscription:', error);
    throw error;
  }
};

// Create subscription after successful payment
export const createSubscription = async (userId, paymentData) => {
  try {
    const subscriptionData = {
      plan: 'premium',
      status: 'active',
      resumesUsed: 0,
      resumesLimit: parseInt(import.meta.env.VITE_MAX_RESUMES_PREMIUM) || -1, // -1 means unlimited
      subscriptionDate: serverTimestamp(),
      nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      paystackCustomerId: paymentData.customerId,
      paystackSubscriptionId: paymentData.subscriptionId,
      paymentReference: paymentData.reference
    };
    
    await updateUserSubscription(userId, subscriptionData);
    return subscriptionData;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

// Increment resume usage
export const incrementResumeUsage = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // First check if the user document exists
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create the user document with initial subscription data
      const initialSubscription = {
        plan: 'free',
        status: 'active',
        resumesUsed: 1,
        resumesLimit: FREE_RESUMES_LIMIT,
        subscriptionDate: null,
        nextBillingDate: null,
        paystackCustomerId: null,
        paystackSubscriptionId: null,
        createdAt: serverTimestamp()
      };
      
      await setDoc(userRef, {
        subscription: initialSubscription,
        createdAt: serverTimestamp()
      });
    } else {
      // Update existing document
      await updateDoc(userRef, {
        'subscription.resumesUsed': increment(1),
        'subscription.updatedAt': serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error incrementing resume usage:', error);
    throw error;
  }
};

// Sync resume usage with actual resume count
export const syncResumeUsage = async (userId, actualCount) => {
  try {
    const userRef = doc(db, 'users', userId);
    
    // First check if the user document exists
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      // Create the user document with initial subscription data
      const initialSubscription = {
        plan: 'free',
        status: 'active',
        resumesUsed: actualCount,
        resumesLimit: FREE_RESUMES_LIMIT,
        subscriptionDate: null,
        nextBillingDate: null,
        paystackCustomerId: null,
        paystackSubscriptionId: null,
        createdAt: serverTimestamp()
      };
      
      await setDoc(userRef, {
        subscription: initialSubscription,
        createdAt: serverTimestamp()
      });
    } else {
      // Update existing document
      await updateDoc(userRef, {
        'subscription.resumesUsed': actualCount,
        'subscription.updatedAt': serverTimestamp()
      });
    }
  } catch (error) {
    console.error('Error syncing resume usage:', error);
    throw error;
  }
};

// Check if user can create resume
export const canCreateResume = async (user) => {
  try {
    // Superuser has unlimited access
    if (isSuperuser(user)) {
      return { allowed: true, reason: 'superuser' };
    }

    const subscription = await getUserSubscription(user.uid);
    if (!subscription) {
      return { allowed: false, reason: 'no_subscription' };
    }

    // Check if subscription is active
    if (subscription.status !== 'active') {
      return { allowed: false, reason: 'inactive_subscription' };
    }

    // Check usage limits
    if (subscription.plan === 'free') {
      if (subscription.resumesUsed >= subscription.resumesLimit) {
        return { 
          allowed: false, 
          reason: 'limit_reached',
          details: `You've used ${subscription.resumesUsed}/${subscription.resumesLimit} free resumes. Upgrade to premium for unlimited resumes.`,
          used: subscription.resumesUsed,
          limit: subscription.resumesLimit
        };
      }
    }

    return { 
      allowed: true, 
      reason: 'within_limits',
      used: subscription.resumesUsed,
      limit: subscription.resumesLimit
    };
  } catch (error) {
    console.error('Error checking resume creation permission:', error);
    return { allowed: false, reason: 'error' };
  }
};

// Get all users for superuser dashboard
export const getAllUsers = async () => {
  try {
    const usersSnapshot = await getDocs(collection(db, 'users'));
    const users = [];
    
    usersSnapshot.forEach((doc) => {
      const userData = doc.data();
      users.push({
        id: doc.id,
        email: userData.email,
        displayName: userData.displayName,
        subscription: userData.subscription || {
          plan: 'free',
          status: 'active',
          resumesUsed: 0,
          resumesLimit: parseInt(import.meta.env.VITE_MAX_RESUMES_FREE) || 10
        },
        createdAt: userData.createdAt,
        updatedAt: userData.updatedAt
      });
    });
    
    return users.sort((a, b) => new Date(b.createdAt?.toDate()) - new Date(a.createdAt?.toDate()));
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

// Get subscription statistics
export const getSubscriptionStats = async () => {
  try {
    const users = await getAllUsers();
    
    const stats = {
      totalUsers: users.length,
      freeUsers: users.filter(user => user.subscription.plan === 'free').length,
      premiumUsers: users.filter(user => user.subscription.plan === 'premium').length,
      totalResumes: users.reduce((sum, user) => sum + (user.subscription.resumesUsed || 0), 0),
      monthlyRevenue: users.filter(user => user.subscription.plan === 'premium').length * (import.meta.env.VITE_PREMIUM_PRICE_GHS || 20) // Premium price per user
    };
    
    return stats;
  } catch (error) {
    console.error('Error getting subscription stats:', error);
    throw error;
  }
};

// Cancel subscription
export const cancelSubscription = async (userId) => {
  try {
    const subscriptionData = {
      status: 'cancelled',
      cancelledAt: serverTimestamp()
    };
    
    await updateUserSubscription(userId, subscriptionData);
  } catch (error) {
    console.error('Error cancelling subscription:', error);
    throw error;
  }
};
