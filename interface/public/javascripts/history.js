$(document).ready(function() {
    var ctx = document.getElementById("historicDataChart").getContext('2d');
    var myChart = new Chart(ctx, {
        type: 'line',
        data: [{
        x: 10,
        y: 20
    }, {
        x: 15,
        y: 10
    }]
    });
});