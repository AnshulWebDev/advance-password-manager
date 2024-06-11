import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useVaultPinStore = create(
  persist(
    (set, get) => ({
      v_Pin: {},
      updateV_Pin: (v_Pin) => set({ v_Pin: v_Pin }),
    }),
    {
      name: "v_pin", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  ),
);

export default useVaultPinStore;
