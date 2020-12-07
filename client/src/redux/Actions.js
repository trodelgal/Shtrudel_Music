export const changeFromId = (artistId) => {
    return {
        type:'CHANGE_FROM_ID',
        payload: artistId
    }
}
export const changeSideSongs = (sideSongs) => {
    return {
        type:'CHANGE_SIDE_SONGS',
        payload: sideSongs
    }
}