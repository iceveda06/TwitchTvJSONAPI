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
var logo;
var channelUrl = '';
var url;
var streamURL;
var streamingLogo;
// var streamUsers = [];
// var info = [];

// ONLINE users
$('#onlineButton').click(function () {
    $(".onlineUsers").html("");
    userLogo();
    });

//get users who are streaming with their logos, urls, descriptions
function userLogo() {
    $.each(twitchUsers, function (i, val) {
        streamURL = ('https://api.twitch.tv/kraken/streams/' + val + '?client_id=mchzgoktnyyz48wjhaloj16ov6li5v');
        $.getJSON(streamURL, function (streaming){
            if (streaming.stream !== null) {
                var streamUsers = [];
                var info = [];
                streamUsers.push(val);
                info = streaming.stream.channel.status;
                url = ('https://api.twitch.tv/kraken/users/' + streamUsers + '?client_id=mchzgoktnyyz48wjhaloj16ov6li5v');
                $.getJSON(url, function (result) {
                logo = result.logo;
                    if (result.logo !== null) {
                    $('.onlineUsers').append('<div class = "logos"><a href="https://www.twitch.tv/' + val + '"><img src="' + logo + '"></a><p>'+ val +'</p><p>'+ info +'</p></div>');
            };
        }).fail(function() {
                $('.onlineUsers').append('<h4>Sorry, we could not load TwitchTV users information!</h4>');
        });    
            };  
        }).fail(function() {
                $('.onlineUsers').append('<h4>Sorry, we could not load TwitchTV users information!</h4>');
        }); ;
    });
}

//urls for each twitchTV users
// function channel() {
//     $.each(twitchUsers, function (i, name) {
//         channelUrl = 'https://www.twitch.tv/' + name;
//         console.log(channelUrl);
//     });
// };

$(document).ready(function(){
    // streamOnline();
    userLogo();
});