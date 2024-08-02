import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getAllUsers = createAsyncThunk(
  'admin/all-user',
  async (token, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
      const { data } = await axios.get(`/api/admin/all-users`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const getUserById = createAsyncThunk(
  'admin/get-user-by-id',
  async ({token, id}, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        }
      const { data } = await axios.get(`/api/admin/get-user/${id}`, config);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);


export const deleteUser = createAsyncThunk(
    'admin/deleteUser',
    async ({token, id}, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { data } = await axios.delete(`/api/admin/delete-user/${id}`, config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


export const updateUser = createAsyncThunk(
    'admin/updateUser',
    async ({token, id, data}, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { responseData } = await axios.put(`/api/admin/update-user/${id}`, data, config);
        return responseData;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );  


  export const deleteProduct = createAsyncThunk(
    'admin/delete-product',
    async ({token, id}, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { data } = await axios.delete(`/api/admin/delete-product/${id}`, config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );



export const adminGetAllProducts = createAsyncThunk(
    'admin/all-products',
    async (token, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { data } = await axios.get(`/api/admin/all-products`, config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );


export const getProductById = createAsyncThunk(
    'admin/get-product-by-id',
    async ({token, id}, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { data } = await axios.get(`/api/admin/get-product/${id}`, config);
        return data;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );

export const updateProduct = createAsyncThunk(
    'admin/updateProduct',
    async ({token, id, formData}, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { responseData } = await axios.put(`/api/admin/update-product/${id}`, formData, config);
        return responseData;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );  

export const createProduct = createAsyncThunk(
    'admin/createProduct',
    async ({token, formData}, { rejectWithValue }) => {
      try {
          const config = {
              headers: {
                  'Content-type': 'multipart/form-data',
                  'Authorization': `Bearer ${token}`,
              }
          }
        const { responseData } = await axios.post(`/api/admin/create-product`, formData, config);
        return responseData;
      } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
      }
    }
  );  










const adminSlice = createSlice({
  name: 'adminSlice',
  initialState: {
    loading: false,
    allUsersList: [],
    allProductsList: [],
    error: null,
    deletedSuccess: null,
    updateSuccess: null,
    getByIdSucces: false,
    userById: null,
    productById: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.allUsersList = action.payload;
        state.loading = false;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getUserById.pending, (state) => {
        state.loading = true;
        // state.userById = null
        state.error = null;
        state.getByIdSucces = false
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.userById = action.payload;
        state.loading = false;
        state.error = null;
        state.getByIdSucces = true
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      .addCase(deleteUser.pending, (state) => {
        state.loading = true
        state.error = null
        state.deletedSuccess = null
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loading = false
        state.deletedSuccess = true
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.deletedSuccess = false
      })

      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })


      .addCase(adminGetAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(adminGetAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.allProductsList = action.payload
      })
      .addCase(adminGetAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(deleteProduct.pending, (state) => {
        state.loading = true
        state.error = null
        state.deletedSuccess = null
      })
      .addCase(deleteProduct.fulfilled, (state) => {
        state.loading = false
        state.deletedSuccess = true
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.deletedSuccess = false
      })

      .addCase(getProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.getByIdSucces = false
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.productById = action.payload;
        state.loading = false;
        state.error = null;
        state.getByIdSucces = true
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default adminSlice.reducer;
