var express = require('express');
var fs = require('fs');
var cors = require('cors');
var app = express();
var sudoData = [];
var isFirstTime = true;
var admin = require("firebase-admin");
var serviceAccount = require("./los-angeles-traffic-collisions-firebase-adminsdk-pjnxq-7500f1ee22.json");
app.use(cors());
app.get('/', function (req, res) {
    res.send('Hello World');
})
app.get('/allData', function (req, res) {
    isFirstTime = true;
    res.send(sudoData);
})

app.get('/getDataIndex/:index', function (req, res) {
    let { index } = req.params;
    if (index >= 0 && index < sudoData.length) res.send(sudoData[req.params.index]);
    else res.send("invalid input");
})

app.get("/getDataWithFilter", (req, res) => {
    let { query } = req.query;
    query = JSON.parse(query);

    let rangeDataIndexs = Object.keys(JSON.parse(req.query.query));
    let filteredData = sudoData.filter(item => {
        for (let i = 0; i < rangeDataIndexs.length; i++) {

            let dataIndex = rangeDataIndexs[i];
            if (dataIndex === "Date Occurred") {
                let curTime = item[dataIndex];
                let lowerBound = query[dataIndex][0];
                let upperBound = query[dataIndex][1];
                if (Date.parse(curTime) < Date.parse(lowerBound) || Date.parse(curTime) > Date.parse(upperBound))
                    return false;

            }
            if (dataIndex === "Address" || dataIndex === "Area Name" || dataIndex === "Victim Descent") {
                let pattern = query[dataIndex];
                if (item[dataIndex].toLowerCase().indexOf(pattern.toLowerCase()) == -1) {
                    return false;
                }
            }
            if (dataIndex === "Census Tracts" || dataIndex === "DRNumber" || dataIndex === "Time Occurred")
                if (item[dataIndex] < query[dataIndex][0] || item[dataIndex] > query[dataIndex][1])
                    return false;

            if (dataIndex === "Area ID") {
                if (!query[dataIndex].includes(item[dataIndex])) return false;
            }
        }
        return true;

    })
    res.send(filteredData);

})


var server = app.listen(8081, function () {

    var host = server.address().address;
    var port = server.address().port;
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://los-angeles-traffic-collisions.firebaseio.com"
    });
    let db = admin.firestore();
    let dataRef = db.collection('data');
    dataRef.get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                sudoData.push(doc.data());
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });

})
