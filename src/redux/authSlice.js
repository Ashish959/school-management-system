// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import api from "../services/api";

// export const loginUser = createAsyncThunk(
//   "auth/login",
//   async (data, { rejectWithValue }) => {
//     try {
//       const res = await api.post("/auth/login", data);
//       return res.data;
//     } catch (err) {
//       return rejectWithValue("Invalid username or password");
//     }
//   }
// );

// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     isLoggedIn: false,
//     username: null,
//     role: null,
//     token: null,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.isLoggedIn = false;
//       state.username = null;
//       state.role = null;
//       state.token = null;
//       localStorage.clear();
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.isLoggedIn = true;
//         state.username = action.payload.username;
//         state.role = action.payload.role;
//         state.token = action.payload.accessToken;
//         localStorage.setItem("accessToken", action.payload.accessToken);
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.error = action.payload;
//       });
//   },
// });

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../services/api";

// LOGIN API
export const loginUser = createAsyncThunk(
  "auth/login",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Invalid username or password"
      );
    }
  }
);

// 🔥 REHYDRATE FROM LOCALSTORAGE
const tokenFromStorage = localStorage.getItem("accessToken");

const initialState = {
  token: tokenFromStorage,
  user: tokenFromStorage ? { role: "admin" } : null, // temp until API decode
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      localStorage.removeItem("accessToken");
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN START
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      // LOGIN SUCCESS
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;

        state.token = action.payload.accessToken;
        state.user = {
          username: action.payload.username,
          role: action.payload.role,
        };

        // 🔥 MOST IMPORTANT
        localStorage.setItem("accessToken", action.payload.accessToken);
      })

      // LOGIN FAILED
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
