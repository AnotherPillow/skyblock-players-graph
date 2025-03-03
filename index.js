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
    let time = new Date().toISOString()

    let economyPlayersOnline = 0;
    
    try {            
        let econ = await sb.economy()
        economyPlayersOnline = econ.players_online || 0;
    } catch {}

    console.log(`[${time}] Economy Players Online: ${economyPlayersOnline}`);
    graphData.economy.x.push(time);
    graphData.economy.y.push(economyPlayersOnline);

    let skyblockPlayersOnline = 0;
    try {
        let surv = await sb.survival()
        skyblockPlayersOnline = surv.players_online || 0;
    } catch {}
    console.log(`[${time}] Skyblock Players Online: ${skyblockPlayersOnline}`);
    graphData.skyblock.x.push(time);
    graphData.skyblock.y.push(skyblockPlayersOnline);

    updateGraphData(graphData)

}, 60000);

//run code when it closes
process.on('SIGINT', function() {
    updateGraphData(graphData)
    process.exit();
});

const updateGraphData = (graphData) => fs.writeFileSync('graphData.json', JSON.stringify(graphData, null, 4));