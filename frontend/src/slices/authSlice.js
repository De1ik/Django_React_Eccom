import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const userDataFromStorage = JSON.parse(localStorage.getItem("userData")) || null
const authDataFromStorage = JSON.parse(localStorage.getItem("authData")) || null

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
                "/api/auth/jwt/create/",
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

export const putUserInfoAction = createAsyncThunk(
    'user/getInfo',
    async (updateInfo, { getState, rejectWithValue }) => {
        try {
            const { authRed } = getState()
            const { userData } = authRed;
            const token = userData.token
            const { userEmail, name } = updateInfo
    
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            }
    
            const { data } = await axios.put(
                "/api/user/update",
                { 
                    "email": userEmail, 
                    "first_name": name 
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

export const getUserAction  = createAsyncThunk(
    'user/getUser',
    async (_, { rejectWithValue }) => {
        if (JSON.parse(localStorage.getItem("authData"))){
            try{
                const config = {
                    headers: {
                        'Content-type': 'application/json',
                        'Accept': 'application/json',
                        'Authorization': `Bearer ${JSON.parse(localStorage.getItem("authData"))["access"]}`
                    }
                }

                const { data } = await axios.get(
                    "/api/auth/users/me/",
                    config
                )
                return data;
            } catch (error) {
                return rejectWithValue(error.response?.data?.message || error.message);
            }
        }
    }
)


const userAuthSlice = createSlice({
    name: "userAuth",
    initialState: {
        isAuth: false,
        authData: authDataFromStorage,
        loading: false,
        error: null,
        userData: userDataFromStorage,
        registrateSucces: false
    },
    reducers: {
        logOut: (state) => {
            localStorage.removeItem("userData")
            localStorage.removeItem("authData")
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
                state.loading = false
                state.isAuth = true
                console.log("workin")
                console.log(action.payload)
                state.authData = action.payload
                localStorage.setItem("authData", JSON.stringify(action.payload))
                state.registrateSucces = false
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
                state.registrateSucces = false
            })
            .addCase(getUserAction.pending, (state) => {
                state.loading = true
                state.error = null
                state.registrateSucces = false
            })
            .addCase(getUserAction.fulfilled, (state, action) => {
                state.loading = false,
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.registrateSucces = false
            })
            .addCase(getUserAction.rejected, (state, action) => {
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
            .addCase(putUserInfoAction.pending, (state) => {
                state.loading = true
                state.error = null
                state.registrateSucces = false
            })
            .addCase(putUserInfoAction.fulfilled, (state, action) => {
                state.loading = false,
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.registrateSucces = false
            })
            .addCase(putUserInfoAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
                state.registrateSucces = false
            })
    }

})

export default userAuthSlice.reducer
export const { logOut } = userAuthSlice.actions
