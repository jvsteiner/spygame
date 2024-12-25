import { initializeApp } from "firebase/app";
import { getFunctions, httpsCallable } from "firebase/functions";
import { firebaseConfig } from "@/lib/firebase";

const app = initializeApp(firebaseConfig);
const functions = getFunctions(app);

export const fetchRandomLocations = async (count: number = 5): Promise<string[]> => {
  try {
    const getRandomLocations = httpsCallable(functions, "getRandomLocations");
    const result = await getRandomLocations({ count });
    const data = result.data as { success: boolean; locations: string[]; error?: string };

    if (!data.success) {
      throw new Error(data.error || "Failed to fetch locations");
    }

    return data.locations;
  } catch (error) {
    console.error("Error fetching random locations:", error);
    return [];
  }
};
