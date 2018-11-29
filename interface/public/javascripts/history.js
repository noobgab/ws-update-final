$(document).ready(function() {
    var ctx = document.getElementById("historicDataChart").getContext('2d');
    
    var myChart = new Chart(ctx, {
        type: 'line',
        data: [20, 14, 6, 12, 17, 25]
    });
});