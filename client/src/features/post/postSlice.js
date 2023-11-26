import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addComment,
  createPost,
  deletePost,
  editPost,
  fetchPosts,
  likePost,
  removeComment,
  unlikePost,
} from "./postAPI";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const getPostsAsync = createAsyncThunk("post/fetchPosts", async () => {
  const { data } = await fetchPosts();
  return data.posts;
});

export const createPostAsync = createAsyncThunk(
  "post/createPost",
  async ({ caption, image }) => {
    const { data } = await createPost({ caption, image });
    console.log(data.post);
    return data.post;
  }
);

export const likePostAsync = createAsyncThunk(
  "post/likePost",
  async (postId) => {
    const data = await likePost(postId);
    return data.post;
  }
);

export const unlikePostAsync = createAsyncThunk(
  "post/unlikePost",
  async (postId) => {
    const data = await unlikePost(postId);
    return data.post;
  }
);

export const deletePostAsync = createAsyncThunk(
  "post/deletePost",
  async (postId) => {
    const { data } = await deletePost(postId);
    return data.post;
  }
);

export const editPostAsync = createAsyncThunk(
  "post/editPost",
  async ({ postId, updatedData }) => {
    const { data } = await editPost(postId, updatedData);
    return data.post;
  }
);

export const addCommentAsync = createAsyncThunk(
  "post/addComment",
  async ({ postId, comment }) => {
    const { data } = await addComment(postId, { newComment: comment });
    return data.post;
  }
);

export const removeCommentAsync = createAsyncThunk(
  "post/removePost",
  async ({ postId, commentId }) => {
    const { data } = await removeComment(postId, commentId);
    return data.post;
  }
);

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {
    [getPostsAsync.pending]: (state) => {
      state.status = "loading";
    },
    [getPostsAsync.fulfilled]: (state, action) => {
      state.posts = action.payload;
      state.status = "success";
    },
    [getPostsAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [createPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [createPostAsync.fulfilled]: (state, action) => {
      state.posts.push(action.payload);
      state.status = "success";
    },
    [createPostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [deletePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [deletePostAsync.fulfilled]: (state, action) => {
      state.posts = state.posts.filter(({ _id }) => _id !== action.payload._id);
      state.status = "success";
    },
    [deletePostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error deleting post";
    },
    [editPostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [editPostAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [editPostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error editing post";
    },
    [likePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [likePostAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [likePostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error liking post";
    },
    [unlikePostAsync.pending]: (state) => {
      state.status = "loading";
    },
    [unlikePostAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [unlikePostAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = "Error unliking post";
    },
    [addCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [addCommentAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [addCommentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
    [removeCommentAsync.pending]: (state) => {
      state.status = "loading";
    },
    [removeCommentAsync.fulfilled]: (state, action) => {
      const updatedPost = action.payload;
      const postIdx = state.posts.findIndex(
        (post) => post._id === updatedPost._id
      );
      if (postIdx !== -1) {
        state.posts[postIdx] = updatedPost;
      }
      state.status = "success";
    },
    [removeCommentAsync.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export default postSlice.reducer;
