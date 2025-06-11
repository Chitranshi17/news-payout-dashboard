// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./slice/newsSlice";
import blogReducer from "./slice/blogSlice";

const store = configureStore({
  reducer: {
    news: newsReducer,
    blogs: blogReducer,
  },
});

export default store;
