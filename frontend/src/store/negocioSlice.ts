import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    negocio: [],
}

const negocioSlice = createSlice({
    name: "DatosNegociosRedux",
    initialState,
    reducers: {
        setNegocio: (state, action) => {
            state.negocio = action.payload
        }
    }
})

export const { setNegocio } = negocioSlice.actions
export default negocioSlice.reducer