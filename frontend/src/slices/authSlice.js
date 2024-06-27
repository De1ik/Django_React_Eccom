import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const userDataFromStorage = JSON.parse(localStorage.getItem("userData")) || null

export const loginAction = createAsyncThunk(
    "user/login",
    async (userCredentials, { rejectWithValue }) => {
        try{
            const { email, password } = userCredentials

            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }

            const { data } = await axios.post(
                "/api/user/login",
                { 
                    "username": email, 
                    "password": password 
                },
                config
            )
            return data;
        
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

export const registrateAction = createAsyncThunk(
    "user/registrate",
    async (createUserDate, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
    
            const { email, name, password } = createUserDate
            
            const { data } = await axios.post(
                "/api/user/registrate",
                { 
                    "email": email,
                    "first_name": name,
                    "password": password 
                },
                config
            )
            return data
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)

const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        loading: false,
        error: null,
        userData: userDataFromStorage,
        registrateSucces: false
    },
    reducers: {
        logOut: (state) => {
            localStorage.removeItem("userData")
            state.userData = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true
                state.error = null
                state.registrateSucces = false
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false,
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.registrateSucces = false
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
                state.registrateSucces = false
            })
            .addCase(registrateAction.pending, (state) => {
                state.loading = true
                state.error = null
                state.registrateSucces = false
            })
            .addCase(registrateAction.fulfilled, (state) => {
                state.loading = false
                state.error = null
                state.registrateSucces = true
            })
            .addCase(registrateAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.registrateSucces = false
            })
    }

})

export default userAuthSlice.reducer
export const { logOut } = userAuthSlice.actions
