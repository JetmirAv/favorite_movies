import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import api from "../api";

import { removeToken, setToken } from "../helpers";

import { RootState } from "./store";

//Types
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
}

interface IAuthForm {
  fields: Partial<IUser>;
  errors?: string | string[];
  isSuccess?: boolean;
  isError?: boolean;
}

interface IAuthSuccessResponse {
  Authorization: string;
  data: IUser;
}

export interface UsersState {
  user?: IUser;
  authForm: IAuthForm;
  loading: boolean;
}

//State
const initialState: UsersState = {
  user: undefined,
  authForm: { fields: {} },
  loading: true,
};

//Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthForm: (state) => {
      state.authForm = { ...initialState.authForm };
    },
    formChange: (
      state,
      { payload }: PayloadAction<{ name: string; value: string }>
    ) => {
      state.authForm = {
        ...state.authForm,
        fields: { ...state.authForm.fields, [payload.name]: payload.value },
      };
    },
    logOut: (state) => {
      removeToken();
      delete state.user;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, data) => {
      setToken(data.payload.Authorization);
      state.user = data.payload.data;
      state.authForm = initialState.authForm;
      state.loading = false;
    });

    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(login.rejected, (state, data) => {
      state.authForm = {
        ...state.authForm,
        errors: "Bad",
      };
      state.loading = false;
    });

    builder.addCase(register.fulfilled, (state, data) => {
      state.loading = false;
      state.authForm = { fields: {}, isSuccess: true };
    });

    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(register.rejected, (state, data) => {
      state.authForm = {
        ...state.authForm,
        errors: "Bad",
        isError: true,
      };
      state.loading = false;
    });

    builder.addCase(loadProfile.fulfilled, (state, data) => {
      state.user = data.payload;
      state.loading = false;
    });

    builder.addCase(loadProfile.pending, (state) => {
      state.loading = true;
    });
  },
});

//Async reducers
export const login = createAsyncThunk<IAuthSuccessResponse, Partial<IUser>>(
  `auth/login`,
  async ({ email, password }, thunkApi) => {
    try {
      console.log({ email, password });

      const { data } = await api.post<IAuthSuccessResponse>("auth/login", {
        email,
        password,
      });

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loadProfile = createAsyncThunk<IUser>(
  `user/me`,
  async (_, thunkApi) => {
    try {
      const { data } = await api.get<IUser>("user/me");

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const register = createAsyncThunk<IUser, Partial<IUser>>(
  `auth/register`,
  async ({ email, password, name }, thunkApi) => {
    try {
      console.log({ email, password, name });

      const { data } = await api.post<IUser>("auth/register", {
        email,
        password,
        name,
      });

      return data;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

//Selectors
export const getAuth = (state: RootState) => state.auth;
export const getFormData = (state: RootState) => state.auth.authForm;

// Action creators are generated for each case reducer function
export const { formChange, resetAuthForm, logOut } = authSlice.actions;

export default authSlice.reducer;
