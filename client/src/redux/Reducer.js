const initialState = {
    fromId: null,
    sideSongs: null

}
function reducer(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_FROM_ID':
            return {...state, fromId: action.payload}
        case 'CHANGE_SIDE_SONGS':
            return {...state, sideSongs: action.payload}
        default:
            return state
    }
}
export default reducer;