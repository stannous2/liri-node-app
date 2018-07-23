require("dotenv").config();

let Spotify = require("node-spotify-api");
let Twitter = require("twitter");
let OMBD = require("omdb-api-client");

let keys = require('./keys.js');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);
let omdb = new OMBD(keys.ombd);

let arg = process.argv[2];
let name = process.argv[3];


if (arg === "my-tweets") {
    let userId =  "sn290768009";
    getTweets(userId, 30);
}
if (arg === 'movie-this') {
    getMovie(name);
}
if (arg === "spotify-this-song"){
    if(name) {
        spotifyThisSong(name);
    } else {
        spotifyThisSong('Ace of Base');
    }
}

function getTweets(userId, numOfTweets){
    client.get('search/tweets', {q: userId, count: numOfTweets}, function(error, tweets, response) {
        if(error) throw error;
        for (i=0;i<tweets.statuses.length;i++){
            console.log(i + ':  ' + tweets.statuses[i].text);
            }
      });
}

function getMovie(name) {
    // list a movie using callbacks
    omdb({t: name, apikey: '3f53756'}).list(function(error, movie) {
        if(error) throw error;
        console.log('Title: ' + movie.title);
        console.log('Year: ' + movie.year);
        console.log('Rated: ' + movie.rated);
        console.log('Released: ' + movie.released);
        console.log('Genres: ' + movie.genres);
        console.log('Directors: ' + movie.directors);
        console.log('Languages: ' + movie.languages);
        console.log('Awards: ' + movie.awards);
        console.log('Countries: ' + movie.countries);
});
    
}

function spotifyThisSong(songName){
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
}


