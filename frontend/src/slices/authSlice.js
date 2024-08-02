import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


// const userDataFromStorage = JSON.parse(localStorage.getItem("userData")) || null
// const authDataFromStorage = JSON.parse(localStorage.getItem("authData")) || null
// const isAuthFromStorage = JSON.parse(localStorage.getItem("isAuth")) || false

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
                "/api/auth/users/",
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
            console.log(error)
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const activatorAction = createAsyncThunk(
    "user/email/activation",
    async (dataPage, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json'
                }
            }
    
            const { uid, token } = dataPage
            const { data } = await axios.post(
                "/api/auth/users/activation/",
                { 
                    "uid": uid,
                    "token": token,
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
            const { authData } = authRed;
            const token = authData.access
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


export const resetPassAction = createAsyncThunk(
    'user/reset-password',
    async (email, { rejectWithValue }) => {
        try{
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    // 'Accept': 'application/json',
                }
            }

            const { data } = await axios.post(
                '/api/auth/users/reset_password/',
                {"email": email},
                config    
            )
            return data
        }
        catch (error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


export const resetPassConfirmAction = createAsyncThunk(
    'user/reset-password/confirm',
    async (confData, { rejectWithValue, getState }) => {
        try{
            const { password, uid, token } = confData
            const config = {
                headers: {
                    'Content-type': 'application/json',
                    // 'Accept': 'application/json',
                }
            }


            const { data } = await axios.post(
                '/api/auth/users/reset_password_confirm/',
                {
                    "new_password": password,
                    "uid": uid,
                    "token": token
                },
                config    
            )
            return data
        }
        catch (error){
            return rejectWithValue(error.response?.data?.message || error.message);
        }
    }
)


const userDataFromStorage = JSON.parse(localStorage.getItem("userData")) || null
const authDataFromStorage = JSON.parse(localStorage.getItem("authData")) || null
const isAuthFromStorage = JSON.parse(localStorage.getItem("isAuth")) || false


const initialState = {
    isAuth: isAuthFromStorage,
    authData: authDataFromStorage,
    loading: false,
    error: null,
    userData: userDataFromStorage,
    registrateSucces: false,
    resetPassRequest: false,
    resetPassSuccess: false,
    emailAcivated: false,
    updatedInfo: false,
};



const userAuthSlice = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        logOut: (state) => {
            // localStorage.removeItem("cartItems")
            // localStorage.removeItem("userData")
            // localStorage.removeItem("isAuth")
            // localStorage.removeItem("authData")
            localStorage.clear();
            state.isAuth = false;
            state.authData = null;
            state.loading = false;
            state.error = null;
            state.userData = "";
            state.registrateSucces = false;
            state.resetPassRequest = false;
            state.resetPassSuccess = false;
            state.emailAcivated = false;
            state.updatedInfo = false;
            // state.userData = null
            // state.isAuth = false
            // state.registrateSucces = false
            // state.resetPassRequest = false
            // state.emailAcivated = false
            // state.updatedInfo = false
            // state.authData = null
        },
        resendPasswordEmail: (state) => {
            state.resetPassRequest = false;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(loginAction.fulfilled, (state, action) => {
                state.loading = false
                state.authData = action.payload
                state.resetPassRequest = false
                console.log(action.payload)
                localStorage.setItem("authData", JSON.stringify(action.payload))
                localStorage.setItem("isAuth", JSON.stringify(true))
                state.isAuth = true
            })
            .addCase(loginAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload

            })
            .addCase(getUserAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(getUserAction.fulfilled, (state, action) => {
                state.loading = false,
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload))
            })
            .addCase(getUserAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })


            .addCase(activatorAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(activatorAction.fulfilled, (state) => {
                state.loading = false
                state.error = null
                state.emailAcivated = true
            })
            .addCase(activatorAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(registrateAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registrateAction.fulfilled, (state) => {
                state.loading = false
                state.error = null
                state.registrateSucces = true
            })
            .addCase(registrateAction.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(putUserInfoAction.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(putUserInfoAction.fulfilled, (state, action) => {
                state.loading = false,
                state.userData = action.payload
                localStorage.setItem("userData", JSON.stringify(action.payload))
                state.updatedInfo = true
            })
            .addCase(putUserInfoAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })


            .addCase(resetPassAction.pending, (state) => {
                state.loading = true
                state.error = null
                state.resetPassRequest = true
            })
            .addCase(resetPassAction.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(resetPassAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })

            .addCase(resetPassConfirmAction.pending, (state) => {
                state.loading = true
                state.error = null
                state.resetPassRequest = false
            })
            .addCase(resetPassConfirmAction.fulfilled, (state) => {
                state.loading = false,
                state.resetPassSuccess = true
                state.resetPassSuccess = false
            })
            .addCase(resetPassConfirmAction.rejected, (state, action) => {
                state.loading = false,
                state.error = action.payload
            })
    }

})

export default userAuthSlice.reducer
export const { logOut, resendPasswordEmail } = userAuthSlice.actions
