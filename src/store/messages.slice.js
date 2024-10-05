import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import $api from "../http";

export const fetchMessages = createAsyncThunk(
  "messages/fetchMessages",
  async (params) => {
    console.log('PARAMS REDUX MESІAGES',params);
    
    try {
      const  {data}  = await $api.post("/messages/all", params);

      console.log('DATA',data);
      
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  data: [],
  status: "loading",
};

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      state.status = "loaded";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMessages.pending, (state, action) => {
      // Add user to the state array
      state.data = [];
      state.status = "loading";
    });
    builder.addCase(fetchMessages.fulfilled, (state, action) => {
      // Add user to the state array
      state.data = action.payload;
      state.status = "loaded";
    });
    builder.addCase(fetchMessages.rejected, (state, action) => {
      // Add user to the state array
      state.data = [];
      state.status = "loading";
    });
  
  },
});


export const messagesReducer = messagesSlice.reducer;

export const { logout } = messagesSlice.actions;
