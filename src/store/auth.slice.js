import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../http";

export const fetchAuth = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    try {
      const { data } = await $api.post("/auth/login", params);

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const fetchAuthMe = createAsyncThunk("auth/fetchAuthMe", async () => {
  try {

    const { data } = await $api.get("/auth/refresh", {
      withCredentials: true,
    });

    if (data?.message === "User doesnt exist") {
      window.localStorage.removeItem("token");


    } 
    else if (data.error === 'Invalid token') {
localStorage.removeItem('token')

    }
    else {
      return data;
    }
  } catch (error) {
  
    if (error) {
      return {
        message:"ERROR_NETWORK"
      }
    }
  }
});
const initialState = {
  data: [],
  status: "loading",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loaded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.pending, (state, action) => {
      // Add user to the state array
      state.data = [];
      state.status = "loading";
    });
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchAuth.rejected, (state, action) => {
      // Add user to the state array
      state.data = [];
      state.status = "loading";
    });
    builder.addCase(fetchAuthMe.pending, (state, action) => {
      // Add user to the state array
      state.data = [];
      state.status = "loading";
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchAuthMe.rejected, (state, action) => {
      // Add user to the state array
      state.data = [];
      state.status = "loading";
    });
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;

export const { logout } = authSlice.actions;
