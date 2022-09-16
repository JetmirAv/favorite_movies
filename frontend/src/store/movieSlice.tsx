import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import qs from "qs";

import api from "../api";

import { IUser } from "./authSlice";
import { RootState } from "./store";

export interface IListResponse<T> {
  data: T[];
  page?: number;
  count?: number;
  take?: number;
  has_more?: boolean;
  loading: boolean;
  query?: string;
}

export interface IQueryMovies {
  page?: number;
  title?: string;
}

export interface IMovie {
  id: number;
  title: string;
  year: number;
  director: string;
  summary: string;
  poster: string;
  imbd_rating: string;
  runtime: number;
  users?: IUser[] | string[];
}

export interface ICategory {
  name: string;
  id: number;
}

interface IMovieDetails {
  loading: boolean;
  data?: IMovie;
}

export interface IMoviesState {
  list: IListResponse<IMovie>;
  favorites: IListResponse<IMovie>;
  details?: IMovieDetails;
  categories: ICategory[];
}

const initialState: IMoviesState = {
  list: { data: [], loading: true },
  favorites: { data: [], loading: true },
  details: undefined,
  categories: [],
};

export const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadMovies.fulfilled, (state, data) => {
      console.log({ data });

      state.list = {
        ...data.payload,
        data: [...state.list.data, ...data.payload.data],
        loading: false,
      };
    });

    builder.addCase(loadMovies.pending, (state) => {
      state.list = { ...state.list, loading: true };
    });

    builder.addCase(loadMoviesQuery.fulfilled, (state, data) => {
      console.log({ data });

      state.list = {
        ...data.payload,
        loading: false,
      };
    });

    builder.addCase(loadMoviesQuery.pending, (state) => {
      state.list = { ...state.list, loading: true };
    });

    builder.addCase(loadFavoriteMovies.fulfilled, (state, data) => {
      state.favorites = {
        ...data.payload,
        data: [...state.favorites.data, ...data.payload.data],
        loading: false,
      };
    });

    builder.addCase(loadFavoriteMovies.pending, (state) => {
      state.favorites = { ...state.favorites, loading: true };
    });

    builder.addCase(loadFavoriteMoviesQuery.fulfilled, (state, data) => {
      state.favorites = {
        ...data.payload,
        loading: false,
      };
    });

    builder.addCase(loadFavoriteMoviesQuery.pending, (state) => {
      state.favorites = { ...state.favorites, loading: true };
    });

    builder.addCase(loadMovie.fulfilled, (state, data) => {
      console.log("load", { data });

      if (typeof data.payload === "number") {
        state.details = { loading: false, data: undefined };
      } else {
        state.details = { loading: false, data: data.payload };
      }
    });

    builder.addCase(loadMovie.pending, (state) => {
      state.details = { ...state.details, loading: true };
    });

    builder.addCase(loadCategories.fulfilled, (state, data) => {
      state.categories = data.payload;
    });

    builder.addCase(addFavoriteMovie.fulfilled, (state) => {
      delete state.favorites.query;
      state.details = {
        ...state.details!,
        data: { ...state.details?.data!, users: ["user"] },
      };
    });

    builder.addCase(removeFavoriteMovie.fulfilled, (state) => {
      delete state.favorites.query;
      state.details = {
        ...state.details!,
        data: { ...state.details?.data!, users: [] },
      };
    });
  },
});

export const loadMovies = createAsyncThunk<IListResponse<IMovie>, IQueryMovies>(
  `movies/all`,
  async ({ page = 1, title = "" }, thunkApi) => {
    try {
      const query = qs.stringify(
        { page, title },
        { addQueryPrefix: true, skipNulls: true }
      );

      let state = thunkApi.getState() as RootState;

      if (state?.movies?.list?.query !== query) {
        const { data } = await api.get<IListResponse<IMovie>>(`movies${query}`);
        // thunkApi.dispatch(loadMovie(data.data[0].id));
        return { ...data, query };
      }

      return { ...state.movies.list, data: [] };
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loadCategories = createAsyncThunk<ICategory[]>(
  `categories/all`,
  async (_, thunkApi) => {
    try {
      let state = thunkApi.getState() as RootState;

      if (!state?.movies?.categories?.length) {
        const { data } = await api.get<IListResponse<ICategory>>(`/categories`);
        console.log({ data });

        return data.data;
      }

      return state.movies.categories;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loadMoviesQuery = createAsyncThunk<IListResponse<IMovie>, string>(
  `movies/allquery`,
  async (query, thunkApi) => {
    try {
      let state = thunkApi.getState() as RootState;

      if (state?.movies?.list?.query !== query) {
        const { data } = await api.get<IListResponse<IMovie>>(`movies${query}`);
        // thunkApi.dispatch(loadMovie(data.data[0].id));
        return { ...data, query };
      }

      return { ...state.movies.list };
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loadMovie = createAsyncThunk<IMovie | number, number>(
  `movies/details`,
  async (id, thunkApi) => {
    try {
      const state = thunkApi.getState() as RootState;

      if (state.movies.details?.data?.id === id) {
        return id;
      } else {
        const { data } = await api.get<IMovie>(`movies/${id}`);
        return data;
      }
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const addFavoriteMovie = createAsyncThunk<number, number>(
  `movies/favorite/add`,
  async (id, thunkApi) => {
    try {
      await api.post<IMovie>(`/movies/favorite/${id}/add`);

      // thunkApi.dispatch(loadMovie(id));
      // thunkApi.dispatch(loadFavoriteMovies({ page: 1 }));

      return id;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const removeFavoriteMovie = createAsyncThunk<number, number>(
  `movies/favorite/remove`,
  async (id, thunkApi) => {
    try {
      await api.post<IMovie>(`/movies/favorite/${id}/remove`);

      // thunkApi.dispatch(loadMovie(id));
      // thunkApi.dispatch(loadFavoriteMovies({ page: 1 }));

      return id;
    } catch (err) {
      return thunkApi.rejectWithValue(err);
    }
  }
);

export const loadFavoriteMovies = createAsyncThunk<
  IListResponse<IMovie>,
  IQueryMovies
>(`movies/favorite`, async ({ page = 0, title = "" }, thunkApi) => {
  try {
    const query = qs.stringify(
      { page, title },
      { addQueryPrefix: true, skipNulls: true }
    );

    let state = thunkApi.getState() as RootState;

    if (state?.movies?.favorites?.query !== query) {
      const { data } = await api.get<IListResponse<IMovie>>(
        `movies/favorite${query}`
      );

      return { ...data, query };
    }

    return { ...state.movies.favorites, data: [] };
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const loadFavoriteMoviesQuery = createAsyncThunk<
  IListResponse<IMovie>,
  string
>(`movies/favorite/allquery`, async (query, thunkApi) => {
  try {
    let state = thunkApi.getState() as RootState;

    if (state?.movies?.favorites?.query !== query) {
      const { data } = await api.get<IListResponse<IMovie>>(
        `movies/favorite${query}`
      );
      // thunkApi.dispatch(loadMovie(data.data[0].id));
      return { ...data, query };
    }

    return { ...state.movies.favorites };
  } catch (err) {
    return thunkApi.rejectWithValue(err);
  }
});

export const getMovies = (state: RootState) => state.movies.list;
export const getFavoriteMovies = (state: RootState) => state.movies.favorites;
export const getSelectedMovie = (state: RootState) => state.movies.details;
export const getCategories = (state: RootState) => state.movies.categories;

// Action creators are generated for each case reducer function
export const {} = movieSlice.actions;

export default movieSlice.reducer;
