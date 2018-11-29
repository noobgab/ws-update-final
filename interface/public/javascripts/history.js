$(document).ready(function() {
    var ctx = document.getElementById("historicDataChart").getContext('2d');

    var data = [{x:10, y:20}, {x:20, y:12}, {x:30, y:6}, {x:40, y:16}, {x:50, y:23}];
    var options = {label: "Humidity"};

    var myChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: options
    });
});