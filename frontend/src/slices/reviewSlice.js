import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getProductReviews = createAsyncThunk(
  'reviews/get-user-review',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/reviews/${id}/get-all-reviews`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const getUserReview = createAsyncThunk(
    'reviews/get-all',
    async ({token, id}, { rejectWithValue }) => {
      try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
        const { data } = await axios.get(`/api/reviews/${id}/get-user-review`, config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


export const createReview = createAsyncThunk(
    'reviews/create',
    async ({token, id, data}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        const { data: responseData } = await axios.post(`/api/reviews/${id}/create-review`, data, config)
        console.log("SLICE -> RESPONSE DATA : ", responseData )
        return responseData;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
      }
    }
);


export const editReview = createAsyncThunk(
    'reviews/edit',
    async ({token, id, data}, { rejectWithValue }) => {
      console.log("SLICE -> DATA : ", data)
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        const { data: responseData  } = await axios.put(`/api/reviews/${id}/edit-review`, data, config)
        return responseData;
      } catch (error) {
        console.log("ERROR")
        return rejectWithValue(error.response?.data?.message || error.message)
      }
    });


export const deleteReview = createAsyncThunk(
    'reviews/edit',
    async ({token, id}, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            }
        const { data } = await axios.delete(`/api/reviews/${id}/edit-review`, config)
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message)
      }
    }
);





const reviewSlice = createSlice({
  name: 'productById',
  initialState: {
    loading: false,
    reviewList: [],
    userReview: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.reviewList = null;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.reviewList = action.payload;
        state.loading = false;
      })
      .addCase(getProductReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userReview = null;
      })
      .addCase(getUserReview.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.loading = false;
      })
      .addCase(getUserReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userReview = null;
      })

      .addCase(createReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.loading = false;
        state.userReview = action.payload
      })
      .addCase(createReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userReview = null;
      })

      .addCase(editReview.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.userReview = null;
      })
      .addCase(editReview.fulfilled, (state, action) => {
        state.userReview = action.payload;
        state.loading = false;
      })
      .addCase(editReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.userReview = null;
      });
  },
});

export default reviewSlice.reducer;
