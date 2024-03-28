import create from "zustand";

type UserDataState = {
  name: string;
  password: string;
  username: string;
};

type UserDataActions = {
  setName: (name: string) => void;
  setPassword: (password: string) => void;
  setUsername: (username: string) => void;
};

export const useUserDataStore = create<UserDataState & UserDataActions>(
  (set) => ({
    name: "",
    password: "",
    username: "",

    setName: (name) => set({ name }),
    setPassword: (password) => set({ password }),
    setUsername: (username) => set({ username }),
  })
);
