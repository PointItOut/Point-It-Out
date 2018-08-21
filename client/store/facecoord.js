
//ACTION TYPES
const SET_COORDS = 'SET_COORDS'
// INITIAL STATE
const initialState = {}

// ACTION CREATORS
export const setCoords = coords => ({
    type: SET_COORDS,
    coords
})

//REDUCER
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COORDS:
            return action.coords
        default:
            return state
    }
}
export default reducer