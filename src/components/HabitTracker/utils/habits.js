import { db } from "../../../utils/firebase";
import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

export const addHabit = async (uid, habit) => {
  try {
    const habitsRef = collection(db, "users", uid, "habits");
    const newHabit = {
      ...habit,
      createdAt: Date.now(),
    };
    await addDoc(habitsRef, newHabit);
    console.log("Habit added");
  } catch (error) {
    console.error(error);
  }
};

export const getHabits = async (uid) => {
  try {
    const habitsRef = collection(db, "users", uid, "habits");
    const habitsSnapshot = await getDocs(habitsRef);
    const habits = habitsSnapshot.docs.map((docSnap) => ({
      ...docSnap.data(),
      id: docSnap.id,
    }));
    console.log("Habits fetched", habits);
    return habits;
  } catch (error) {
    console.error(error);
  }
};

export const updateHabit = async (uid, habitId, updatedData) => {
  try {
    const habitRef = doc(db, "users", uid, "habits", habitId);
    const habitSnapshot = await getDoc(habitRef);
    if (habitSnapshot.exists()) {
      const newHabit = {
        ...habitSnapshot.data(),
        name: updatedData,
      };
      await setDoc(habitRef, newHabit);
      console.log("Habit updated");
    } else {
      console.error("Habit not found");
    }
  } catch (error) {
    console.error(error);
  }
};

export const deleteHabit = async (uid, habitId) => {
  try {
    const habitRef = doc(db, "users", uid, "habits", habitId);
    await deleteDoc(habitRef);
    console.log("Habit deleted");
  } catch (error) {
    console.error(error);
  }
};

export const toggleCompletion = async (uid, habitId) => {
  try {
    const habitRef = doc(db, "users", uid, "habits", habitId);
    const habitSnapshot = await getDoc(habitRef);
    const isCompleted = habitSnapshot.data().isCompleted;
    await updateDoc(habitRef, { isCompleted: !isCompleted });
  } catch (error) {
    console.error(error);
  }
};

export const maintainHabit = async (uid, habitId) => {
  try {
    const habitRef = doc(db, "users", uid, "habits", habitId);
    const habitSnapshot = await getDoc(habitRef);
    const habitData = habitSnapshot.data();
    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (
      !habitData.previousDaysMaintained.includes(currentDate) &&
      currentDate !== habitData.lastMaintained
    ) {
      const newStreak =
        currentDate - habitData.lastMaintained === 24 * 60 * 60 * 1000
          ? habitData.streak + 1
          : 1;

      await updateDoc(habitRef, {
        previousDaysMaintained: [
          ...habitData.previousDaysMaintained,
          currentDate,
        ],
        streak: newStreak,
        lastMaintained: currentDate,
      });
    }
  } catch (error) {
    console.error(error);
  }
};

export const resetStreak = async (uid, habitId) => {
  try {
    const habitRef = doc(db, "users", uid, "habits", habitId);
    const habitSnapshot = await getDoc(habitRef);
    const habitData = habitSnapshot.data();
    const currentDate = new Date().setHours(0, 0, 0, 0);

    if (currentDate - habitData.lastMaintained > 2 * 24 * 60 * 60 * 1000) {
      await updateDoc(habitRef, { streak: 0 });
    }
  } catch (error) {
    console.error(error);
  }
};
