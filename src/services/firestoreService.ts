import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { SubmissionRecord } from "@/types";

// ---------------------------------------------------------------------------
// User Profile
// ---------------------------------------------------------------------------

export interface UserProfile {
  displayName: string;
  email: string;
  photoURL: string | null;
  solvedProblems: number[];
  defaultLang: string;
  editorTheme: string;
  streak: number;
  lastActiveDate: string;
  totalSubmissions: number;
  createdAt: unknown;
  updatedAt: unknown;
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  const docRef = doc(db, "users", uid);
  const snapshot = await getDoc(docRef);
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null;
};

export const createUserProfile = async (
  uid: string,
  data: { displayName: string; email: string; photoURL: string | null },
): Promise<void> => {
  const docRef = doc(db, "users", uid);
  const existing = await getDoc(docRef);
  if (existing.exists()) return;

  await setDoc(docRef, {
    ...data,
    solvedProblems: [],
    defaultLang: "Python",
    editorTheme: "tokyo-night",
    streak: 0,
    lastActiveDate: new Date().toISOString().split("T")[0],
    totalSubmissions: 0,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const updateUserProfile = async (
  uid: string,
  data: Partial<UserProfile>,
): Promise<void> => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, { ...data, updatedAt: serverTimestamp() });
};

// ---------------------------------------------------------------------------
// Solved Problems
// ---------------------------------------------------------------------------

export const markProblemSolved = async (uid: string, problemId: number): Promise<void> => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    solvedProblems: arrayUnion(problemId),
    updatedAt: serverTimestamp(),
  });
};

export const markProblemUnsolved = async (uid: string, problemId: number): Promise<void> => {
  const docRef = doc(db, "users", uid);
  await updateDoc(docRef, {
    solvedProblems: arrayRemove(problemId),
    updatedAt: serverTimestamp(),
  });
};

// ---------------------------------------------------------------------------
// Submissions
// ---------------------------------------------------------------------------

export const saveSubmission = async (
  uid: string,
  submission: SubmissionRecord,
): Promise<void> => {
  const subRef = doc(db, "users", uid, "submissions", submission.id);
  await setDoc(subRef, {
    ...submission,
    createdAt: serverTimestamp(),
  });

  // Increment total submissions
  const userRef = doc(db, "users", uid);
  const profile = await getDoc(userRef);
  if (profile.exists()) {
    const current = profile.data().totalSubmissions ?? 0;
    await updateDoc(userRef, {
      totalSubmissions: current + 1,
      updatedAt: serverTimestamp(),
    });
  }
};

export const getSubmissions = async (
  uid: string,
  problemId?: number,
  maxResults = 50,
): Promise<SubmissionRecord[]> => {
  const subsRef = collection(db, "users", uid, "submissions");
  const q = query(subsRef, orderBy("timestamp", "desc"), limit(maxResults));
  const snapshot = await getDocs(q);

  const submissions = snapshot.docs.map((d) => d.data() as SubmissionRecord);
  if (problemId !== undefined) {
    return submissions.filter((s) => s.problemId === problemId);
  }
  return submissions;
};

// ---------------------------------------------------------------------------
// Notes
// ---------------------------------------------------------------------------

export const saveNote = async (
  uid: string,
  problemId: number,
  note: string,
): Promise<void> => {
  const noteRef = doc(db, "users", uid, "notes", String(problemId));
  await setDoc(noteRef, { problemId, note, updatedAt: serverTimestamp() });
};

export const getNote = async (uid: string, problemId: number): Promise<string> => {
  const noteRef = doc(db, "users", uid, "notes", String(problemId));
  const snapshot = await getDoc(noteRef);
  return snapshot.exists() ? snapshot.data().note : "";
};

// ---------------------------------------------------------------------------
// Leaderboard
// ---------------------------------------------------------------------------

export interface LeaderboardEntry {
  uid: string;
  displayName: string;
  photoURL: string | null;
  solvedCount: number;
  totalSubmissions: number;
  streak: number;
}

export const getLeaderboard = async (maxResults = 50): Promise<LeaderboardEntry[]> => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, orderBy("totalSubmissions", "desc"), limit(maxResults));
  const snapshot = await getDocs(q);

  return snapshot.docs.map((d) => {
    const data = d.data();
    return {
      uid: d.id,
      displayName: data.displayName ?? "Anonymous",
      photoURL: data.photoURL ?? null,
      solvedCount: data.solvedProblems?.length ?? 0,
      totalSubmissions: data.totalSubmissions ?? 0,
      streak: data.streak ?? 0,
    };
  });
};
