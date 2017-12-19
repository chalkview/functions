var admin = require("firebase-admin");
var request = require('request');
var uberServerToken = "Szi9o9nxrs2fUluAdC4sXHR1KQ0EVuqOwPUmdbRD";

var GeoFire = require('GeoFire');

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
var ref = db.ref("search/request");

// Create a Firebase reference where GeoFire will store its information


// Create a GeoFire index



// db.ref('search/request').on("child_added", function(snapshot, prevChildKey) {
//     var newRequest = snapshot.val();
//     console.log(newRequest.key);
//   });


console.log('mike')
function search() {
    // Execute Search
    var url = "";
    var searchType = 1;
    // Home
    var latitude = 42.532038
    var longitude = -83.541895

    // Royal Oak
    var latitude = 42.487331
    var longitude = -83.144183




    var roundedLongitude = longitude.toFixed(3);
    var roundedlatitudee = latitude.toFixed(3);


    var searchRequest = {
        l: latitude,
        g: longitude,
        d: 0, // Distance
        r: 1, // Seawrch Source 1=FaceBook
        t: 1 // Type 1=All Places 2=Resturants 3=Bars  4=Retail
    }

    searchUrl = "https://graph.facebook.com/search?type=place&center=" + latitude + "," + longitude + "&categories=['FOOD_BEVERAGE']&distance=800&fields=name,location,category_list&limit=200&key=value&access_token=725298231000833|51feb05e25abdcb8239550b7f0156963";

    console.log('ok');
    console.log(searchUrl);
    request({
        url: searchUrl,

    }, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Success
            console.log('worked');
            var roundedLongitude = longitude.toFixed(3);
            var roundedlatitudee = latitude.toFixed(3);
            var key = roundedlatitudee + "&" + roundedLongitude + "&" + searchRequest.t;
            // Replace all . with d(ot)
            key = key.replace(/\./g, 'd')
            var results = JSON.parse(body).data;
            var list = [];
            for (var i = 0; i < results.length; i++) {
                var place = results[i];

                var details = {
                    i: place.id,
                    n: place.name,
                    l: place.location.latitude,
                    g: place.location.longitude
                    //c: "COLOR",
                    //o: "CUSTOM LOGO"
                }

                db.ref("places/details/id/" + place.id).set(details);
                for (var c = 0; c < place.category_list.length; c++) {
                    var cat = place.category_list[c];
                    console.log(cat.name + "-" + place.name);

                    db.ref("places/categories/name/" + cat.name).set(cat.id);
                    db.ref("places/categories/id/" + cat.id).set(cat.name);

                    // db.ref("places/byCategoryId/" + cat.id + "/" + place.id).set(details);
                    // db.ref("places/byCategoryName/" + cat.name + "/" + place.id).set(details);

                    var name = place.name.replace(/\./g, '')
                    db.ref("places/byCategoryName/" + cat.name + "/" + name).set(true);
                }
                //console.log(obj.category_list)

                geoFire.set(place, [place.location.latitude, place.location.longitude]).then(function() {
                    console.log("Provided key has been added to GeoFire");
                  }, function(error) {
                    console.log("Error: " + error);
                  });
            }



        } else {
            // Error Occurred
            console.log('ERROR - ' + error + response + body)
        }
    });

}

search();

// var results = {

//     i: "ID,
//     n: "NAME OF PLACE",
//     l: "LATITUDE",
//     G: "LONGITUDE",
//     C: "COLOR",
//     O: "CUSTOM LOGO"
// }