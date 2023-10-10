import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        jwt: '',
        isAuth: false
    },
    reducers: {
        updateAuth: (state, action) => {
            state.isAuth = action.payload.isAuth
            state.jwt = action.payload.jwt
        }
    }
})

export const { updateAuth } = authSlice.actions

export default authSlice.reducer

