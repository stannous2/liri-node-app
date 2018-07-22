require("dotenv").config();

let Spotify = require("node-spotify-api");
let Twitter = require("twitter");

let keys = require('./keys.js');

let spotify = new Spotify(keys.spotify);
let client = new Twitter(keys.twitter);

let arg = process.argv[2];
let songName = process.argv[3];

//{ screen_name: 'nodejs', count: 20 }

if (arg === "my-tweets") {
    //console.log(client);
    console.log('my tweetsssss....')
    // client.get('favorites/list', function(error, tweets, response)
    // client.get('search/tweets', {screen_name: '_sn2_', count: 10}, function(error, tweets, response) {
    //     if(error) throw error;
    //     console.log(tweets);  // The favorites.
    //     for (i=0;i<tweets.length;i++){
    //         console.log("Tweet: " + tweets[i].text + " Created at: " + tweets[i].created_at);
    //         }
        
        //console.log(response);  // Raw     object.
    //   });
    tweets();
}
if (arg === 'movie-this') {
    console.log('favorite movie is Saving Private Ryan...')
}
if (arg === "spotify-this-song"){
    if(songName) {
        spotifyThisSong(songName);
    } else {
        spotifyThisSong('Ace of Base');
    }
}


function tweets(){
    client.get('https://api.twitter.com/1.1/statuses/user_timeline.json?brocashmere=' + client.options.consumer_key + '&count=20', function(error, tweets, response) {
        if(error) throw error;

        for (i=0;i<tweets.length;i++){
        console.log("Tweet: " + tweets[i].text + " Created at: " + tweets[i].created_at);
        }
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


