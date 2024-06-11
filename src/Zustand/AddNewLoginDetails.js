import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const saveNewLoginsStore = create(
  persist(
    (set, get) => ({
      New_LoginDetails: {},
      updateNewLoginDetails: (New_LoginDetails) =>
        set({ New_LoginDetails: New_LoginDetails }),
    }),
    {
      name: "New_LoginDetails", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default saveNewLoginsStore;
