const express = require('express');
const sb = require('skyblock.js');
const app = express();
const fs = require('fs');

app.use(express.json());
app.use('/public',express.static('public'));

let graphData = {
    economy: {
        x: [],
        y: []
    },
    skyblock: {
        x: [],
        y: []
    },
    events: {
        //TO-DO
        x: [],
        y: []
    }
}

if (fs.existsSync('graphData.json')) 
    graphData = JSON.parse(fs.readFileSync('graphData.json'));


app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
})

app.listen(9999, function() {
    console.log('Listening on port 9999');
})


app.get('/data', function(req, res) {
    res.json(graphData);
})

setInterval(async () => {
    let date = Date.now();
    let hours = new Date().getHours();
    let minutes = new Date().getMinutes();
    let seconds = new Date().getSeconds();
    let time = `${hours> 9 ? hours : '0' + hours}:${minutes> 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`;
    

    let econ = await sb.economy()
    let economyPlayersOnline = econ.players_online;
    console.log(`[${time}] Economy Players Online: ${economyPlayersOnline}`);
    graphData.economy.x.push(time);
    graphData.economy.y.push(economyPlayersOnline);

    let surv = await sb.survival()
    let skyblockPlayersOnline = surv.players_online;
    console.log(`[${time}] Skyblock Players Online: ${skyblockPlayersOnline}`);
    graphData.skyblock.x.push(time);
    graphData.skyblock.y.push(skyblockPlayersOnline);

    upgradeGraphData(graphData)

}, 30000);

//run code when it closes
process.on('SIGINT', function() {
    upgradeGraphData(graphData)
    process.exit();
});

const upgradeGraphData = (graphData) => fs.writeFileSync('graphData.json', JSON.stringify(graphData, null, 4));