import { createSlice } from "@reduxjs/toolkit";

// !неиспользуемый код, необхл

const errorSlice = createSlice({
    name: "errorState",
    initialState: {
        error: null
    },
    reducers: {
        setError(state, action) {
            state.error = action.payload.error;
            console.log(state.error);
        }
    }
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;