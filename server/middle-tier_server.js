var express = require('express');
var fs = require('fs');
var cors = require('cors');
var app = express();
var sudoData = [];
var isFirstTime=true;
app.use(cors());
app.get('/', function (req, res) {
    res.send('Hello World');
})
app.get('/allData', function (req, res) {
    isFirstTime=true;
    res.send(sudoData);
})

app.get('/getDataIndex/:index', function (req, res) {
    let { index } = req.params;
    if (index >= 0 && index < sudoData.length) res.send(sudoData[req.params.index]);
    else res.send("invalid input");
})

app.get("/getDataWithFilter", (req, res) => {
    let flag=true;
    if(isFirstTime)
        for(let i=0;i<1000;i++){
            fs.readFileSync("./testData.json");
        }
    isFirstTime=false;
    let { query } = req.query;
    query=JSON.parse(query);
    let rangeDataIndexs = Object.keys( JSON.parse(req.query.query));
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
            else if(dataIndex==="Address"){
                let pattern=query[dataIndex];
                if(flag)console.log(pattern);
                flag=false;
                return item[dataIndex].toLowerCase().indexOf(pattern.toLowerCase())!=-1;
            }
            else if (item[dataIndex] < query[dataIndex][0] || item[dataIndex] > query[dataIndex][1])
                return false;
        }
        return true;
    })
    res.send(filteredData);

})


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    fs.readFile("./testData.json", (err, data) => {
        if (!err) {
            sudoData = JSON.parse(data);
        }
        else {
            console.log("error in reading Data");
        }
    })
})
