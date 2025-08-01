import { Blog } from "@/types/blog";
import { createSlice } from "@reduxjs/toolkit";

interface BlogState {
  allBlogs: Blog[];
  randomBlogs: Blog[];
  singleBlog: Blog | undefined;
  blogsForAuthor: Blog[];
  blogsForAdmin: Blog[];
  selectedBlog: Blog | null;
  searchedQuery: string | "";
  isLoading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  allBlogs: [],
  randomBlogs: [],
  singleBlog: undefined,
  blogsForAuthor: [],
  blogsForAdmin: [],
  selectedBlog: null,
  searchedQuery: "",
  isLoading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "job",
  initialState,
  reducers: {
    setAllBlogs: (state, action) => {
      state.allBlogs = action.payload;
    },
    setRandomBlogs: (state, action) => {
      state.randomBlogs = action.payload;
    },
    setSingleBlog: (state, action) => {
      state.singleBlog = action.payload;
    },
    setBlogsForAuthor: (state, action) => {
      state.blogsForAuthor = action.payload;
    },
    setBlogsForAdmin: (state, action) => {
      state.blogsForAdmin = action.payload;
    },
    setSelectedBlog: (state, action) => {
      state.selectedBlog = action.payload;
    },
    setSearchedQuery: (state, action) => {
      state.searchedQuery = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setAllBlogs,
  setRandomBlogs,
  setSingleBlog,
  setBlogsForAuthor,
  setBlogsForAdmin,
  setSelectedBlog,
  setSearchedQuery,
  setLoading,
  setError,
  resetError,
} = blogSlice.actions;
export default blogSlice.reducer;
