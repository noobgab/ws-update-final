$(document).ready(function() {
    $(".real-time-btn").click(function() {
        console.log("Real time btn clicked");
    });

    $(".historic-data-btn").click(function() {
        console.log("Historic data btn clicked");
    });

    $.get('/location', function(data) {
        $(".latest-loc").html("Lates Location: " + data);
    });
});