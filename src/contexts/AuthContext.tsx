import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as firebaseSignOut,
  updateProfile,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";
import { createUserProfile, getUserProfile } from "@/services/firestoreService";
import { useEditorStore } from "@/store/editorStore";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (email: string, password: string, displayName: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const syncProfileToStore = async (user: User) => {
  try {
    // Create profile if it doesn't exist
    await createUserProfile(user.uid, {
      displayName: user.displayName || "User",
      email: user.email || "",
      photoURL: user.photoURL,
    });

    // Load profile data and sync solved problems to local store
    const profile = await getUserProfile(user.uid);
    if (profile) {
      const store = useEditorStore.getState();
      // Merge cloud solved problems with local
      const merged = Array.from(new Set([...store.solvedProblems, ...profile.solvedProblems]));
      if (merged.length !== store.solvedProblems.length) {
        useEditorStore.setState({ solvedProblems: merged });
      }
      if (profile.defaultLang) {
        useEditorStore.setState({ defaultLang: profile.defaultLang });
      }
    }
  } catch {
    // Firestore not configured or offline — continue with local state
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
      if (firebaseUser) {
        await syncProfileToStore(firebaseUser);
      }
    });
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpWithEmail = async (email: string, password: string, displayName: string) => {
    const credential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(credential.user, { displayName });
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signInWithGoogle, signInWithEmail, signUpWithEmail, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};
