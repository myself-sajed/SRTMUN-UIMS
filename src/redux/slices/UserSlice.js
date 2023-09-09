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
        dsdUser: null,
        krcUser: null,
        sportsUser: null,
        nssUser: null,
        examUser: null,
        placementUser: null,
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
        },
        setDSDUser(state, action) {
            state.dsdUser = action.payload
        },
        setKRCUser(state, action) {
            state.krcUser = action.payload
        },
        setSportsUser(state, action) {
            state.sportsUser = action.payload
        },
        setNSSUser(state, action) {
            state.nssUser = action.payload
        },
        setExamUser(state, action) {
            state.examUser = action.payload
        },
        setPlacementUser(state, action) {
            state.placementUser = action.payload
        }

    },
})

// Action creators are generated for each case reducer function
export const { setUser, setAdminUser, setDirectorUser, setAlumniUser, setStudentUser, setProUser, setYouthUser, setDSDUser, setKRCUser, setSportsUser, setNSSUser, setExamUser, setPlacementUser } = UserSlice.actions

export default UserSlice.reducer
