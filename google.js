// Node Modultes
console.log("Start")
var admin = require("firebase-admin");
var request = require('request');
var GeoFire = require('GeoFire');

var googleKey = "AIzaSyBOTvQKbqhMfZO1hqYMwHK5DaxDcWo5BXs";

// Init Firebase
admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "chalkview",
        "private_key_id": "7eeef4c77a98efa3e3643ea9cceba36aa83cea8c",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClTlDVYZQY43G1\neWXopwYFXU0P6k1iFrhfeSRKTQsD/lKxZKv1E+FQjzJLDUW355lHCo+T5XBGoL/V\nBaSXuqTJICqSb/cHtQRcudEppHGav1DEuc+Ol2j0BmjF5icVMg5xqLa5DeBcVamr\npiHQkr/nW+OEMCSQarm/ryxH0M8HBTQPc57YNcGnJozya1taPP3UYCnTR8jVOaNu\ncflu2ZwoQt7IGnfgZpCc7oFklpj6pzHiBNutr7EygudjWJwToEnfobx0Fhuj58Wk\n9bt2khqAvD5gLogYyStKe435Gj1FemwlHiYdvblc50BDyl/GdCN5xOozzG6tmcWO\neaxcGbvHAgMBAAECggEAFLEibitaOelShPhOuNobZ1V//XODPzl/17eWwtQ1Akl1\n+W2UFsfnxsk97uYY6YXMind4dHdeYADkMlqT+UgsM17a5Vyti+HtS1wZIgDLFadI\nCXAG2p76TL12pPsDvmP3KeQIB08E3Bn+9JUFm5GbAu9eIeBS2174pFVdkhnBqGub\nLWInnF0osEtUojrsg3EwKPWMueLMGTiRHCOgYGYGN3PbW8izmvXoka8HpKCPNS37\n5vEzTW+lmqpB4D5O673OQ5nN87iP/XOoUmf6plAzgFPJD4a91MAxMIbrFrAzLq7k\nw2Gk+1wR5bKGxCqmdTFJblghjbAHObTWDHor1dSjJQKBgQDdn1MFSrSAM4+o2Fbv\nNfoTmIZBpRx0Mj4twKLM/cSM35hwS2MHMRwbPErtApIayIOdaoW39NqRwGZwFEXS\n5S6kgY7hNMqbSNTTQ//h/SJO594wIuh2/BEbzqQ+gvtyE3b7XsAz7c8R0kJcETgf\n+GhjkSxDrJsNvhOqRpxRCR5ScwKBgQC+8qcJSTOk7Ddi//1WfR1e6L4YsUAJUedG\nSTFxAD5ngSWLwRJk4jwKUl/qFfY0pqgsKZJS3svicYnHsi2yMk5x+UqG0W7d9VJV\naNyaGd9U/0L23y13GCGGD3lkSchrRWvbrb+INfwQqrn46ZUlxKkqWUunBHe0W6rA\nEiLn1HkYXQKBgFAQSvHSdzsJZZDd9yocGegSZg45E/p2XDgzK51a4DL0ZCHNWk0y\n1LCSK49MKnQ6lDG+VeiLMJsPIvLCoCb8XMlZdMCvTbKjsR9RpZOC224eHgrN0aWK\nkrO1B2j98NDZb1aIeG9KLlCF4StZnSkPmMa/n3ojVTC1xmzxbW9pF+c5AoGAMknd\nzAhHXawIej5JDjotPg214vLrlojHjC9CoiwaQ1Az/zZ+Dau3fFBtikz2Zq9toxPf\nwYuDzsNwMfOvLTsqhcHN6uvFcxdk87GGR9+AffYsQLBOXQsx6QiyQ8Na0UWbPmPo\nCYuOMyWDjRaXfTbqBok172qxzAJIWgVsw/mlWtECgYA1H2FjG+k3cWyhPqhkP9Aa\nLR1B+oVyBZ71VZ2Gh2rhPrFr/aRFYornAAFVbNaQypfcmGZiGuH4OXmSJyaXWRM6\n463Qwe9dVOocnMkVKcJCfdrKQf5JCsWTYIECio2arqbyNvp+Utz1iDsI4BgGegWj\na/EzHchqFKesbhg8SPKCKQ==\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-c163l@chalkview.iam.gserviceaccount.com",
        "client_id": "112247660010509124974",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-c163l%40chalkview.iam.gserviceaccount.com"
    }),
    databaseURL: "https://chalkview.firebaseio.com"
});

var db = admin.database();

///////////////////// Setup Listeners /////////////////////

var searchInitRef = db.ref("searchInit");
searchInitRef.on("child_added", function (snapshot) {
    var searchRequest = snapshot.val();
    searchInit(searchRequest, snapshot.key);
});

var searchRef = db.ref("searchRequest");
searchRef.on("child_added", function (snapshot) {
    var searchRequest = snapshot.val();
    search(searchRequest, snapshot.key);
});


function searchInit(searchRequest, searchInitKey) {
    var searchTrackerId = searchRequest.lat.toFixed(3) + "x" + searchRequest.lng.toFixed(3)
    var key = searchTrackerId.replace(/\./g, 'd')
    var searchTrackerRef = db.ref("SearchTracker/" + key).child(searchRequest.type);
    searchTrackerRef.once("value", function (snapshot) {
        if (snapshot.val() != true) {
            // Search
            db.ref("searchRequest").push(searchRequest);
        } else {
            //console.log('Search Already Cached')
        }
        // Delete SearchInit node
        var searchInitRef = db.ref("searchInit/" + searchInitKey);
        searchInitRef.set(null);
    });
}

function search(searchRequest, searchRequestKey) {

    // Create Promise
    var searchType = "";
    switch (searchRequest.type) {
        case 1:
            searchType = "restaurant";
            break;
        case 2:
            break;
        default:
    }

    var searchUrl = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?rankby=distance&type=" + searchType + "&location=" + searchRequest.lat + "," + searchRequest.lng + "&key=" + googleKey;

    request({
        url: searchUrl,
    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Success
            var results = JSON.parse(body).results;
            var nextPage = JSON.parse(body).next_page_token;
            for (var i = 0; i < results.length; i++) {
                addPlace(results[i],searchRequest.type)
            }
            // Add SearchCompleteID Record
            var searchTrackerId = searchRequest.lat.toFixed(3) + "x" + searchRequest.lng.toFixed(3)
            var key = searchTrackerId.replace(/\./g, 'd')
            db.ref("SearchTracker/" + key).child(searchRequest.type).set(true);

        } else {
            // Error Occurred
            // console.log('ERROR - ' + error + response + body)
        }
    });

    // Delete SearchInit node
    var searchInitRef = db.ref("searchRequest/" + searchRequestKey);
    searchInitRef.set(null);

}


function addPlace(place,type) {

    var newPlace = {
        n: place.name,
        lat: place.geometry.location.lat,
        lng: place.geometry.location.lng
    }
    var geoFire = new GeoFire(db.ref("SearchGeo/type" + type));
    geoFire.set(place.id, [place.geometry.location.lat, place.geometry.location.lng]).then(function () {
    }, function (error) {
    });
    // Add Summary Record
    db.ref("PlaceSummary/" + place.id).set(newPlace);
    searchInitRef.set(null);
}

function viewPlace(placeId) {
    // Exists?
    // If Not Load Google Place Details.
    // Create New Record from Google Place.
    // Save to List
}

// db.ref("searchInit").push({

//     lat: 42.532038,
//     lng: -83.541895,
//     type: 1
// })



