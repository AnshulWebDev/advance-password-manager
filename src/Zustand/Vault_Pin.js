import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

// Define a function to create storage with expiry
const createExpiryStorage = (storage, expiryTime) => {
  return {
    getItem: (name) => {
      const item = storage.getItem(name);
      if (!item) return null;

      const { value, expiry } = JSON.parse(item);
      if (Date.now() > expiry) {
        storage.removeItem(name);
        return null;
      }
      return value;
    },
    setItem: (name, value) => {
      const item = {
        value,
        expiry: Date.now() + expiryTime,
      };
      storage.setItem(name, JSON.stringify(item));
    },
    removeItem: (name) => {
      storage.removeItem(name);
    },
  };
};

// Define expiry time in milliseconds (e.g., 30 minutes)
const EXPIRY_TIME = 2 * 60 * 1000; // 30 minutes

// Create the Zustand store with persist and custom storage
const useVaultPinStore = create(
  persist(
    (set) => ({
      v_Pin: {},
      updateV_Pin: (v_Pin) => set({ v_Pin }),
    }),
    {
      name: "v_pin", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() =>
        createExpiryStorage(sessionStorage, EXPIRY_TIME)
      ),
    }
  )
);

export default useVaultPinStore;
