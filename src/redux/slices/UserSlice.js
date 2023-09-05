import { createSlice } from '@reduxjs/toolkit'

export const UserSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        adminUser: null,
        directorUser: null,
        alumniUser: null,
        studentUser: null,
        proUser: null,
        youthUser: null,
    },
    reducers: {
        setUser(state, action) {
            state.user = action.payload
        },
        setAdminUser(state, action) {
            state.adminUser = action.payload
        },
        setDirectorUser(state, action) {
            state.directorUser = action.payload
        },
        setAlumniUser(state, action) {
            state.alumniUser = action.payload
        },
        setStudentUser(state, action) {
            state.studentUser = action.payload
        },
        setProUser(state, action) {
            state.proUser = action.payload
        },
        setYouthUser(state, action) {
            state.youthUser = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setAdminUser, setDirectorUser, setAlumniUser, setStudentUser, setProUser, setYouthUser } = UserSlice.actions

export default UserSlice.reducer
