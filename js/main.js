/*
User Story:

I can see whether Free Code Camp is currently streaming on Twitch.tv

I can click the status output and be sent directly to the Free Code Camp's Twitch.tv channel

If a Twitch user is currently streaming, I can see additional details about what they are streaming.

I will see a placeholder notification if a streamer has closed their Twitch account (or never existed).
You can verify this works by adding brunofin and comster404 to your array of Twitch streamers

Hint: See an example call to Twitch.tv's JSONP API at http://forum.freecodecamp.com/t/use-the-twitchtv-json-api/19541.

Hint: The relevant documentation about this API call is here: https://github.com/justintv/Twitch-API/blob/master/v3_resources/streams.md#get-streamschannel.

Hint: Here's an array of the Twitch.tv usernames of people who regularly stream: ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"]

*/

var twitchUsers = ['ESL_SC2', 'OgamingSC2', 'cretetion', 'freecodecamp', 'storbeck', 'habathcx', 'RobotCaleb', 'noobs2ninjas'];
var urlUsers = '';
var logo;
var userUrl;
var streamUsers = [];
var info = [];
var streamInfo = {};
var streamLogo = "";
var streamUserUrl = "";
var offlineUrl;
var streamName;

//create a url for api call
function twitchUrl () {
    for (var i = 0; i < twitchUsers.length - 1; i++) {
        url = 'https://api.twitch.tv/kraken/streams?channel=';
        urlUsers += twitchUsers[i] + ',';
    };
    urlUsers += twitchUsers[twitchUsers.length - 1] 
    url = url + urlUsers + '&client_id=mchzgoktnyyz48wjhaloj16ov6li5v';
    console.log(url);
};

twitchUrl();

//get users who are streaming with their logos, urls, descriptions
function onlineChannels () {
    $.getJSON(url, function(streamData){
            for (var i =0; i < streamData.streams.length; i++) {
            streamInfo = streamData.streams[i].channel.status;
            streamUserUrl = streamData.streams[i].channel.url;
            streamLogo = streamData.streams[i].channel.logo;
            streamName = streamData.streams[i].channel.name;
            // console.log(streamUserUrl);
            // console.log(streamInfo);
            $('.onlineUsers').append('<div class = "col-lg-3 col-md-3 col-sm-4 col-xs-6 logos"><a href="' + streamUserUrl + '"><img src="' + streamLogo + '"></a><ul><li>'+ streamName +'</li><li>'+ streamInfo +'</li></ul></div>');
            };
    }).fail(function() {
        $('.onlineUsers').append('<h4>Sorry, we could not load TwitchTV Info!</h4>');
    });
        
};

//get users who are NOT streaming with their logos, urls, descriptions
function offlineChannels() {
    $.each(twitchUsers, function (i, val) {
        streamUrl = ('https://api.twitch.tv/kraken/streams/' + val + '?client_id=mchzgoktnyyz48wjhaloj16ov6li5v');
        $.getJSON(streamUrl, function (streaming){
            if (streaming.stream === null) {
                var streamUsers = [];
                var info = [];
                streamUsers.push(val);
                userUrl = ('https://api.twitch.tv/kraken/users/' + val + '?client_id=mchzgoktnyyz48wjhaloj16ov6li5v');
                $.getJSON(userUrl, function (result) {
                logo = result.logo;
                    offlineUrl = ("https://www.twitch.tv/" + val);
                    console.log(offlineUrl);
                    if (result.logo !== null) {
                    $('.onlineUsers').append('<div class = "col-lg-3 col-md-3 col-sm-4 col-xs-6 logos"><a href="' + offlineUrl + '"><img src="' + logo + '"></a><ul><li>'+ val +'</li><li>This channel is OFFLINE!</li></ul></div>');
            };
        }).fail(function() {
                $('.onlineUsers').append('<h4>Sorry, we could not load TwitchTV User Logos!</h4>');
        });    
            };      
}).fail(function() {
                $('.onlineUsers').append('<h4>Sorry, we could not load TwitchTV channel information!</h4>');
        }); 
    });
};

$(document).ready(function() {
    onlineChannels();
});

// To Display ONLINE Users when clicked on ONLINE CHANNELS button
$('#onlineButton').click(function () {
    $(".onlineUsers").html("");
    onlineChannels();
});

// To Display OFFLINE Users when clicked on OFFLINE CHANNELS button
$('#offlineButton').click(function () {
    $(".onlineUsers").html("");
offlineChannels();
});