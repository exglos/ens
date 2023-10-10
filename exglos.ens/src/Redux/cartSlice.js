import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        subdomain: '',
        price: '',
        date: null,
        claimSuccess: false
    },
    reducers: {
        updateCart: (state, action) => {
            state.subdomain = action.payload.subdomain
            state.price = action.payload.price
            state.date = action.payload.date
            state.claimSuccess = action.payload.claimSuccess
        }
    }
})

export const { updateCart } = cartSlice.actions

export default cartSlice.reducer
