import mixpanel from 'mixpanel-browser';

mixpanel.init("a562b92376c74b4eeee3d69bea9dacee");

export function appLoaded(){
    mixpanel.track("app launched");
}
export function userLoggedIn(){
    const userName = localStorage.getItem('name');
    mixpanel.track("user logged in",{"userName": userName});
}
export function  songPlayed(songName){
    const userName = localStorage.getItem('name');
    mixpanel.track("song played ",{"userName": userName, "songName":songName});
}
export function  albumPageShowed(albumName){
    const userName = localStorage.getItem('name');
    mixpanel.track("album page showed",{"userName": userName, "albumName":albumName});
}
export function  artistPageShowed(artistName){
    const userName = localStorage.getItem('name');
    mixpanel.track("artist page showed",{"userName": userName, "artistName":artistName});
}
export function  playlistPageShowed(playlistName){
    const userName = localStorage.getItem('name');
    mixpanel.track("playlist page showed",{"userName": userName, "playlistName":playlistName});
}
export function  newRegister(userName){
    mixpanel.track("new register",{"userName": userName});
}