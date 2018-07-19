require("dotenv").config();

let Spotify = require("node-spotify-api");
let Twitter = require("twitter");

let keys = require('./keys.js');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

console.log(client);

let arg = process.argv[2];
let songName = process.argv[3];

if (arg === "my-tweets") {
    console.log('my tweetsssss....')
} else if (arg === "spotify-this-song") {
    spotify
        .search({ type: 'track', query: songName, limit: 1 })
        .then(function (response) {
            //console.log(response.tracks.items[0]);
            console.log('Song name: ' + response.tracks.items[0].name)
            console.log('Album: ' + response.tracks.items[0].album.name);
            console.log('Artist(s): ' + response.tracks.items[0].artists[0].name);
            console.log('External link: ' + response.tracks.items[0].external_urls.spotify);
        })
        .catch(function (err) {
            console.log(err);
        });
}else if (arg === 'movie-this') {

}else if (arg === ''){
    songName = "Ace of Base";
}




