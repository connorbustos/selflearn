import create from "zustand";

type WikiContent = {
  contentType: string;
  data: string;
};

type WikiDataState = {
  title: string;
  content: Array<WikiContent>;
  owner: string;
};

type WikiDataActions = {
  setTitle: (namtitlee: string) => void;
  setContent: (content: Array<WikiContent>) => void;
  setOwner: (owner: string) => void;
};

export const useWikiDataStore = create<WikiDataState & WikiDataActions>(
  (set) => ({
    title: "",
    content: [],
    owner: "",

    setTitle: (title) => set({ title }),
    setContent: (content) => set({ content }),
    setOwner: (owner) => set({ owner }),
  })
);
