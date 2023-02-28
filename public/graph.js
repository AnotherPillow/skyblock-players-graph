document.addEventListener('DOMContentLoaded', async function() {
    let {economy} = await fetch('http://localhost:9999/data').then(res => res.json());
    new Chart('ecochart', {
        type: 'line',
        data: {
            labels: economy.x,
            datasets: [{
                label: 'Economy Players Online',
                data: economy.y,
                backgroundColor: 'rgba(0, 255, 0, 0.4)',
                borderColor: 'rgba(0, 255, 0, 1)',
            }]
        },
    })
    let {skyblock} = await fetch('http://localhost:9999/data').then(res => res.json());
    new Chart('netchart', {
        type: 'line',
        data: {
            labels: skyblock.x,
            datasets: [{
                label: 'Skyblock Players Online',
                data: skyblock.y,
                backgroundColor: 'rgba(255, 230, 0, 0.4)',
                borderColor: 'rgba(255, 255, 0, 1)',
            }]
        },
    })
})