import { WikiContent, WikiData } from "@/app/types/Wiki";
import create from "zustand";

type WikiDataState = WikiData;

type WikiDataActions = {
  setID: (id: string) => void;
  setTitle: (title: string) => void;
  setContent: (content: Array<WikiContent>) => void;
  setOwner: (owner: string) => void;
};

export const useWikiDataStore = create<WikiDataState & WikiDataActions>(
  (set) => ({
    id: "",
    title: "",
    content: [],
    owner: "",

    setID: (id) => set({ id }),
    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setOwner: (owner) => set({ owner }),
  })
);
