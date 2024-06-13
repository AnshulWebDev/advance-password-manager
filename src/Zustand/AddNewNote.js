import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const saveNoteStore = create(
  persist(
    (set, get) => ({
      New_Note: {},
      updateNewNote: (New_Note) =>
        set({ New_Note: New_Note }),
    }),
    {
      name: "New_Note", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);

export default saveNoteStore;
