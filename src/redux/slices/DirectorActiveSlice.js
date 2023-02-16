import { createSlice } from '@reduxjs/toolkit'

export const DirectorActiveSlice = createSlice({
    name: 'directorActive',
    initialState: {
        directorActive: 'SyllabusRevision',
    },
    reducers: {
        setDirectorActive(state, action) {
            state.directorActive = action.payload
        }
    },
})

// Action creators are generated for each case reducer function
export const { setDirectorActive } = DirectorActiveSlice.actions

export default DirectorActiveSlice.reducer