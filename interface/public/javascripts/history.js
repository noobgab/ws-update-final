$(document).ready(function() {
    var ctx = $("#historicDataChart");
    var lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
            datasets: [{
                label: "Humidity",
                data: [10,8,6,5,12,8,16,17,6,7,6,10]
            }, {
                label: "Temperature",
                data: [10,6,7,6,17,16,8,12,5,6,8,10]
            }]
        }
    });
});