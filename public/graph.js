document.addEventListener('DOMContentLoaded', async function () {

    let { economy, skyblock } = await fetch(`${document.location.origin}/data`).then(res => res.json());


    var graph = new Chart('graph', {
        type: 'line',
        data: {
            labels: skyblock.x,
            datasets: [{
                label: 'Skyblock Players Online',
                data: skyblock.y,
                // backgroundColor: 'rgba(255, 230, 0, 0.4)',
                borderColor: 'rgba(255, 255, 0, 1)',
                fill: false,
            }, {
                label: 'Economy Players Online',
                data: economy.y,
                // backgroundColor: 'rgba(0, 255, 0, 0.4)',
                borderColor: 'rgba(0, 255, 0, 1)',
                fill: false,
            }]
        },
        options: {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            elements: {
                point: {
                    radius: 0,          // Set to 0 to remove the points/bubbles
                    hitRadius: 10,       // Adjust this as needed for hover detection
                    hoverRadius: 0,     // Remove the bubble on hover, too
                    hoverBorderWidth: 0  // Remove border during hover
                }
            },
            tooltips: {
                mode: 'index',        // 'index' mode is crucial
                intersect: false,      // Ensure tooltip is triggered even if the point isn't directly hovered
            },
            legend: {
                align: 'start' // 'start' aligns to the left
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    time: {
                        stepSize: 1, // Adjust this value
                    },
                }],
            }
        }
    })

    const graph_canvas = document.querySelector('#graph')
    graph_canvas.addEventListener('click', (e) => {
        var a = document.createElement('a');
        a.href = net.toBase64Image();
        a.target = '_blank';
        a.click();
    })


    setInterval(async () => {

        let { economy, skyblock } = await fetch(`${document.location.origin}/data`).then(res => res.json());

        graph.data.labels = skyblock.x

        graph.data.datasets[0].data = skyblock.y;
        graph.data.datasets[1].data = economy.y;

        graph.update()
    }, 10000)
})