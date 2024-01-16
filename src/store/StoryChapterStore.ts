import { create } from "zustand";

interface StoryChapterState {
  storyChapters: Array<StoryChapter & TimeStamp>;
  addStoryChapter: (storyChapter: Omit<StoryChapter, "id">) => void;
  editStoryChapter: ({id ,storyChapter}: {id: string, storyChapter: Omit<StoryChapter, "id">}) => void;
  deleteStoryChapter: (pk: string) => void;
  setStoryChapters: (storyChapters: Array<StoryChapter & TimeStamp>) => void;
  reset: () => void;
}

const useStoryChapterStore = create<StoryChapterState>((set) => ({
  storyChapters: [],
  addStoryChapter: (storyChapter) => {
    set((state) => ({
      storyChapters: [
        ...state.storyChapters,
        {
          id: new Date().getTime().toString(),
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString(),
          ...storyChapter,
        },
      ],
    }));
  },
  editStoryChapter: ({id,storyChapter : storyChapterP}) => {
    set((state) => ({
      storyChapters: state.storyChapters.map((storyChapter) => {
        if (storyChapter.id === id) {
          return {
            id: storyChapter.id,
            ...storyChapterP,
            updatedAt: new Date().toLocaleString(),
            createdAt: storyChapter.createdAt,
          };
        }
        return storyChapter;
      }),
    }));
  },
  deleteStoryChapter: (pk: string) => {
    set((state) => ({
      storyChapters: state.storyChapters.filter(
        (storyChapter) => storyChapter.id !== pk
      ),
    }));
  },
  setStoryChapters: (storyChapters) => {
    set({ storyChapters });
  },
  reset: () => {
    set({
      storyChapters: [],
    });
  },
}));

export default useStoryChapterStore;
