$(document).ready(function() {
    var ctx = $("#historicDataChart");
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [{
                label: "Humidity",
                data: [20,16,5,8,6,11,15,17,16,12,8,6],
                backgroundColor: ['rgba(60, 172, 242, 0.2)'],
                borderColor: ['rgba(60, 172, 242, 1)']
            }, {
                label: "Temperature",
                data: [10,6,7,6,17,16,8,12,5,6,8,10],
                backgroundColor: ['rgba(224, 11, 11, 0.2)'],
                borderColor: ['rgba(224, 11, 11, 1)']
            }]
        }
    });
});