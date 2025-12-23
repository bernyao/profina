// Maintained by benyao
import { 
  collection, 
  addDoc, 
  getDocs, 
  getDoc,
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

const RESUMES_COLLECTION = 'resumes';

// Create a new resume
export const createResume = async (userId, resumeData) => {
  try {
    const docRef = await addDoc(collection(db, RESUMES_COLLECTION), {
      ...resumeData,
      userId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all resumes for a user
export const getUserResumes = async (userId) => {
  try {
    const q = query(
      collection(db, RESUMES_COLLECTION),
      where('userId', '==', userId),
      orderBy('updatedAt', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const resumes = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { success: true, resumes };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Update a resume
export const updateResume = async (resumeId, resumeData) => {
  try {
    const resumeRef = doc(db, RESUMES_COLLECTION, resumeId);
    await updateDoc(resumeRef, {
      ...resumeData,
      updatedAt: serverTimestamp()
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Delete a resume
export const deleteResume = async (resumeId) => {
  try {
    await deleteDoc(doc(db, RESUMES_COLLECTION, resumeId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get a single resume
export const getResume = async (resumeId) => {
  try {
    const resumeRef = doc(db, RESUMES_COLLECTION, resumeId);
    const resumeSnap = await getDoc(resumeRef);
    if (resumeSnap.exists()) {
      return { success: true, resume: { id: resumeSnap.id, ...resumeSnap.data() } };
    } else {
      return { success: false, error: 'Resume not found' };
    }
  } catch (error) {
    return { success: false, error: error.message };
  }
};
